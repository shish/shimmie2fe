import React, { useState } from "react";
import { UserName } from "./basics/UserName";
import { Tag } from "./basics/Tag";
import ChevronUpIcon from "../icons/chevron-up.svg";
import ChevronDownIcon from "../icons/chevron-down.svg";
import * as css from "./PostMetaData.module.scss";
import { Block } from "./basics/Block";
import { graphql } from "../gql";
import { useMutation } from "@apollo/client";
import { Avatar } from "./basics/Avatar";
import { FormItem } from "./FormItem";


const POST_METADATA_FRAGMENT = graphql(/* GraphQL */ `
    fragment PostMetadataFragment on Post {
        owner {
            name
            avatar_url
        }
        tags
        source
        locked
        info
        posted
    }
`);

const POST_SCORE_FRAGMENT = graphql(/* GraphQL */ `
    fragment PostScoreFragment on Post {
        score
        my_vote
    }
`);

const CREATE_VOTE = graphql(`
    mutation createVote($post_id: Int!, $score: Int!) {
        create_vote(post_id: $post_id, score: $score)
    }
`);

function Voter({ post, postQ }) {
    const [voted, setVoted] = useState(post.my_vote);
    const [createVote] = useMutation(CREATE_VOTE);

    function vote(score) {
        setVoted(score);
        createVote({
            variables: { post_id: post.post_id, score: score },
        });
        postQ.refetch();
    }

    // FIXME: don't show up / down if user has no vote permissions
    return <div className={css.voter}>
        <ChevronUpIcon
            className={voted == 1 ? css.voted : null}
            onClick={() => vote(1)}
        />
        <span
            className={voted == 0 ? css.voted : null}
            onClick={() => vote(0)}
        >{post.score}</span>
        <ChevronDownIcon
            className={voted == -1 ? css.voted : null}
            onClick={() => vote(-1)}
        />
    </div>;
}

export function PostMetaData({ post, postQ }) {
    const [editing, setEditing] = useState<boolean>(false);
    const [tags, setTags] = useState(post.tags.join(" "));
    const [source, setSource] = useState(post.source || "");

    function save() {
        // FIXME: implement metadata setting
        setEditing(false);
        postQ.refetch();
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
                        <FormItem label="Score"><Voter post={post} postQ={postQ} /></FormItem>
                    </td>
                </tr>
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
            </tbody>
        </table>
    </Block>;
}
