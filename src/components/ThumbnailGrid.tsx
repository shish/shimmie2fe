import React from "react";
import * as css from './ThumbnailGrid.module.scss';
import type { Post } from "../gql/graphql";

import { serverInfo } from "../App";
import { Link } from "react-router-dom";

function Thumbnail({ post }) {
    return <Link className={css.thumbnail} to={"/post/"+post.id}><img src={serverInfo.root + post.thumb_link} /></Link>;
}

export function ThumbnailGrid(props: {posts: Array<any>}) {
    return <div className={css.grid}>
        {props.posts.map(post => <Thumbnail key={post.id} post={post} />)}
    </div>;
}