<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

</script>

<template>
   <div class="">
    <Navbar v-if="$route.name !== 'preview'" />
    <div class=" text-white py-4 px-3 md:p-8">
      <RouterView />
    </div>
    <Footer v-if="$route.name !== 'preview'" />
  </div>
</template>
