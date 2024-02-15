<template>
  <div
    class="flex flex-col max-h-96 w-full rounded-lg border border-gray-600 overflow-hidden"
  >
    <input
      type="text"
      v-model="title"
      :disabled="!editable"
      class="block p-2.5 text-sm font-medium bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      ref="inputRef"
      aria-label="file name"
    />
    <textarea
      v-model="content"
      rows="15"
      :disabled="!editable"
      class="block p-2.5 w-full text-sm border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 resize-none"
      aria-label="file content"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const title = defineModel<string>("title");
const content = defineModel<string>("content");
const inputRef = ref<HTMLInputElement>();
const props = defineProps<{
  editable?: boolean;
}>();

const focusInput = () => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
};
onMounted(() => {
  props?.editable && focusInput();
});
</script>
