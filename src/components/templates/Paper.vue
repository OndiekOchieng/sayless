<script setup lang="ts">
import { Eye } from "lucide-vue-next";
import { useTemplateStore } from "../../store";
import { storeToRefs } from "pinia";
import CanvasFrame from "../canvas/CanvasFrame.vue";
import PaperCanvas from "../canvas/PaperCanvas.vue";
import DownloadButton from "../canvas/DownloadButton.vue";
import { STATUS_FORMAT } from "../canvas/formats";

const store = useTemplateStore();
const { maxLength, paperMessage } = storeToRefs(store);
</script>

<template>
  <!-- Controls -->
  <section
    class="space-y-6 bg-black p-4 sm:p-6 rounded-2xl border border-white/50"
  >
    <h2 class="text-xl font-bold text-green-400">Crumpled Paper</h2>
    <div>
      <textarea
        v-model="paperMessage"
        placeholder="Enter a message..."
        rows="4"
        :maxlength="maxLength"
        class="w-full bg-black/40 border border-white/50 rounded-lg p-4 resize-none outline-none focus:border-green-500"
      />
      <p
        class="text-xs text-end transition"
        :class="
          paperMessage.length > maxLength - 20
            ? 'text-red-500'
            : 'text-white/50'
        "
      >
        {{ paperMessage.length + " /" + maxLength }}
      </p>
    </div>

    <div class="flex gap-2">
      <RouterLink
        id="preview"
        to="/templates/paper/preview"
        class="w-full flex items-center justify-center gap-1 px-6 py-3 bg-transparent text-white border border-white rounded-lg hover:bg-neutral-800 hover:text-white hover:border-neutral-600 transition-colors"
      >
        <Eye class="max-sm:hidden" />
        <span>Preview</span>
      </RouterLink>
      <DownloadButton />
    </div>
  </section>

  <!-- Canvas -->
  <section class="flex justify-center">
    <CanvasFrame v-bind="STATUS_FORMAT">
      <PaperCanvas />
    </CanvasFrame>
  </section>
</template>
