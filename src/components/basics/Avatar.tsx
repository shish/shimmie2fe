export function Avatar(props: { user: any }) {
    return (
        props.user.avatar_url && (
            <img
                alt={props.user.name + "'s avatar"}
                className="avatar"
                src={props.user.avatar_url}
            />
        )
    );
}
