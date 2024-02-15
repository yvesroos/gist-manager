<template>
  <li class="py-3 px-3 sm:py-4 hover:ring-2 ring-blue-600">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <img
          class="w-8 h-8 rounded-full"
          :src="gist.owner.avatar_url"
          :alt="gist.owner.login"
        />
      </div>
      <div class="flex-1 min-w-0 ms-4">
        <p class="text-sm font-medium truncate text-white hover">
          {{ gist.description || "(Empty)" }}
        </p>
        <div class="flex divider-x divider-gray-400 gap-2">
          <p class="text-sm truncate text-gray-400">
            Author: {{ gist.owner.login }}
          </p>
          <p class="text-sm truncate text-gray-400">
            Files: {{ Object.keys(gist.files || {}).length }}
          </p>

          <p class="text-sm truncate text-gray-400">
            Last update: {{ new Date(gist?.updated_at).toLocaleString() }}
          </p>
        </div>
      </div>
      <div class="inline-flex items-center text-base font-semibold text-white">
        &rarr;
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { Gist } from "../types";

defineProps<{ gist: Gist }>();
</script>
