/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ProfileDetailsInput: { // input type
    avatar?: string | null; // String
    bio?: string | null; // String
    email?: string | null; // String
    github?: string | null; // String
    jobTitle?: string | null; // String
    lightning_address?: string | null; // String
    linkedin?: string | null; // String
    location?: string | null; // String
    name?: string | null; // String
    twitter?: string | null; // String
    website?: string | null; // String
  }
  StoryInputType: { // input type
    body: string; // String!
    cover_image?: string | null; // String
    id?: number | null; // Int
    is_published?: boolean | null; // Boolean
    tags: string[]; // [String!]!
    title: string; // String!
  }
  UserKeyInputType: { // input type
    key: string; // String!
    name: string; // String!
  }
}

export interface NexusGenEnums {
  POST_TYPE: "Bounty" | "Question" | "Story"
  VOTE_ITEM_TYPE: "Bounty" | "PostComment" | "Project" | "Question" | "Story" | "User"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
}

export interface NexusGenObjects {
  Author: { // root type
    avatar: string; // String!
    id: number; // Int!
    join_date: NexusGenScalars['Date']; // Date!
    lightning_address?: string | null; // String
    name: string; // String!
  }
  Award: { // root type
    id: number; // Int!
    image: string; // String!
    title: string; // String!
    url: string; // String!
  }
  Bounty: { // root type
    applicants_count: number; // Int!
    applications: NexusGenRootTypes['BountyApplication'][]; // [BountyApplication!]!
    body: string; // String!
    cover_image?: string | null; // String
    createdAt: NexusGenScalars['Date']; // Date!
    deadline: string; // String!
    excerpt: string; // String!
    id: number; // Int!
    is_published?: boolean | null; // Boolean
    reward_amount: number; // Int!
    title: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
    votes_count: number; // Int!
  }
  BountyApplication: { // root type
    author: NexusGenRootTypes['Author']; // Author!
    date: string; // String!
    id: number; // Int!
    workplan: string; // String!
  }
  Category: { // root type
    cover_image?: string | null; // String
    icon?: string | null; // String
    id: number; // Int!
    title: string; // String!
  }
  Donation: { // root type
    amount: number; // Int!
    createdAt: NexusGenScalars['Date']; // Date!
    id: number; // Int!
    paid: boolean; // Boolean!
    payment_hash: string; // String!
    payment_request: string; // String!
  }
  DonationsStats: { // root type
    applications: string; // String!
    donations: string; // String!
    prizes: string; // String!
    touranments: string; // String!
  }
  Hackathon: { // root type
    cover_image: string; // String!
    description: string; // String!
    end_date: NexusGenScalars['Date']; // Date!
    id: number; // Int!
    location: string; // String!
    start_date: NexusGenScalars['Date']; // Date!
    title: string; // String!
    website: string; // String!
  }
  LnurlDetails: { // root type
    commentAllowed?: number | null; // Int
    maxSendable?: number | null; // Int
    metadata?: string | null; // String
    minSendable?: number | null; // Int
  }
  Mutation: {};
  MyProfile: { // root type
    avatar: string; // String!
    bio?: string | null; // String
    email?: string | null; // String
    github?: string | null; // String
    id: number; // Int!
    jobTitle?: string | null; // String
    join_date: NexusGenScalars['Date']; // Date!
    lightning_address?: string | null; // String
    linkedin?: string | null; // String
    location?: string | null; // String
    name: string; // String!
    nostr_prv_key?: string | null; // String
    nostr_pub_key?: string | null; // String
    role?: string | null; // String
    twitter?: string | null; // String
    website?: string | null; // String
  }
  PostComment: { // root type
    author: NexusGenRootTypes['Author']; // Author!
    body: string; // String!
    created_at: NexusGenScalars['Date']; // Date!
    id: number; // Int!
    parentId?: number | null; // Int
    votes_count: number; // Int!
  }
  Project: { // root type
    cover_image: string; // String!
    description: string; // String!
    id: number; // Int!
    lightning_address?: string | null; // String
    lnurl_callback_url?: string | null; // String
    screenshots: string[]; // [String!]!
    thumbnail_image: string; // String!
    title: string; // String!
    votes_count: number; // Int!
    website: string; // String!
  }
  Query: {};
  Question: { // root type
    body: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    excerpt: string; // String!
    id: number; // Int!
    is_published?: boolean | null; // Boolean
    title: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
    votes_count: number; // Int!
  }
  Story: { // root type
    body: string; // String!
    cover_image?: string | null; // String
    createdAt: NexusGenScalars['Date']; // Date!
    excerpt: string; // String!
    id: number; // Int!
    is_published?: boolean | null; // Boolean
    title: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
    votes_count: number; // Int!
  }
  Tag: { // root type
    description?: string | null; // String
    icon?: string | null; // String
    id: number; // Int!
    isOfficial?: boolean | null; // Boolean
    title: string; // String!
  }
  Tournament: { // root type
    cover_image: string; // String!
    description: string; // String!
    end_date: NexusGenScalars['Date']; // Date!
    events: NexusGenRootTypes['TournamentEvent'][]; // [TournamentEvent!]!
    faqs: NexusGenRootTypes['TournamentFAQ'][]; // [TournamentFAQ!]!
    id: number; // Int!
    judges: NexusGenRootTypes['TournamentJudge'][]; // [TournamentJudge!]!
    location: string; // String!
    prizes: NexusGenRootTypes['TournamentPrize'][]; // [TournamentPrize!]!
    start_date: NexusGenScalars['Date']; // Date!
    thumbnail_image: string; // String!
    title: string; // String!
    website: string; // String!
  }
  TournamentEvent: { // root type
    date: NexusGenScalars['Date']; // Date!
    description: string; // String!
    id: number; // Int!
    image: string; // String!
    links: string[]; // [String!]!
    location: string; // String!
    title: string; // String!
    type: string; // String!
    website: string; // String!
  }
  TournamentFAQ: { // root type
    answer: string; // String!
    question: string; // String!
  }
  TournamentJudge: { // root type
    avatar: string; // String!
    jobTitle: string; // String!
    name: string; // String!
  }
  TournamentPrize: { // root type
    amount: string; // String!
    image: string; // String!
    title: string; // String!
  }
  User: { // root type
    avatar: string; // String!
    bio?: string | null; // String
    email?: string | null; // String
    github?: string | null; // String
    id: number; // Int!
    jobTitle?: string | null; // String
    join_date: NexusGenScalars['Date']; // Date!
    lightning_address?: string | null; // String
    linkedin?: string | null; // String
    location?: string | null; // String
    name: string; // String!
    role?: string | null; // String
    twitter?: string | null; // String
    website?: string | null; // String
  }
  Vote: { // root type
    amount_in_sat: number; // Int!
    id: number; // Int!
    item_id: number; // Int!
    item_type: NexusGenEnums['VOTE_ITEM_TYPE']; // VOTE_ITEM_TYPE!
    paid: boolean; // Boolean!
    payment_hash: string; // String!
    payment_request: string; // String!
  }
  WalletKey: { // root type
    key: string; // String!
    name: string; // String!
  }
}

export interface NexusGenInterfaces {
  BaseUser: NexusGenRootTypes['MyProfile'] | NexusGenRootTypes['User'];
  PostBase: NexusGenRootTypes['Bounty'] | NexusGenRootTypes['Question'] | NexusGenRootTypes['Story'];
}

export interface NexusGenUnions {
  Post: NexusGenRootTypes['Bounty'] | NexusGenRootTypes['Question'] | NexusGenRootTypes['Story'];
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Author: { // field return type
    avatar: string; // String!
    id: number; // Int!
    join_date: NexusGenScalars['Date']; // Date!
    lightning_address: string | null; // String
    name: string; // String!
  }
  Award: { // field return type
    id: number; // Int!
    image: string; // String!
    project: NexusGenRootTypes['Project']; // Project!
    title: string; // String!
    url: string; // String!
  }
  Bounty: { // field return type
    applicants_count: number; // Int!
    applications: NexusGenRootTypes['BountyApplication'][]; // [BountyApplication!]!
    author: NexusGenRootTypes['Author']; // Author!
    body: string; // String!
    cover_image: string | null; // String
    createdAt: NexusGenScalars['Date']; // Date!
    deadline: string; // String!
    excerpt: string; // String!
    id: number; // Int!
    is_published: boolean | null; // Boolean
    reward_amount: number; // Int!
    tags: NexusGenRootTypes['Tag'][]; // [Tag!]!
    title: string; // String!
    type: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
    votes_count: number; // Int!
  }
  BountyApplication: { // field return type
    author: NexusGenRootTypes['Author']; // Author!
    date: string; // String!
    id: number; // Int!
    workplan: string; // String!
  }
  Category: { // field return type
    apps_count: number; // Int!
    cover_image: string | null; // String
    icon: string | null; // String
    id: number; // Int!
    project: NexusGenRootTypes['Project'][]; // [Project!]!
    title: string; // String!
    votes_sum: number; // Int!
  }
  Donation: { // field return type
    amount: number; // Int!
    by: NexusGenRootTypes['User'] | null; // User
    createdAt: NexusGenScalars['Date']; // Date!
    id: number; // Int!
    paid: boolean; // Boolean!
    payment_hash: string; // String!
    payment_request: string; // String!
  }
  DonationsStats: { // field return type
    applications: string; // String!
    donations: string; // String!
    prizes: string; // String!
    touranments: string; // String!
  }
  Hackathon: { // field return type
    cover_image: string; // String!
    description: string; // String!
    end_date: NexusGenScalars['Date']; // Date!
    id: number; // Int!
    location: string; // String!
    start_date: NexusGenScalars['Date']; // Date!
    tags: NexusGenRootTypes['Tag'][]; // [Tag!]!
    title: string; // String!
    website: string; // String!
  }
  LnurlDetails: { // field return type
    commentAllowed: number | null; // Int
    maxSendable: number | null; // Int
    metadata: string | null; // String
    minSendable: number | null; // Int
  }
  Mutation: { // field return type
    confirmDonation: NexusGenRootTypes['Donation']; // Donation!
    confirmVote: NexusGenRootTypes['Vote']; // Vote!
    createStory: NexusGenRootTypes['Story'] | null; // Story
    deleteStory: NexusGenRootTypes['Story'] | null; // Story
    donate: NexusGenRootTypes['Donation']; // Donation!
    updateProfileDetails: NexusGenRootTypes['MyProfile'] | null; // MyProfile
    updateUserPreferences: NexusGenRootTypes['MyProfile']; // MyProfile!
    vote: NexusGenRootTypes['Vote']; // Vote!
  }
  MyProfile: { // field return type
    avatar: string; // String!
    bio: string | null; // String
    email: string | null; // String
    github: string | null; // String
    id: number; // Int!
    jobTitle: string | null; // String
    join_date: NexusGenScalars['Date']; // Date!
    lightning_address: string | null; // String
    linkedin: string | null; // String
    location: string | null; // String
    name: string; // String!
    nostr_prv_key: string | null; // String
    nostr_pub_key: string | null; // String
    role: string | null; // String
    stories: NexusGenRootTypes['Story'][]; // [Story!]!
    twitter: string | null; // String
    walletsKeys: NexusGenRootTypes['WalletKey'][]; // [WalletKey!]!
    website: string | null; // String
  }
  PostComment: { // field return type
    author: NexusGenRootTypes['Author']; // Author!
    body: string; // String!
    created_at: NexusGenScalars['Date']; // Date!
    id: number; // Int!
    parentId: number | null; // Int
    votes_count: number; // Int!
  }
  Project: { // field return type
    awards: NexusGenRootTypes['Award'][]; // [Award!]!
    category: NexusGenRootTypes['Category']; // Category!
    cover_image: string; // String!
    description: string; // String!
    id: number; // Int!
    lightning_address: string | null; // String
    lnurl_callback_url: string | null; // String
    screenshots: string[]; // [String!]!
    tags: NexusGenRootTypes['Tag'][]; // [Tag!]!
    thumbnail_image: string; // String!
    title: string; // String!
    votes_count: number; // Int!
    website: string; // String!
  }
  Query: { // field return type
    allCategories: NexusGenRootTypes['Category'][]; // [Category!]!
    allProjects: NexusGenRootTypes['Project'][]; // [Project!]!
    getAllHackathons: NexusGenRootTypes['Hackathon'][]; // [Hackathon!]!
    getCategory: NexusGenRootTypes['Category']; // Category!
    getDonationsStats: NexusGenRootTypes['DonationsStats']; // DonationsStats!
    getFeed: NexusGenRootTypes['Post'][]; // [Post!]!
    getLnurlDetailsForProject: NexusGenRootTypes['LnurlDetails']; // LnurlDetails!
    getMyDrafts: NexusGenRootTypes['Post'][]; // [Post!]!
    getPostById: NexusGenRootTypes['Post']; // Post!
    getProject: NexusGenRootTypes['Project']; // Project!
    getTournamentById: NexusGenRootTypes['Tournament']; // Tournament!
    getTrendingPosts: NexusGenRootTypes['Post'][]; // [Post!]!
    hottestProjects: NexusGenRootTypes['Project'][]; // [Project!]!
    me: NexusGenRootTypes['MyProfile'] | null; // MyProfile
    newProjects: NexusGenRootTypes['Project'][]; // [Project!]!
    officialTags: NexusGenRootTypes['Tag'][]; // [Tag!]!
    popularTags: NexusGenRootTypes['Tag'][]; // [Tag!]!
    profile: NexusGenRootTypes['User'] | null; // User
    projectsByCategory: NexusGenRootTypes['Project'][]; // [Project!]!
    searchProjects: NexusGenRootTypes['Project'][]; // [Project!]!
  }
  Question: { // field return type
    author: NexusGenRootTypes['Author']; // Author!
    body: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    excerpt: string; // String!
    id: number; // Int!
    is_published: boolean | null; // Boolean
    tags: NexusGenRootTypes['Tag'][]; // [Tag!]!
    title: string; // String!
    type: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
    votes_count: number; // Int!
  }
  Story: { // field return type
    author: NexusGenRootTypes['Author']; // Author!
    body: string; // String!
    comments: NexusGenRootTypes['PostComment'][]; // [PostComment!]!
    comments_count: number; // Int!
    cover_image: string | null; // String
    createdAt: NexusGenScalars['Date']; // Date!
    excerpt: string; // String!
    id: number; // Int!
    is_published: boolean | null; // Boolean
    tags: NexusGenRootTypes['Tag'][]; // [Tag!]!
    title: string; // String!
    type: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
    votes_count: number; // Int!
  }
  Tag: { // field return type
    description: string | null; // String
    icon: string | null; // String
    id: number; // Int!
    isOfficial: boolean | null; // Boolean
    title: string; // String!
  }
  Tournament: { // field return type
    cover_image: string; // String!
    description: string; // String!
    end_date: NexusGenScalars['Date']; // Date!
    events: NexusGenRootTypes['TournamentEvent'][]; // [TournamentEvent!]!
    faqs: NexusGenRootTypes['TournamentFAQ'][]; // [TournamentFAQ!]!
    id: number; // Int!
    judges: NexusGenRootTypes['TournamentJudge'][]; // [TournamentJudge!]!
    location: string; // String!
    prizes: NexusGenRootTypes['TournamentPrize'][]; // [TournamentPrize!]!
    start_date: NexusGenScalars['Date']; // Date!
    thumbnail_image: string; // String!
    title: string; // String!
    website: string; // String!
  }
  TournamentEvent: { // field return type
    date: NexusGenScalars['Date']; // Date!
    description: string; // String!
    id: number; // Int!
    image: string; // String!
    links: string[]; // [String!]!
    location: string; // String!
    title: string; // String!
    type: string; // String!
    website: string; // String!
  }
  TournamentFAQ: { // field return type
    answer: string; // String!
    question: string; // String!
  }
  TournamentJudge: { // field return type
    avatar: string; // String!
    jobTitle: string; // String!
    name: string; // String!
  }
  TournamentPrize: { // field return type
    amount: string; // String!
    image: string; // String!
    title: string; // String!
  }
  User: { // field return type
    avatar: string; // String!
    bio: string | null; // String
    email: string | null; // String
    github: string | null; // String
    id: number; // Int!
    jobTitle: string | null; // String
    join_date: NexusGenScalars['Date']; // Date!
    lightning_address: string | null; // String
    linkedin: string | null; // String
    location: string | null; // String
    name: string; // String!
    role: string | null; // String
    stories: NexusGenRootTypes['Story'][]; // [Story!]!
    twitter: string | null; // String
    website: string | null; // String
  }
  Vote: { // field return type
    amount_in_sat: number; // Int!
    id: number; // Int!
    item_id: number; // Int!
    item_type: NexusGenEnums['VOTE_ITEM_TYPE']; // VOTE_ITEM_TYPE!
    paid: boolean; // Boolean!
    payment_hash: string; // String!
    payment_request: string; // String!
  }
  WalletKey: { // field return type
    key: string; // String!
    name: string; // String!
  }
  BaseUser: { // field return type
    avatar: string; // String!
    bio: string | null; // String
    email: string | null; // String
    github: string | null; // String
    id: number; // Int!
    jobTitle: string | null; // String
    join_date: NexusGenScalars['Date']; // Date!
    lightning_address: string | null; // String
    linkedin: string | null; // String
    location: string | null; // String
    name: string; // String!
    role: string | null; // String
    stories: NexusGenRootTypes['Story'][]; // [Story!]!
    twitter: string | null; // String
    website: string | null; // String
  }
  PostBase: { // field return type
    body: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    excerpt: string; // String!
    id: number; // Int!
    is_published: boolean | null; // Boolean
    title: string; // String!
    updatedAt: NexusGenScalars['Date']; // Date!
    votes_count: number; // Int!
  }
}

export interface NexusGenFieldTypeNames {
  Author: { // field return type name
    avatar: 'String'
    id: 'Int'
    join_date: 'Date'
    lightning_address: 'String'
    name: 'String'
  }
  Award: { // field return type name
    id: 'Int'
    image: 'String'
    project: 'Project'
    title: 'String'
    url: 'String'
  }
  Bounty: { // field return type name
    applicants_count: 'Int'
    applications: 'BountyApplication'
    author: 'Author'
    body: 'String'
    cover_image: 'String'
    createdAt: 'Date'
    deadline: 'String'
    excerpt: 'String'
    id: 'Int'
    is_published: 'Boolean'
    reward_amount: 'Int'
    tags: 'Tag'
    title: 'String'
    type: 'String'
    updatedAt: 'Date'
    votes_count: 'Int'
  }
  BountyApplication: { // field return type name
    author: 'Author'
    date: 'String'
    id: 'Int'
    workplan: 'String'
  }
  Category: { // field return type name
    apps_count: 'Int'
    cover_image: 'String'
    icon: 'String'
    id: 'Int'
    project: 'Project'
    title: 'String'
    votes_sum: 'Int'
  }
  Donation: { // field return type name
    amount: 'Int'
    by: 'User'
    createdAt: 'Date'
    id: 'Int'
    paid: 'Boolean'
    payment_hash: 'String'
    payment_request: 'String'
  }
  DonationsStats: { // field return type name
    applications: 'String'
    donations: 'String'
    prizes: 'String'
    touranments: 'String'
  }
  Hackathon: { // field return type name
    cover_image: 'String'
    description: 'String'
    end_date: 'Date'
    id: 'Int'
    location: 'String'
    start_date: 'Date'
    tags: 'Tag'
    title: 'String'
    website: 'String'
  }
  LnurlDetails: { // field return type name
    commentAllowed: 'Int'
    maxSendable: 'Int'
    metadata: 'String'
    minSendable: 'Int'
  }
  Mutation: { // field return type name
    confirmDonation: 'Donation'
    confirmVote: 'Vote'
    createStory: 'Story'
    deleteStory: 'Story'
    donate: 'Donation'
    updateProfileDetails: 'MyProfile'
    updateUserPreferences: 'MyProfile'
    vote: 'Vote'
  }
  MyProfile: { // field return type name
    avatar: 'String'
    bio: 'String'
    email: 'String'
    github: 'String'
    id: 'Int'
    jobTitle: 'String'
    join_date: 'Date'
    lightning_address: 'String'
    linkedin: 'String'
    location: 'String'
    name: 'String'
    nostr_prv_key: 'String'
    nostr_pub_key: 'String'
    role: 'String'
    stories: 'Story'
    twitter: 'String'
    walletsKeys: 'WalletKey'
    website: 'String'
  }
  PostComment: { // field return type name
    author: 'Author'
    body: 'String'
    created_at: 'Date'
    id: 'Int'
    parentId: 'Int'
    votes_count: 'Int'
  }
  Project: { // field return type name
    awards: 'Award'
    category: 'Category'
    cover_image: 'String'
    description: 'String'
    id: 'Int'
    lightning_address: 'String'
    lnurl_callback_url: 'String'
    screenshots: 'String'
    tags: 'Tag'
    thumbnail_image: 'String'
    title: 'String'
    votes_count: 'Int'
    website: 'String'
  }
  Query: { // field return type name
    allCategories: 'Category'
    allProjects: 'Project'
    getAllHackathons: 'Hackathon'
    getCategory: 'Category'
    getDonationsStats: 'DonationsStats'
    getFeed: 'Post'
    getLnurlDetailsForProject: 'LnurlDetails'
    getMyDrafts: 'Post'
    getPostById: 'Post'
    getProject: 'Project'
    getTournamentById: 'Tournament'
    getTrendingPosts: 'Post'
    hottestProjects: 'Project'
    me: 'MyProfile'
    newProjects: 'Project'
    officialTags: 'Tag'
    popularTags: 'Tag'
    profile: 'User'
    projectsByCategory: 'Project'
    searchProjects: 'Project'
  }
  Question: { // field return type name
    author: 'Author'
    body: 'String'
    createdAt: 'Date'
    excerpt: 'String'
    id: 'Int'
    is_published: 'Boolean'
    tags: 'Tag'
    title: 'String'
    type: 'String'
    updatedAt: 'Date'
    votes_count: 'Int'
  }
  Story: { // field return type name
    author: 'Author'
    body: 'String'
    comments: 'PostComment'
    comments_count: 'Int'
    cover_image: 'String'
    createdAt: 'Date'
    excerpt: 'String'
    id: 'Int'
    is_published: 'Boolean'
    tags: 'Tag'
    title: 'String'
    type: 'String'
    updatedAt: 'Date'
    votes_count: 'Int'
  }
  Tag: { // field return type name
    description: 'String'
    icon: 'String'
    id: 'Int'
    isOfficial: 'Boolean'
    title: 'String'
  }
  Tournament: { // field return type name
    cover_image: 'String'
    description: 'String'
    end_date: 'Date'
    events: 'TournamentEvent'
    faqs: 'TournamentFAQ'
    id: 'Int'
    judges: 'TournamentJudge'
    location: 'String'
    prizes: 'TournamentPrize'
    start_date: 'Date'
    thumbnail_image: 'String'
    title: 'String'
    website: 'String'
  }
  TournamentEvent: { // field return type name
    date: 'Date'
    description: 'String'
    id: 'Int'
    image: 'String'
    links: 'String'
    location: 'String'
    title: 'String'
    type: 'String'
    website: 'String'
  }
  TournamentFAQ: { // field return type name
    answer: 'String'
    question: 'String'
  }
  TournamentJudge: { // field return type name
    avatar: 'String'
    jobTitle: 'String'
    name: 'String'
  }
  TournamentPrize: { // field return type name
    amount: 'String'
    image: 'String'
    title: 'String'
  }
  User: { // field return type name
    avatar: 'String'
    bio: 'String'
    email: 'String'
    github: 'String'
    id: 'Int'
    jobTitle: 'String'
    join_date: 'Date'
    lightning_address: 'String'
    linkedin: 'String'
    location: 'String'
    name: 'String'
    role: 'String'
    stories: 'Story'
    twitter: 'String'
    website: 'String'
  }
  Vote: { // field return type name
    amount_in_sat: 'Int'
    id: 'Int'
    item_id: 'Int'
    item_type: 'VOTE_ITEM_TYPE'
    paid: 'Boolean'
    payment_hash: 'String'
    payment_request: 'String'
  }
  WalletKey: { // field return type name
    key: 'String'
    name: 'String'
  }
  BaseUser: { // field return type name
    avatar: 'String'
    bio: 'String'
    email: 'String'
    github: 'String'
    id: 'Int'
    jobTitle: 'String'
    join_date: 'Date'
    lightning_address: 'String'
    linkedin: 'String'
    location: 'String'
    name: 'String'
    role: 'String'
    stories: 'Story'
    twitter: 'String'
    website: 'String'
  }
  PostBase: { // field return type name
    body: 'String'
    createdAt: 'Date'
    excerpt: 'String'
    id: 'Int'
    is_published: 'Boolean'
    title: 'String'
    updatedAt: 'Date'
    votes_count: 'Int'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    confirmDonation: { // args
      payment_request: string; // String!
      preimage: string; // String!
    }
    confirmVote: { // args
      payment_request: string; // String!
      preimage: string; // String!
    }
    createStory: { // args
      data?: NexusGenInputs['StoryInputType'] | null; // StoryInputType
    }
    deleteStory: { // args
      id: number; // Int!
    }
    donate: { // args
      amount_in_sat: number; // Int!
    }
    updateProfileDetails: { // args
      data?: NexusGenInputs['ProfileDetailsInput'] | null; // ProfileDetailsInput
    }
    updateUserPreferences: { // args
      userKeys?: NexusGenInputs['UserKeyInputType'][] | null; // [UserKeyInputType!]
    }
    vote: { // args
      amount_in_sat: number; // Int!
      item_id: number; // Int!
      item_type: NexusGenEnums['VOTE_ITEM_TYPE']; // VOTE_ITEM_TYPE!
    }
  }
  Query: {
    allProjects: { // args
      skip?: number | null; // Int
      take: number | null; // Int
    }
    getAllHackathons: { // args
      sortBy?: string | null; // String
      tag?: number | null; // Int
    }
    getCategory: { // args
      id: number; // Int!
    }
    getFeed: { // args
      skip?: number | null; // Int
      sortBy?: string | null; // String
      tag?: number | null; // Int
      take: number | null; // Int
    }
    getLnurlDetailsForProject: { // args
      project_id: number; // Int!
    }
    getMyDrafts: { // args
      type: NexusGenEnums['POST_TYPE']; // POST_TYPE!
    }
    getPostById: { // args
      id: number; // Int!
      type: NexusGenEnums['POST_TYPE']; // POST_TYPE!
    }
    getProject: { // args
      id: number; // Int!
    }
    getTournamentById: { // args
      id: number; // Int!
    }
    hottestProjects: { // args
      skip?: number | null; // Int
      take: number | null; // Int
    }
    newProjects: { // args
      skip?: number | null; // Int
      take: number | null; // Int
    }
    profile: { // args
      id: number; // Int!
    }
    projectsByCategory: { // args
      category_id: number; // Int!
      skip?: number | null; // Int
      take: number | null; // Int
    }
    searchProjects: { // args
      search: string; // String!
      skip?: number | null; // Int
      take: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  Post: "Bounty" | "Question" | "Story"
  BaseUser: "MyProfile" | "User"
  PostBase: "Bounty" | "Question" | "Story"
}

export interface NexusGenTypeInterfaces {
  Bounty: "PostBase"
  MyProfile: "BaseUser"
  Question: "PostBase"
  Story: "PostBase"
  User: "BaseUser"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "BaseUser" | "Post" | "PostBase";

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}