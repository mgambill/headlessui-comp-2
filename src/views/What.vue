<template lang="pug">
.text-left.space-y-4
  article
    h1.text-gray-800.font-medium.text-2xl What is this ?
    .text-gray-600.mt-4
      p This project started out as a way to show bug fixes for the vue components in
        a.mx-1.text-indigo-600(href="https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-vue/README.md" target="_blank") @headlessui/vue project
        | . While working on the project I realized another component that would be nice to have would be a
        router-link.mx-1.text-indigo-600(:to="{ name: 'sidebar' }") Listview
        | component (for lack of better name). Which is basically the same component as the
        router-link.mx-1.text-indigo-600(:to="{ name: 'listbox' }") Listbox
        | but without the open close and keyboard search. Since the Listview is headless the Tab, Sidebar and Accordion are just implementations of the Listview.

  article
    h1.text-gray-800.font-medium.text-2xl Source code

    .grid.grid-cols-4
      span Github
      .grid-cols-3: a(href="https://github.com/mgambill/headlessui-comp-2" target="_blank") https://github.com/mgambill/headlessui-comp-2

      span CodeSandbox
      .grid-cols-3: a(href="https://codesandbox.io/s/github/mgambill/headlessui-comp-2" target="_blank") https://codesandbox.io/s/github/mgambill/headlessui-comp-2

</template>
