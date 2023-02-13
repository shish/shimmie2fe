import React, { useState } from "react";
import { Block } from "../components/Block";
import { useParams } from "react-router-dom";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";
import { ErrorPage } from "./ErrorPage";
import { LoadingPage } from "./LoadingPage";

const GET_USER = graphql(`
    query getUser($user: String!) {
        user(name: $user) {
            name
        }
    }
`);

export function UserPage() {
    let { user_name } = useParams();
    const q = useQuery(GET_USER, {
        variables: { user: user_name },
    });

    if (q.loading) {
        return <LoadingPage />;
    }
    if (q.error) {
        return <ErrorPage error={q.error} />;
    }

    const user = q.data!.user;

    return (
        <article>
            <Block>TODO: Show {user}</Block>
        </article>
    );
}
