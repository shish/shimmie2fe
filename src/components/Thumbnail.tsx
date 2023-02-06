import React from "react";
import * as css from './Thumbnail.module.scss';

export function Thumbnail(props) {
    return <a className={css.thumbnail} href="/post/123">thumb here ({props.post})</a>;
}