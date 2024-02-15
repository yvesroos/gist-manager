export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Gistfile {
  filename: string;
  type?: string;
  language?: string;
  raw_url?: string;
  size?: number;
}

export interface GistFileDetail extends Gistfile {
  truncated?: boolean;
  content: string;
}

export interface History {
  user: User;
  version: string;
  committed_at: string;
  change_status: ChangeStatus;
  url: string;
}

export interface ChangeStatus {
  total: number;
  additions: number;
  deletions: number;
}

export interface Gist {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  node_id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  files: Record<string, Gistfile>;
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  comments: number;
  user: User;
  comments_url: string;
  owner: User;
  truncated: boolean;
}

export interface GistDetail extends Gist {
  files: Record<string, GistFileDetail>;
  forks?: any[];
  history?: History[];
}
