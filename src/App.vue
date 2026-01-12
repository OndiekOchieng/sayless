<script setup lang="ts">
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';

</script>

<template>
  <div class="min-h-screen text-white p-4 md:p-8">
    <Navbar/>
    <RouterView/>
    <Footer/>
  </div>
</template>
