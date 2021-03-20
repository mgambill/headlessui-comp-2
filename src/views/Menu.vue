<template>
  <div class="relative inline-block text-left">
    <Menu>
      <span class="rounded-md shadow-sm">
        <MenuButton class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
          <span>Options</span>
          <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </MenuButton>
      </span>

      <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-out" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <MenuItems class="absolute left-0 w-56 mt-2 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
          <div class="px-4 py-3">
            <p class="text-sm leading-5">Signed in as</p>
            <p class="text-sm font-medium leading-5 text-gray-900 truncate">tom@example.com</p>
          </div>

          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a href="#account-settings" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'" class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"> Account settings </a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a href="#support" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'" class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"> Support </a>
            </MenuItem>
            <MenuItem disabled>
              <span class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 opacity-50 cursor-not-allowed"> New feature (soon) </span>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a href="#license" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'" class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"> License </a>
            </MenuItem>
          </div>
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a href="#sign-out" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'" class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"> Sign out </a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "../components/menu/menu";
</script>