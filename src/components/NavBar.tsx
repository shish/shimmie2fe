import React, { useState } from 'react';
import BarsIcon from "../icons/bars.svg";
import * as css from './NavBar.module.scss';
import { graphql } from '../gql';
import { useQuery } from '@apollo/client'

class SearchBar extends React.Component {
    render() {
        return (
            <input type="text" />
        )
    }
}

const getMeRequest = graphql(/* GraphQL */ `
  query getMe {
    me {
        name
    }
  }
`)

export function NavBar(props) {
    const [showNav, setShowNav] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const me = useQuery(getMeRequest, {});

    function toggleNav() {
        setShowNav(!showNav);
        setShowUser(false);
    }

    function toggleUser() {
        setShowNav(false);
        setShowUser(!showUser);
    }

    const is_anon = (me?.data?.me?.name && me?.data?.me?.name == "Anonymous");

    return (
        <header className={css.header}>
            <div className={css.flex}>
                <BarsIcon onClick={toggleNav} />
                <SearchBar />
                {is_anon ?
                    <a onClick={toggleUser}>Log In / Create Account</a> :
                    <a onClick={toggleUser}>{me?.data?.me?.name}</a>}
            </div>
            {showNav && <div>
                Upload / Comments / Things
            </div>}
            {showUser && (is_anon ? <div className={css.flex}>
                <input type="text" />
                <input type="password" />
                <input type="submit" value="Log In" />
            </div> : <div className={css.flex}>
                My Profile / Messages / Things
            </div>)}
        </header>
    );
}