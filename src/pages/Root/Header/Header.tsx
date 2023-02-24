import React, { useState, useEffect, useContext } from "react";
import { Form, Link } from "react-router-dom";
import { serverInfo } from "../../../utils";
import { useLocation } from "react-router-dom";
import { UserContext } from '../../../providers/LoginProvider';
import { Permission } from "../../../gql/graphql";
import { useSearchParams } from "react-router-dom";

import { Autocomplete } from "../../../components/Autocomplete/Autocomplete";
import { ReactComponent as BarsIcon } from "./bars.svg";
import { ReactComponent as UserIcon } from "./user.svg";
import { ReactComponent as MagnifiyingGlassIcon } from "./magnifying-glass.svg";
import css from "./Header.module.scss";
import logo from "./logo.png";

enum Bars {
    NONE,
    NAV,
    USER,
    LOGIN,
}

function NavBar() {
    return (
        <div className={css.nav}>
            <Link to="/upload">Upload</Link>
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
            {can(Permission.ReadPm) &&
                <Link to="/messages">Messages{pmuc != null && pmuc > 0 && <> ({pmuc})</>}</Link>}
            <span className={css.fill}></span>
            <span onClick={(e) => {
                e.preventDefault();
                logout();
                setBar(Bars.NONE);
            }}>Log Out</span>
        </div>
    );
}

function LoginBar({ setBar }: { setBar: CallableFunction }) {
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
                placeholder="User Name"
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
    const { me, is_anon } = useContext(UserContext);
    // eslint-disable-next-line
    let [searchParams, _setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("tags") ?? "");

    // Overall bits
    const [bar, setBar] = useState(Bars.NONE);
    function toggleBar(b: Bars) {
        setBar(bar === b ? Bars.NONE : b);
    }
    const location = useLocation();
    useEffect(() => { setBar(Bars.NONE) }, [location]);

    // Handy vars for rendering
    return (
        <header id="site-header" className={css.header}>
            <div className={css.topbar}>
                <BarsIcon data-cy="hamburger" onClick={() => toggleBar(Bars.NAV)} />
                <Link to="/">
                    <img
                        className={css.logo}
                        src={logo}
                        alt={serverInfo.name}
                    />
                </Link>
                <Form className={css.fill} method="get" action="/posts">
                    <Autocomplete name="tags" value={search} onValue={(v) => setSearch(v)} />
                    <button data-cy="header-search"><MagnifiyingGlassIcon /></button>
                </Form>
                {is_anon ? (
                    <>
                        <UserIcon data-cy="user-icon" onClick={() => toggleBar(Bars.LOGIN)} />
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
                                <UserIcon data-cy="user-icon" onClick={() => toggleBar(Bars.USER)} />
                            )}
                            {(me.private_message_unread_count || 0) >
                                0 && <span>{me.private_message_unread_count}</span>}
                        </div>
                    </>
                )}
            </div>
            {bar === Bars.NAV && <NavBar />}
            {bar === Bars.USER && <UserBar setBar={setBar} />}
            {bar === Bars.LOGIN && <LoginBar setBar={setBar} />}
        </header>
    );
}
