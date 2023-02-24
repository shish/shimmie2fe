import React from "react";

// FIXME: implement bbcode
export function BBCode(props: { children: any }) {
    return <span style={{overflowWrap: "anywhere"}}>[bbcode]{props.children}[/bbcode]</span>;
}
