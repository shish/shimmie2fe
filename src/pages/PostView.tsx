import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { useParams } from "react-router-dom";
import { Block } from "../components/Block";
import { CommentList } from "../components/CommentList";
import { absurl } from "../utils";
import { ErrorPage } from "./ErrorPage";
import { LoadingPage } from "./LoadingPage";
import { PostMetaData } from "../components/PostMetaData";

const GET_POST = graphql(/* GraphQL */ `
    query getPost($post_id: Int!) {
        post(id: $post_id) {
            id
            hash
            owner {
                name
                avatar_url
            }
            tags
            source
            locked
            info
            posted
            image_link
            thumb_link
            score
            comments {
                comment_id
                owner {
                    name
                    avatar_url
                }
                comment
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
    let { post_id } = useParams();
    const q = useQuery(GET_POST, {
        variables: { post_id: parseInt(post_id!, 10) },
    });
    const [scale, setScale] = useState(Scale.FIT_BOTH);

    if (q.loading) {
        return <LoadingPage />;
    }
    if (q.error) {
        return <ErrorPage error={q.error} />;
    }
    const post = q.data?.post;

    function updateScale() {
        if (scale == Scale.FIT_BOTH) setScale(Scale.FIT_WIDTH);
        if (scale == Scale.FIT_WIDTH) setScale(Scale.NONE);
        if (scale == Scale.NONE) setScale(Scale.FIT_BOTH);
    }

    let style = { display: "block", margin: "auto" };
    if (scale == Scale.FIT_BOTH) {
        style['maxWidth'] = "100%";
        style['maxHeight'] = "90vh";
    }
    if (scale == Scale.FIT_WIDTH) {
        style['maxWidth'] = "100%";
    }

    return (
        <article>
            <Block>
                <img
                    src={absurl(post!.image_link!)}
                    style={style}
                    onClick={updateScale}
                />
            </Block>
            <PostMetaData post={post} />
            <CommentList
                postQ={q}
                post_id={post!.id!}
                comments={post!.comments!}
            />
        </article>
    );
}
