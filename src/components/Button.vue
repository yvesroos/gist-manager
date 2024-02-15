<template>
  <button
    type="button"
    class="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    :class="{
      'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800':
        variant === undefined || variant === 'primary',
      'border focus:z-10 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700':
        variant === 'secondary',
      'bg-green-600 hover:bg-green-700 focus:ring-green-800':
        variant === 'success',
      'bg-red-600 hover:bg-red-700 focus:ring-red-900': variant === 'danger',
    }"
    @click="click"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  click: () => void;
  text: string;
  variant?: "primary" | "secondary" | "success" | "danger";
}>();
</script>
