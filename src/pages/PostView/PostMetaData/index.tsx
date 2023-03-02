import React, { useContext, useState } from "react";
import { graphql, useFragment as fragCast } from "../../../gql";
import { useMutation } from "@apollo/client";
import { FormItem } from "../../../components/basics/FormItem";
import { Permission, PostMetadataFragment } from "../../../gql/graphql";

import { UserName } from "../../../components/basics/UserName";
import { Tag } from "../../../components/basics/Tag";
import { Block } from "../../../components/basics/Block";
import { Avatar } from "../../../components/basics/Avatar";

import css from "./PostMetaData.module.scss";
import { UserContext } from "../../../providers/LoginProvider";
import { MaybeError } from "../../../components/basics/MaybeError";
import { POST_SCORE_FRAGMENT, Voter } from "../Voter/Voter";

export const POST_METADATA_FRAGMENT = graphql(/* GraphQL */ `
    fragment PostMetadata on Post {
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

        ...PostScore
    }
`);

export function PostMetaData({
    post,
    postQ,
}: {
    post: PostMetadataFragment;
    postQ: any;
}) {
    const { can } = useContext(UserContext);
    const [editing, setEditing] = useState<boolean>(false);
    const [tags, setTags] = useState(post.tags.join(" "));
    const [source, setSource] = useState(post.source || "");

    function save() {
        // FIXME: implement metadata setting
        setEditing(false);
        if (postQ) postQ.refetch();
    }

    return (
        <Block className={css.metadata}>
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
                                {editing ? (
                                    <input
                                        type="text"
                                        name="tags"
                                        value={tags}
                                        onChange={(e) =>
                                            setTags(e.target.value)
                                        }
                                    />
                                ) : (
                                    tags.split(" ").map((t) => (
                                        <span key={t}>
                                            <Tag tag={t} />{" "}
                                        </span>
                                    ))
                                )}
                            </FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormItem label="Source">
                                {editing ? (
                                    <input
                                        type="text"
                                        name="source"
                                        value={source}
                                        onChange={(e) =>
                                            setSource(e.target.value)
                                        }
                                    />
                                ) : source ? (
                                    <a href={source}>{source}</a>
                                ) : (
                                    "(Unknown)"
                                )}
                            </FormItem>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormItem label="Info">{post?.info}</FormItem>
                        </td>
                        <td>
                            <FormItem label="Score">
                                <Voter
                                    post={fragCast(POST_SCORE_FRAGMENT, post)}
                                    postQ={postQ}
                                />
                            </FormItem>
                        </td>
                    </tr>
                    {can(Permission.EditImageTag) && (
                        <tr>
                            <td colSpan={2}>
                                {post?.locked ? (
                                    <button disabled={true}>Locked</button>
                                ) : editing ? (
                                    <button onClick={() => save()}>Save</button>
                                ) : (
                                    <button onClick={() => setEditing(true)}>
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Block>
    );
}
