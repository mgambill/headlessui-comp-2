<template lang="pug">
section.justify-center.flex-1
  header.pt-4.bg-gray-100.border-b-2.border-gray-200
    .container.mx-auto
      nav.flex.-mb-2px.space-x-8(aria-label="Tabs")
        template(v-for="m in menu" :key="m.path")
          router-link(custom :to="m.path" v-slot="context")
            a(v-bind="getProps(m, context)")
              span.mr-3 {{ m.label }}
              span.bg-white.ml-auto.inline-block.px-2.text-xs.rounded-full(class="py-0.5") {{ m.children?.length }}
        .flex-1
        router-link.block.text-gray-700.rounded-full.w-8.h-8.flex.justify-center.items-center.font-bold.transition.ease-in(class="hover:bg-gray-800 hover:text-gray-50" to="/wtf" title="What is this ?") ?
  .container.py-4.mx-auto
    router-view(:key="$route.fullPath")
</template>

<script lang="ts" setup>
import { routes } from "./router";
const menu = routes.filter((x) => x.component && x.visible !== false);

const getProps = (m: any, context: any) => {
  const { href, navigate, isActive } = context;
  const classes = `${isActive ? "text-indigo-600 border-indigo-500" : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`;
  return {
    class: classes,
    onClick: navigate,
    href,
  };
};

const onClick = (e) => {
  console.log("CLICKED");
};
</script>
