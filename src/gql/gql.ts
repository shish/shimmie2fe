/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n    query getTags($start: String!) {\n        tags(search: $start, limit: 10) {\n            tag\n            uses\n        }\n    }\n": types.GetTagsDocument,
    "\n    fragment CommentFragment on Comment {\n        comment_id\n        owner {\n            name\n            avatar_url\n        }\n        comment\n    }\n": types.CommentFragmentFragmentDoc,
    "\n    mutation createComment($post_id: Int!, $comment: String!) {\n        create_comment(post_id: $post_id, comment: $comment)\n    }\n": types.CreateCommentDocument,
    "\n    mutation createPrivateMessage(\n        $to_user_id: Int!\n        $subject: String!\n        $message: String!\n    ) {\n        create_private_message(\n            to_user_id: $to_user_id\n            subject: $subject\n            message: $message\n        )\n    }\n": types.CreatePrivateMessageDocument,
    "\n    fragment PostMedia on Post {\n        mime\n        image_link\n    }\n": types.PostMediaFragmentDoc,
    "\n    query getCommentedPosts($start: Int, $tags: [String!]) {\n        posts(start: $start, limit: 48, tags: $tags) {\n            post_id\n            thumb_link\n            tags\n            ...PostMedia\n            comments {\n                ...CommentFragment\n            }\n        }\n    }\n": types.GetCommentedPostsDocument,
    "\n    query getPosts($start: Int, $tags: [String!]) {\n        posts(start: $start, limit: 48, tags: $tags) {\n            ...PostThumbnail\n        }\n    }\n": types.GetPostsDocument,
    "\n    fragment PostThumbnail on Post {\n        post_id\n        tooltip\n        thumb_link\n        width\n        height\n    }\n": types.PostThumbnailFragmentDoc,
    "\n    fragment PostMetadata on Post {\n        post_id\n\n        owner {\n            name\n            avatar_url\n        }\n\n        tags\n        source\n        locked\n        info\n        posted\n\n        ...PostScore\n    }\n": types.PostMetadataFragmentDoc,
    "\n    mutation updatePostMetadata($post_id: Int!, $metadata: MetadataInput!) {\n        update_post_metadata(post_id: $post_id, metadata: $metadata) {\n            id\n            post_id\n            tags\n            source\n        }\n    }\n": types.UpdatePostMetadataDocument,
    "\n    query getPost($post_id: Int!) {\n        post(post_id: $post_id) {\n            post_id\n\n            ...PostMedia\n            ...PostMetadata\n            comments {\n                ...CommentFragment\n            }\n        }\n    }\n": types.GetPostDocument,
    "\n    fragment PostScore on Post {\n        post_id\n\n        score\n        my_vote\n    }\n": types.PostScoreFragmentDoc,
    "\n    mutation createVote($post_id: Int!, $score: Int!) {\n        create_vote(post_id: $post_id, score: $score)\n    }\n": types.CreateVoteDocument,
    "\n    mutation login($username: String!, $password: String!) {\n        login(username: $username, password: $password) {\n            user {\n                ...UserLogin\n            }\n            session\n            error\n        }\n    }\n": types.LoginDocument,
    "\n    mutation createUser(\n        $username: String!\n        $password1: String!\n        $password2: String!\n        $email: String!\n    ) {\n        create_user(\n            username: $username\n            password1: $password1\n            password2: $password2\n            email: $email\n        ) {\n            user {\n                ...UserLogin\n            }\n            session\n            error\n        }\n    }\n": types.CreateUserDocument,
    "\n    query getAllTags($start: String!) {\n        tags(search: $start, limit: 1000) {\n            tag\n            uses\n        }\n    }\n": types.GetAllTagsDocument,
    "\n    fragment UserInfo on User {\n        user_id\n        name\n        join_date\n        avatar_url\n    }\n": types.UserInfoFragmentDoc,
    "\n    query getUser($user: String!) {\n        user(name: $user) {\n            user_id\n            ...UserInfo\n        }\n    }\n": types.GetUserDocument,
    "\n    query getWiki($title: String!) {\n        wiki(title: $title) {\n            title\n            body\n            revision\n            date\n            owner {\n                name\n            }\n        }\n    }\n": types.GetWikiDocument,
    "\n    fragment UserLogin on User {\n        name\n        private_message_unread_count\n        avatar_url\n        class {\n            permissions\n        }\n    }\n": types.UserLoginFragmentDoc,
    "\n    query getMe {\n        me {\n            ...UserLogin\n        }\n    }\n": types.GetMeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getTags($start: String!) {\n        tags(search: $start, limit: 10) {\n            tag\n            uses\n        }\n    }\n"): (typeof documents)["\n    query getTags($start: String!) {\n        tags(search: $start, limit: 10) {\n            tag\n            uses\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment CommentFragment on Comment {\n        comment_id\n        owner {\n            name\n            avatar_url\n        }\n        comment\n    }\n"): (typeof documents)["\n    fragment CommentFragment on Comment {\n        comment_id\n        owner {\n            name\n            avatar_url\n        }\n        comment\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createComment($post_id: Int!, $comment: String!) {\n        create_comment(post_id: $post_id, comment: $comment)\n    }\n"): (typeof documents)["\n    mutation createComment($post_id: Int!, $comment: String!) {\n        create_comment(post_id: $post_id, comment: $comment)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createPrivateMessage(\n        $to_user_id: Int!\n        $subject: String!\n        $message: String!\n    ) {\n        create_private_message(\n            to_user_id: $to_user_id\n            subject: $subject\n            message: $message\n        )\n    }\n"): (typeof documents)["\n    mutation createPrivateMessage(\n        $to_user_id: Int!\n        $subject: String!\n        $message: String!\n    ) {\n        create_private_message(\n            to_user_id: $to_user_id\n            subject: $subject\n            message: $message\n        )\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment PostMedia on Post {\n        mime\n        image_link\n    }\n"): (typeof documents)["\n    fragment PostMedia on Post {\n        mime\n        image_link\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getCommentedPosts($start: Int, $tags: [String!]) {\n        posts(start: $start, limit: 48, tags: $tags) {\n            post_id\n            thumb_link\n            tags\n            ...PostMedia\n            comments {\n                ...CommentFragment\n            }\n        }\n    }\n"): (typeof documents)["\n    query getCommentedPosts($start: Int, $tags: [String!]) {\n        posts(start: $start, limit: 48, tags: $tags) {\n            post_id\n            thumb_link\n            tags\n            ...PostMedia\n            comments {\n                ...CommentFragment\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getPosts($start: Int, $tags: [String!]) {\n        posts(start: $start, limit: 48, tags: $tags) {\n            ...PostThumbnail\n        }\n    }\n"): (typeof documents)["\n    query getPosts($start: Int, $tags: [String!]) {\n        posts(start: $start, limit: 48, tags: $tags) {\n            ...PostThumbnail\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment PostThumbnail on Post {\n        post_id\n        tooltip\n        thumb_link\n        width\n        height\n    }\n"): (typeof documents)["\n    fragment PostThumbnail on Post {\n        post_id\n        tooltip\n        thumb_link\n        width\n        height\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment PostMetadata on Post {\n        post_id\n\n        owner {\n            name\n            avatar_url\n        }\n\n        tags\n        source\n        locked\n        info\n        posted\n\n        ...PostScore\n    }\n"): (typeof documents)["\n    fragment PostMetadata on Post {\n        post_id\n\n        owner {\n            name\n            avatar_url\n        }\n\n        tags\n        source\n        locked\n        info\n        posted\n\n        ...PostScore\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updatePostMetadata($post_id: Int!, $metadata: MetadataInput!) {\n        update_post_metadata(post_id: $post_id, metadata: $metadata) {\n            id\n            post_id\n            tags\n            source\n        }\n    }\n"): (typeof documents)["\n    mutation updatePostMetadata($post_id: Int!, $metadata: MetadataInput!) {\n        update_post_metadata(post_id: $post_id, metadata: $metadata) {\n            id\n            post_id\n            tags\n            source\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getPost($post_id: Int!) {\n        post(post_id: $post_id) {\n            post_id\n\n            ...PostMedia\n            ...PostMetadata\n            comments {\n                ...CommentFragment\n            }\n        }\n    }\n"): (typeof documents)["\n    query getPost($post_id: Int!) {\n        post(post_id: $post_id) {\n            post_id\n\n            ...PostMedia\n            ...PostMetadata\n            comments {\n                ...CommentFragment\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment PostScore on Post {\n        post_id\n\n        score\n        my_vote\n    }\n"): (typeof documents)["\n    fragment PostScore on Post {\n        post_id\n\n        score\n        my_vote\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createVote($post_id: Int!, $score: Int!) {\n        create_vote(post_id: $post_id, score: $score)\n    }\n"): (typeof documents)["\n    mutation createVote($post_id: Int!, $score: Int!) {\n        create_vote(post_id: $post_id, score: $score)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation login($username: String!, $password: String!) {\n        login(username: $username, password: $password) {\n            user {\n                ...UserLogin\n            }\n            session\n            error\n        }\n    }\n"): (typeof documents)["\n    mutation login($username: String!, $password: String!) {\n        login(username: $username, password: $password) {\n            user {\n                ...UserLogin\n            }\n            session\n            error\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createUser(\n        $username: String!\n        $password1: String!\n        $password2: String!\n        $email: String!\n    ) {\n        create_user(\n            username: $username\n            password1: $password1\n            password2: $password2\n            email: $email\n        ) {\n            user {\n                ...UserLogin\n            }\n            session\n            error\n        }\n    }\n"): (typeof documents)["\n    mutation createUser(\n        $username: String!\n        $password1: String!\n        $password2: String!\n        $email: String!\n    ) {\n        create_user(\n            username: $username\n            password1: $password1\n            password2: $password2\n            email: $email\n        ) {\n            user {\n                ...UserLogin\n            }\n            session\n            error\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getAllTags($start: String!) {\n        tags(search: $start, limit: 1000) {\n            tag\n            uses\n        }\n    }\n"): (typeof documents)["\n    query getAllTags($start: String!) {\n        tags(search: $start, limit: 1000) {\n            tag\n            uses\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment UserInfo on User {\n        user_id\n        name\n        join_date\n        avatar_url\n    }\n"): (typeof documents)["\n    fragment UserInfo on User {\n        user_id\n        name\n        join_date\n        avatar_url\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getUser($user: String!) {\n        user(name: $user) {\n            user_id\n            ...UserInfo\n        }\n    }\n"): (typeof documents)["\n    query getUser($user: String!) {\n        user(name: $user) {\n            user_id\n            ...UserInfo\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getWiki($title: String!) {\n        wiki(title: $title) {\n            title\n            body\n            revision\n            date\n            owner {\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    query getWiki($title: String!) {\n        wiki(title: $title) {\n            title\n            body\n            revision\n            date\n            owner {\n                name\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment UserLogin on User {\n        name\n        private_message_unread_count\n        avatar_url\n        class {\n            permissions\n        }\n    }\n"): (typeof documents)["\n    fragment UserLogin on User {\n        name\n        private_message_unread_count\n        avatar_url\n        class {\n            permissions\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getMe {\n        me {\n            ...UserLogin\n        }\n    }\n"): (typeof documents)["\n    query getMe {\n        me {\n            ...UserLogin\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;