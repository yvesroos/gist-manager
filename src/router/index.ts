import {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
  createRouter,
  createWebHistory,
} from "vue-router";
import GistListPage from "../pages/GistListPage.vue";
import GistDetailPage from "../pages/GistDetailPage.vue";
import GistEditPage from "../pages/GistEditPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import { routeNames } from "../routeNames";
import { getCookie } from "../utils/cookie";

const checkUserAuth = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const hasAccessToken = !!getCookie("accessToken");
  if (!hasAccessToken) next({ name: routeNames.LOGIN });
  else next();
};

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: routeNames.LOGIN,
    component: LoginPage,
  },
  {
    path: "/",
    name: routeNames.GIST_LIST,
    component: GistListPage,
    beforeEnter: checkUserAuth,
  },
  {
    path: "/gist/:id",
    name: routeNames.GIST_DETAIL,
    component: GistDetailPage,
    beforeEnter: checkUserAuth,
  },
  {
    path: "/gist/:id/edit",
    name: routeNames.GIST_EDIT,
    component: GistEditPage,
    beforeEnter: checkUserAuth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
