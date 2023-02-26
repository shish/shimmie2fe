import React from "react";
import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { useFragment as fragCast } from "../gql/fragment-masking";
import { LoadingPage } from "../pages/LoadingPage/LoadingPage";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";
import { MeFragmentFragment, Permission } from "../gql/graphql";

export const ME_FRAGMENT = graphql(`
    fragment MeFragment on User {
        name
        private_message_unread_count
        avatar_url
        class {
            permissions
        }
    }
`);

export const GET_ME = graphql(`
    query getMe {
        me {
            ...MeFragment
        }
    }
`);

type UserContextType = {
    me: MeFragmentFragment;
    is_anon: boolean;
    logout: CallableFunction;
    can: CallableFunction;
};

export const UserContext = React.createContext<UserContextType>({
    me: {
        name: "Anonymous",
        private_message_unread_count: 0,
        avatar_url: null,
        class: {
            permissions: [],
        },
    },
    is_anon: true,
    logout: () => {},
    can: (action: string): boolean => {
        return false;
    },
});

export function LoginProvider(props: any) {
    const q = useQuery(GET_ME, { pollInterval: 10 * 1000 });

    if (q.loading) {
        return <LoadingPage />;
    }
    if (q.error) {
        return <ErrorPage error={q.error} />;
    }
    const me = fragCast(ME_FRAGMENT, q!.data!.me);
    const is_anon = me.name === "Anonymous";

    function logout() {
        localStorage.removeItem("session");
        q.client.resetStore();
        q.refetch();
    }

    function can(action: Permission): boolean {
        return me.class.permissions.includes(action);
    }

    return (
        <UserContext.Provider value={{ me, is_anon, logout, can }}>
            {props.children}
        </UserContext.Provider>
    );
}
