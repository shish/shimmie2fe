import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { graphql } from "../../../gql";
import { Permission, PostScoreFragment } from "../../../gql/graphql";

import { MaybeError } from "../../../components/basics";
import { UserContext } from "../../../providers/LoginProvider";
import { ReactComponent as ChevronDownIcon } from "./chevron-down.svg";
import { ReactComponent as ChevronUpIcon } from "./chevron-up.svg";
import css from "./Voter.module.scss";

export const POST_SCORE_FRAGMENT = graphql(/* GraphQL */ `
    fragment PostScore on Post {
        post_id

        score
        my_vote
    }
`);

const CREATE_VOTE = graphql(`
    mutation createVote($post_id: Int!, $score: Int!) {
        create_vote(post_id: $post_id, score: $score)
    }
`);

export function Voter({
    post,
    postQ,
}: {
    post: PostScoreFragment;
    postQ: any;
}) {
    const { can } = useContext(UserContext);
    const [voted, setVoted] = useState(post.my_vote);
    const [createVote, q] = useMutation(CREATE_VOTE);

    function vote(score: number) {
        setVoted(score);
        createVote({
            variables: { post_id: post.post_id, score: score },
        });
        postQ.refetch();
    }

    return can(Permission.CreateVote) ? (
        <div className={css.voter}>
            <MaybeError query={q} />
            <ChevronUpIcon
                className={voted === 1 ? css.voted : null}
                onClick={() => vote(1)}
            />
            <span
                className={voted === 0 ? css.voted : null}
                onClick={() => vote(0)}
            >
                {post.score}
            </span>
            <ChevronDownIcon
                className={voted === -1 ? css.voted : null}
                onClick={() => vote(-1)}
            />
        </div>
    ) : (
        <span>{post.score}</span>
    );
}
