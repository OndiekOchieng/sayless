<script setup lang="ts">
import { ref, onMounted } from "vue";
import { toPng } from "html-to-image";
import { Download, Eye } from "lucide-vue-next";
import { useTemplateStore } from "../../store";
import { storeToRefs } from "pinia";

// const props = defineProps({
//   canvasSize: { type: Number, default: 512 },
// });

const store = useTemplateStore();
const { maxLength, highlightMessage, author } = storeToRefs(store);
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

  try {
    const dataUrl = await toPng(element, {
      // Use pixelRatio 1 so 1 CSS px => 1 image px; the canvasSize prop controls CSS size.
      pixelRatio: 1,
      cacheBust: true,
    });

    updateTime();

    const link = document.createElement("a");

    link.download = `Sayless-${currentTime.value.replace(/:/g, "-")}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Failed to generate image:", error);
  }
};

onMounted(updateTime);
</script>

<template>
  <!-- Controls -->
  <section
    class="space-y-6 rounded-2xl border border-white/50 bg-black p-4 sm:p-6"
  >
    <h2 class="text-xl font-bold text-green-400">Highlighted Book</h2>

    <div>
      <div>
        <label class="block text-sm text-gray-400 mb-2 ml-1">Message</label>
        <textarea
          v-model="highlightMessage"
          placeholder="Enter a message..."
          rows="4"
          :maxlength="maxLength"
          class="w-full resize-none rounded-lg border border-white/50 bg-black/40 p-4 text-white outline-none focus:border-green-500"
        />
      </div>
      <div class="mt-2">
         <label class="block text-sm text-gray-400 mb-2 ml-1">Author (optional)</label>
         <input
           v-model="author"
           type="text"
           placeholder="Enter Author"
           class="w-full bg-black/40 border border-white/50 rounded-lg p-2 outline-none focus:border-green-500 transition"
         />
      </div>

      <p
        class="text-end text-xs transition"
        :class="
          highlightMessage.length > maxLength - 20
            ? 'text-red-500'
            : 'text-white/50'
        "
      >
        {{ highlightMessage.length + " / " + maxLength }}
      </p>
    </div>

    <div class="flex gap-2">
      <RouterLink
        to="/templates/highlight/preview"
        class="flex w-full items-center justify-center gap-1 rounded-lg border border-white px-6 py-3 text-white transition-colors hover:border-neutral-600 hover:bg-neutral-800"
      >
        <Eye class="max-sm:hidden" />
        <span>Preview</span>
      </RouterLink>

      <button
        @click="downloadStatus"
        class="flex w-full items-center justify-center rounded-xl bg-green-500 px-6 py-3 font-black tracking-wider text-white shadow-lg shadow-green-500/20 transition-transform hover:bg-green-400 active:scale-95"
      >
        Download

        <Download class="ml-1 max-sm:hidden" />
      </button>
    </div>
  </section>

  <!-- Canvas -->
  <section class="flex justify-center">
    <div
      id="status-canvas"
      
      class="paper max-w-lg min-w-72 aspect-square relative flex items-center justify-center overflow-hidden px-10 py-16 shadow-xl sm:px-14"
    >
      <!-- Paper texture -->
      <div class="paper-texture pointer-events-none absolute inset-0" />

      <!-- Additional subtle paper lighting -->
      <div class="paper-light pointer-events-none absolute inset-0" />

      <!-- Quote -->
      <div class="relative z-10 w-full text-center">
        <p class="highlighted-text whitespace-pre-wrapoverflow-hidden">
          {{ highlightMessage || "The quick brown fox, jumped over the fence" }}
        </p>

        <p v-if="author" class="author">— {{ author }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* =========================================================
   PAPER
   ========================================================= */

.paper {
  background: linear-gradient(
    135deg,
    #e9e2d9 0%,
    #ded7ce 35%,
    #e8e1d8 65%,
    #d8d0c7 100%
  );

  isolation: isolate;
}

/* Base paper grain */
.paper-texture {
  opacity: 0.62;

  background-image: url("/images/recycled.webp");

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  filter: grayscale(100%) contrast(0.85) brightness(1.08);

  mix-blend-mode: multiply;
}

/* Gives the paper some large-scale variation */
.paper-light {
  background:
    radial-gradient(
      ellipse at 20% 15%,
      rgba(255, 255, 255, 0.28),
      transparent 45%
    ),
    radial-gradient(ellipse at 80% 80%, rgba(90, 80, 65, 0.1), transparent 50%);

  opacity: 0.7;
}

/* =========================================================
   HIGHLIGHT
   ========================================================= */

.highlighted-text {
  /*
   * This is the most important part.
   *
   * box-decoration-break: clone means that when the text
   * wraps, every line gets its own highlight.
   */
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;

  display: inline;

  /*
   * Reference color is closer to fluorescent yellow/olive
   * than pure yellow.
   */
  background-color: rgba(205, 211, 0, 0.88);
  /* background-color: rgba(255, 192, 203, 0.749); */

  /*
   * Adds subtle variations inside the marker.
   */
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(90, 95, 0, 0.07) 0px,
      rgba(255, 255, 0, 0.03) 1px,
      rgba(70, 75, 0, 0.08) 2px,
      rgba(255, 255, 0, 0.02) 4px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04) 0px,
      transparent 2px,
      rgba(50, 50, 0, 0.05) 5px
    );

  /*
   * The marker extends slightly above and below the text.
   */
  /* padding: 0.025em 0.12em 0.08em; */
  padding: 0 0.2em;
  /* padding-top: 0.2em; */

  /*
   * Makes the ink feel slightly translucent.
   */
  background-blend-mode: multiply;

  /*
   * Very subtle unevenness.
   */
  border-radius: 1px;

  /*
   * Important for wrapped lines.
   */
  line-height: 1.15;

  /*
   * Prevents the highlight from looking too digitally perfect.
   */
  text-decoration: none;
}

/* =========================================================
   QUOTE TYPOGRAPHY
   ========================================================= */

.highlighted-text {
  color: #050505;

  /*
   * Cooper Black is very close to the character of the
   * reference image.
   *
   * If Cooper Black isn't installed on the machine,
   * Georgia provides a reasonable fallback.
   */
  /* font-family: "BilkoOpti", Georgia, "Times New Roman", serif; */
  font-family: Georgia, "Times New Roman", serif;

  font-size: clamp(1.1rem, 3.6vw, 2rem);

  font-weight: 500;

  /* letter-spacing: 0.045em; */

  line-height: 1.4;

  text-align: center;

  text-rendering: optimizeLegibility;
}

/* =========================================================
   AUTHOR
   ========================================================= */

.author {
  margin-top: 2rem;

  color: #090909;

  font-family: Georgia, "Times New Roman", serif;

  font-size: clamp(1rem, 2.5vw, 1.45rem);

  font-weight: 500;

  letter-spacing: -0.02em;
}

/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 640px) {
  .paper {
    padding-left: 1.75rem;
    padding-right: 1.75rem;
  }

  .highlighted-text {
    font-size: clamp(1.5rem, 4vw, 2rem);
    line-height: 1.4;
  }

  .author {
    margin-top: 2.5rem;
  }
}
</style>
