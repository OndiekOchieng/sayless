<script setup lang="ts">
import { computed, ref, type Component } from "vue";
import { toPng } from "html-to-image";
import { ChevronLeft, Download } from "lucide-vue-next";
import { useRoute } from "vue-router";
import CanvasFrame from "../components/canvas/CanvasFrame.vue";
import MinimalCanvas from "../components/canvas/MinimalCanvas.vue";
import TwitterCanvas from "../components/canvas/TwitterCanvas.vue";
import PaperCanvas from "../components/canvas/PaperCanvas.vue";
import HighlightCanvas from "../components/canvas/HighlightCanvas.vue";
import PosterCanvas from "../components/canvas/PosterCanvas.vue";
import {
  STATUS_FORMAT,
  SQUARE_FORMAT,
  type CanvasFormat,
} from "../components/canvas/formats";

interface TemplateEntry {
  canvas: Component;
  format: CanvasFormat;
  /** Layout-only wrapper classes, preserved from the previous markup. */
  wrapperClass: string;
}

const TEMPLATES: Record<string, TemplateEntry> = {
  minimal: {
    canvas: MinimalCanvas,
    format: STATUS_FORMAT,
    wrapperClass: "flex flex-col items-center",
  },
  twitter: {
    canvas: TwitterCanvas,
    format: STATUS_FORMAT,
    wrapperClass: "flex flex-col items-center",
  },
  paper: {
    canvas: PaperCanvas,
    format: STATUS_FORMAT,
    wrapperClass: "flex justify-center mt-12 md:mt-10",
  },
  highlight: {
    canvas: HighlightCanvas,
    format: SQUARE_FORMAT,
    wrapperClass: "flex justify-center mt-12 md:mt-10",
  },
  poster: {
    canvas: PosterCanvas,
    format: STATUS_FORMAT,
    wrapperClass: "flex flex-col items-center",
  },
};

const currentTime = ref("");
const route = useRoute();

const template = computed<TemplateEntry | undefined>(
  () => TEMPLATES[route.params.name as string],
);

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
  // The canvas is already at its intrinsic export size, so pixelRatio is 1.
  const dataUrl = await toPng(element, { pixelRatio: 1 });
  const link = document.createElement("a");
  updateTime();
  link.download = `Sayless-${currentTime.value}.png`;
  link.href = dataUrl;
  link.click();
};

const backRoute = computed(() => {
  return route.fullPath.split("/").slice(0, 3).join("/");
});
</script>

<template>
  <div>
    <section v-if="template" :class="template.wrapperClass">
      <CanvasFrame v-bind="template.format">
        <component :is="template.canvas" />
      </CanvasFrame>
    </section>

    <!-- Download and Back Button -->
    <div class="flex mx-auto gap-2 mt-4 max-w-90 min-w-72">
      <RouterLink
        :to="backRoute"
        class="flex w-full items-center justify-center px-6 py-3 bg-transparent text-white border border-white rounded-lg hover:bg-neutral-800 hover:text-white hover:border-neutral-600 transition-colors"
      >
        <ChevronLeft class="max-sm:hidden" />
        <span>Back</span>
      </RouterLink>
      <button
        id="download"
        @click="downloadStatus"
        class="flex w-full justify-center items-center bg-green-500 hover:bg-green-400 text-white tracking-wider font-black py-3 px-6 rounded-xl shadow-lg shadow-green-500/20 transition-transform active:scale-95"
      >
        Download
        <Download class="ml-1 max-sm:hidden" />
      </button>
    </div>
  </div>
</template>
