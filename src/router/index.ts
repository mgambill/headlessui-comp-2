import { createRouter, createWebHistory } from "vue-router";
import ListboxPage from "../views/Listbox.vue";
import MenuPage from "../views/Menu.vue";
import SwitchPage from "../views/Switch.vue";
import MultiListboxPage from "../views/MultiListbox-2.vue";
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
    path: "/multi",
    name: "multi",
    component: MultiListboxPage
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
