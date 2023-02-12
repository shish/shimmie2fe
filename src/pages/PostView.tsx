import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { useParams } from "react-router-dom";
import { Block } from "../components/Block";
import { CommentList } from "../components/CommentList";
import { absurl, nullthrows } from "../utils";
import { UserName } from "../components/UserName";
import { Tag } from "../components/Tag";
import { ErrorPage } from "./ErrorPage";
import { LoadingPage } from "./LoadingPage";
import ChevronUpIcon from "../icons/chevron-up.svg";
import ChevronDownIcon from "../icons/chevron-down.svg";
import * as css from "./PostView.module.scss";

const GET_POST = graphql(/* GraphQL */ `
    query getPost($post_id: Int!) {
        post(id: $post_id) {
            id
            hash
            owner {
                name
                avatar_url
            }
            tags
            source
            locked
            info
            posted
            image_link
            thumb_link
            score
            comments {
                comment_id
                owner {
                    name
                    avatar_url
                }
                comment
            }
        }
    }
`);

enum Scale {
    NONE,
    FIT_BOTH,
    FIT_WIDTH,
}

function Voter(props) {
    const post = props.post;
    return <div className={css.voter}>
        <ChevronUpIcon />
        <span>{post.score}</span>
        <ChevronDownIcon />
    </div>;
}
function PostData(props) {
    const post = props.post;
    const [editing, setEditing] = useState<boolean>(false);
    const [tags, setTags] = useState(post.tags.join(" "));
    const [source, setSource] = useState(post.source || "");

    function save() {
        // FIXME
        setEditing(false);
    }

    return <Block className={css.metadata}>
        <Voter post={post} />
        <table className="form">
            <tbody>
                <tr>
                    <th>Uploader</th>
                    <td>
                        <UserName user={post?.owner} />, {post?.posted}
                    </td>
                </tr>
                <tr>
                    <th>Tags</th>
                    <td>
                        {editing ?
                            <input type="text" name="tags" value={tags} onChange={(e) => setTags(e.target.value)} /> :
                            tags.split(" ").map((t) => (
                                <span key={t}>
                                    <Tag tag={t} />{" "}
                                </span>
                            ))
                        }
                    </td>
                </tr>
                <tr>
                    <th>Source</th>
                    <td>
                        {editing ?
                            <input type="text" name="source" value={source} onChange={(e) => setSource(e.target.value)} /> :
                            <a href={source}>{source}</a>
                        }
                    </td>
                </tr>
                <tr>
                    <th>Info</th>
                    <td>{post?.info}</td>
                </tr>
                <tr>
                    <th></th>
                    <td>
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
        <div><img src={post?.owner?.avatar_url} /></div>
    </Block>
        ;
}

export function PostView() {
    let { post_id } = useParams();
    const q = useQuery(GET_POST, {
        variables: { post_id: parseInt(nullthrows(post_id), 10) },
    });
    const [scale, setScale] = useState(Scale.FIT_BOTH);

    if (q.loading) {
        return <LoadingPage />;
    }
    if (q.error) {
        return <ErrorPage error={q.error} />;
    }
    const post = q.data?.post;

    function updateScale() {
        if (scale == Scale.FIT_BOTH) setScale(Scale.FIT_WIDTH);
        if (scale == Scale.FIT_WIDTH) setScale(Scale.NONE);
        if (scale == Scale.NONE) setScale(Scale.FIT_BOTH);
    }

    let style = { display: "block" };
    if (scale == Scale.FIT_BOTH) {
        style['maxWidth'] = "100%";
        style['maxHeight'] = "90vh";
    }
    if (scale == Scale.FIT_WIDTH) {
        style['maxWidth'] = "100%";
    }

    return (
        <article>
            <Block>
                <img
                    src={absurl(nullthrows(post?.image_link))}
                    style={style}
                    onClick={updateScale}
                />
            </Block>
            <PostData post={post} />
            <CommentList
                postQ={q}
                post_id={nullthrows(post?.id)}
                comments={nullthrows(post?.comments)}
            />
        </article>
    );
}
