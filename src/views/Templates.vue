<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { templates } from "../data";
import { ref, watch } from "vue";
const router = useRouter();
const selectTemplate = ref("");
watch(selectTemplate, (path) =>  {
  if(path){
    router.push(path)
  }
})

</script>
<template>
  <header
    class="max-w-6xl mx-auto mb-6 flex justify-between items-center md:mt-8 mt-12"
  >
  <!-- Desktop -->
    <div class="hidden sm:flex bg-black p-1 rounded-xl border border-white/66">
      <RouterLink
        v-for="{ name, path } in templates"
        :key="name"
        active-class="bg-[#22c55e] text-black"
        :to="path"
        class="max-[360px]:px-3 px-4 py-2 rounded-lg font-bold text-sm transition-all capitalize tracking-wide"
      >
        {{ name }}
      </RouterLink>
    </div>
    <!-- Mobile -->
    <div class="block sm:hidden mb-4 w-full">
      <select
        v-model="selectTemplate"
        class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black font-semibold focus:ring-2 focus:ring-green-500 focus:outline-none capitalize"
      >
        <option value="" disabled>Select template</option>
        <option
          v-for="{ name} in templates"
          :key="name"
          :value="name"
          class="capitalize!"
        >
         {{ name }}
        </option>
      </select>
    </div>
  </header>
  <main
    class="mt-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
  >
    <RouterView />
  </main>
</template>
