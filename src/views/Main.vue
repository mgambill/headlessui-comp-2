<template lang="pug">
div(class="grid-cols-5 sm:grid")
  .col-span-1
    .flex(v-if="$route.matched[0]?.children")
      nav.w-48.space-y-1(aria-label="Sidebar")
        template(v-for="t in $route.matched[0].children.filter((x) => x.component && x.visible !== false)")
          router-link(custom :to="{ name: t.name }" v-slot="{ isExactActive, navigate, href }")
            a.flex.items-center.px-3.py-2.text-sm.font-medium.rounded-md(:href="href" :class="isExactActive ? 'text-indigo-600 bg-gray-100' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'" @click="navigate")
              span.truncate {{ t.label }}

  .col-span-4
    .flex.flex-1.flex-col.items-center.justify-center.p-12
      router-view
</template>