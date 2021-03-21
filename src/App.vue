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
  .container.py-4.mx-auto
    .flex
      nav.w-48.space-y-1(aria-label="Sidebar")
        template(v-if="$route.matched[0]?.children")
          template(v-for="t in $route.matched[0].children")
            router-link(custom :to="{ name: t.name }" v-slot="{ isExactActive, navigate, href }")
              a.flex.items-center.px-3.py-2.text-sm.font-medium.rounded-md(:href="href" :class="isExactActive ? 'text-indigo-600 bg-gray-100' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'" @click="navigate")
                span.truncate {{ t.label }}

      .flex.flex-1.flex-col.items-center.justify-center.p-12
        router-view(:key="$route.fullPath" :routes="routes")
</template>

<script lang="ts" setup>
import { routes } from "./router";
const menu = routes.filter((x) => x.component);

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
