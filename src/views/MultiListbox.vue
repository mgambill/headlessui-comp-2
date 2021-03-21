<template lang="pug">
.w-full.max-w-xs.mx-auto
  Listbox.space-y-1(as="div" v-model="selectedPerson" v-slot="{ open }")
    ListboxLabel.block.text-sm.font-medium.leading-5.text-gray-700 Assigned to
    .relative
      span.inline-block.w-full.rounded-md.shadow-sm
        ListboxButton.relative.w-full.py-2.pl-3.pr-10.text-left.transition.duration-150.ease-in-out.bg-white.border.border-gray-300.rounded-md.cursor-default(class="focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5")
          span.block.truncate(:class="selectedPerson.length === 0 ? 'text-gray-400' : ''") {{ selectedPerson.length === 0 ? 'Please select a person' : selectedPerson.join(', ') }}
          span.absolute.inset-y-0.right-0.flex.items-center.pr-2.pointer-events-none
            svg.w-5.h-5.text-gray-400(viewBox="0 0 20 20" fill="none" stroke="currentColor")
              path(d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round")
      transition(leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0")
        .absolute.w-full.mt-1.bg-white.rounded-md.shadow-lg(v-if="open")
          ListboxOptions.py-1.overflow-auto.text-base.leading-6.rounded-md.shadow-xs.max-h-60.space-y-px.pl-px(class="focus:outline-none sm:text-sm sm:leading-5" static)
            ListboxOption(v-for="person in people" :key="person" :value="person" v-slot="{ selected, active }" @click="onClick")
              .mr-px(:class="`${selected && active ? 'bg-gray-700 text-white' : selected ? 'bg-gray-200' : active ? 'text-white bg-blue-600' : 'text-gray-900'} cursor-default select-none relative py-2 pl-8 pr-4`")
                span(:class="`${selected ? 'font-semibold' : 'font-normal'} block truncate`")
                  | {{ person }}
                span(v-if="selected" :class="`${active ? 'text-white' : 'text-blue-600'} absolute inset-y-0 left-0 flex items-center pl-1.5`")
                  svg.w-5.h-5(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor")
                    path(fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd")
pre.mt-8.text-sm {{ { selectedPerson } }}
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from "../components/listbox/listbox";

const people = ["Wade Cooper", "Arlene Mccoy", "Devon Webb", "Tom Cook", "Tanya Fox", "Hellen Schmidt", "Caroline Schultz", "Mason Heaney", "Claudie Smitham", "Emil Schaefer"];
const selectedPerson = ref([people[0], people[1]]);

const onClick = (e) => console.log("onClick", e, selectedPerson);
</script>