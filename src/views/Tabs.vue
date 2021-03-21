<template lang="pug">
.w-full.max-w-xs.mx-auto
  Listview.border-b-2.border-gray-200(v-model="current"  aria-label="Tabs")
    ListviewOptions.-mb-2px.flex.space-x-8(role="tabs")
      ListviewOption(v-for="o in options" :key="o" :value="o" v-slot="context")
        a(:class="tabClass(context)") {{ o }}

pre.mt-8.text-sm {{ { current } }}
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Listview, ListviewOptions, ListviewOption } from "../components/listview/listview";

const options = ["Apple", "Microsoft", "Google", "Samsung"];

const current = ref(options[0]);

const tabClass = ({ selected, active }) => {
  return "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none cursor-pointer " + (selected && active ? "text-indigo-700 border-indigo-600" : selected ? "text-indigo-600 border-indigo-500" : active ? "text-gray-700 border-gray-400" : "border-transparent text-gray-500");
};
</script>