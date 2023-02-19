import React, { useState, useContext } from "react";
import { graphql } from "../gql";
import { useMutation } from "@apollo/client";
import { FragmentType, useFragment } from "../gql/fragment-masking";
import { UserName } from "./basics/UserName";
import { Block } from "./basics/Block";
import { UserContext } from '../LoginProvider';
import { Permission } from "../gql/graphql";
import { BBCode } from "./basics/BBCode";

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
        <Block>
            <UserName user={comment.owner} />: <BBCode>{comment.comment}</BBCode>
        </Block>
    );
}

function CommentComposer({post_id, postQ}: {post_id: number, postQ: any}) {
    const { can } = useContext(UserContext);
    const [comment, setComment] = useState("");
    const [createComment] = useMutation(CREATE_COMMENT, {
        update: (cache, { data }) => {
            postQ.refetch();
        },
    });

    return can(Permission.CreateComment) &&
        <form
            className="block"
            onSubmit={(e) => {
                e.preventDefault();
                createComment({
                    variables: { post_id: post_id, comment },
                });
                setComment("");
            }}
        >
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <input type="submit" value="Post Comment" />
        </form>;
}

export function CommentList(props: {
    postQ: any;
    post_id: number;
    comments: Array<any>;
}) {
    return (
        <>
            {props.comments.map((c) => (
                <Comment key={c.comment_id} comment={c} />
            ))}
            <CommentComposer post_id={props.post_id} postQ={props.postQ} />
        </>
    );
}
