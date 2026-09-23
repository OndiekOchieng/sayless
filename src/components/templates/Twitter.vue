<script setup lang="ts">
import { ref } from "vue";
import { Eye, Plus } from "lucide-vue-next";
import { useTemplateStore } from "../../store";
import { storeToRefs } from "pinia";
import CanvasFrame from "../canvas/CanvasFrame.vue";
import TwitterCanvas from "../canvas/TwitterCanvas.vue";
import DownloadButton from "../canvas/DownloadButton.vue";
import { STATUS_FORMAT } from "../canvas/formats";
import {
  AVATAR_MAX_DIMENSION,
  fileToBoundedDataUrl,
} from "../../lib/prepareUpload";

const store = useTemplateStore();
const { userName, handle, maxLength, twitterMessage } = storeToRefs(store);
const uploadError = ref("");

const handleFileUpload = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  uploadError.value = "";

  try {
    store.profileImage = await fileToBoundedDataUrl(file, {
      maxDimension: AVATAR_MAX_DIMENSION,
      preservePng: true,
    });
  } catch (cause) {
    console.error("Error uploading photo:", cause);
    uploadError.value = "That image could not be used. Try another file.";
  }
};
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
          <img
            :src="store.profileImage"
            class="w-full h-full object-cover blur-[3px]"
          />
          <p class="absolute top-1/2 left-1/2 transform -translate-1/2">
            <Plus class="text-white" />
          </p>
          <input
            type="file"
            accept="image/*"
            @input="handleFileUpload"
            class="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <div class="flex-1">
          <p class="block text-sm capitalize text-white mb-2 font-bold">
            Add Profile Photo
          </p>
          <p v-if="uploadError" role="alert" class="text-xs text-red-400">
            {{ uploadError }}
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
        id="preview"
        to="/templates/twitter/preview"
        class="flex w-full items-center justify-center gap-1 px-6 py-3 bg-transparent text-white border border-white rounded-lg hover:bg-neutral-800 hover:text-white hover:border-neutral-600 transition-colors"
      >
        <Eye class="max-sm:hidden" />
        <span>Preview</span>
      </RouterLink>
      <DownloadButton />
    </div>
  </section>

  <section class="flex flex-col items-center font-sans">
    <CanvasFrame v-bind="STATUS_FORMAT">
      <TwitterCanvas />
    </CanvasFrame>
  </section>
</template>
