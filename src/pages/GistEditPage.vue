<template>
  <div class="flex flex-col gap-6">
    <div class="flex gap-6 justify-between sticky top-4">
      <div class="flex flex-col gap-2">
        <h1 class="font-extrabold text-2xl text-white">
          {{ selectedGist?.description || "(Empty)" }}
        </h1>
        <p class="text-sm truncate text-gray-400">
          Last update: {{ selectedGist?.updated_at }}
        </p>
      </div>

      <div class="flex gap-2 justify-end">
        <Button :click="addNewFile" text="New file"></Button>
        <Button variant="success" :click="saveFiles" text="Save"></Button>
      </div>
    </div>
    <CodeViewer
      v-for="file in selectedGist?.files"
      v-model:title="file.filename"
      v-model:content="file.content"
      editable
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGistStore } from "../store";
import { storeToRefs } from "pinia";
import CodeViewer from "../components/CodeViewer.vue";
import Button from "../components/Button.vue";
const gistStore = useGistStore();
const { selectedGist } = storeToRefs(gistStore);
const { fetchGistById, updateGist, addNewFile } = gistStore;
const route = useRoute();

onMounted(() => {
  const gistId = route.params.id as string;
  fetchGistById(gistId);
});

const saveFiles = () => {
  updateGist();
};
</script>
