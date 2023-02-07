import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { serverInfo } from "../App";
import { useLoaderData } from "react-router-dom";
import * as css from "./PostView.module.scss";
import { Block } from "../components/Block";
import { CommentList } from "../components/CommentList";
import { nullthrows } from "../utils";
import { UserName } from "../components/UserName";

const getPostRequest = graphql(/* GraphQL */ `
    query getPost($post_id: Int!) {
        post(id: $post_id) {
            id
            hash
            owner {
                name
            }
            tags
            source
            locked
            info
            posted
            image_link
            thumb_link
            comments {
                comment_id
                owner {
                    name
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
    const path: any = useLoaderData();
    const postQ = useQuery(getPostRequest, {
        variables: { post_id: parseInt(path.post_id, 10) },
    });
    const [scale, setScale] = useState(Scale.FIT_BOTH);

    if (postQ.loading) {
        return <b>Loading...</b>;
    }
    if (postQ.error) {
        return <b>Error: {postQ.error.message}</b>;
    }
    const post = postQ.data?.post;

    function updateScale() {
        if (scale == Scale.FIT_BOTH) setScale(Scale.FIT_WIDTH);
        if (scale == Scale.FIT_WIDTH) setScale(Scale.NONE);
        if (scale == Scale.NONE) setScale(Scale.FIT_BOTH);
    }

    let style = {};
    if (scale == Scale.FIT_BOTH)
        style = { maxWidth: "90vw", maxHeight: "90vh" };
    if (scale == Scale.FIT_WIDTH) style = { maxWidth: "90vw" };

    return (
        <div>
            <Block>
                <img
                    src={serverInfo.root + post?.image_link}
                    style={style}
                    onClick={updateScale}
                />
            </Block>
            <Block>
                <table className={css.metadata}>
                    <tr>
                        <th>Uploader</th>
                        <td>
                            <UserName user={post?.owner} />, {post?.posted}
                        </td>
                    </tr>
                    <tr>
                        <th>Tags</th>
                        <td>{post?.tags?.join(" ")}</td>
                    </tr>
                    <tr>
                        <th>Source</th>
                        <td>{post?.source}</td>
                    </tr>
                    <tr>
                        <th>Locked</th>
                        <td>{post?.locked ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <th>Info</th>
                        <td>{post?.info}</td>
                    </tr>
                </table>
            </Block>
            <CommentList comments={nullthrows(post?.comments)} />
        </div>
    );
}
