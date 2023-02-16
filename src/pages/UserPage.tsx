import React, { useState } from "react";
import { Block } from "../components/Block";
import { Link, useParams } from "react-router-dom";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";
import { ErrorPage } from "./ErrorPage";
import { LoadingPage } from "./LoadingPage";
import { Avatar } from "../components/Avatar";
import { MessageComposer } from "../components/MessageComposer";

const GET_USER = graphql(`
    query getUser($user: String!) {
        user(name: $user) {
            user_id
            name
            join_date
            avatar_url
        }
    }
`);

export function UserPage() {
    ///////////////////////////////////////////////////////////////////
    // Hooks
    let { user_name } = useParams();
    const q = useQuery(GET_USER, {
        variables: { user: user_name },
    });

    ///////////////////////////////////////////////////////////////////
    // Hook edge case handling
    if (q.loading) {
        return <LoadingPage />;
    }
    if (q.error) {
        return <ErrorPage error={q.error} />;
    }

    ///////////////////////////////////////////////////////////////////
    // Render
    const user = q.data!.user!;

    return (
        <article>
            <Block>
                <Avatar user={user} />
                <br/>{user.name}
                <br/>Joined: {user.join_date.split(" ")[0]}
                <br/><Link to={"/posts?tags=user="+user.name}>Posts uploaded</Link>
                <br/><Link to={"/posts?tags=upvoted_by="+user.name}>Upvotes</Link>
                {" / "}<Link to={"/posts?tags=downvoted_by="+user.name}>Downvotes</Link>
            </Block>
            <MessageComposer to_user_id={user.user_id} />
        </article>
    );
}
