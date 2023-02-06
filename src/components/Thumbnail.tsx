import React from "react";
import * as css from './Thumbnail.module.scss';
import { serverInfo } from "../App";

export function Thumbnail({ post }) {
    return <a className={css.thumbnail} href={"/post/"+post.id}><img src={serverInfo.root + post.thumb_link} /></a>;
}