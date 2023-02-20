import React, { useContext, useState } from "react";
import { graphql, useFragment as fragCast } from "../../gql";
import { useMutation } from "@apollo/client";
import { FormItem } from "../FormItem";
import { Permission, PostMetadataFragmentFragment, PostScoreFragmentFragment } from "../../gql/graphql";

import { UserName } from "../basics/UserName";
import { Tag } from "../basics/Tag";
import { Block } from "../basics/Block";
import { Avatar } from "../basics/Avatar";

import { ReactComponent as ChevronUpIcon } from "../../icons/chevron-up.svg";
import { ReactComponent as ChevronDownIcon } from "../../icons/chevron-down.svg";
import css from "./PostMetaData.module.scss";
import { UserContext } from "../../LoginProvider";

export const POST_METADATA_FRAGMENT = graphql(/* GraphQL */ `
    fragment PostMetadataFragment on Post {
        post_id

        owner {
            name
            avatar_url
        }

        tags
        source
        locked
        info
        posted

        ...PostScoreFragment
    }
`);

// eslint-disable-next-line
const POST_SCORE_FRAGMENT = graphql(/* GraphQL */ `
    fragment PostScoreFragment on Post {
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

function Voter({ post, postQ }: { post: PostScoreFragmentFragment, postQ: any}) {
    const [voted, setVoted] = useState(post.my_vote);
    const [createVote] = useMutation(CREATE_VOTE);

    function vote(score: number) {
        setVoted(score);
        createVote({
            variables: { post_id: post.post_id, score: score },
        });
        postQ.refetch();
    }

    // FIXME: don't show up / down if user has no vote permissions
    return <div className={css.voter}>
        <ChevronUpIcon
            className={voted === 1 ? css.voted : null}
            onClick={() => vote(1)}
        />
        <span
            className={voted === 0 ? css.voted : null}
            onClick={() => vote(0)}
        >{post.score}</span>
        <ChevronDownIcon
            className={voted === -1 ? css.voted : null}
            onClick={() => vote(-1)}
        />
    </div>;
}

export function PostMetaData({ post, postQ }: { post: PostMetadataFragmentFragment, postQ: any}) {
    const { can } = useContext(UserContext);
    const [editing, setEditing] = useState<boolean>(false);
    const [tags, setTags] = useState(post.tags.join(" "));
    const [source, setSource] = useState(post.source || "");

    function save() {
        // FIXME: implement metadata setting
        setEditing(false);
        if(postQ) postQ.refetch();
    }

    // FIXME: don't show edit button if user has no edit permissions
    return <Block className={css.metadata}>
        <table className="form">
            <tbody>
                <tr>
                    <td width="99%">
                        <FormItem label="Uploader">
                            <UserName user={post.owner} />, {post.posted}
                        </FormItem>
                    </td>
                    <td rowSpan={3}>
                        <Avatar user={post.owner} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <FormItem label="Tags">
                            {editing ?
                                <input type="text" name="tags" value={tags} onChange={(e) => setTags(e.target.value)} /> :
                                tags.split(" ").map((t) => (
                                    <span key={t}>
                                        <Tag tag={t} />{" "}
                                    </span>
                                ))
                            }
                        </FormItem>
                    </td>
                </tr>
                <tr>
                    <td>
                        <FormItem label="Source">
                            {editing ?
                                <input type="text" name="source" value={source} onChange={(e) => setSource(e.target.value)} /> :
                                source ?
                                    <a href={source}>{source}</a> :
                                    "(Unknown)"
                            }
                        </FormItem>
                    </td>
                </tr>
                <tr>
                    <td>
                        <FormItem label="Info">{post?.info}</FormItem>
                    </td>
                    <td>
                        <FormItem label="Score"><Voter post={fragCast(POST_SCORE_FRAGMENT, post)} postQ={postQ} /></FormItem>
                    </td>
                </tr>
                {can(Permission.EditImageTag) &&
                <tr>
                    <td colSpan={2}>
                        {
                            post?.locked ?
                                <button disabled={true}>Locked</button> :
                                editing ?
                                    <button onClick={() => save()}>Save</button> :
                                    <button onClick={() => setEditing(true)}>Edit</button>
                        }
                    </td>
                </tr>
                }
            </tbody>
        </table>
    </Block>;
}
