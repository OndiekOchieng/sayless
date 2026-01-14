<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { toPng } from "html-to-image";
import { Download } from "lucide-vue-next";
import { useTemplateStore } from "../../store";

const store = useTemplateStore();

// const username = ref(store.userName);
const postText = ref(store.message);
const currentTime = ref("");

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handleLocalStorage = () => {
  store.message = postText.value;
//   store.userName = username.value;
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

/* 🔑 RULED LINE SPACING = TEXT LINE HEIGHT */
const RULE_HEIGHT = 30;

const linesStyle = `
  background-image:
    repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent ${RULE_HEIGHT - 2}px,
      rgba(158,193,230,0.55) ${RULE_HEIGHT - 1}px,
      transparent ${RULE_HEIGHT}px
    );
`;

const noiseStyle = `
  background-image:
    url("/images/noise.png");
`;
</script>

<template>
  <!-- Controls -->
  <section class="space-y-6 bg-black p-6 rounded-2xl border border-white/50">
    <h2 class="text-xl font-bold text-green-400">Notepad Style</h2>

    <!-- <input
      v-model="username"
      @input="handleLocalStorage"
      type="text"
      placeholder="Enter Username"
      class="w-full bg-black/40 border border-white/50 rounded-lg p-2 outline-none focus:border-green-500"
    /> -->

    <textarea
      v-model="postText"
      @input="handleLocalStorage"
      placeholder="Enter a message..."
      rows="4"
      class="w-full bg-black/40 border border-white/50 rounded-lg p-4 resize-none outline-none focus:border-green-500"
    />

    <button
      @click="downloadStatus"
      class="w-full bg-green-500 hover:bg-green-400 flex items-center justify-center gap-2 text-white font-black py-3 rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition"
    >
      Download <Download />
    </button>
  </section>

  <!-- Canvas -->
  <section class="flex justify-center mt-10">
    <div
      id="status-canvas"
      class="relative w-90 p-8 overflow-hidden bg-[#f6f4ef] shadow-xl"
      :style="linesStyle"
    >
      <!-- Paper grain -->
      <div
        class="absolute inset-0 pointer-events-none opacity-20 blur-xs"
        :style="noiseStyle"
      />

      <!-- Text -->
      <div
        class="relative z-10 text-container whitespace-pre-wrap text-2xl"
      >
        {{ store.message || "The quick brown fox jumped over the fence" }}
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-container {
  color: #2f4fa1;
  /* font-family: "Patrick Hand", "Comic Neue", cursive; */
  font-family: "Reid";

  line-height: 30px;

  white-space: pre-wrap;

  /* 🔑 BASELINE ALIGNMENT FIX */
  padding-top: 4px;

  margin: 0;
}
</style>
