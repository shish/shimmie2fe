import React from "react";
import { Link } from "react-router-dom";

export function Tag(props: { tag: string }) {
    return (
        <Link style={{ fontWeight: "bold" }} to={"/posts?tags=" + props.tag}>
            {props.tag}
        </Link>
    );
}
