<script setup lang="ts">
import { ChevronDown, ChevronUp } from "lucide-vue-next";
import { ref } from "vue";

const isOpen = ref(false);

const faqs = [
  {
    question: "What is Sayless?",
    answer: "A minimalist tool for writing intentional WhatsApp text statuses.",
  },
  {
    question: "Is the payment really one-time?",
    answer: "Yes. Pay once and get lifetime access.",
  },
  {
    question: "How do payments work?",
    answer: "Payments are made securely via M-Pesa STK Push.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No. Sayless works entirely in your browser.",
  },
  {
    question: "Will my statuses be saved?",
    answer: "No. Sayless does not store your content.",
  },
];
</script>

<template>
  <div id="faq" className="min-h-screen text-white pt-12 md:pt-8 px-6">
    <div className="max-w-2xl mx-auto">
      <h2 className="text-center uppercase tracking-wider mb-16">FAQ</h2>

      <div>
        <!-- Faq item -->
        <div
          className="border-b border-white/20"
          v-for="{ question, answer } in faqs"
        >
          <button
            className="w-full py-6 text-left text-white hover:text-white/80 transition-colors duration-150 flex justify-between items-center"
          >
            <span>{{ question }}</span>
            <button @click="isOpen = !isOpen">
              <span className="text-white/40" v-if="isOpen"><ChevronUp /></span>
              <span className="text-white/40" v-else><ChevronDown /></span>
            </button>
          </button>
          <div v-if="isOpen" className="pb-6 text-white/60 leading-relaxed">
            {{ answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
