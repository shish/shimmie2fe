import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { graphql, useFragment as fragCast } from "../gql";
import { useParams } from "react-router-dom";
import { CommentList } from "../components/CommentList";
import { absurl } from "../utils";
import { ErrorPage } from "./ErrorPage";
import { LoadingPage } from "./LoadingPage";
import { PostMetaData, POST_METADATA_FRAGMENT } from "../components/PostMetaData";

const GET_POST = graphql(/* GraphQL */ `
    query getPost($post_id: Int!) {
        post(post_id: $post_id) {
            post_id

            ...PostMetadataFragment

            image_link
            thumb_link

            width
            height
            mime

            comments {
                ...CommentFragment
            }
        }
    }
`);

enum Scale {
    NONE,
    FIT_BOTH,
    FIT_WIDTH,
}

export function PostView() {
    ///////////////////////////////////////////////////////////////////
    // Hooks
    let { post_id } = useParams();
    // FIXME: poll for updates?
    const q = useQuery(GET_POST, {
        variables: { post_id: parseInt(post_id!, 10) },
    });
    const [scale, setScale] = useState(Scale.FIT_BOTH);

    ///////////////////////////////////////////////////////////////////
    // Hook edge case handling
    if (q.loading) {
        return <LoadingPage />;
    }
    if (q.error) {
        return <ErrorPage error={q.error} />;
    }
    const post = q.data?.post;
    if (!post) {
        return <ErrorPage error={{message: `No post with the ID ${post_id}`}} />;
    }

    ///////////////////////////////////////////////////////////////////
    // Render
    function updateScale() {
        if (scale === Scale.FIT_BOTH) setScale(Scale.FIT_WIDTH);
        if (scale === Scale.FIT_WIDTH) setScale(Scale.NONE);
        if (scale === Scale.NONE) setScale(Scale.FIT_BOTH);
    }

    let style = { margin: "auto" };
    if (scale === Scale.FIT_BOTH) {
        style['maxWidth'] = "100%";
        style['maxHeight'] = "90vh";
    }
    if (scale === Scale.FIT_WIDTH) {
        style['maxWidth'] = "100%";
    }

    const post_metadata = fragCast(POST_METADATA_FRAGMENT, post);

    // FIXME: next / prev links
    return (
        <article>
            {post.mime!.startsWith("image/") &&
                <img
                    alt="main"
                    src={absurl(post.image_link)}
                    style={style}
                    onClick={updateScale}
                    className="block"
                />}
            {post.mime!.startsWith("video/") &&
                <video
                    src={absurl(post.image_link)}
                    style={{display: "block", width: "100%"}}
                    controls={true}
                    className="block"
                />}
            <PostMetaData postQ={q} post={post_metadata} />
            <CommentList
                postQ={q}
                post_id={post.post_id}
                comments={post.comments}
            />
        </article>
    );
}
