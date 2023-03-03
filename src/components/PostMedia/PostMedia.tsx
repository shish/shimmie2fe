import React, { useState } from "react";
import { graphql } from "../../gql";
import { absurl } from "../../utils";
import { PostMediaFragment } from "../../gql/graphql";

export const POST_MEDIA_FRAGMENT = graphql(/* GraphQL */ `
    fragment PostMedia on Post {
        mime
        image_link
    }
`);

enum Scale {
    NONE,
    FIT_BOTH,
    //FIT_WIDTH,
}

export function PostMedia({ post }: { post: PostMediaFragment }) {
    const [scale, setScale] = useState(Scale.FIT_BOTH);

    function updateScale() {
        if (scale === Scale.FIT_BOTH) setScale(Scale.NONE);
        //if (scale === Scale.FIT_BOTH) setScale(Scale.FIT_WIDTH);
        //if (scale === Scale.FIT_WIDTH) setScale(Scale.NONE);
        if (scale === Scale.NONE) setScale(Scale.FIT_BOTH);
    }

    let style: any = { objectFit: "contain" };
    if (scale === Scale.NONE) {
        style["width"] = "auto";
        style["maxWidth"] = "none";
        style["maxHeight"] = "none";
    }
    if (scale === Scale.FIT_BOTH) {
        style["maxWidth"] = "100%";
        style["maxHeight"] = "90vh";
    }
    //if (scale === Scale.FIT_WIDTH) {
    //    style['maxWidth'] = "100%";
    //}

    if (post.mime!.startsWith("image/")) {
        return (
            <img
                alt="main"
                src={absurl(post.image_link)}
                style={style}
                onClick={updateScale}
                className="block"
                data-cy="media"
            />
        );
    } else if (post.mime!.startsWith("video/")) {
        return (
            <video
                src={absurl(post.image_link)}
                style={{ display: "block", width: "100%" }}
                controls={true}
                className="block"
                data-cy="media"
            />
        );
    } else {
        return <div>Unknown mime type: {post.mime}</div>;
    }
}
