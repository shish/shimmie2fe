import React from "react";
import { TypedDocumentNode, useQuery } from "@apollo/client";
import { graphql, useFragment as fragCast } from "../../gql";
import { useSearchParams } from "react-router-dom";

import { Block } from "../../components/basics";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { CommentList } from "../../components/CommentList";
import { PostMedia, POST_MEDIA_FRAGMENT } from "../../components/PostMedia";
import { PostMediaFragmentFragment } from "../../gql/graphql";
import { absurl } from "../../utils";

const GET_COMMENTED_POSTS = graphql(/* GraphQL */ `
    query getCommentedPosts($start: Int, $tags: [String!]) {
        posts(start: $start, limit: 48, tags: $tags) {
            post_id
            thumb_link
            tags
            ...PostMediaFragment
            comments {
                ...CommentFragment
            }
        }
    }
`);

export function Comments() {
    const [searchParams, _setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") ?? "1");
    const q = useQuery(GET_COMMENTED_POSTS, {
        variables: {
            start: (page - 1) * 48,
            tags: [],
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
    // <PostMedia post={fragCast(POST_MEDIA_FRAGMENT, post)} />
    const tsize = "6em";
    return (
        <article>
            {posts.map(post => <>
                <h3>Post {post.post_id}: {post.tags.join(" ")}</h3>
                <img
                    style={{maxWidth: tsize, maxHeight: tsize}}
                    className="block"
                    src={absurl(post.thumb_link)}
                />
                <CommentList post_id={post.post_id} postQ={q} comments={post.comments} />
            </>)}
        </article>
    );
}
