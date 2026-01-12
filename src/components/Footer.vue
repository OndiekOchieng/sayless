<script setup lang="ts">
import { CircleDashed} from "lucide-vue-next";
import { RouterLink } from "vue-router";

const templates = [
  { name: "plain noir", path: "/templates/plain" },
  {
    name: "twitter style",
    path: "/templates/twitter",
  },
];
const links = [
  {
    name: "templates",
    path: "/templates",
  },
  {
    name: "pricing",
    path: "/pricing",
  },
  {
    name: "faqs",
    path: "/faqs",
  },
];
</script>
<template>
  <footer class=" py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3
            class="text-white text-2xl gradient-text font-bold mb-4 font-oswald flex items-center"
          >
            <CircleDashed class="mr-1 text-red-500" :size="28" />
            Sayless
          </h3>
          <p class="text-gray-400">
            A minimalist tool for writing intentional WhatsApp text statuses.
          </p>
        </div>
        <div>
          <h3 class="text-white text-lg font-bold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li v-for="{ name, path } in links" :key="name">
              <RouterLink
                :to="path"
                class="text-gray-400 capitalize hover:text-green-400"
              >
                {{ name }}
              </RouterLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-white text-lg font-bold mb-4">Templates</h3>
          <ul class="space-y-2">
            <li class="flex flex-col">
              <RouterLink
                v-for="{ name, path } in templates"
                :to="path"
                class="text-gray-400 hover:text-green-400 capitalize"
              >
                {{ name }}
              </RouterLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-white text-lg font-bold mb-4">Newsletter</h3>
          <p class="text-gray-400 mb-4">
            Subscribe to our newsletter for the latest updates and offers.
          </p>
          <div class="flex">
            <input
              type="email"
              placeholder="Your email"
              class="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none w-full"
            />
            <button
              class="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition duration-300"
            >
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>

      <div
        class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-center items-center"
      >
        <p class="text-gray-400 text-sm mb-4 md:mb-0">
          &copy; {{ new Date().getFullYear() }} Sayless. All rights reserved.
        </p>
        <!-- <div class="flex space-x-6">
          <a href="#" class="text-gray-400 hover:text-green-400">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-green-400">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-green-400">
            <i class="fab fa-vimeo-v"></i>
          </a>
          <a href="#" class="text-gray-400 hover:text-green-400">
            <i class="fab fa-youtube"></i>
          </a>
        </div> -->
      </div>
    </div>
  </footer>
</template>
