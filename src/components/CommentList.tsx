import React, { useState } from 'react';
import { graphql } from '../gql';
import { Link } from "react-router-dom";
import { FragmentType, useFragment } from '../gql/fragment-masking'
import { UserName } from './UserName';

export const CommentFragment = graphql(/* GraphQL */ `
  fragment CommentItem on Comment {
    comment_id
    owner { name }
    comment
  }
`)

function Comment(props: {
    comment: FragmentType<typeof CommentFragment>
  }) {
    const comment = useFragment(CommentFragment, props.comment)
    return <div><UserName user={comment.owner} />: {comment.comment}</div>;
}

export function CommentList(props: {comments: Array<any>}) {
    return (
        <div>
            {props.comments.map(c => <Comment key={c.comment_id} comment={c} />)}
        </div>
    );
}