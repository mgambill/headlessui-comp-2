import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/Main.vue";

export const routes = [
  {
    path: "/",
    redirect: "/listbox"
  },
  {
    path: "/wtf",
    name: "wtf",
    visible: false,
    component: () => import("../views/what.vue")
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
        redirect: { name: "sidebar" },
      },
      {
        path: "sidebar",
        name: "sidebar",
        label: "Sidebar",
        component: () => import(/* webpackChunkName: "listview" */ '../views/Sidebar.vue')
      },
      {
        path: "sidebar-multi",
        name: "sidebar-multi",
        label: "Sidebar (multiple)",
        component: () => import(/* webpackChunkName: "listview" */ '../views/Sidebar.vue')
      },
      {
        path: "tabs",
        name: "listview-tabs",
        label: "Tabs",
        component: () => import(/* webpackChunkName: "listview" */ '../views/Tabs.vue')
      },
      {
        path: "accordion",
        name: "accordion",
        label: "Accordion",
        component: () => import(/* webpackChunkName: "listview" */ '../views/Accordion.vue')
      },
      {
        path: "accordion-empty",
        name: "accordion-empty",
        label: "Accordion (close-able)",
        component: () => import(/* webpackChunkName: "listview" */ '../views/Accordion.vue'),
        props: () => ({ closable: true })
      },
      {
        path: "accordion-multiple",
        name: "accordion-multiple",
        label: "Accordion (multiple)",
        component: () => import(/* webpackChunkName: "listview" */ '../views/Accordion.vue'),
        props: () => ({ multiple: true })
      },
    ]
  },
  {
    path: "/forms",
    name: "form",
    label: "Forms (beta)",
    visible: false,
    component: () => import("../views/forms/Index.vue")
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
