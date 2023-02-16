import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { useParams } from "react-router-dom";
import { Block } from "../components/Block";
import { UserName } from "../components/UserName";
import { bbcode } from "../utils";
import { ErrorPage } from "./ErrorPage";
import { LoadingPage } from "./LoadingPage";

const GET_WIKI = graphql(`
    query getWiki($title: String!) {
        wiki(title: $title) {
            title
            body
            revision
            date
            owner {
                name
            }
        }
    }
`);

export function WikiPage() {
    ///////////////////////////////////////////////////////////////////
    // Hooks
    let { page_title } = useParams();
    const q = useQuery(GET_WIKI, {
        variables: { title: page_title },
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
    const page = q.data!.wiki;
    
    return (
        <article>
            <Block>
                {bbcode(page.body)}
            </Block>
            <Block>
                v{page.revision}, last edited by <UserName user={page.owner} /> on {page.date}
            </Block>
        </article>
    );
}
