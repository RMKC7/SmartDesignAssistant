import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import OutOfScope from "@/views/OutOfScope.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/out-of-scope", component: OutOfScope }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
