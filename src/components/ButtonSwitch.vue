<template lang="pug">
div
  Switch.w-full.relative.z-0.flex.mb-4.bg-gray-200.rounded-full.shadow-sm.ring-0.max-w-lg.m-auto(@click="onUpdate" class="focus:outline-none" :modelValue="on" v-slot="{ checked }")
    a.block.relative.z-20.items-center.flex-grow.px-4.py-2.text-sm.font-medium.border-gray-200.rounded-full(:class="!checked ? onClass : offClass" class="focus:z-30 focus:outline-none focus:bg-transparent") {{ left }}
    a.block.relative.z-20.items-center.flex-grow.px-4.py-2.text-sm.font-medium.border-gray-200.rounded-full(:class="checked ? onClass : offClass" class="focus:z-30 focus:outline-none focus:bg-transparent") {{ right }}
    span.absolute.top-0.bottom-0.z-10.inline-block.p-1.transition.duration-400.ease-out.transform.bg-white.border-2.border-gray-200.rounded-full.ring-0(:class="checked ? 'translate-x-full' : 'translate-x-0'" aria-hidden="true" class="w-1/2")
</template>

<script lang="ts" setup>
import { Switch } from "./switch/switch";
import { defineProps, ref, useContext } from "vue";

const { emit } = useContext();

const props = defineProps({
  left: String,
  right: String,
  modelValue: { type: Boolean, default: false },
  onClass: { type: String, default: "text-blue-700" },
  offClass: { type: String, default: "text-gray-700" },
});

// we need an internal copy
const on = ref(props.modelValue);
const onUpdate = () => {
  // perform the animation
  on.value = !on.value;
  // the idea behind the delay is to allow the animation to happen then alert caller of change
  setTimeout(() => {
    emit("update:modelValue", on.value);
  }, 100);
};
</script>