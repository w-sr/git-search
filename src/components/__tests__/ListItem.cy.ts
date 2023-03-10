import type { Repo } from '@/models/repo.model'
import ListItem from '../ListItem.vue'

const testRepo: Repo = {
  id: '1',
  name: 'Test Repo Name',
  description: 'Test description',
  watchers_count: 1,
  open_issues_count: 1,
  size: 1,
  forks_count: 1,
  html_url: 'https://github.com',
  owner: {
    id: '1',
    login: 'Owner Name',
    avatar_url: 'https://example.com'
  }
}

describe('ListItem', () => {
  it('playground', () => {
    cy.mount(ListItem, { props: { item: testRepo } })
  })

  it('renders properly', () => {
    cy.mount(ListItem, { props: { item: testRepo } })
    cy.contains('Test Repo Name')
  })
})
