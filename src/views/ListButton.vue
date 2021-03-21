<template lang="pug">
.w-full.max-w-xs.mx-auto
  Listview.w-full.relative.z-0.flex.mb-4.border-2.bg-gray-200.rounded-full.shadow-sm.ring-0.max-w-lg.m-auto(v-model="current" aria-label="Horizontal Menu")
    ListviewOptions.w-full.grid(role="sidbar" as="button" class="focus:outline-none" :class="`grid-cols-${options.length}`" v-slot="pc")
      ListviewOption(v-for="o in options" :key="o" :value="o" v-slot="context")
        span(href="#" :class="tabClass(context)") {{ o }}

    .absolute.top-0.bottom-0.grid.w-full(:class="`grid-cols-${options.length}`")
      article.relative.duration-400.ease-out.rounded-full.bg-white(:class="`w-full transition-all col-start-${currentIndex+1} `" style="transition:grid-column")
  pre {{ current }} | {{ currentIndex }}
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { Listview, ListviewOptions, ListviewOption } from "../components/listview/listview";

const options = ["Inbox", "Archive", "Spam", "Junk"];
const current = ref(options[0]);
const currentIndex = computed(() => options.indexOf(current.value));

const tabClass = ({ selected, active } = {}) => {
  const baseline = " block relative z-20 transition-all ease-in items-center flex-grow px-4 py-2 text-sm font-medium border-gray-200 rounded-full focus:outline-none";
  return baseline + " " + (selected ? "text-indigo-600 " : active ? "bg-gray-500 text-gray-300" : "text-gray-700");
};
</script>