<script setup lang="ts">
import { templates } from "../data";
</script>
<template>
  <header
    class="max-w-6xl mx-auto mb-6 flex justify-between items-center md:mt-8 mt-12"
  >
    <div class="flex bg-black p-1 rounded-xl border border-white/66">
      <RouterLink
        v-for="{ name, path } in templates"
        :key="name"
        active-class="bg-[#22c55e] text-black"
        :to="path"
        class="px-4 py-2 rounded-lg font-bold text-sm transition-all capitalize tracking-wide"
      >
        {{ name }}
      </RouterLink>
    </div>
  </header>
  <main
    class="mt-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
  >
    <RouterView />
  </main>
</template>
