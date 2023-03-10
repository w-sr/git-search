<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { useReposStore } from "./../stores/repos";

const route = useRoute()
const store = useReposStore();
const repoDetail = computed(() => {
  return store.getCurrentRepo
})
const loading = computed(() => {
  return store.getLoading
})

onMounted(() => store.fetchRepoStatics(route.params.ownerName as string, route.params.repoName as string));

function open() {
  window.open(repoDetail.value.html_url, '_blank')
}
</script>

<template>
  <main>
    <v-card v-if="loading" class="mx-auto mt-6 d-flex align-center justify-center" theme="dark" max-width="600"
      min-height="200">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-card>
    <v-card v-else class="mx-auto mt-6" theme="dark" max-width="600" min-height="200" :title="repoDetail.name">
      <template v-slot:prepend>
        <v-icon icon="fa-brands fa-github"></v-icon>
      </template>

      <template v-slot:append>
        <v-icon icon="fa-solid fa-link" @click="open"></v-icon>
      </template>

      <v-card-text class="text-h5 py-2">
        {{ repoDetail.description ?? '' }}
      </v-card-text>

      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <v-avatar color="grey-darken-3" :image="repoDetail.owner ? repoDetail.owner.avatar_url : ''"></v-avatar>
          </template>

          <v-list-item-title>{{ repoDetail.owner ? repoDetail.owner.login : '' }}</v-list-item-title>

          <template v-slot:append>
            <div class="justify-self-end">
              <v-icon class="me-1" icon="fa-solid fa-code-fork"></v-icon>
              <span class="me-1 subheading">{{ repoDetail.forks_count }}</span>
              <v-icon class="me-1" icon="fa-solid fa-eye"></v-icon>
              <span class="me-1 subheading">{{ repoDetail.watchers_count }}</span>
              <v-icon class="me-1" icon="fa-solid fa-calculator"></v-icon>
              <span class="me-1 subheading">{{ repoDetail.size }}</span>
              <v-icon class="me-1" icon="fa-regular fa-circle-dot"></v-icon>
              <span class="me-1 subheading">{{ repoDetail.open_issues_count }}</span>
            </div>
          </template>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </main>
</template>

<style></style>
