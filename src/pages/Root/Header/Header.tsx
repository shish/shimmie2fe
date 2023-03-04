import React, { useState, useEffect, useContext, useRef } from "react";
import { Form, Link } from "react-router-dom";
import { serverInfo } from "../../../utils";
import { useLocation } from "react-router-dom";
import {
    GET_ME,
    ME_FRAGMENT,
    UserContext,
} from "../../../providers/LoginProvider";
import { Permission } from "../../../gql/graphql";
import { useSearchParams } from "react-router-dom";
import { useFragment as fragCast } from "../../../gql/fragment-masking";

import { Autocomplete } from "../../../components/Autocomplete/Autocomplete";
import { ReactComponent as BarsIcon } from "./bars.svg";
import { ReactComponent as UserIcon } from "./user.svg";
import { ReactComponent as MagnifiyingGlassIcon } from "./magnifying-glass.svg";
import css from "./Header.module.scss";
import logo from "./logo.png";
import { useMutation } from "@apollo/client";
import { graphql } from "../../../gql";
import { MaybeError, Submit } from "../../../components/basics";
import { ScrollContext } from "../../../providers/ScrollProvider";

const LOGIN = graphql(`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            user {
                ...UserLogin
            }
            session
            error
        }
    }
`);

enum Bars {
    NONE,
    NAV,
    USER,
}

function NavBar() {
    const { can } = useContext(UserContext);
    return (
        <div className={css.nav}>
            {can(Permission.CreateImage) && <Link to="/upload">Upload</Link>}
            <Link to="/comments">Comments</Link>
            <Link to="/tags/map">Tags</Link>
            <Link to="/wiki/Index">Wiki</Link>
        </div>
    );
}

function UserBar({ setBar }: { setBar: CallableFunction }) {
    const { me, logout, can } = useContext(UserContext);
    const pmuc = me.private_message_unread_count;

    return (
        <div className={css.user}>
            <Link to={"/user/" + me.name}>My Profile</Link>
            {can(Permission.ReadPm) && (
                <Link to="/messages">
                    Messages{pmuc != null && pmuc > 0 && <> ({pmuc})</>}
                </Link>
            )}
            <span className={css.fill}></span>
            <span
                onClick={(e) => {
                    e.preventDefault();
                    logout();
                    setBar(Bars.NONE);
                }}
            >
                Log Out
            </span>
        </div>
    );
}

function LoginBar({ setBar }: { setBar: CallableFunction }) {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [login, q] = useMutation(LOGIN, {
        update: (cache, { data }) => {
            if (!data) {
                console.log("Login returned no data");
                return;
            }
            const user = fragCast(ME_FRAGMENT, data.login.user);

            if (user.name && data.login.session) {
                localStorage.setItem(
                    "session",
                    user.name + ":" + data.login.session,
                );
            }
            cache.writeQuery({
                query: GET_ME,
                data: { me: data.login.user },
            });
            if (data.login.session) {
                q.client.resetStore();
                setBar(Bars.NONE);
            }
        },
    });

    return (
        <form
            className={css.login}
            onSubmit={(e) => {
                e.preventDefault();
                login({ variables: { username: name, password: pass } });
            }}
        >
            <span className={css.fill}></span>
            <MaybeError query={q} error={q.data?.login.error} />
            <input
                type="text"
                value={name}
                placeholder="User Name"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="password"
                value={pass}
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
            />
            <Submit
                passive={"Log In"}
                active={"Logging In"}
                query={q}
                condition={name !== "" && pass !== ""}
            />
            <Link onClick={(e) => setBar(Bars.NONE)} to="/signup">
                Sign Up
            </Link>
        </form>
    );
}

export function Header() {
    const { me, is_anon } = useContext(UserContext);

    // show / hide header
    const headerRef = useRef<HTMLInputElement>(null);
    const { down } = useContext(ScrollContext);
    useEffect(() => {
        const header = headerRef?.current;
        if(header) {
            if (down) {
                header.style.top = -header.clientHeight + "px";
            } else {
                header.style.top = "0px";
            }    
        }
    }, [down]);

    // search bits
    const [searchParams] = useSearchParams(); // , setSearchParams
    const searchTags = searchParams.get("tags") ?? "";
    const [search, setSearch] = useState(searchTags);
    useEffect(() => {
        // When URL changes, update the search box to match
        setSearch(searchTags);
    }, [searchTags]);

    // Overall bits
    const [bar, setBar] = useState(Bars.NONE);
    function toggleBar(b: Bars) {
        setBar(bar === b ? Bars.NONE : b);
    }
    const location = useLocation();
    useEffect(() => {
        setBar(Bars.NONE);
    }, [location]);

    // Handy vars for rendering
    return (
        <header ref={headerRef} className={css.header}>
            <div className={css.topbar}>
                <BarsIcon
                    data-cy="hamburger"
                    onClick={() => toggleBar(Bars.NAV)}
                />
                <Link to="/">
                    <img
                        className={css.logo}
                        src={logo}
                        alt={serverInfo.name}
                    />
                </Link>
                <Form className={css.fill} method="get" action="/posts">
                    <Autocomplete
                        name="tags"
                        value={search}
                        onValue={(v) => setSearch(v)}
                    />
                    <button data-cy="header-search">
                        <MagnifiyingGlassIcon />
                    </button>
                </Form>
                {is_anon ? (
                    <>
                        <UserIcon
                            data-cy="user-icon"
                            onClick={() => toggleBar(Bars.USER)}
                        />
                    </>
                ) : (
                    <>
                        <span onClick={() => toggleBar(Bars.USER)}>
                            {me.name}
                        </span>
                        <div className={css.userIcon}>
                            {me.avatar_url ? (
                                <img
                                    alt="avatar"
                                    src={me.avatar_url}
                                    className={css.avatar}
                                    data-cy="user-icon"
                                    onClick={() => toggleBar(Bars.USER)}
                                />
                            ) : (
                                <UserIcon
                                    data-cy="user-icon"
                                    onClick={() => toggleBar(Bars.USER)}
                                />
                            )}
                            {(me.private_message_unread_count || 0) > 0 && (
                                <span>{me.private_message_unread_count}</span>
                            )}
                        </div>
                    </>
                )}
            </div>
            {bar === Bars.NAV && <NavBar />}
            {bar === Bars.USER &&
                (is_anon ? (
                    <LoginBar setBar={setBar} />
                ) : (
                    <UserBar setBar={setBar} />
                ))}
        </header>
    );
}
