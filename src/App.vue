<template lang="pug">
section.justify-center.flex-1
  header.pt-4.bg-gray-100.border-b-2.border-gray-200
    .container.mx-auto
      nav.flex.-mb-2px.space-x-8(aria-label="Tabs")
        template(v-for="m in menu" :key="m.path")
          router-link(custom :to="m.path" v-slot="context")
            a(v-bind="getProps(m, context)")
              | {{ m.label }}
  .container.py-4.mx-auto
    .flex.items-center.justify-center.p-12
      router-view(:key="$route.fullPath")
</template>

<script lang="ts" setup>
import { routes } from "./router";
const menu = routes.filter((x) => x.component)

const getProps = (m: any, context: any) => {
  const { href, navigate, isActive } = context;
  const classes = `${isActive ? "text-indigo-600 border-indigo-500" : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`;
  return {
    class: classes,
    onClick: navigate,
    href,
  };
};
</script>
