import React from "react";
import * as css from './ThumbnailGrid.module.scss';
import { Thumbnail } from "./Thumbnail";
import type { Post } from "../gql/graphql";

export function ThumbnailGrid(props: {posts: Array<Post>}) {
    console.log(props);
    return <div className={css.grid}>
        {props.posts.map(post => <Thumbnail key={post.id} post={post} />)}
    </div>;
}