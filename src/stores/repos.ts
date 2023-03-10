import { searchDeepInArray } from '@/common/helpers'
import type { Repo } from '@/models/repo.model'
import axios from '@/plugins/axios'
import { defineStore } from 'pinia'

export type RootState = {
  repos: Repo[]
  filteredRepos: Repo[]
  current: {}
  loading: boolean
}

export const useReposStore = defineStore('repo', {
  state: () => ({
    repos: [] as Repo[],
    filteredRepos: [] as Repo[],
    current: {} as Repo,
    loading: false
  }),
  getters: {
    getRepos(state) {
      return state.filteredRepos
    },
    getCurrentRepo(state) {
      return state.current
    },
    getLoading(state) {
      return state.loading
    }
  },
  actions: {
    filterRepos(value?: string) {
      if (value) this.filteredRepos = [...searchDeepInArray(this.repos, value)]
      else this.filteredRepos = [...this.repos]
    },
    async fetchRepos() {
      this.loading = true
      try {
        const res = await axios.get('/repositories')
        this.repos = res.data
        this.filterRepos()
      } catch (error) {
        alert(error)
      } finally {
        this.loading = false
      }
    },
    async fetchRepoStatics(ownerName: string, repoName: string) {
      this.loading = true
      try {
        const res = await axios.get(`/repos/${ownerName}/${repoName}`)
        this.current = res.data
      } catch (error) {
        alert(error)
      } finally {
        this.loading = false
      }
    }
  }
})
