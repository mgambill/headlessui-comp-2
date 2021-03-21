<template lang="pug">
.w-full.max-w-xs.mx-auto
  SwitchGroup.flex.items-center.space-x-4(as="div")
    SwitchLabel Enable notifications
    Switch(class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline" as="button" v-model="switchValue" :class="switchValue ? 'bg-indigo-600' : 'bg-gray-200'" v-slot="{ checked }")
      span.inline-block.w-5.h-5.transition.duration-200.ease-in-out.transform.bg-white.rounded-full(:class="{ 'translate-x-5': checked, 'translate-x-0': !checked }")
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { SwitchGroup, Switch, SwitchLabel } from "../components/switch/switch";

const switchValue = ref(false);
</script>