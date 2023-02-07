/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String'];
  comment_id: Scalars['Int'];
  owner: User;
  posted: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  error?: Maybe<Scalars['String']>;
  session?: Maybe<Scalars['String']>;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  create_comment: Scalars['Boolean'];
  create_private_message: Scalars['Boolean'];
  create_vote: Scalars['Boolean'];
  login: LoginResult;
};


export type MutationCreate_CommentArgs = {
  comment: Scalars['String'];
  post_id: Scalars['Int'];
};


export type MutationCreate_Private_MessageArgs = {
  message: Scalars['String'];
  subject: Scalars['String'];
  to_id: Scalars['Int'];
};


export type MutationCreate_VoteArgs = {
  post_id: Scalars['Int'];
  score: Scalars['Int'];
};


export type MutationLoginArgs = {
  name: Scalars['String'];
  pass: Scalars['String'];
};

export type NumericScoreVote = {
  __typename?: 'NumericScoreVote';
  post: Post;
  score: Scalars['Int'];
  user: User;
};

export type Post = {
  __typename?: 'Post';
  comments: Array<Comment>;
  ext: Scalars['String'];
  filename: Scalars['String'];
  filesize: Scalars['Int'];
  hash: Scalars['String'];
  height: Scalars['Int'];
  id?: Maybe<Scalars['Int']>;
  image_link: Scalars['String'];
  info: Scalars['String'];
  locked: Scalars['Boolean'];
  mime: Scalars['String'];
  nice_name: Scalars['String'];
  owner: User;
  posted?: Maybe<Scalars['String']>;
  score: Scalars['Int'];
  source?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  thumb_link: Scalars['String'];
  tooltip: Scalars['String'];
  votes: Array<NumericScoreVote>;
  width: Scalars['Int'];
};

export type PrivateMessage = {
  __typename?: 'PrivateMessage';
  from: User;
  id: Scalars['Int'];
  is_read: Scalars['Boolean'];
  message: Scalars['String'];
  subject: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Maybe<Post>>>;
  tags: Array<TagUsage>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryTagsArgs = {
  limit: Scalars['Int'];
  search: Scalars['String'];
};

export type TagUsage = {
  __typename?: 'TagUsage';
  tag: Scalars['String'];
  uses: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  class: UserClass;
  id: Scalars['Int'];
  name: Scalars['String'];
  private_message_unread_count?: Maybe<Scalars['Int']>;
  private_messages?: Maybe<Array<PrivateMessage>>;
};

export type UserClass = {
  __typename?: 'UserClass';
  name?: Maybe<Scalars['String']>;
  permissions: Array<Scalars['String']>;
};

export type CommentItemFragment = { __typename?: 'Comment', comment_id: number, comment: string, owner: { __typename?: 'User', name: string } } & { ' $fragmentName'?: 'CommentItemFragment' };

export type LoginMutationVariables = Exact<{
  name: Scalars['String'];
  pass: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', session?: string | null, error?: string | null, user: { __typename?: 'User', name: string, private_message_unread_count?: number | null } } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', name: string, private_message_unread_count?: number | null } };

export type GetTagsQueryVariables = Exact<{
  start: Scalars['String'];
}>;


export type GetTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'TagUsage', tag: string, uses: number }> };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id?: number | null, hash: string, image_link: string, thumb_link: string } | null> | null };

export type GetPostQueryVariables = Exact<{
  post_id: Scalars['Int'];
}>;


export type GetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id?: number | null, hash: string, tags?: Array<string | null> | null, source?: string | null, locked: boolean, info: string, posted?: string | null, image_link: string, thumb_link: string, owner: { __typename?: 'User', name: string }, comments: Array<{ __typename?: 'Comment', comment_id: number, comment: string, owner: { __typename?: 'User', name: string } }> } | null };

export const CommentItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment_id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]} as unknown as DocumentNode<CommentItemFragment, unknown>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pass"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"pass"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pass"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"private_message_unread_count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"private_message_unread_count"}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"uses"}}]}}]}}]} as unknown as DocumentNode<GetTagsQuery, GetTagsQueryVariables>;
export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"24"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"image_link"}},{"kind":"Field","name":{"kind":"Name","value":"thumb_link"}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;
export const GetPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"post_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"post_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"locked"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"posted"}},{"kind":"Field","name":{"kind":"Name","value":"image_link"}},{"kind":"Field","name":{"kind":"Name","value":"thumb_link"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment_id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostQuery, GetPostQueryVariables>;