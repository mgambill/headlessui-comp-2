<template lang="pug">
.w-full.max-w-md.mx-auto
  Listview.bg-white.shadow.overflow-hidden.rounded-md.border.border-gray-200(v-model="current" aria-label="Accordion")
    ListviewOptions.divide-y.divide-gray-200(as="ul" role="tabs")
      ListviewOption(as="li" key="apple" value="apple" v-slot="{ selected, active }" class="focus:outline-none")
        .p-8(:class="selected ? 'bg-indigo-50' : active ? 'cursor-pointer bg-gray-100' : 'bg-gray-50'" @click="onClickHandle(selected)")
          h1.font-medium.text-indigo-600 Apple
        .border-t.border-gray-200.px-8.py-4.text-sm.text-gray-560.leading-10(v-show="selected")
          p Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
      ListviewOption(as="li" key="microsoft" value="microsoft" v-slot="{ selected, active }" class="focus:outline-none")
        .p-8(:class="selected ? 'bg-indigo-50' : active ? 'cursor-pointer bg-gray-100' : 'bg-gray-50'" @click="onClickHandle(selected)")
          h1.font-medium.text-indigo-600 Microsoft
        .border-t.border-gray-200.px-8.py-4.text-sm.text-gray-600.leading-10(v-show="selected")
          p Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
      ListviewOption(as="li" key="google" value="samsung" v-slot="{ selected, active }" class="focus:outline-none")
        .p-8(:class="selected ? 'bg-indigo-50' : active ? 'cursor-pointer bg-gray-100' : 'bg-gray-50'" @click="onClickHandle(selected)")
          h1.font-medium.text-indigo-600 Google
        .border-t.border-gray-200.px-8.py-4.text-sm.text-gray-600.leading-10(v-show="selected")
          p Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.

  //-div
    p Microsoft ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus nam repellat praesentium veritatis asperiores omnis doloremque dolore, voluptatum consequuntur, sed quia iste, magni inventore voluptate dolores qui. Ipsa, quis saepe!
    p Samsung ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus nam repellat praesentium veritatis asperiores omnis doloremque dolore, voluptatum consequuntur, sed quia iste, magni inventore voluptate dolores qui. Ipsa, quis saepe!
  pre.mt-8.text-sm.bg-gray-50 {{ current ?? 'null' }}
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { Listview, ListviewOptions, ListviewOption } from "../components/listview/listview";
const props = defineProps({
  closable: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
});
//const options = ["Apple", "Microsoft", "Google", "Samsung"];

const current = props.closable ? ref(null) : props.multiple ? ref(["apple"]) : ref("apple");

const onClickHandle = (selected: boolean) => {
  if (selected && props.closable) setTimeout(() => (current.value = null), 0);
};

const tabClass = ({ selected, active }: { selected: boolean; active: boolean }) => {
  return "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none cursor-pointer " + (selected && active ? "text-indigo-700 border-indigo-600" : selected ? "text-indigo-600 border-indigo-500" : active ? "text-gray-700 border-gray-400" : "border-transparent text-gray-500");
};
</script>