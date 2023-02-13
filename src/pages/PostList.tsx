import React from "react";
import { ThumbnailGrid } from "../components/ThumbnailGrid";
import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { useSearchParams } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { LoadingPage } from "./LoadingPage";

const GET_POSTS = graphql(/* GraphQL */ `
    query getPosts($start: Int, $tags: [String!]) {
        posts(start: $start, limit: 48, tags: $tags) {
            post_id
            thumb_link
            tooltip
            width
            height
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
            <ThumbnailGrid posts={q.data!.posts} />
        </article>
    );
}
