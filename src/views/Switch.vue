<template>
  <div class="w-full max-w-xs mx-auto">
    <SwitchGroup as="div" class="flex items-center space-x-4">
      <SwitchLabel>Enable notifications</SwitchLabel>
      <Switch as="button" v-model="switchValue" class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline" :class="switchValue ? 'bg-indigo-600' : 'bg-gray-200'" v-slot="{ checked }">
        <span class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full" :class="{ 'translate-x-5': checked, 'translate-x-0': !checked }" />
      </Switch>
    </SwitchGroup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { SwitchGroup, Switch, SwitchLabel } from "../components/switch/switch";

const switchValue = ref(false);
</script>