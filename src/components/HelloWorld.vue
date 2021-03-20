<template>
  <div class="px-8 prose">
    <h1>{{ msg }}</h1>
    <button class="px-3 py-2 border border-gray-300 rounded-md shadow" @click="increment">
      count is: {{ count }}
    </button>
    <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>

    <p class="text-sm text-gray-700">vite-ts-tailwind-starter v{{ appVersion }}</p>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useStore, Mutation } from '@/store/index'

export default {
  props: {
    msg: String,
  },
  setup() {
    const store = useStore()
    const appVersion = store.state.version // not reactive!
    const count = computed(() => store.state.count)

    return {
      count,
      appVersion,
    }
  },
  methods: {
    increment() {
      const store = useStore()
      store.commit(Mutation.INCREMENT, 1)
    },
  },
}
</script>
