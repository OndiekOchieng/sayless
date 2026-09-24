<script setup lang="ts">
import { Eye } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { useTemplateStore } from "../../store";
import CanvasFrame from "../canvas/CanvasFrame.vue";
import MinimalCanvas from "../canvas/MinimalCanvas.vue";
import DownloadButton from "../canvas/DownloadButton.vue";
import { STATUS_FORMAT } from "../canvas/formats";

const store = useTemplateStore();
const { maxLength, minimalMessage } = storeToRefs(store);
</script>
<template>
  <section
    class="space-y-6 bg-black p-4 sm:p-6 rounded-2xl border border-white/50"
  >
    <h2 class="text-xl flex items-center font-bold mb-4 text-green-400">
      Minimal
    </h2>
    <div>
      <label class="block text-sm text-gray-400 mb-2 ml-1">Message</label>
      <textarea
        :maxlength="maxLength"
        v-model="minimalMessage"
        placeholder="Enter a Message..."
        rows="4"
        class="w-full bg-black/40 border border-white/50 rounded-lg p-4 focus:border-green-500 outline-none transition resize-none"
      ></textarea>
      <p
        class="text-xs text-end transition"
        :class="
          minimalMessage.length > maxLength - 20
            ? 'text-red-500'
            : 'text-white/50'
        "
      >
        {{ minimalMessage.length + " /" + maxLength }}
      </p>
    </div>
    <div class="flex gap-2">
      <RouterLink
        id="preview"
        to="/templates/minimal/preview"
        class="w-full flex items-center justify-center gap-1 px-6 py-3 bg-transparent text-white border border-white rounded-lg hover:bg-neutral-800 hover:text-white hover:border-neutral-600 transition-colors"
      >
        <Eye class="max-sm:hidden" />
        <span>Preview</span>
      </RouterLink>
      <DownloadButton />
    </div>
  </section>

  <section class="flex flex-col items-center font-sans">
    <CanvasFrame v-bind="STATUS_FORMAT">
      <MinimalCanvas />
    </CanvasFrame>
  </section>
</template>
