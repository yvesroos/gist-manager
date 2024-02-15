<template>
  <div>
    <div class="w-full flex flex-col gap-6">
      <GistFilter
        :users="users"
        :total="gists?.length"
        :totalDisplaying="gistsBySelectedUser?.length"
        :toogle-user="toogleUser"
        :selected-user="selectedUser"
      ></GistFilter>
      <ul
        role="list"
        class="w-full inline-flex flex-col divide-y divide-gray-700"
      >
        <template v-for="n in 10">
          <GistItemPlaceholder v-if="loading" :key="n" />
        </template>
        <router-link
          :show="!loading"
          v-for="gist in gistsBySelectedUser"
          :to="{ name: routeNames.GIST_DETAIL, params: { id: gist.id } }"
        >
          <GistItem :key="gist.id" :gist="gist" />
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGistStore } from "../store";
import { storeToRefs } from "pinia";
import GistItem from "../components/GistItem.vue";
import GistItemPlaceholder from "../components/GistItemPlaceholder.vue";
import GistFilter from "../components/GistFilter.vue";
import { routeNames } from "../routeNames";
const gistStore = useGistStore();
const { gists, loading, gistsBySelectedUser, users, selectedUser } =
  storeToRefs(gistStore);
const { fetchGists, toogleUser } = gistStore;
onMounted(() => {
  fetchGists();
});
</script>
