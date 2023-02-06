import React, { useState, useRef } from 'react';
import CommentsIcon from "../icons/comments.svg";
import BarsIcon from "../icons/bars.svg";
import * as css from './NavBar.module.scss';
import { graphql } from '../gql';
import { useQuery } from '@apollo/client'
import { Link } from "react-router-dom";
import { serverInfo } from '../App';
import { nullthrows } from '../utils';

import { useMutation } from "@apollo/client";

const loginMutation = graphql(/* GraphQL */ `
  mutation login($name: String!, $pass: String!) {
    login(name: $name, pass: $pass) {
        user {
            name
            private_message_unread_count
        }
        session
        error
    }
  }
`)

const getMeRequest = graphql(/* GraphQL */ `
  query getMe {
    me {
        name
        private_message_unread_count
    }
  }
`)

const getTagsRequest = graphql(/* GraphQL */ `
  query getTags($start: String!) {
    tags(search: $start, limit: 10) {
        tag
        uses
    }
  }
`)

function useFocus(): [any, CallableFunction] {
    const htmlElRef = useRef<HTMLElement>(null);
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()};

    return [ htmlElRef, setFocus ] 
}

enum Bars {
    NONE,
    NAV,
    COMPLETIONS,
    USER,
    LOGIN,
}

export function NavBar(props) {
    // Overall bits
    const [bar, setBar] = useState(Bars.NONE);

    // Search Bits
    const [search, setSearch] = useState("");
    const compQ = useQuery(getTagsRequest, {variables: {start: nullthrows(search.split(" ").pop())}});
    const [inputRef, setInputFocus] = useFocus();
    function setSearchPart(tag) {
        setSearch(search.split(" ").slice(0, -1).concat([tag]).join(" ") + " ");
        setInputFocus();
    }

    // Login bits
    const meQ = useQuery(getMeRequest, {});
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const updateCache = (cache, { data }) => {
        if(data.login.user.name && data.login.session) {
            localStorage.setItem('session', data.login.user.name+":"+data.login.session);
            setBar(Bars.NONE);
        }
        cache.writeQuery({
            query: getMeRequest,
            data: { me: data.login.user }
        });
    };
    const [login] = useMutation(loginMutation, {update: updateCache});
    function logout() {
        localStorage.removeItem('session');
        meQ.client.clearStore();
    }

    // Handy vars for rendering
    const is_anon = (meQ?.data?.me?.name && meQ?.data?.me?.name == "Anonymous");

    return (
        <header className={css.header}>
            <div className={css.flex}>
                <BarsIcon onClick={() => setBar(bar == Bars.NAV ? Bars.NONE : Bars.NAV)} />
                <Link to="/">{serverInfo.name}</Link>
                <input
                    type="text"
                    value={search}
                    className={css.fill}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setBar(Bars.COMPLETIONS)}
                    onBlur={() => setBar(Bars.NONE)}
                    ref={inputRef}
                />
                {is_anon ?
                    <>
                        <a onClick={() => setBar(bar == Bars.LOGIN ? Bars.NONE : Bars.LOGIN)}>Log In</a>
                        <Link to="/signup">Create Account</Link>
                    </> :
                    <>
                        <a onClick={() => setBar(bar == Bars.USER ? Bars.NONE : Bars.USER)}>
                            {meQ?.data?.me?.name}{' '}
                            {meQ?.data?.me?.private_message_unread_count > 0 && <CommentsIcon />}
                        </a>
                    </>
                }
            </div>
            {bar == Bars.LOGIN &&
                <form className={css.flex} onSubmit={(e) => {
                    e.preventDefault();
                    login({ variables: { name, pass } });
                }}>
                    <span className={css.fill}></span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                    <input type="submit" value="Log In" />
                </form>
            }
            {bar == Bars.NAV &&
                <div className={css.flex}>
                    <span>Upload</span>
                    <span>Comments</span>
                    <span>Things</span>
                </div>
            }
            {bar == Bars.COMPLETIONS &&
                <div className={css.flex}>
                    {compQ?.data?.tags?.map(tu =>
                        <span
                            className={css.tag}
                            key={tu.tag}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setSearchPart(tu.tag)}
                        >
                            <span className={css.name}>{tu.tag}</span>
                            <span className={css.uses}>{tu.uses}</span>
                        </span>
                    )}
                </div>
            }
            {bar == Bars.USER &&
                <div className={css.flex}>
                    <span>My Profile</span>
                    <span>Messages ({meQ?.data?.me?.private_message_unread_count})</span>
                    <span className={css.fill}></span>
                    <span onClick={logout}>Log Out</span>
                </div>
            }
        </header>
    );
}