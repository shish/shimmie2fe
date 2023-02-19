import React from "react";

export function BBCode(props: { children: any }) {
    return <span>[bbcode]{props.children}[/bbcode]</span>;
}
