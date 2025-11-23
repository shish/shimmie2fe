import { useMutation } from "@apollo/client/react";
import { useContext, useState } from "react";
import { FormItem } from "../../../components/basics/FormItem";
import { useFragment as fragCast, graphql } from "../../../gql";
import { Permission, PostMetadataFragment } from "../../../gql/graphql";

import { Avatar, Block, MaybeError, Tag } from "../../../components/basics";
import { UserName } from "../../../components/basics/UserName";

import { Autocomplete } from "../../../components/Autocomplete/Autocomplete";
import { UserContext } from "../../../providers/LoginProvider";
import { POST_SCORE_FRAGMENT, Voter } from "../Voter/Voter";
import css from "./PostMetaData.module.scss";

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

const UPDATE_POST_METADATA = graphql(`
    mutation updatePostMetadata($post_id: Int!, $metadata: MetadataInput!) {
        update_post_metadata(post_id: $post_id, metadata: $metadata) {
            id
            post_id
            tags
            source
        }
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
    const [updatePostMetadata, q] = useMutation(UPDATE_POST_METADATA, {
        update: (cache, { data }) => {
            postQ.refetch();
        },
    });

    function save() {
        setEditing(false);
        updatePostMetadata({
            variables: { post_id: post.post_id, metadata: { tags, source } },
        });
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
                                    <Autocomplete
                                        name="tags"
                                        value={tags}
                                        onValue={(v) => setTags(v)}
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
                                <MaybeError query={q} />
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
