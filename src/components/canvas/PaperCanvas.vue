<script setup lang="ts">
import { useTemplateStore } from "../../store";

const store = useTemplateStore();
</script>

<template>
  <div
    id="status-canvas"
    class="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#f6f4ef] p-[96px]"
  >
    <!-- Paper grain -->
    <div class="paper-grain pointer-events-none absolute inset-0 brightness-90" />

    <!-- Text -->
    <div class="text-container relative z-10 text-[60px] whitespace-pre-wrap">
      {{ store.paperMessage || "The quick brown fox jumped over the fence" }}
    </div>
  </div>
</template>

<style scoped>
.paper-grain {
  background-image: url("/images/paper.jpg");

  /*
   * The source texture (1024x1457) is smaller than the 1080x1920 canvas, so it
   * must be told to cover. Left on `auto` it would tile and show seams.
   */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.text-container {
  color: #2f4fa1;

  font-family: "Reid", "Andelion Script";

  line-height: 90px;

  white-space: pre-wrap;

  /* Baseline alignment against the ruled-paper texture. */
  padding-top: 18px;

  margin: 0;
  font-weight: 500;
}
</style>
