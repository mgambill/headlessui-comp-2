import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/Main.vue";

export const routes = [
  {
    path: "/",
    redirect: "/listbox"
  },
  {
    path: "/menu",
    component: MainPage,
    label: "Menu",
    children: [
      {
        path: '',
        name: 'simple-menu',
        label: 'Simple',
        component: () => import(/* webpackChunkName: "menu" */ '../views/Menu.vue')
      }
    ]
  },
  {
    path: "/switch",
    component: MainPage,
    label: "Switch",
    children: [
      {
        path: '',
        name: 'simple-switch',
        label: 'Simple',
        component: () => import(/* webpackChunkName: "switch" */ '../views/Switch.vue')
      },
      {
        path: 'switch-advanced',
        name: 'advanced-switch',
        label: 'Advanced',
        component: () => import(/* webpackChunkName: "switch" */ '../views/SwitchButton.vue')
      }
    ]
  },
  {
    path: "/listbox",
    component: MainPage,
    label: "Listbox",
    children: [
      {
        path: "",
        name: "listbox",
        label: "Listbox",
        component: () => import(/* webpackChunkName: "listbox" */ '../views/Listbox.vue')
      },
      {
        path: "multi",
        name: "multi",
        label: "MultiSelect (beta)",
        component: () => import(/* webpackChunkName: "listbox" */ '../views/MultiListbox.vue'),

      },
      {
        path: "multi-model",
        name: "multi-model",
        label: "MultiSelect (Model beta)",
        component: () => import(/* webpackChunkName: "listbox" */ '../views/MultiListbox-2.vue'),

      },
    ]
  },
  {
    path: "/listview",
    component: MainPage,
    label: "Listview (beta)",
    children: [
      {
        path: "",
        name: "sidebar",
        label: "Sidebar",
        component: () => import(/* webpackChunkName: "listview" */ '../views/Sidebar.vue')
      },
      {
        path: "sidebar-multi",
        name: "sidebar-multi",
        label: "Sidebar (multiple)",
        component: () => import(/* webpackChunkName: "listview" */ '../views/Sidebar.vue'),
        props: () => ({ multiple: true })
      },
      {
        path: "listview-tabs",
        name: "listview-tabs",
        label: "Tabs",
        component: () => import(/* webpackChunkName: "listview" */ '../views/Tabs.vue')
      }
    ]
  }
  /*
  {
    path: "/switch",
    name: "switch",
    label: "Switch",
    component: SwitchPage
  },
  {
    path: "/switch-button",
    name: "switch-button",
    label: "Switch Button (beta)",
    component: ListButtonPage
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
*/
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
