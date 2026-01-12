<script setup lang="ts">
const templates = [
  { name: "plain noir", path: "/templates/plain" },
  {
    name: "twitter style",
    path: "/templates/twitter",
  },
]; // 'twitter' or 'plain'
</script>
<template>
  <header class="max-w-6xl mx-auto mb-6 flex justify-between items-center md:mt-0 mt-8">
    <div class="flex bg-black p-1 rounded-xl border border-white/66">
      <RouterLink
        v-for="{ name, path } in templates"
        :key="name"
        active-class="bg-[#22c55e] text-black"
        :to="path"
        class="px-4 py-2 rounded-lg font-bold text-xs transition-all capitalize"
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
