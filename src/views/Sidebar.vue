<template lang="pug">
.w-full.max-w-xs.mx-auto
  Listview.w-20.bg-gray-300.rounded-md(as="nav" v-model="current" aria-label="Sidebar")
    ListviewOptions.relative.flex.flex-col.w-20.p-3.space-y-3(role="sidbar")
      ListviewOption(v-for="o in options" :key="o.label" :value="o" v-slot="context")
        a(href="#" @click.prevent :class="tabClass(context)")
          span.sr-only {{ o.label }}
          svg.w-6.h-6(xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke="currentColor" aria-hidden="true")
            path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="o.icon")

pre.mt-8.text-sm {{ { current } }}

</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { Listview, ListviewOptions, ListviewOption } from "../components/listview/listview";
const props = defineProps({ multiple: Boolean });
const options = [
  { label: "Open", icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" },
  { label: "Archive", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
  { label: "Customers", icon: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Flagged", icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" },
  { label: "Spam", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" },
  { label: "Drafts", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
];
console.log(props);
const current = props.multiple ? ref([options[0]]) : ref(options[0]);

const tabClass = ({ selected, active }) => {
  const baseline = "flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg focus:outline-none";
  return baseline + " " + (selected && active ? "bg-gray-900 text-gray-50" : selected ? "bg-gray-900 text-white " : active ? "bg-gray-500 text-gray-300" : "text-gray-700");
};
</script>