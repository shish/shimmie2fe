import React from "react";
import { ThumbnailGrid } from "../components/ThumbnailGrid";
import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { useSearchParams } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { LoadingPage } from "./LoadingPage";
import { Block } from "../components/Block";

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
    ///////////////////////////////////////////////////////////////////
    // Hooks
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") ?? "1");
    const tags = searchParams.get("tags")?.split(" ") ?? [];

    const q = useQuery(GET_POSTS, {
        variables: {
            start: (page - 1) * 48,
            tags: tags,
        },
    });

    ///////////////////////////////////////////////////////////////////
    // Hook edge case handling
    if (q.loading) {
        return <LoadingPage />;
    }
    if (q.error) {
        return <ErrorPage error={q.error} />;
    }
    let posts = q.data!.posts;

    ///////////////////////////////////////////////////////////////////
    // Render
    return (
        <article>
            {posts.length > 0 ?
                <ThumbnailGrid posts={posts} /> :
                <Block>No posts tagged with <code>{tags.join(" ")}</code></Block>
            }
        </article>
    );
}
