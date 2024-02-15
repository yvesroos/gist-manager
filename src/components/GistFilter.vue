<template>
  <div class="flex justify-between items-center">
    <div class="flex gap-2 items-center">
      <div class="flex flex-col">
        <p
          class="text-lg font-bold overflow-hidden text-nowrap text-ellipsis text-left text-slate-300"
        >
          Filter by user:
        </p>
        <div class="flex -space-x-3 rtl:space-x-reverse">
          <img
            v-for="user in users"
            class="w-8 h-8 border-2 cursor-pointer hover:border-white rounded-full border-gray-800 bg-black"
            :class="{ 'border-white': selectedUser === user.id }"
            :src="user.avatar_url"
            :alt="'user ' + user.login"
            @click="toogleUser(user.id)"
          />
          <div
            class="relative inline-flex border-2 cursor-pointer items-center justify-center w-8 h-8 overflow-hidden border-gray-800 bg-gray-100 rounded-full dark:bg-gray-600 hover:border-white"
            :class="{ 'border-white': !selectedUser }"
            @click="toogleUser()"
          >
            <span class="text-xs font-medium text-gray-600 dark:text-gray-300"
              >ALL</span
            >
          </div>
        </div>
      </div>
    </div>
    <p
      class="text-lg font-bold overflow-hidden text-nowrap text-ellipsis text-left text-slate-300"
    >
      Showing {{ totalDisplaying }} of {{ total }} total gists
    </p>
  </div>
</template>

<script setup lang="ts">
import { User } from "../types";

defineProps<{
  toogleUser: (userId?: number) => void;
  selectedUser?: number;
  users?: Record<string, User>;
  totalDisplaying: number;
  total: number;
}>();
</script>
