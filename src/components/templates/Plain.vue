<script setup lang="ts">
import { ref, onMounted } from "vue";
import { toPng } from "html-to-image";
import { Download } from "lucide-vue-next";

const postText = ref("Your text, formatted perfectly for WhatsApp Status.");

const currentTime = ref("");

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
    // weekday:"short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const downloadStatus = async () => {
  const element = document.getElementById("status-canvas");
  if (!element) return;
  const dataUrl = await toPng(element, { pixelRatio: 3 });
  const link = document.createElement("a");
  link.download = `Sayless-${currentTime.value}.png`;
  link.href = dataUrl;
  link.click();
};

onMounted(updateTime);
</script>
<template>
  <section class="space-y-6 bg-[#1e1e1e] p-6 rounded-2xl border border-white/5">
    <h2 class="text-xl font-bold mb-4">Customize</h2>
    <div>
      <label class="block text-xs text-gray-400 mb-1 ml-1">Message</label>
      <textarea
        v-model="postText"
        rows="5"
        class="w-full bg-black/40 border border-white/10 rounded-lg p-4 focus:border-green-500 outline-none transition resize-none"
      ></textarea>
    </div>

    <button
      @click="downloadStatus"
      class="w-full flex justify-center bg-green-500 hover:bg-green-400 text-black font-black py-4 rounded-xl shadow-lg shadow-green-500/20 transition-transform active:scale-95"
    >
      Download Status
      <Download class="text-black ml-2" />
    </button>
  </section>

  <section class="flex flex-col items-center font-sans">
    <div
      id="status-canvas"
      class="w-90 h-160 bg-black relative flex flex-col p-8 overflow-hidden shadow-2xl"
    >
      <div class="h-full flex flex-col justify-center items-center text-center">
        <div
          class="leading-tight text-start text-white px-4 blur-[.5px]"
        >
          {{ postText || "Minimal text status." }}
        </div>
        <!-- <div
            class="absolute bottom-10 opacity-20 text-[10px] tracking-[0.5em] uppercase text-white"
          >
            Sayless
          </div> -->
      </div>
    </div>
  </section>
</template>

<style></style>
