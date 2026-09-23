<script setup lang="ts">
import { useTemplateStore } from "../../store";

const store = useTemplateStore();
</script>

<template>
  <div
    id="status-canvas"
    class="paper relative flex h-full w-full items-center justify-center overflow-hidden px-[118px] py-[135px]"
  >
    <!-- Paper texture -->
    <div class="paper-texture pointer-events-none absolute inset-0" />

    <!-- Additional subtle paper lighting -->
    <div class="paper-light pointer-events-none absolute inset-0" />

    <!-- Quote -->
    <div class="relative z-10 w-full text-center">
      <span class="highlighted-text">
        {{
          store.highlightMessage ||
          "When you're born in a burning house, you think the whole world is on fire. But it's not."
        }}
      </span>

      <p v-if="store.author" class="author">— {{ store.author }}</p>
    </div>
  </div>
</template>

<style scoped>
/* =========================================================
   PAPER
   ========================================================= */

.paper {
  background: linear-gradient(
    135deg,
    #dfcfb8 0%,
    #d4c1a5 35%,
    #ddcbb2 65%,
    #cdb594 100%
  );

  isolation: isolate;
}

/* Base paper grain */
.paper-texture {
  opacity: 0.62;

  background-image: url("/images/old2.jpg");

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
   HIGHLIGHT + QUOTE TYPOGRAPHY
   ========================================================= */

.highlighted-text {
  /*
   * box-decoration-break: clone means that when the text wraps, every line
   * gets its own highlight. It requires an inline box, hence <span>.
   */
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;

  display: inline;

  /* Honour newlines typed into the editor. */
  white-space: pre-wrap;

  /*
   * Reference color is closer to fluorescent yellow/olive than pure yellow.
   */
  background-color: rgba(205, 211, 0, 0.88);

  /*
   * Adds subtle variations inside the marker. Stop positions are scaled to the
   * 1080px canvas so the grain keeps the same relative density.
   */
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(90, 95, 0, 0.07) 0px,
      rgba(255, 255, 0, 0.03) 2px,
      rgba(70, 75, 0, 0.08) 4px,
      rgba(255, 255, 0, 0.02) 8px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04) 0px,
      transparent 4px,
      rgba(50, 50, 0, 0.05) 11px
    );

  /* The marker extends slightly beyond the text. */
  padding: 0 0.2em;

  /* Makes the ink feel slightly translucent. */
  background-blend-mode: multiply;

  /* Very subtle unevenness. */
  border-radius: 2px;

  text-decoration: none;

  color: #050505;

  font-family: Georgia, "Times New Roman", serif;

  font-size: 68px;

  font-weight: 500;

  line-height: 1.4;

  text-align: center;

  text-rendering: optimizeLegibility;
}

/* =========================================================
   AUTHOR
   ========================================================= */

.author {
  margin-top: 68px;

  color: #090909;

  font-family: Georgia, "Times New Roman", serif;

  font-size: 42px;

  font-weight: 500;

  letter-spacing: -0.02em;
}
</style>
