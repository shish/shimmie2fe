import React from "react";
import { Link } from "react-router-dom";
import { absurl } from "../../utils";

import css from "./ThumbnailGrid.module.scss";

function Thumbnail({ post }) {
    return (
        <Link className={css.thumbnail} to={"/post/" + post.post_id}>
            <img
                alt={post.tooltip}
                title={post.tooltip}
                src={absurl(post.thumb_link)}
                // width={post!.width}
                // height={post!.height}
            />
        </Link>
    );
}

export function ThumbnailGrid(props: { posts: Array<any> }) {
    return (
        <div className={css.masonry}>
            {props.posts.map((post) => (
                <Thumbnail key={post.post_id} post={post} />
            ))}
        </div>
    );
}
