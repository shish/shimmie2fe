import { Link } from "react-router-dom";

export function UserName(props: { user: any }) {
    return (
        <Link style={{ fontWeight: "bold" }} to={"/user/" + props.user.name}>
            {props.user.name}
        </Link>
    );
}
