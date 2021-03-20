<template>
  <section class="justify-center flex-1">
    <header class="pt-4 bg-gray-100 border-b border-gray-200">
      <div class="container mx-auto">
        <nav class="flex -mb-px space-x-8" aria-label="Tabs">
          <template v-for="m in menu" :key="m.to">
            <router-link custom :to="m.to" v-slot="context">
              <a v-bind="getProps(m, context)">{{ m.label }}</a>
            </router-link>
          </template>
        </nav>
      </div>
    </header>

    <div class="container py-4 mx-auto">
      <div class="flex items-center justify-center p-12">
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const menu = [
  { to: "/listbox", label: "Listbox" },
  { to: "/menu", label: "Menu" },
  { to: "/switch", label: "Switch" },
];

const getProps = (m: any, context: any) => {
  const { href, navigate, isActive } = context;
  const classes = `${isActive ? "text-indigo-600 border-indigo-500" : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`;
  return {
    class: classes,
    onClick: navigate,
    href,
  };
};
import HelloWorld from "./components/HelloWorld.vue";
/*export default {
  components: {
    HelloWorld,
  },
}
*/
</script>
