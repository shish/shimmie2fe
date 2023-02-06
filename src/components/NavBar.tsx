import React, { useState } from 'react';
import BarsIcon from "../icons/bars.svg";
import * as css from './NavBar.module.scss';

class SearchBar extends React.Component {
    render() {
        return (
            <input type="text" />
        )
    }
}

class UserInfo extends React.Component<{onClick}, {}> {
    render() {
        return (
            <a onClick={this.props.onClick}>Log In / Create Account</a>
        )
    }
}

export function NavBar(props) {
    const [showNav, setShowNav] = useState(false);
    const [showUser, setShowUser] = useState(false);

    function toggleNav() {
        setShowNav(!showNav);
        setShowUser(false);
    }

    function toggleUser() {
        setShowNav(false);
        setShowUser(!showUser);
    }

    return (
        <header className={css.header}>
            <div className={css.flex}>
                <BarsIcon onClick={toggleNav} />
                <SearchBar />
                <UserInfo onClick={toggleUser} />
            </div>
            {showNav && <div>
                Upload / Comments / Things
            </div>}
            {showUser && <div>
                My Profile / Messages / Things
            </div>}
        </header>
    );
}