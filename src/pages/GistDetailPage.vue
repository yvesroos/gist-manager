<template>
  <div class="flex flex-col gap-6">
    <div class="flex gap-6 justify-between">
      <h1 class="font-extrabold text-3xl">
        {{ selectedGist?.description || "(Empty)" }}
      </h1>
      <Button variant="primary" :click="editGist" text="Edit"></Button>
    </div>
    <CodeViewer
      v-for="file in selectedGist?.files"
      :title="file.filename"
      :content="file.content"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGistStore } from "../store";
import { storeToRefs } from "pinia";
import CodeViewer from "../components/CodeViewer.vue";
import Button from "../components/Button.vue";
import { routeNames } from "../routeNames";
const gistStore = useGistStore();
const { selectedGist } = storeToRefs(gistStore);
const { fetchGistById } = gistStore;
const route = useRoute();
const router = useRouter();

onMounted(() => {
  const gistId = route.params.id as string;
  fetchGistById(gistId);
});

const editGist = () => {
  const gistId = route.params.id as string;
  router.push({ name: routeNames.GIST_EDIT, params: { id: gistId } });
};
</script>
