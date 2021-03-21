import { createRouter, createWebHistory } from "vue-router";
import ListboxPage from "../views/Listbox.vue";
import MenuPage from "../views/Menu.vue";
import SwitchPage from "../views/Switch.vue";
import MultiListboxPage from "../views/MultiListbox-2.vue";
import TabsPage from "../views/Tabs.vue";
import SidebarPage from "../views/Sidebar.vue";
export const routes = [
  {
    path: "/",
    redirect: "/listbox"
  },
  {
    path: "/menu",
    name: "menu",
    label: "Menu",
    component: MenuPage
  },
  {
    path: "/listbox",
    name: "listbox",
    label: "Listbox",
    component: ListboxPage
  },
  {
    path: "/switch",
    name: "switch",
    label: "Switch",
    component: SwitchPage
  },
  {
    path: "/multi",
    name: "multi",
    label: "MultiSelect (beta)",
    component: MultiListboxPage
  },
  {
    path: "/sidebar",
    name: "sidebar",
    label: "Sidebar (beta)",
    component: SidebarPage
  },
  {
    path: "/tabs",
    name: "tabs",
    label: "Tabs (beta)",
    component: TabsPage
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
