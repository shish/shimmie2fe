import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";
import { MessageComposer } from "../../components/MessageComposer";
import { graphql } from "../../gql";
import { useFragment as fragCast } from "../../gql/fragment-masking";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { UserInfo, USER_INFO_FRAGMENT } from "./UserInfo";

const GET_USER = graphql(`
    query getUser($user: String!) {
        user(name: $user) {
            user_id
            ...UserInfo
        }
    }
`);

export function UserPage() {
    ///////////////////////////////////////////////////////////////////
    // Hooks
    let { user_name } = useParams();
    const q = useQuery(GET_USER, {
        variables: { user: user_name! },
    });

    ///////////////////////////////////////////////////////////////////
    // Hook edge case handling
    if (q.loading) {
        return <LoadingPage />;
    }
    if (q.error) {
        return <ErrorPage error={q.error} />;
    }

    ///////////////////////////////////////////////////////////////////
    // Render
    const user = q.data!.user!;

    return (
        <article>
            <UserInfo user={fragCast(USER_INFO_FRAGMENT, user)} />
            <MessageComposer to_user_id={user.user_id} />
        </article>
    );
}
