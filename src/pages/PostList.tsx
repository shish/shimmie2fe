import React from "react";
import { ThumbnailGrid } from "../components/ThumbnailGrid";
import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { nullthrows } from "../utils";
import { useSearchParams } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { LoadingPage } from "./LoadingPage";

const GET_POSTS = graphql(/* GraphQL */ `
    query getPosts($start: Int, $tags: [String!]) {
        posts(start: $start, limit: 48, tags: $tags) {
            id
            image_link
            thumb_link
            tooltip
        }
    }
`);

export function PostList() {
    let [searchParams, setSearchParams] = useSearchParams();

    const q = useQuery(GET_POSTS, {
        variables: {
            start: (parseInt(searchParams.get("page") ?? "1") - 1) * 48,
            tags: searchParams.get("tags")?.split(" ") ?? [],
        },
    });

    if (q.loading) {
        return <LoadingPage />;
    }
    if (q.error) {
        return <ErrorPage error={q.error} />;
    }

    return (
        <article>
            <ThumbnailGrid posts={nullthrows(q.data?.posts)} />
        </article>
    );
}
