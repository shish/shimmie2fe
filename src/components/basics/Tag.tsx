import React from "react";
import { Link } from "react-router-dom";
import { Join } from "./Join";

export function Tag(props: { tag: string; size?: number }) {
    return (
        <Link
            style={{ fontWeight: "bold", fontSize: (props.size ?? 1) + "em" }}
            to={"/posts?tags=" + props.tag}
        >
            <Join
                join={
                    <>
                        _<wbr />
                    </>
                }
            >
                {props.tag.split("_")}
            </Join>
        </Link>
    );
}
