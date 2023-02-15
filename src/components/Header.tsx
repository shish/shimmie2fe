import React, { useState, useRef, useEffect, useContext } from "react";
import BarsIcon from "../icons/bars.svg";
import UserIcon from "../icons/user.svg";
import MagnifiyingGlassIcon from "../icons/magnifying-glass.svg";
import * as css from "./Header.module.scss";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";
import { Form, Link } from "react-router-dom";
import { serverInfo } from "../utils";
import { useSearchParams, useLocation } from "react-router-dom";
import { UserContext } from '../LoginProvider';

const GET_TAGS = graphql(/* GraphQL */ `
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

function NavBar() {
    return (
        <div className={css.nav}>
            <Link to="/upload">Upload</Link>
            <Link to="/comments">Comments</Link>
        </div>
    );
}

function CompletionsBar(props: {
    start: string;
    setSearchPart: CallableFunction;
}) {
    const compQ = useQuery(GET_TAGS, {
        variables: { start: props.start },
    });

    if (compQ.loading) { return <></> }
    if (compQ.error) { return <div className={css.completions}>{compQ.error.message}</div> }

    return (
        <div className={css.completions}>
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

function UserBar({ setBar }) {
    const { me, logout } = useContext(UserContext);
    const pmuc = me.private_message_unread_count;

    // FIXME: make logout work
    return (
        <div className={css.user}>
            <Link to={"/user/" + me.name}>My Profile</Link>
            <Link to="/messages">Messages{pmuc != null && pmuc > 0 && <>({pmuc})</>}</Link>
            <span className={css.fill}></span>
            <span onClick={() => {
                logout();
                setBar(Bars.NONE);
            }}>Log Out</span>
        </div>
    );
}

function LoginBar({ setBar }) {
    const { login } = useContext(UserContext);
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    // FIXME: display UserContext.login_error
    return (
        <form
            className={css.login}
            onSubmit={(e) => {
                e.preventDefault();
                login({
                    variables: { name, pass },
                    onCompleted: () => setBar(Bars.NONE),
                });
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
            <Link onClick={(e) => setBar(Bars.NONE)} to="/signup">
                Sign Up
            </Link>
        </form>
    );
}

export function Header() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { me, is_anon } = useContext(UserContext);

    // Overall bits
    const [bar, setBar] = useState(Bars.NONE);
    function toggleBar(b: Bars) {
        setBar(bar == b ? Bars.NONE : b);
    }
    const location = useLocation();
    useEffect(() => { setBar(Bars.NONE) }, [location]);

    // Search Bits
    const [search, setSearch] = useState(searchParams.get("tags") ?? "");
    const [inputRef, setInputFocus] = useFocus();
    function setSearchPart(tag: string) {
        setSearch(search.split(" ").slice(0, -1).concat([tag]).join(" ") + " ");
        setInputFocus();
    }

    // Handy vars for rendering
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
                            {me.name}
                        </a>
                        {me.avatar_url ? (
                            <div>
                                <img
                                    src={me.avatar_url}
                                    className={css.avatar}
                                    onClick={() => toggleBar(Bars.USER)}
                                />
                                {(me.private_message_unread_count || 0) >
                                    0 && <span>{me.private_message_unread_count}</span>}
                            </div>
                        ) : (
                            <UserIcon onClick={() => toggleBar(Bars.USER)} />
                        )}
                    </>
                )}
            </div>
            {bar == Bars.NAV && <NavBar />}
            {bar == Bars.COMPLETIONS && (
                <CompletionsBar
                    start={search.split(" ").pop()!}
                    setSearchPart={setSearchPart}
                />
            )}
            {bar == Bars.USER && <UserBar setBar={setBar} />}
            {bar == Bars.LOGIN && <LoginBar setBar={setBar} />}
        </header>
    );
}
