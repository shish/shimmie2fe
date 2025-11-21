import { useQuery } from "@apollo/client";
import React from "react";
import { graphql } from "../gql";
import { useFragment as fragCast } from "../gql/fragment-masking";
import { Permission, UserLoginFragment } from "../gql/graphql";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";

export const ME_FRAGMENT = graphql(`
    fragment UserLogin on User {
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
            ...UserLogin
        }
    }
`);

type UserContextType = {
    me: UserLoginFragment;
    is_anon: boolean;
    logout: CallableFunction;
    can: CallableFunction;
};

const defaultUser: UserLoginFragment = {
    name: "Anonymous",
    private_message_unread_count: null,
    avatar_url: null,
    class: {
        permissions: [],
    },
};

export const UserContext = React.createContext<UserContextType>({
    me: defaultUser,
    is_anon: true,
    logout: () => {},
    can: (action: string): boolean => {
        return false;
    },
});

export function LoginProvider(props: any) {
    const q = useQuery(GET_ME, { pollInterval: 10 * 1000 });

    if (q.error) {
        return <ErrorPage error={q.error} />;
    }
    const me = q.loading ? defaultUser : fragCast(ME_FRAGMENT, q.data!.me!);
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
