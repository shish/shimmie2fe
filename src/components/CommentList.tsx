import React, { useState, useContext } from "react";
import { graphql } from "../gql";
import { useMutation } from "@apollo/client";
import { FragmentType, useFragment } from "../gql/fragment-masking";
import { UserContext } from "../providers/LoginProvider";
import { Permission } from "../gql/graphql";
import { BBCode, Block, Submit, UserName } from "./basics";
import { MaybeError } from "./basics/MaybeError";

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
            <UserName user={comment.owner} />:{" "}
            <BBCode>{comment.comment}</BBCode>
        </Block>
    );
}

function CommentComposer({ post_id, postQ }: { post_id: number; postQ: any }) {
    const { can } = useContext(UserContext);
    const [comment, setComment] = useState("");
    const [createComment, q] = useMutation(CREATE_COMMENT, {
        update: (cache, { data }) => {
            // FIXME: append to local comment list
            postQ.refetch();
        },
    });

    return (
        can(Permission.CreateComment) && (
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
                <MaybeError query={q} />
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Submit
                    passive={"Post Comment"}
                    active={"Posting Comment"}
                    query={q}
                    condition={comment !== ""}
                />
            </form>
        )
    );
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
