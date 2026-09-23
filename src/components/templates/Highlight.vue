<script setup lang="ts">
import { ref, onMounted } from "vue";
import { toPng } from "html-to-image";
import { Download, Eye } from "lucide-vue-next";
import { useTemplateStore } from "../../store";
import { storeToRefs } from "pinia";
import CanvasFrame from "../canvas/CanvasFrame.vue";
import HighlightCanvas from "../canvas/HighlightCanvas.vue";
import { SQUARE_FORMAT } from "../canvas/formats";

const store = useTemplateStore();
const { maxLength, highlightMessage, author } = storeToRefs(store);
const currentTime = ref("");

const updateTime = () => {
  const now = new Date();

  currentTime.value = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "numeric",
  });
};

const downloadStatus = async () => {
  const element = document.getElementById("status-canvas");

  if (!element) return;

  try {
    // The canvas is already at its intrinsic export size, so pixelRatio is 1.
    const dataUrl = await toPng(element, {
      pixelRatio: 1,
      cacheBust: true,
    });

    updateTime();

    const link = document.createElement("a");

    link.download = `Sayless-${currentTime.value.replace(/:/g, "-")}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Failed to generate image:", error);
  }
};

onMounted(updateTime);
</script>

<template>
  <!-- Controls -->
  <section
    class="space-y-6 rounded-2xl border border-white/50 bg-black p-4 sm:p-6"
  >
    <h2 class="text-xl font-bold text-green-400">Highlighted Book</h2>

    <div>
      <div>
        <label class="block text-sm text-gray-400 mb-2 ml-1">Message</label>
        <textarea
          v-model="highlightMessage"
          placeholder="Enter a message..."
          rows="4"
          :maxlength="maxLength"
          class="w-full resize-none rounded-lg border border-white/50 bg-black/40 p-4 text-white outline-none focus:border-green-500"
        />
      </div>
      <div class="mt-2">
        <label class="block text-sm text-gray-400 mb-2 ml-1"
          >Author (optional)</label
        >
        <input
          v-model="author"
          type="text"
          placeholder="Enter Author"
          class="w-full bg-black/40 border border-white/50 rounded-lg p-2 outline-none focus:border-green-500 transition"
        />
      </div>

      <p
        class="text-end text-xs transition"
        :class="
          highlightMessage.length > maxLength - 20
            ? 'text-red-500'
            : 'text-white/50'
        "
      >
        {{ highlightMessage.length + " / " + maxLength }}
      </p>
    </div>

    <div class="flex gap-2">
      <RouterLink
        id="preview"
        to="/templates/highlight/preview"
        class="flex w-full items-center justify-center gap-1 rounded-lg border border-white px-6 py-3 text-white transition-colors hover:border-neutral-600 hover:bg-neutral-800"
      >
        <Eye class="max-sm:hidden" />
        <span>Preview</span>
      </RouterLink>

      <button
        id="download"
        @click="downloadStatus"
        class="flex w-full items-center justify-center rounded-xl bg-green-500 px-6 py-3 font-black tracking-wider text-white shadow-lg shadow-green-500/20 transition-transform hover:bg-green-400 active:scale-95"
      >
        Download

        <Download class="ml-1 max-sm:hidden" />
      </button>
    </div>
  </section>

  <!-- Canvas -->
  <section class="flex justify-center">
    <CanvasFrame v-bind="SQUARE_FORMAT">
      <HighlightCanvas />
    </CanvasFrame>
  </section>
</template>
