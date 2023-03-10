<script setup lang="ts">
import type { Repo } from '@/models/repo.model';
import { useRouter } from 'vue-router';

const props = defineProps<{
  item: Repo,
}>()

const router = useRouter()

function goToDetail() {
  router.push({
    name: 'detail',
    params: {
      ownerName: props.item.owner.login,
      repoName: props.item.name
    }
  })
}
</script>

<template>
  <v-container class="bg-surface-variant mt-4 pointer">
    <v-row no-gutters @click="goToDetail">
      <v-col sm="2" class="d-flex align-center">
        {{ props.item.name }}
      </v-col>
      <v-col sm="2" class="d-flex align-center">
        {{ props.item.owner.login }}
      </v-col>
      <v-col sm="2" class="d-flex align-center">
        <v-avatar color="grey-darken-3" :image="props.item ? props.item.owner.avatar_url : ''"></v-avatar>
      </v-col>
      <v-col sm="6" class="d-flex align-center">
        {{ props.item.description }}
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
