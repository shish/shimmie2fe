import React, { useState } from "react";
import { UserName } from "../components/UserName";
import { Tag } from "../components/Tag";
import ChevronUpIcon from "../icons/chevron-up.svg";
import ChevronDownIcon from "../icons/chevron-down.svg";
import * as css from "./PostMetaData.module.scss";
import { Block } from "../components/Block";


function Voter(props) {
    const post = props.post;
    return <div className={css.voter}>
        <ChevronUpIcon />
        <span>{post.score}</span>
        <ChevronDownIcon />
    </div>;
}
export function PostMetaData(props) {
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
        <img src={post?.owner?.avatar_url} />
    </Block>
        ;
}
