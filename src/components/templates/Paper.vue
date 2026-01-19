<script setup lang="ts">
import { ref, onMounted } from "vue";
import { toPng } from "html-to-image";
import { Download, Eye } from "lucide-vue-next";
import { useTemplateStore } from "../../store";
import { storeToRefs } from "pinia";

const store = useTemplateStore();
const { maxLength } = storeToRefs(store);
const message = ref("");
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

  const dataUrl = await toPng(element, { pixelRatio: 3 });
  const link = document.createElement("a");
  updateTime();
  link.download = `Sayless-${currentTime.value}.png`;
  link.href = dataUrl;
  link.click();
};

onMounted(updateTime);

/* 🔑 RULED LINE SPACING = TEXT LINE HEIGHT */
// const RULE_HEIGHT = 30;

// const linesStyle = `
//   background-image:
//     repeating-linear-gradient(
//       to bottom,
//       transparent 0px,
//       transparent ${RULE_HEIGHT - 2}px,
//       rgba(158,193,230,0.55) ${RULE_HEIGHT - 1}px,
//       transparent ${RULE_HEIGHT}px
//     );
// `;

const noiseStyle = `
  background-image:
    url("/images/paper.jpg");
`;
</script>

<template>
  <!-- Controls -->
  <section
    class="space-y-6 bg-black p-4 sm:p-6 rounded-2xl border border-white/50"
  >
    <h2 class="text-xl font-bold text-green-400">Crumpled Paper</h2>
    <div>
      <textarea
        v-model="message"
        placeholder="Enter a message..."
        rows="4"
        :maxlength="maxLength"
        class="w-full bg-black/40 border border-white/50 rounded-lg p-4 resize-none outline-none focus:border-green-500"
      />
      <p
        class="text-xs text-end transition"
        :class="
          message.length > maxLength - 20 ? 'text-red-500' : 'text-white/50'
        "
      >
        {{ message.length + " /" + maxLength }}
      </p>
    </div>

    <div class="flex gap-2">
      <RouterLink
        to="/templates/paper/preview"
        class="w-full flex items-center justify-center gap-1 px-6 py-3 bg-transparent text-white border border-white rounded-lg hover:bg-neutral-800 hover:text-white hover:border-neutral-600 transition-colors"
      >
        <Eye class="max-sm:hidden" />
        <span>Preview</span>
      </RouterLink>
      <button
        @click="downloadStatus"
        class="w-full flex justify-center items-center bg-green-500 hover:bg-green-400 text-white tracking-wider font-black py-3 px-6 rounded-xl shadow-lg shadow-green-500/20 transition-transform active:scale-95"
      >
        Download
        <Download class="ml-1 max-sm:hidden" />
      </button>
    </div>
  </section>

  <!-- Canvas -->
  <section class="flex justify-center">
    <!-- :style="linesStyle" -->
    <div
      id="status-canvas"
      class="relative flex justify-center items-center max-w-90 min-w-72 p-8 aspect-9/16 overflow-hidden bg-[#f6f4ef] shadow-xl transition"
    >
      <!-- Paper grain -->
      <div
        class="absolute inset-0 pointer-events-none brightness-90"
        :style="noiseStyle"
      />

      <!-- Text -->
      <div class="relative z-10 text-container whitespace-pre-wrap text-xl">
        {{ message || "The quick brown fox jumped over the fence" }}
      </div>
    </div>
  </section>
</template>

<style>
.text-container {
  color: #2f4fa1;
  /* font-family:"Reid", "Patrick Hand", "Comic Neue", cursive; */
  font-family: "Reid", "Andelion Script";

  line-height: 30px;

  white-space: pre-wrap;

  /* 🔑 BASELINE ALIGNMENT FIX */
  padding-top: 6px;

  margin: 0;
  font-weight: 500;
}
</style>
