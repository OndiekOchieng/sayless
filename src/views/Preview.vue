<script setup lang="ts">
import { computed, ref } from "vue";
import { useTemplateStore } from "../store";
import { toPng } from "html-to-image";
import { ChevronLeft, Download } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const currentTime = ref("");
const currentDate = ref("");
const store = useTemplateStore();
const { posterImage } = storeToRefs(store);
const route = useRoute();

//
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
    second: "numeric",
  });
};

// Paper Template
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
//

const backRoute = computed(() => {
  return route.fullPath.split("/").slice(0, 3).join("/");
});
</script>

<template>
  <div class="">
    <!-- Plain Template Preview -->
    <section
      v-if="$route.params.name === 'minimal'"
      class="flex flex-col items-center font-sans"
    >
      <div
        id="status-canvas"
        class="max-w-90 min-w-72 aspect-9/16 bg-black relative flex flex-col p-6 overflow-hidden shadow-2xl"
      >
        <div
          class="h-full flex flex-col justify-center items-center text-center"
        >
          <div class="leading-tight text-start text-white blur-[.1px]">
            <p class="whitespace-pre-wrap text-base">
              {{
                store.minimalMessage ||
                "The quick brown fox jumped over the fence"
              }}
            </p>
          </div>
          <!-- <div
            class="absolute bottom-10 opacity-20 text-[10px] tracking-[0.5em] uppercase text-white"
          >
            Sayless
          </div> -->
        </div>
      </div>
    </section>

    <!-- Twitter Template view -->
    <section
      v-if="$route.params.name === 'twitter'"
      class="flex flex-col items-center font-sans"
    >
      <div
        id="status-canvas"
        class="max-w-90 min-w-72 aspect-9/16 bg-black relative flex flex-col p-8 overflow-hidden shadow-2xl"
      >
        <div class="h-full flex flex-col justify-center space-y-1">
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-full overflow-hidden border border-white/10"
            >
              <!-- :style="{ transform: `scale(${imgScale})` }" -->
              <img
                :src="store.profileImage"
                class="w-full h-full object-cover"
              />
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
              {{
                store.twitterMessage ||
                "The quick brown fox jumped over the fence."
              }}
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

    <!-- Paper Template -->
    <section
      v-if="$route.params.name === 'paper'"
      class="flex justify-center mt-12 md:mt-10"
    >
      <!-- :style="linesStyle" -->
      <div
        id="status-canvas"
        class="relative flex justify-center items-center max-w-90 min-w-72 aspect-9/16 p-8 overflow-hidden bg-[#f6f4ef] shadow-xl"
      >
        <!-- Paper grain -->
        <div
          class="absolute inset-0 pointer-events-none brightness-90"
          :style="noiseStyle"
        />

        <!-- Text -->
        <div class="relative z-10 text-container whitespace-pre-wrap text-xl">
          {{
            store.paperMessage || "The quick brown fox jumped over the fence"
          }}
        </div>
      </div>
    </section>
    <!-- Poster preview -->
    <section
      v-if="$route.params.name === 'poster'"
      class="flex flex-col items-center font-sans"
    >
      <div
        id="status-canvas"
        class="max-w-90 min-w-72 transition aspect-9/16 bg-black relative flex flex-col p-8 overflow-hidden shadow-2xl"
      >
        <div class="h-full flex flex-col justify-center space-y-1">
          <div class="leading-snug text-white py-2">
            <p class="whitespace-pre-wrap blur-[.3px]">
              {{
                store.posterMessage ||
                "The quick brown fox jumped over the fence."
              }}
            </p>
          </div>
          <div class="flex items-center justify-center">
            <div class="max-w-72 overflow-hidden">
              <img :src="posterImage" class="w-full h-full object-cover" />
            </div>
            <div></div>
          </div>
        </div>
      </div>
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
        @click="downloadStatus"
        class="flex w-full justify-center items-center bg-green-500 hover:bg-green-400 text-white tracking-wider font-black py-3 px-6 rounded-xl shadow-lg shadow-green-500/20 transition-transform active:scale-95"
      >
        Download
        <Download class="ml-1 max-sm:hidden" />
      </button>
    </div>
  </div>
</template>
<!-- Note pad styles -->

<!--  -->
