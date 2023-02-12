import React, { useState, useRef, useEffect } from "react";
import BellIcon from "../icons/bell.svg";
import BarsIcon from "../icons/bars.svg";
import UserIcon from "../icons/user.svg";
import MagnifiyingGlassIcon from "../icons/magnifying-glass.svg";
import * as css from "./Header.module.scss";
import { graphql } from "../gql";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { Form, Link } from "react-router-dom";
import { serverInfo } from "../App";
import { nullthrows } from "../utils";
import { useSearchParams, useLocation } from "react-router-dom";

const loginMutation = graphql(/* GraphQL */ `
    mutation login($name: String!, $pass: String!) {
        login(name: $name, pass: $pass) {
            user {
                name
                private_message_unread_count
                avatar_url
            }
            session
            error
        }
    }
`);

const getMeRequest = graphql(/* GraphQL */ `
    query getMe {
        me {
            name
            private_message_unread_count
            avatar_url
        }
    }
`);

const getTagsRequest = graphql(/* GraphQL */ `
    query getTags($start: String!) {
        tags(search: $start, limit: 10) {
            tag
            uses
        }
    }
`);

function useFocus(): [any, CallableFunction] {
    const htmlElRef = useRef<HTMLElement>(null);
    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
}

enum Bars {
    NONE,
    NAV,
    COMPLETIONS,
    USER,
    LOGIN,
}

function NavBar(props) {
    return (
        <div className={css.flex}>
            <Link to="/upload">Upload</Link>
            <Link to="/comments">Comments</Link>
        </div>
    );
}

function CompletionsBar(props: {
    start: string;
    setSearchPart: CallableFunction;
}) {
    const compQ = useQuery(getTagsRequest, {
        variables: { start: props.start },
    });

    return (
        <div className={css.flex}>
            {compQ?.data?.tags?.map((tu) => (
                <span
                    className={css.tag}
                    key={tu.tag}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => props.setSearchPart(tu.tag)}
                >
                    <span className={css.name}>{tu.tag}</span>
                    <span className={css.uses}>{tu.uses}</span>
                </span>
            ))}
        </div>
    );
}

function UserBar(props) {
    const me = nullthrows(props.meQ?.data?.me);

    function logout() {
        localStorage.removeItem("session");
        props.meQ.client.clearStore();
        props.meQ.refetch();
    }

    return (
        <div className={css.flex}>
            <Link to={"/user/"+me.name}>My Profile</Link>
            <Link to="/messages">Messages ({me.private_message_unread_count})</Link>
            <span className={css.fill}></span>
            <span onClick={logout}>Log Out</span>
        </div>
    );
}

function LoginBar(props) {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const updateCache = (cache, { data }) => {
        if (data.login.user.name && data.login.session) {
            localStorage.setItem(
                "session",
                data.login.user.name + ":" + data.login.session,
            );
            props.setBar(Bars.NONE);
        }
        cache.writeQuery({
            query: getMeRequest,
            data: { me: data.login.user },
        });
    };
    const [login] = useMutation(loginMutation, { update: updateCache });

    return (
        <form
            className={css.flex}
            onSubmit={(e) => {
                e.preventDefault();
                login({ variables: { name, pass } });
            }}
        >
            <span className={css.fill}></span>
            <input
                type="text"
                value={name}
                placeholder="User name"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="password"
                value={pass}
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
            />
            <input type="submit" value="Log In" />
            <Link onClick={(e) => props.setBar(Bars.NONE)} to="/signup">
                Sign Up
            </Link>
        </form>
    );
}

export function Header(props) {
    let [searchParams, setSearchParams] = useSearchParams();

    // Overall bits
    const [bar, setBar] = useState(Bars.NONE);
    function toggleBar(b: Bars) {
        setBar(bar == b ? Bars.NONE : b);
    }
    const location = useLocation();
    useEffect(() => {setBar(Bars.NONE)}, [location]);

    // Search Bits
    const [search, setSearch] = useState(searchParams.get("tags") ?? "");
    const [inputRef, setInputFocus] = useFocus();
    function setSearchPart(tag: string) {
        setSearch(search.split(" ").slice(0, -1).concat([tag]).join(" ") + " ");
        setInputFocus();
    }

    // Login bits
    const meQ = useQuery(getMeRequest, { pollInterval: 10 * 1000 });

    // Handy vars for rendering
    const is_anon = meQ?.data?.me?.name && meQ?.data?.me?.name == "Anonymous";
    const logo = (new URL("../static/logo.png", import.meta.url)).toString();

    return (
        <header id="site-header" className={css.header}>
            <div className={css.topbar}>
                <BarsIcon onClick={() => toggleBar(Bars.NAV)} />
                <Link to="/">
                    <img
                        className={css.logo}
                        src={logo}
                        alt={serverInfo.name}
                    />
                </Link>
                <Form className={css.fill} method="get" action="/posts">
                    <input
                        type="text"
                        name="tags"
                        autoComplete="off"
                        value={search}
                        className={css.fill}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setBar(Bars.COMPLETIONS)}
                        onBlur={() => setBar(Bars.NONE)}
                        ref={inputRef}
                    />
                    <button><MagnifiyingGlassIcon /></button>
                </Form>
                {is_anon ? (
                    <>
                        <UserIcon onClick={() => toggleBar(Bars.LOGIN)} />
                    </>
                ) : (
                    <>
                        <a onClick={() => toggleBar(Bars.USER)}>
                            {meQ?.data?.me?.name}
                        </a>
                        {(meQ?.data?.me?.private_message_unread_count || 0) >
                            0 && <BellIcon />}
                        {meQ?.data?.me?.avatar_url ? (
                            <img
                                src={meQ?.data?.me?.avatar_url}
                                className={css.avatar}
                                onClick={() => toggleBar(Bars.USER)}
                            />
                        ) : (
                            <UserIcon onClick={() => toggleBar(Bars.USER)} />
                        )}
                    </>
                )}
            </div>
            {bar == Bars.NAV && <NavBar />}
            {bar == Bars.COMPLETIONS && (
                <CompletionsBar
                    start={nullthrows(search.split(" ").pop())}
                    setSearchPart={setSearchPart}
                />
            )}
            {bar == Bars.USER && <UserBar meQ={meQ} />}
            {bar == Bars.LOGIN && <LoginBar setBar={setBar} />}
        </header>
    );
}
