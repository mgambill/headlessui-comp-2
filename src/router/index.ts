import { createRouter, createWebHistory } from "vue-router";
import ListboxPage from "../views/Listbox.vue";
import MenuPage from "../views/Menu.vue";
import SwitchPage from "../views/Switch.vue";
const routes = [
  {
    path: "/",
    redirect: "/listbox"
  },
  {
    path: "/menu",
    name: "menu",
    component: MenuPage
  },
  {
    path: "/switch",
    name: "switch",
    component: SwitchPage
  },
  {
    path: "/listbox",
    name: "listbox",
    component: ListboxPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
