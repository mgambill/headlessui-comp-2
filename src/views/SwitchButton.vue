<template lang="pug">
.w-full.max-w-xs.mx-auto
  ButtonSwitch(left="Grid (false)" right="List (true)" v-model="switchValue")

pre.mt-8.text-sm {{ { switchValue } }}
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ButtonSwitch from "../components/ButtonSwitch.vue";

const switchValue = ref(false);
</script>