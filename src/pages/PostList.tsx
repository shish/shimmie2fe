import React from "react";
import { ThumbnailGrid } from "../components/ThumbnailGrid";
import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import { nullthrows } from "../utils";


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

export function PostList() {
    // const { data } = useQuery(getMeRequest, { variables: { first: 10 } })
    const posts = useQuery(getPostsRequest, {});

    if (posts.loading) { return <b>Loading...</b>; }
    if (posts.error) { return <b>Error: {posts.error.message}</b>; }

    return <ThumbnailGrid posts={nullthrows(posts.data?.posts)} />;
}
