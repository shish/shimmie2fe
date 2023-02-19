import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "./basics/Avatar";
import { Block } from "./basics/Block";
import * as css from "./UserInfo.module.scss";

export function UserInfo({ user }) {
    return <Block className={css.userInfo}>
        <div>
            {user.name}
            <br />Joined: {user.join_date.split(" ")[0]}
            <br /><Link to={"/posts?tags=user=" + user.name}>Posts uploaded</Link>
            <br /><Link to={"/posts?tags=upvoted_by=" + user.name}>Upvotes</Link>
            {" / "}<Link to={"/posts?tags=downvoted_by=" + user.name}>Downvotes</Link>
        </div>
        <Avatar user={user} />
    </Block>
}