<script setup lang="ts">
import { ChevronDown, ChevronUp } from "lucide-vue-next";
import { ref } from "vue";

const activeIndex = ref<number | null>(null);

const toggle = (i: number) => {
  activeIndex.value = activeIndex.value === i ? null : i;
};

const faqs = [
  {
    question: "What is Sayless?",
    answer: "A minimalist tool for writing intentional WhatsApp text statuses.",
  },
  {
    question: "How much does Sayless cost per month",
    answer:
      "Sayless is absolutely free. However super thanks contributions via M-pesa are accepted",
  },
  {
    question: "How do super thanks work?",
    answer: "Contributions of any amount are made securely via M-Pesa STK Push.",
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
  <div id="faq" className="min-h-screen text-white pt-16 md:pt-16 px-6">
    <div className="max-w-2xl mx-auto">
      <h2
        title="Frequently asked questions"
        className="text-center text-2xl tracking-wider mb-8"
      >
        FAQ's
      </h2>

      <div>
        <!-- Faq item -->
        <div
          className="border-b border-white/20"
          v-for="({ question, answer }, i) in faqs"
          :key="i"
        >
          <button
            @click="toggle(i)"
            className="w-full py-6 text-left text-white/80 hover:text-white/60 transition-colors duration-150 flex justify-between items-center"
          >
            <span>{{ question }}</span>
            <span>
              <span className="text-white" v-if="activeIndex === i"><ChevronUp /></span>
              <span className="text-white" v-else><ChevronDown /></span>
            </span>
          </button>
          <div v-if="activeIndex === i" className="pb-6 text-white leading-relaxed">
            {{ answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
