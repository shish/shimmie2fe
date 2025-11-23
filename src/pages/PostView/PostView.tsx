import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";
import { CommentList } from "../../components/CommentList";
import {
    POST_MEDIA_FRAGMENT,
    PostMedia,
} from "../../components/PostMedia/PostMedia";
import { useFragment as fragCast, graphql } from "../../gql";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { POST_METADATA_FRAGMENT, PostMetaData } from "./PostMetaData";

const GET_POST = graphql(/* GraphQL */ `
    query getPost($post_id: Int!) {
        post(post_id: $post_id) {
            post_id

            ...PostMedia
            ...PostMetadata
            comments {
                ...CommentFragment
            }
        }
    }
`);

export function PostView() {
    ///////////////////////////////////////////////////////////////////
    // Hooks
    let { post_id } = useParams();
    // FIXME: poll for updates?
    const q = useQuery(GET_POST, {
        variables: { post_id: parseInt(post_id!, 10) },
    });

    ///////////////////////////////////////////////////////////////////
    // Hook edge case handling
    if (q.loading) {
        return <LoadingPage />;
    }
    if (q.error) {
        return <ErrorPage error={q.error} />;
    }
    const post = q.data?.post;
    if (!post) {
        return (
            <ErrorPage error={{ message: `No post with the ID ${post_id}` }} />
        );
    }

    ///////////////////////////////////////////////////////////////////
    // Render

    const post_media = fragCast(POST_MEDIA_FRAGMENT, post);
    const post_metadata = fragCast(POST_METADATA_FRAGMENT, post);

    // FIXME: next / prev links
    return (
        <article>
            <PostMedia post={post_media} />
            <PostMetaData postQ={q} post={post_metadata} />
            <CommentList
                postQ={q}
                post_id={post.post_id}
                comments={post.comments}
            />
        </article>
    );
}
