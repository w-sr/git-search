<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useReposStore } from "./../stores/repos";
import ListItem from "../components/ListItem.vue";
const store = useReposStore();
const getRepos = computed(() => {
  return store.getRepos;
});
const loading = computed(() => {
  return store.getLoading
})

onMounted(() => {
  store.fetchRepos();
});

function filter(event: Event) {
  const target = event.target as HTMLInputElement
  store.filterRepos(target.value)
}
</script>

<template>
  <div class="w-100">
    <v-text-field hide-details="auto" label="Search Git Repo" class="w-50 my-8"
      append-inner-icon="fa-solid fa-magnifying-glass" @input="filter"></v-text-field>

    <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
    <ListItem v-else v-for="(item, index) in getRepos" :item="item" :index="index" :key="item.id" />
  </div>
</template>

<style scoped></style>
