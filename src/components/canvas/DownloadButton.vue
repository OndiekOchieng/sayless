<script setup lang="ts">
import { ref } from "vue";
import { Download } from "lucide-vue-next";
import { buildFileName, exportElementAsPng } from "../../lib/exportImage";

/**
 * The single download control for every template.
 *
 * Keeps the `id="download"` hook, which GTM uses as a click trigger for the
 * template_download event.
 */
const busy = ref(false);
const error = ref("");

const run = async () => {
  if (busy.value) return;

  busy.value = true;
  error.value = "";

  try {
    const element = document.getElementById("status-canvas");
    if (!element) {
      throw new Error("No canvas to export.");
    }

    await exportElementAsPng(element, buildFileName());
  } catch (cause) {
    console.error("Failed to generate image:", cause);
    error.value = "Download failed. Please try again.";
  } finally {
    busy.value = false;
  }
};
</script>

<template>
  <div class="relative w-full">
    <button
      id="download"
      :disabled="busy"
      @click="run"
      class="flex w-full justify-center items-center bg-green-500 hover:bg-green-400 text-white tracking-wider font-black py-3 px-6 rounded-xl shadow-lg shadow-green-500/20 transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {{ busy ? "Preparing…" : "Download" }}
      <Download v-if="!busy" class="ml-1 max-sm:hidden" />
    </button>

    <p
      v-if="error"
      role="alert"
      class="absolute inset-x-0 top-full mt-1 text-center text-xs text-red-400"
    >
      {{ error }}
    </p>
  </div>
</template>
