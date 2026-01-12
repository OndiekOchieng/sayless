<script setup lang="ts">
import { Minus, Plus } from "lucide-vue-next";
import { ref } from "vue";

defineProps({
  question: String,
  answer: String,
});

const isOpen = ref(true);
</script>

<template>
  <div className="border-b border-white/20">
    <button
      className="w-full py-6 text-left text-white hover:text-white/80 transition-colors duration-150 flex justify-between items-center"
    >
      <span>{{ question }}</span>
      <span className="text-white/40" v-if="isOpen"><Plus /></span>
      <span className="text-white/40" v-else><Minus /></span>
    </button>
    <div v-if="isOpen" className="pb-6 text-white/60 leading-relaxed">
      {{ answer }}
    </div>
  </div>
</template>
