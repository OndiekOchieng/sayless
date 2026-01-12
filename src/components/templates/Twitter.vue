<script setup lang="ts">
import { ref, onMounted } from "vue";
import { toPng } from "html-to-image";
import { Calendar, Clock, LucideCheckCircle } from "lucide-vue-next";

const username = ref("John Doe");
const handle = ref("@johndoe");
const postText = ref("Your mood, formatted perfectly for WhatsApp Status.");
const profileImg = ref("/images/johndoe.jpg");
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
  link.download = `Sayless-${currentTime}.png`;
  link.href = dataUrl;
  link.click();
};

onMounted(updateTime);
</script>
<template>
  <section class="space-y-6 bg-[#1e1e1e] p-6 rounded-2xl border border-white/5">
    <h2 class="text-xl font-bold mb-4">Customize</h2>

    <div class="space-y-4">
      <div class="flex items-center gap-6 p-4 bg-black/20 rounded-xl">
        <div
          class="relative w-16 h-16 rounded-full overflow-hidden border border-white/10"
        >
          <!-- :style="{ transform: `scale(${imgScale})` }" -->
          <img :src="profileImg" class="w-full h-full object-cover" />
          <input
            type="file"
            @change="handleFileUpload"
            class="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <div class="flex-1">
          <p class="block text-xs capitalize text-white mb-2 font-bold">
            Template photo
          </p>
        </div>
        <!-- <div class="flex-1">
          <label class="block text-xs uppercase text-gray-400 mb-2 font-bold"
            >Zoom Avatar</label
          >
          <input
            type="range"
            v-model="imgScale"
            min="1"
            max="3"
            step="0.1"
            class="w-full accent-green-500"
          />
        </div> -->
      </div>

      <div class="grid grid-cols-2 gap-4">
        <input
          v-model="username"
          type="text"
          placeholder="Name"
          class="w-full bg-black/40 border border-white/10 rounded-lg p-3 outline-none"
        />
        <input
          v-model="handle"
          type="text"
          placeholder="@handle"
          class="w-full bg-black/40 border border-white/10 rounded-lg p-3 outline-none"
        />
      </div>
    </div>

    <div>
      <label class="block text-xs uppercase text-gray-400 mb-1 ml-1"
        >Message</label
      >
      <textarea
        v-model="postText"
        rows="5"
        class="w-full bg-black/40 border border-white/10 rounded-lg p-4 focus:border-green-500 outline-none transition resize-none"
      ></textarea>
    </div>

    <button
      @click="downloadStatus"
      class="w-full bg-green-500 hover:bg-green-400 text-black font-black py-4 rounded-xl shadow-lg shadow-green-500/20 transition-transform active:scale-95"
    >
      Download Image
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
            class="w-12 h-12 rounded-full overflow-hidden border border-white/10 "
          >
            <!-- :style="{ transform: `scale(${imgScale})` }" -->
            <img :src="profileImg" class="w-full h-full object-cover" />
          </div>
          <div>
            <div class="font-bold leading-tight text-white opacity-80 flex items-center">
              {{ username || "Username" }}
              <LucideCheckCircle class="text-blue-500 ml-1" :size="16"/>
            </div>
            <div class="text-gray-500 text-sm">
              {{ handle || "@handle" }}
            </div>
          </div>
        </div>
        <div
          class=" text-lg leading-snug text-white font-normal wrap-break-word py-2 blur-[.4px]"
        >
          {{ postText || "Share a vibe..." }}
        </div>
        <div class="text-gray-500 text-sm pt-2 flex justify-between">
          <span class="flex items-center">
            <Calendar :size="16" class="text-xs mr-1" />{{ currentDate }}</span
          >
          <span class="flex items-center">
            <Clock :size="16" class="text-xs mr-1" />{{ currentTime }}</span
          >
          <span class="text-green-500 font-bold tracking-widest">Sayless</span>
        </div>
      </div>
    </div>
  </section>
</template>
