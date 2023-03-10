export interface Owner {
  id: string
  login: string
  avatar_url: string
}

export interface Repo {
  id: string
  name: string
  owner: Owner
  description: string
  size: number
  forks_count: number
  open_issues_count: number
  watchers_count: number
  html_url: string
}
