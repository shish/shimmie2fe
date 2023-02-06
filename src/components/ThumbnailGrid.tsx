import React from "react";
import * as css from './ThumbnailGrid.module.scss';
import { Thumbnail } from "./Thumbnail";

export function ThumbnailGrid(props) {
    return <div className={css.grid}>
        {props.posts.map(post => <Thumbnail key={props.post} post={post} />)}
    </div>;
}