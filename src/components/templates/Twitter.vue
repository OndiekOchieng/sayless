<script setup lang="ts">
import { ref, onMounted } from "vue";
import { toPng } from "html-to-image";
import { Download, Eye, Plus } from "lucide-vue-next";
import { useTemplateStore } from "../../store";
import { storeToRefs } from "pinia";

const currentDate = ref("");
const currentTime = ref("");
const store = useTemplateStore();
const { userName, handle, maxLength, twitterMessage } = storeToRefs(store);
let profileImg = ref("/images/johndoe.jpg");

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
    second: "2-digit",
  });
};

const handleFileUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  if (file) {
    profileImg.value = URL.createObjectURL(file);
    const reader = new FileReader();
    reader.onload = () => {
      store.profileImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    console.error("Error uploading photo");
  }
};

const downloadStatus = async () => {
  const element = document.getElementById("status-canvas");
  if (!element) return;
  const dataUrl = await toPng(element, { pixelRatio: 2 });
  const link = document.createElement("a");
  updateTime();
  link.download = `Sayless-${currentTime.value}.png`;
  link.href = dataUrl;
  link.click();
};

onMounted(updateTime);
</script>
<template>
  <section
    class="space-y-6 bg-black p-4 sm:p-6 rounded-2xl border border-white/50"
  >
    <h2 class="text-xl font-bold mb-4 text-green-400">Twitter Style</h2>

    <div class="space-y-4">
      <div class="flex items-center gap-6 p-4 bg-black/20 rounded-xl">
        <div
          class="relative w-16 h-16 rounded-full overflow-hidden border border-white/50"
        >
          <!-- :style="{ transform: `scale(${imgScale})` }" -->
          <img
            :src="store.profileImage"
            class="w-full h-full object-cover blur-[3px]"
          />
          <p class="absolute top-1/2 left-1/2 transform -translate-1/2">
            <Plus class="text-white" />
          </p>
          <input
            type="file"
            @input="handleFileUpload"
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
          v-model="userName"
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
        v-model="twitterMessage"
        placeholder="Enter a message..."
        rows="4"
        :maxlength="maxLength"
        class="w-full bg-black/40 border border-white/50 rounded-lg p-4 focus:border-green-500 outline-none transition resize-none"
      ></textarea>
      <p
        class="text-xs text-end transition"
        :class="
          twitterMessage.length >= maxLength - 20
            ? 'text-red-500'
            : 'text-white/50'
        "
      >
        {{ twitterMessage.length + " /" + maxLength }}
      </p>
    </div>

    <div class="flex gap-2">
      <RouterLink
        to="/templates/twitter/preview"
        class="flex w-full items-center justify-center gap-1 px-6 py-3 bg-transparent text-white border border-white rounded-lg hover:bg-neutral-800 hover:text-white hover:border-neutral-600 transition-colors"
      >
        <Eye class="max-sm:hidden" />
        <span>Preview</span>
      </RouterLink>
      <button
        @click="downloadStatus"
        class="flex w-full justify-center items-center bg-green-500 hover:bg-green-400 text-white tracking-wider font-black py-3 px-6 rounded-xl shadow-lg shadow-green-500/20 transition-transform active:scale-95"
      >
        Download
        <Download class="ml-1 max-sm:hidden" />
      </button>
    </div>
  </section>

  <section class="flex flex-col items-center font-sans">
    <div
      id="status-canvas"
      class="max-w-90 min-w-72 transition aspect-9/16 bg-black relative flex flex-col p-8 overflow-hidden shadow-2xl"
    >
      <div class="h-full flex flex-col justify-center space-y-1">
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-full overflow-hidden border border-white/10"
          >
            <!-- :style="{ transform: `scale(${imgScale})` }" -->
            <img :src="store.profileImage" class="w-full h-full object-cover" />
          </div>
          <div>
            <div
              class="font-semibold leading-tight text-white opacity-80 flex items-center capitalize"
            >
              {{ store.userName || "Username" }}
              <!-- <LucideCheckCircle
                class="text-blue-400 ml-1 opacity-100"
                :size="14"
              /> -->
              <img
                src="/images/check.png"
                width="16"
                class="ml-0.5"
                alt="Check mark"
              />
            </div>
            <div class="text-gray-500 text-sm lowercase">
              @{{ store.handle || "handle" }}
            </div>
          </div>
        </div>
        <div
          class="text-xl leading-snug text-white font-normal wrap-break-word py-2"
        >
          <p class="whitespace-pre-wrap blur-[.3px]">
            {{ twitterMessage || "The quick brown fox jumped over the fence." }}
          </p>
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
