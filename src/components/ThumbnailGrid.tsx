import React from "react";
import * as css from "./ThumbnailGrid.module.scss";

import { Link } from "react-router-dom";
import { absurl } from "../utils";

function Thumbnail({ post }) {
    return (
        <Link className={css.thumbnail} to={"/post/" + post.id}>
            <img alt={post.tooltip} title={post.tooltip} src={absurl(post.thumb_link)} />
        </Link>
    );
}

export function ThumbnailGrid(props: { posts: Array<any> }) {
    return (
        <div className={css.masonry}>
            {props.posts.map((post) => (
                <Thumbnail key={post.id} post={post} />
            ))}
        </div>
    );
}
