<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { toPng } from "html-to-image";
import { Download } from "lucide-vue-next";
import { useTemplateStore } from "../../store";

const store = useTemplateStore();
const postText = ref(store.message);

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
onUnmounted(() => {
  store.message = "";
  postText.value = "";
});
</script>
<template>
  <section class="space-y-6 bg-black p-6 rounded-2xl border border-white/50">
    <h2 class="text-xl flex items-center font-bold mb-4 text-green-400">
      Plain Noir
    </h2>
    <div>
      <label class="block text-sm text-gray-400 mb-2 ml-1">Message</label>
      <textarea
        v-model="postText"
        placeholder="Enter a message..."
        rows="4"
        class="w-full bg-black/40 border border-white/50 rounded-lg p-4 focus:border-green-500 outline-none transition resize-none"
      ></textarea>
    </div>

    <button
      @click="downloadStatus"
      class="w-full flex justify-center items-center bg-green-500 hover:bg-green-400 text-white tracking-wider font-black py-3 rounded-xl shadow-lg shadow-green-500/20 transition-transform active:scale-95"
    >
      Download
      <Download class="ml-1" />
    </button>
  </section>

  <section class="flex flex-col items-center font-sans">
    <div
      id="status-canvas"
      class="w-90 h-160 bg-black relative flex flex-col p-8 overflow-hidden shadow-2xl"
    >
      <div class="h-full flex flex-col justify-center items-center text-center">
        <div class="leading-tight text-start text-white px-4 blur-[.3px]">
          <p class="whitespace-pre-wrap">
            {{
              postText ||
              "The quick brown fox jumped over the fence."
            }}
          </p>
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
