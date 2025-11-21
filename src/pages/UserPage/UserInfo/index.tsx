import { Link } from "react-router-dom";

import { Avatar } from "../../../components/basics/Avatar";
import { Block } from "../../../components/basics/Block";
import { graphql } from "../../../gql";
import { UserInfoFragment } from "../../../gql/graphql";

import css from "./UserInfo.module.scss";

export const USER_INFO_FRAGMENT = graphql(/* GraphQL */ `
    fragment UserInfo on User {
        user_id
        name
        join_date
        avatar_url
    }
`);

export function UserInfo({ user }: { user: UserInfoFragment }) {
    return (
        <Block className={css.userInfo}>
            <div>
                {user.name}
                <br />
                Joined: {user.join_date.split(" ")[0]}
                <br />
                <Link to={"/posts?tags=user=" + user.name}>Posts uploaded</Link>
                <br />
                <Link to={"/posts?tags=upvoted_by=" + user.name}>Upvotes</Link>
                {" / "}
                <Link to={"/posts?tags=downvoted_by=" + user.name}>
                    Downvotes
                </Link>
            </div>
            <Avatar user={user} />
        </Block>
    );
}
