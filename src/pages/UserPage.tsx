import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";
import { ErrorPage } from "./ErrorPage";
import { LoadingPage } from "./LoadingPage";
import { MessageComposer } from "../components/MessageComposer";
import { UserInfo } from "../components/UserInfo";

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
            <UserInfo user={user} />
            <MessageComposer to_user_id={user.user_id} />
        </article>
    );
}
