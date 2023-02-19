import React from "react";

export function Avatar(props: { user: any }) {
    return props.user.avatar_url && <img className="avatar" src={props.user.avatar_url} />
}
