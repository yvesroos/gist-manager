<template>
  <section>
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-slate-700 border-slate-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white"
          >
            Redirecting user...
          </h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { routeNames } from "../routeNames";
import { setCookie } from "../utils/cookie";

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const accessToken = route.query.accessToken as string;
  const expiration = route.query.exp as string;
  if (accessToken) {
    setCookie("accessToken", accessToken, Number(expiration));
    return router.push({ name: routeNames.GIST_LIST });
  }
  router.push({ name: routeNames.LOGIN });
});
</script>
