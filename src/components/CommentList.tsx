import React from "react";
import { graphql } from "../gql";
import { FragmentType, useFragment } from "../gql/fragment-masking";
import { UserName } from "./UserName";
import { Block } from "./Block";
import * as css from "./CommentList.module.scss";

export const CommentFragment = graphql(/* GraphQL */ `
    fragment CommentItem on Comment {
        comment_id
        owner {
            name
        }
        comment
    }
`);

function Comment(props: { comment: FragmentType<typeof CommentFragment> }) {
    const comment = useFragment(CommentFragment, props.comment);
    return (
        <Block left>
            <UserName user={comment.owner} />: {comment.comment}
        </Block>
    );
}

export function CommentList(props: { comments: Array<any> }) {
    return (
        <div className={css.commentList}>
            {props.comments.map((c) => (
                <Comment key={c.comment_id} comment={c} />
            ))}
            <Block>
                <textarea></textarea>
                <input type="submit" value="Post Comment" />
            </Block>
        </div>
    );
}
