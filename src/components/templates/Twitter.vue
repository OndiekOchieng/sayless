<script setup lang="ts">
import { ref, onMounted } from "vue";
import { toPng } from "html-to-image";
import { Download, LucideCheckCircle, Plus } from "lucide-vue-next";

const username = ref("");
const handle = ref("");
const postText = ref("");
const profileImg = ref("/images/logo.png");
// const imgScale = ref(1);
const currentDate = ref("");
const currentTime = ref("");

const updateTime = () => {
  const now = new Date();
  currentDate.value = now.toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  currentTime.value = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handleFileUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  if (file) profileImg.value = URL.createObjectURL(file);
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
  <section class="space-y-6 bg-black p-6 rounded-2xl border border-white/50">
    <h2 class="text-xl font-bold mb-4 text-green-400">Twitter Style</h2>

    <div class="space-y-4">
      <div class="flex items-center gap-6 p-4 bg-black/20 rounded-xl">
        <div
          class="relative w-16 h-16 rounded-full overflow-hidden border border-white/50"
        >
          <!-- :style="{ transform: `scale(${imgScale})` }" -->
          <img
            :src="profileImg"
            class="w-full h-full object-cover blur-[3px]"
          />
          <p class="absolute top-1/2 left-1/2 transform -translate-1/2">
            <Plus class="text-white" />
          </p>
          <input
            type="file"
            @change="handleFileUpload"
            class="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <div class="flex-1">
          <p class="block text-sm capitalize text-white mb-2 font-bold">
            Add Profile Photo
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          v-model="username"
          type="text"
          placeholder="Enter Username"
          class="w-full bg-black/40 border border-white/50 rounded-lg p-2 outline-none focus:border-green-500 transition"
        />
        <input
          v-model="handle"
          type="text"
          placeholder="Enter handle"
          class="w-full bg-black/40 border border-white/50 rounded-lg p-2 outline-none focus:border-green-500 transition"
        />
      </div>
    </div>

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
      class="w-full bg-green-500 tracking-wider hover:bg-green-400 flex justify-center items-center text-white font-black py-3 rounded-xl shadow-lg shadow-green-500/20 transition-transform active:scale-95"
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
      <div class="h-full flex flex-col justify-center space-y-4">
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-full overflow-hidden border border-white/10"
          >
            <!-- :style="{ transform: `scale(${imgScale})` }" -->
            <img :src="profileImg" class="w-full h-full object-cover" />
          </div>
          <div>
            <div
              class="font-bold leading-tight text-white opacity-80 flex items-center capitalize"
            >
              {{ username || "Username" }}
              <LucideCheckCircle class="text-blue-500 ml-1" :size="16" />
            </div>
            <div class="text-gray-500 text-sm lowercase">
              @{{ handle || "handle" }}
            </div>
          </div>
        </div>
        <div
          class="text-lg leading-snug text-white font-normal wrap-break-word py-2 blur-[.4px]"
        >
          <p class=" whitespace-pre-wrap">{{ postText || "What feels uncertain is often the doorway to something original." }}</p>
        </div>
        <!-- <div class="text-gray-500 text-sm pt-2 flex justify-between">
          <span class="flex items-center">
            <Calendar :size="16" class="text-xs mr-1" />{{ currentDate }}</span
          >
          <span class="flex items-center">
            <Clock :size="16" class="text-xs mr-1" />{{ currentTime }}</span
          >
          <span class="text-green-500 font-bold tracking-widest">Sayless</span>
        </div> -->
      </div>
    </div>
  </section>
</template>
