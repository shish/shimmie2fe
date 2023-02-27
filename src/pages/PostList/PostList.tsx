import React from "react";
import { useQuery } from "@apollo/client";
import { graphql, useFragment as fragCast } from "../../gql";
import { useSearchParams } from "react-router-dom";

import { POST_THUMBNAIL_FRAGMENT, ThumbnailGrid } from "./ThumbnailGrid";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { Block } from "../../components/basics";

const GET_POSTS = graphql(/* GraphQL */ `
    query getPosts($start: Int, $tags: [String!]) {
        posts(start: $start, limit: 48, tags: $tags) {
            ...PostThumbnail
        }
    }
`);

export function PostList() {
    ///////////////////////////////////////////////////////////////////
    // Hooks
    // eslint-disable-next-line
    const [searchParams, _setSearchParams] = useSearchParams();
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
    let post_thumbs = posts.map(p => fragCast(POST_THUMBNAIL_FRAGMENT, p));

    ///////////////////////////////////////////////////////////////////
    // Render
    return (
        <article>
            {posts.length > 0 ? (
                <ThumbnailGrid posts={post_thumbs} />
            ) : (
                <Block>
                    No posts tagged with <code>{tags.join(" ")}</code>
                </Block>
            )}
        </article>
    );
}
