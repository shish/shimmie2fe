import { useQuery } from "@apollo/client/react";
import { useSearchParams } from "react-router-dom";
import { useFragment as fragCast, graphql } from "../../gql";

import { Block } from "../../components/basics";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { POST_THUMBNAIL_FRAGMENT, ThumbnailGrid } from "./ThumbnailGrid";

const GET_POSTS = graphql(/* GraphQL */ `
    query getPosts($offset: Int!, $limit: Int, $tags: [String!]) {
        posts(offset: $offset, limit: $limit, tags: $tags) {
            ...PostThumbnail
        }
    }
`);

export function PostList() {
    ///////////////////////////////////////////////////////////////////
    // Hooks
    // eslint-disable-next-line
    const [searchParams, _setSearchParams] = useSearchParams();
    const tags = searchParams.get("tags")?.split(" ") ?? [];

    const q = useQuery(GET_POSTS, {
        variables: {
            offset: 0,
            limit: 12,
            tags: tags,
        },
        /*
        onCompleted: (data) => {
            // Keep loading more until we have enough thumbnails
            // to fill up a screen. Note that this is counted
            // _before_ rendering - so when we have enough thumbs
            // to fill up a screen, we will first fetch more, then
            // render this set of thumbs, then stop.
            // TODO: circuit breaker to stop infinite loop?
            if (inView) {
                console.log(
                    "Window not full, fetching more",
                    data.posts.length,
                );
                q.fetchMore({
                    variables: {
                        offset: data.posts.length,
                    },
                });
            }
        },
        */
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
    let post_thumbs = posts.map((p) => fragCast(POST_THUMBNAIL_FRAGMENT, p));

    ///////////////////////////////////////////////////////////////////
    // Render

    return (
        <article>
            {posts.length > 0 ? (
                <ThumbnailGrid
                    posts={post_thumbs}
                    onLoadMore={() =>
                        q.fetchMore({
                            variables: {
                                offset: posts.length,
                            },
                        })
                    }
                />
            ) : (
                <Block>
                    No posts tagged with <code>{tags.join(" ")}</code>
                </Block>
            )}
        </article>
    );
}
