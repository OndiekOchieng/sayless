<script setup lang="ts">
import { Menu, X } from "lucide-vue-next";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { links } from "../data";

const isOpen = ref(false);
</script>
<template>
  <nav
    class="fixed left-1 right-1 top-1 z-50 py-2 md:rounded-lg rounded-lg bg-green-500 transtion bg-opacity-80 backdrop-filter backdrop-blur-2xl"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <div class="shrink-0 flex items-center">
          <!-- <CircleDashed class="mr-1 text-red-500" :size="20" /> -->
          <img src="/images/logo.png" class="mr-1 align-super" width="20" alt="Kenyan flag">

          <span class="text-white text-xl font-bold gradient-text">
            Sayless
            <span class="text-xs align-super text-red-600">254</span>
            <!-- <img src="/images/flag.png" class="ml-1 align-super" width="16" alt="Kenyan flag"> -->
          </span>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-center space-x-8">
            <RouterLink
              v-for="({ name, path }, _) in links"
              activeClass="text-black font-semibold "
              class="transition"
              :key="name"
              :to="path"
              >{{ name }}</RouterLink
            >
          </div>
        </div>
        <div class="md:hidden">
          <button
            @click="isOpen = !isOpen"
            id="mobile-menu-button"
            class="text-white focus:outline-none"
          >
            <X v-if="isOpen" :size="30" />
            <Menu :size="30" v-else />
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile menu -->
    <div class="transition" v-if="isOpen">
      <div
        :class="[
          isOpen
            ? 'md:hidden  px-4 py-2'
            : 'md:hidden hidden bg-white px-4 py-2',
        ]"
      >
        <RouterLink
          class="block py-2 hover:text-gold/90 transition capitalize"
          activeClass="text-black font-semibold transition"
          v-for="{ path, name } in links"
          @click="isOpen = false"
          :key="name"
          :to="path"
          >{{ name }}</RouterLink
        >
      </div>
    </div>
    <!-- <div  id="mobile-menu" :class="[isOpen ? 'md:hidden bg-white px-4 py-2': 'md:hidden hidden bg-white px-4 py-2' ]">
      <a @click="isOpen = !isOpen" v-for="link in links" :href="`#${link}`" class="block py-2 hover:text-gold/90 transition capitalize">{{ link }}</a>
      
    </div> -->
  </nav>
</template>
