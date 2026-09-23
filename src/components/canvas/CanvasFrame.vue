<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * Renders a fixed-size canvas and scales it down purely for display.
 *
 * The slotted canvas root keeps its true intrinsic size (e.g. 1080x1920), so
 * html-to-image reads the full-resolution layout. The scale transform lives on
 * an ancestor, which does not affect descendant computed styles and is
 * therefore never picked up by the exporter.
 */
const props = defineProps<{
  width: number;
  height: number;
  maxWidth: number;
}>();

const host = ref<HTMLElement | null>(null);
const available = ref(props.maxWidth);

let observer: ResizeObserver | null = null;

onMounted(() => {
  if (!host.value) return;
  observer = new ResizeObserver((entries) => {
    const measured = entries[0]?.contentRect.width ?? 0;
    if (measured > 0) available.value = measured;
  });
  observer.observe(host.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});

const scale = computed(
  () => Math.min(available.value, props.maxWidth) / props.width,
);

const frameStyle = computed(() => ({
  width: `${props.width * scale.value}px`,
  height: `${props.height * scale.value}px`,
}));

const scalerStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  transform: `scale(${scale.value})`,
}));
</script>

<template>
  <div ref="host" class="flex w-full justify-center">
    <div class="relative overflow-hidden shadow-2xl" :style="frameStyle">
      <div class="absolute top-0 left-0 origin-top-left" :style="scalerStyle">
        <slot />
      </div>
    </div>
  </div>
</template>
