import React, { useState } from "react";
import { graphql } from "../gql";
import { useMutation } from "@apollo/client";
import { FragmentType, useFragment } from "../gql/fragment-masking";
import { UserName } from "./UserName";
import { Block } from "./Block";
import * as css from "./CommentList.module.scss";
import { bbcode } from "../utils";

export const COMMENT_FRAGMENT = graphql(/* GraphQL */ `
    fragment CommentFragment on Comment {
        comment_id
        owner {
            name
            avatar_url
        }
        comment
    }
`);

const CREATE_COMMENT = graphql(/* GraphQL */ `
    mutation createComment($post_id: Int!, $comment: String!) {
        create_comment(post_id: $post_id, comment: $comment)
    }
`);

function Comment(props: { comment: FragmentType<typeof COMMENT_FRAGMENT> }) {
    const comment = useFragment(COMMENT_FRAGMENT, props.comment);
    return (
        <Block align="left">
            <UserName user={comment.owner} />: {bbcode(comment.comment)}
        </Block>
    );
}

export function CommentList(props: {
    postQ: any;
    post_id: number;
    comments: Array<any>;
}) {
    const [comment, setComment] = useState("");
    const [createComment] = useMutation(CREATE_COMMENT, {
        update: (cache, { data }) => {
            /*
            cache.writeQuery({
                query: getMeRequest,
                data: { me: data.login.user },
            });
            */
            props.postQ.refetch();
        },
    });

    return (
        <>
            {props.comments.map((c) => (
                <Comment key={c.comment_id} comment={c} />
            ))}
            <Block className={css.addComment}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        createComment({
                            variables: { post_id: props.post_id, comment },
                        });
                        setComment("");
                    }}
                >
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <input type="submit" value="Post Comment" />
                </form>
            </Block>
        </>
    );
}
