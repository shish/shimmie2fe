import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { graphql } from "./gql";
import { useMutation } from "@apollo/client";
import { FragmentType, useFragment } from "./gql/fragment-masking";
import { LoadingPage } from "./pages/LoadingPage";
import { ErrorPage } from "./pages/ErrorPage";

type UserContext = {
    me: {
        name: string,
        private_message_unread_count: number | null,
        avatar_url: string | null,    
    },
    is_anon: boolean,
    login: CallableFunction,
    logout: CallableFunction,
};

export const UserContext = React.createContext<UserContext>({
    me: {
        name: "Anonymous",
        private_message_unread_count: 0,
        avatar_url: null,
    },
    is_anon: true,
    login: (props) => { },
    logout: () => { },
});

const ME_FRAGMENT = graphql(`
    fragment MeFragment on User {
        name
        private_message_unread_count
        avatar_url
    }
`);

const GET_ME = graphql(`
    query getMe {
        me {
            ...MeFragment
        }
    }
`);

const LOGIN = graphql(`
    mutation login($name: String!, $pass: String!) {
        login(name: $name, pass: $pass) {
            user {
                ...MeFragment
            }
            session
            error
        }
    }
`);

export function LoginProvider(props) {
    const q = useQuery(GET_ME, { pollInterval: 10 * 1000 });
    const [login] = useMutation(LOGIN, {
        update: (cache, { data }) => {
            if (!data) { console.log("Login returned no data"); return; }
            const user = useFragment(ME_FRAGMENT, data.login.user);

            if (user.name && data.login.session) {
                localStorage.setItem(
                    "session",
                    user.name + ":" + data.login.session,
                );
            }
            cache.writeQuery({
                query: GET_ME,
                data: { me: data.login.user },
            });
        }
    });

    if (q.loading) {
        return <LoadingPage />;
    }
    if (q.error) {
        return <ErrorPage error={q.error} />;
    }
    const me = useFragment(ME_FRAGMENT, q!.data!.me);
    const is_anon = me.name == "Anonymous";

    function logout() {
        localStorage.removeItem("session");
        q.client.clearStore();
        q.refetch();
    }

    return <UserContext.Provider value={{ me, is_anon, login, logout }}>
        {props.children}
    </UserContext.Provider>

}