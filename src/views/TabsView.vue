<template lang="pug">
.w-full.max-w-xs.mx-auto
  Listview.border-b-2.border-gray-200(v-model="current"  aria-label="Tabs")
    ListviewOptions.-mb-2px.flex.space-x-8(role="tabs")
      ListviewOption(:key="apple" value="apple" v-slot="context")
      ListviewOption(:key="microsoft" value="microsoft" v-slot="context")
      ListviewOption(:key="samsung" value="samsung" v-slot="context")
  div
    p Apple dolor sit, amet consectetur adipisicing elit. Voluptatibus nam repellat praesentium veritatis asperiores omnis doloremque dolore, voluptatum consequuntur, sed quia iste, magni inventore voluptate dolores qui. Ipsa, quis saepe!
    p Microsoft ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus nam repellat praesentium veritatis asperiores omnis doloremque dolore, voluptatum consequuntur, sed quia iste, magni inventore voluptate dolores qui. Ipsa, quis saepe!
    p Samsung ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus nam repellat praesentium veritatis asperiores omnis doloremque dolore, voluptatum consequuntur, sed quia iste, magni inventore voluptate dolores qui. Ipsa, quis saepe!
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