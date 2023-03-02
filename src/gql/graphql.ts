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
  create_user: LoginResult;
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
  to_user_id: Scalars['Int'];
};


export type MutationCreate_UserArgs = {
  email: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreate_VoteArgs = {
  post_id: Scalars['Int'];
  score: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type NumericScoreVote = {
  __typename?: 'NumericScoreVote';
  post: Post;
  score: Scalars['Int'];
  user: User;
};

export enum Permission {
  ApproveComment = 'APPROVE_COMMENT',
  ApproveImage = 'APPROVE_IMAGE',
  ArtistsAdmin = 'ARTISTS_ADMIN',
  BanImage = 'BAN_IMAGE',
  BanIp = 'BAN_IP',
  BigSearch = 'BIG_SEARCH',
  BlotterAdmin = 'BLOTTER_ADMIN',
  BulkAdd = 'BULK_ADD',
  BulkDownload = 'BULK_DOWNLOAD',
  BulkEditImageRating = 'BULK_EDIT_IMAGE_RATING',
  BulkEditImageSource = 'BULK_EDIT_IMAGE_SOURCE',
  BulkEditImageTag = 'BULK_EDIT_IMAGE_TAG',
  BulkEditVote = 'BULK_EDIT_VOTE',
  BulkExport = 'BULK_EXPORT',
  BulkImport = 'BULK_IMPORT',
  BypassCommentChecks = 'BYPASS_COMMENT_CHECKS',
  ChangeOtherUserSetting = 'CHANGE_OTHER_USER_SETTING',
  ChangeSetting = 'CHANGE_SETTING',
  ChangeUserSetting = 'CHANGE_USER_SETTING',
  CreateComment = 'CREATE_COMMENT',
  CreateImage = 'CREATE_IMAGE',
  CreateImageReport = 'CREATE_IMAGE_REPORT',
  CreateOtherUser = 'CREATE_OTHER_USER',
  CreateUser = 'CREATE_USER',
  CreateVote = 'CREATE_VOTE',
  CronAdmin = 'CRON_ADMIN',
  CronRun = 'CRON_RUN',
  DeleteComment = 'DELETE_COMMENT',
  DeleteImage = 'DELETE_IMAGE',
  DeleteUser = 'DELETE_USER',
  DeleteWikiPage = 'DELETE_WIKI_PAGE',
  EditFavourites = 'EDIT_FAVOURITES',
  EditFeature = 'EDIT_FEATURE',
  EditFiles = 'EDIT_FILES',
  EditImageArtist = 'EDIT_IMAGE_ARTIST',
  EditImageLock = 'EDIT_IMAGE_LOCK',
  EditImageOwner = 'EDIT_IMAGE_OWNER',
  EditImageRating = 'EDIT_IMAGE_RATING',
  EditImageRelationships = 'EDIT_IMAGE_RELATIONSHIPS',
  EditImageSource = 'EDIT_IMAGE_SOURCE',
  EditImageTag = 'EDIT_IMAGE_TAG',
  EditImageTitle = 'EDIT_IMAGE_TITLE',
  EditOtherVote = 'EDIT_OTHER_VOTE',
  EditTagCategories = 'EDIT_TAG_CATEGORIES',
  EditUserClass = 'EDIT_USER_CLASS',
  EditUserInfo = 'EDIT_USER_INFO',
  EditUserName = 'EDIT_USER_NAME',
  EditUserPassword = 'EDIT_USER_PASSWORD',
  EditWikiPage = 'EDIT_WIKI_PAGE',
  ForumAdmin = 'FORUM_ADMIN',
  Hellbanned = 'HELLBANNED',
  IgnoreDowntime = 'IGNORE_DOWNTIME',
  ManageAdmintools = 'MANAGE_ADMINTOOLS',
  ManageAliasList = 'MANAGE_ALIAS_LIST',
  ManageAutoTag = 'MANAGE_AUTO_TAG',
  ManageBlocks = 'MANAGE_BLOCKS',
  ManageExtensionList = 'MANAGE_EXTENSION_LIST',
  MassTagEdit = 'MASS_TAG_EDIT',
  NotesAdmin = 'NOTES_ADMIN',
  OverrideConfig = 'OVERRIDE_CONFIG',
  PerformBulkActions = 'PERFORM_BULK_ACTIONS',
  PoolsAdmin = 'POOLS_ADMIN',
  Protected = 'PROTECTED',
  ReadPm = 'READ_PM',
  ReplaceImage = 'REPLACE_IMAGE',
  RescanMedia = 'RESCAN_MEDIA',
  SeeImageViewCounts = 'SEE_IMAGE_VIEW_COUNTS',
  SendPm = 'SEND_PM',
  SetOthersPrivateImages = 'SET_OTHERS_PRIVATE_IMAGES',
  SetPrivateImage = 'SET_PRIVATE_IMAGE',
  TipsAdmin = 'TIPS_ADMIN',
  ViewEventlog = 'VIEW_EVENTLOG',
  ViewHellbanned = 'VIEW_HELLBANNED',
  ViewImageReport = 'VIEW_IMAGE_REPORT',
  ViewIp = 'VIEW_IP',
  ViewOtherPms = 'VIEW_OTHER_PMS',
  ViewRegistrations = 'VIEW_REGISTRATIONS',
  ViewSysinto = 'VIEW_SYSINTO',
  ViewTrash = 'VIEW_TRASH',
  WikiAdmin = 'WIKI_ADMIN'
}

export type Post = {
  __typename?: 'Post';
  comments: Array<Comment>;
  ext: Scalars['String'];
  filename: Scalars['String'];
  filesize: Scalars['Int'];
  hash: Scalars['String'];
  height: Scalars['Int'];
  id: Scalars['String'];
  image_link: Scalars['String'];
  info: Scalars['String'];
  locked: Scalars['Boolean'];
  mime?: Maybe<Scalars['String']>;
  my_vote: Scalars['Int'];
  nice_name: Scalars['String'];
  owner: User;
  post_id: Scalars['Int'];
  posted?: Maybe<Scalars['String']>;
  score: Scalars['Int'];
  source?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  thumb_link: Scalars['String'];
  tooltip: Scalars['String'];
  votes: Array<NumericScoreVote>;
  width: Scalars['Int'];
};

export type PrivateMessage = {
  __typename?: 'PrivateMessage';
  from: User;
  id: Scalars['String'];
  is_read: Scalars['Boolean'];
  message: Scalars['String'];
  pm_id: Scalars['Int'];
  subject: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  post?: Maybe<Post>;
  posts: Array<Post>;
  tags: Array<TagUsage>;
  user?: Maybe<User>;
  wiki: WikiPage;
};


export type QueryPostArgs = {
  post_id: Scalars['Int'];
};


export type QueryPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryTagsArgs = {
  limit: Scalars['Int'];
  search: Scalars['String'];
};


export type QueryUserArgs = {
  name: Scalars['String'];
};


export type QueryWikiArgs = {
  revision?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
};

export type TagUsage = {
  __typename?: 'TagUsage';
  tag: Scalars['String'];
  uses: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  avatar_url?: Maybe<Scalars['String']>;
  class: UserClass;
  id: Scalars['String'];
  join_date: Scalars['String'];
  name: Scalars['String'];
  private_message_unread_count?: Maybe<Scalars['Int']>;
  private_messages?: Maybe<Array<PrivateMessage>>;
  user_id: Scalars['Int'];
};

export type UserClass = {
  __typename?: 'UserClass';
  name?: Maybe<Scalars['String']>;
  permissions: Array<Permission>;
};

export type WikiPage = {
  __typename?: 'WikiPage';
  body: Scalars['String'];
  date: Scalars['String'];
  owner: User;
  revision: Scalars['Int'];
  title: Scalars['String'];
};

export type GetTagsQueryVariables = Exact<{
  start: Scalars['String'];
}>;


export type GetTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'TagUsage', tag: string, uses: number }> };

export type CommentFragmentFragment = { __typename?: 'Comment', comment_id: number, comment: string, owner: { __typename?: 'User', name: string, avatar_url?: string | null } } & { ' $fragmentName'?: 'CommentFragmentFragment' };

export type CreateCommentMutationVariables = Exact<{
  post_id: Scalars['Int'];
  comment: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', create_comment: boolean };

export type CreatePrivateMessageMutationVariables = Exact<{
  to_user_id: Scalars['Int'];
  subject: Scalars['String'];
  message: Scalars['String'];
}>;


export type CreatePrivateMessageMutation = { __typename?: 'Mutation', create_private_message: boolean };

export type PostMediaFragment = { __typename?: 'Post', mime?: string | null, image_link: string } & { ' $fragmentName'?: 'PostMediaFragment' };

export type GetCommentedPostsQueryVariables = Exact<{
  start?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GetCommentedPostsQuery = { __typename?: 'Query', posts: Array<(
    { __typename?: 'Post', post_id: number, thumb_link: string, tags: Array<string>, comments: Array<(
      { __typename?: 'Comment' }
      & { ' $fragmentRefs'?: { 'CommentFragmentFragment': CommentFragmentFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'PostMediaFragment': PostMediaFragment } }
  )> };

export type GetPostsQueryVariables = Exact<{
  start?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts: Array<(
    { __typename?: 'Post' }
    & { ' $fragmentRefs'?: { 'PostThumbnailFragment': PostThumbnailFragment } }
  )> };

export type PostThumbnailFragment = { __typename?: 'Post', post_id: number, tooltip: string, thumb_link: string, width: number, height: number } & { ' $fragmentName'?: 'PostThumbnailFragment' };

export type PostMetadataFragment = (
  { __typename?: 'Post', post_id: number, tags: Array<string>, source?: string | null, locked: boolean, info: string, posted?: string | null, owner: { __typename?: 'User', name: string, avatar_url?: string | null } }
  & { ' $fragmentRefs'?: { 'PostScoreFragment': PostScoreFragment } }
) & { ' $fragmentName'?: 'PostMetadataFragment' };

export type PostScoreFragment = { __typename?: 'Post', post_id: number, score: number, my_vote: number } & { ' $fragmentName'?: 'PostScoreFragment' };

export type CreateVoteMutationVariables = Exact<{
  post_id: Scalars['Int'];
  score: Scalars['Int'];
}>;


export type CreateVoteMutation = { __typename?: 'Mutation', create_vote: boolean };

export type GetPostQueryVariables = Exact<{
  post_id: Scalars['Int'];
}>;


export type GetPostQuery = { __typename?: 'Query', post?: (
    { __typename?: 'Post', post_id: number, comments: Array<(
      { __typename?: 'Comment' }
      & { ' $fragmentRefs'?: { 'CommentFragmentFragment': CommentFragmentFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'PostMediaFragment': PostMediaFragment;'PostMetadataFragment': PostMetadataFragment } }
  ) | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', session?: string | null, error?: string | null, user: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserLoginFragment': UserLoginFragment } }
    ) } };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
  email: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', create_user: { __typename?: 'LoginResult', session?: string | null, error?: string | null, user: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserLoginFragment': UserLoginFragment } }
    ) } };

export type GetAllTagsQueryVariables = Exact<{
  start: Scalars['String'];
}>;


export type GetAllTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'TagUsage', tag: string, uses: number }> };

export type GetUserQueryVariables = Exact<{
  user: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', user_id: number, name: string, join_date: string, avatar_url?: string | null } | null };

export type GetWikiQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type GetWikiQuery = { __typename?: 'Query', wiki: { __typename?: 'WikiPage', title: string, body: string, revision: number, date: string, owner: { __typename?: 'User', name: string } } };

export type UserLoginFragment = { __typename?: 'User', name: string, private_message_unread_count?: number | null, avatar_url?: string | null, class: { __typename?: 'UserClass', permissions: Array<Permission> } } & { ' $fragmentName'?: 'UserLoginFragment' };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserLoginFragment': UserLoginFragment } }
  ) };

export const CommentFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment_id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]} as unknown as DocumentNode<CommentFragmentFragment, unknown>;
export const PostMediaFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostMedia"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"image_link"}}]}}]} as unknown as DocumentNode<PostMediaFragment, unknown>;
export const PostThumbnailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostThumbnail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post_id"}},{"kind":"Field","name":{"kind":"Name","value":"tooltip"}},{"kind":"Field","name":{"kind":"Name","value":"thumb_link"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]} as unknown as DocumentNode<PostThumbnailFragment, unknown>;
export const PostScoreFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostScore"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post_id"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"my_vote"}}]}}]} as unknown as DocumentNode<PostScoreFragment, unknown>;
export const PostMetadataFragmentDoc = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PostMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Post"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post_id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"locked"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"posted"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostScore"}}]}},...PostScoreFragmentDoc.definitions]} as unknown as DocumentNode<PostMetadataFragment, unknown>;
export const UserLoginFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserLogin"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"private_message_unread_count"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"}}]}}]}}]} as unknown as DocumentNode<UserLoginFragment, unknown>;
export const GetTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"uses"}}]}}]}}]} as unknown as DocumentNode<GetTagsQuery, GetTagsQueryVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"post_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_comment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"post_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"post_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}]}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePrivateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPrivateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to_user_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subject"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_private_message"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to_user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to_user_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subject"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}]}}]} as unknown as DocumentNode<CreatePrivateMessageMutation, CreatePrivateMessageMutationVariables>;
export const GetCommentedPostsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCommentedPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"48"}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post_id"}},{"kind":"Field","name":{"kind":"Name","value":"thumb_link"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostMedia"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentFragment"}}]}}]}}]}},...PostMediaFragmentDoc.definitions,...CommentFragmentFragmentDoc.definitions]} as unknown as DocumentNode<GetCommentedPostsQuery, GetCommentedPostsQueryVariables>;
export const GetPostsDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"48"}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostThumbnail"}}]}}]}},...PostThumbnailFragmentDoc.definitions]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;
export const CreateVoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createVote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"post_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"score"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_vote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"post_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"post_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"score"},"value":{"kind":"Variable","name":{"kind":"Name","value":"score"}}}]}]}}]} as unknown as DocumentNode<CreateVoteMutation, CreateVoteMutationVariables>;
export const GetPostDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"post_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"post_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"post_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post_id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostMedia"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PostMetadata"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentFragment"}}]}}]}}]}},...PostMediaFragmentDoc.definitions,...PostMetadataFragmentDoc.definitions,...CommentFragmentFragmentDoc.definitions]} as unknown as DocumentNode<GetPostQuery, GetPostQueryVariables>;
export const LoginDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserLogin"}}]}},{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}},...UserLoginFragmentDoc.definitions]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password1"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"create_user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password1"}}},{"kind":"Argument","name":{"kind":"Name","value":"password2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password2"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserLogin"}}]}},{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}},...UserLoginFragmentDoc.definitions]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const GetAllTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"uses"}}]}}]}}]} as unknown as DocumentNode<GetAllTagsQuery, GetAllTagsQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"join_date"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetWikiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWiki"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wiki"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetWikiQuery, GetWikiQueryVariables>;
export const GetMeDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserLogin"}}]}}]}},...UserLoginFragmentDoc.definitions]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;