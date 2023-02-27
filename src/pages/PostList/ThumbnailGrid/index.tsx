import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { graphql } from "../../../gql";
import { PostThumbnailFragment } from "../../../gql/graphql";
import { absurl } from "../../../utils";

import css from "./ThumbnailGrid.module.scss";

export const POST_THUMBNAIL_FRAGMENT = graphql(/* GraphQL */ `
    fragment PostThumbnail on Post {
        post_id
        tooltip
        thumb_link
    }
`);

function Thumbnail({ post }: { post: PostThumbnailFragment }) {
    const [searchParams] = useSearchParams();
    let link = "/post/" + post.post_id;
    if(searchParams.get("tags")) {
        link += "?tags=" + searchParams.get("tags");
    }
    return (
        <Link className={css.thumbnail} to={link}>
            <img
                alt={post.tooltip}
                title={post.tooltip}
                src={absurl(post.thumb_link)}
                // FIXME: set aspect ratio?
                // width={post!.width}
                // height={post!.height}
            />
        </Link>
    );
}

export function ThumbnailGrid(props: { posts: Array<PostThumbnailFragment> }) {
    return (
        <div className={css.masonry}>
            {props.posts.map((post) => (
                <Thumbnail key={post.post_id} post={post} />
            ))}
        </div>
    );
}
