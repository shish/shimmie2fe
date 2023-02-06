import React, { useState } from "react";
import { NavBar } from "./components/NavBar";
import { ThumbnailGrid } from "./components/ThumbnailGrid";
import { useQuery } from '@apollo/client'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { graphql } from './gql';

export const serverInfo = {
    root: 'http://127.0.0.1:8000'
};

const createApolloClient = (authToken) => {
    return new ApolloClient({
        link: new HttpLink({
            uri: serverInfo.root + "/graphql",
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }),
        cache: new InMemoryCache(),
    });
};

function Body(props) {
    return <section>
        {props.children}
    </section>;
}

const getMeRequest = graphql(/* GraphQL */ `
  query getMe {
    me {
        name
    }
  }
`)
const getPostsRequest = graphql(/* GraphQL */ `
  query getPosts {
    posts(limit: 12) {
        id
        hash
        image_link
        thumb_link
    }
  }
`)

function UserInfo(props) {
    return <div>{props.user ? props.user.name : "Anonymous"}</div>
}

function Main() {
    // const { data } = useQuery(getMeRequest, { variables: { first: 10 } })
    const me = useQuery(getMeRequest, {});
    const posts = useQuery(getPostsRequest, {});

    if(me.loading) {return <b>Loading...</b>;}
    if(me.error) {return <b>Error: {me.error.message}</b>;}

    if(posts.loading) {return <b>Loading...</b>;}
    if(posts.error) {return <b>Error: {posts.error.message}</b>;}

    return (
        <article>
            <NavBar />
            <Body>
                <ThumbnailGrid posts={posts.data?.posts} />
            </Body>
            <UserInfo user={me.data?.me} />
        </article>
    );
}
export function App() {
    let idToken = "test";
    const [client] = useState(createApolloClient(idToken));

    return <ApolloProvider client={client}><Main /></ApolloProvider>;
}