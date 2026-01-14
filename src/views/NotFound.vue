<script setup lang="tsx">
import { ArrowRight, Ban,  NotepadTextIcon } from "lucide-vue-next";
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6">
    <div class="max-w-lg w-full text-center">
      <!-- {/* Abstract Visual Element */} -->
      <div class="mb-12 flex justify-center">
        <div class="relative w-32 h-32">
          <!-- {/* Minimal geometric shapes */} -->
          <div
            class="absolute inset-0 border-2 border-neutral-700 rounded-2xl rotate-6 opacity-40"
          />
          <div
            class="absolute inset-0 border-2 border-neutral-600 rounded-2xl -rotate-6 opacity-60"
          />
          <div
            class="absolute inset-0 border-2 border-neutral-500 rounded-2xl opacity-80"
          />

          <!-- {/* Center dot */} -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-3 h-3 bg-neutral-400 rounded-full" />
          </div>
        </div>
      </div>

      <!-- {/* 404 Headline */} -->
      <div class="mb-4">
        <h1
          class="text-red-600 text-3xl sm:text-4xl tracking-tight mb-4 flex items-center justify-center"
        >
          <Ban class="size-8 sm:size-10 mr-1" />
          Error
        </h1>
        <!-- <h2 class="text-white text-2xl sm:text-3xl">Page not found</h2> -->
      </div>

      <!-- {/* Explanation */} -->
      <p
        class="text-neutral-400 text-lg mb-12 max-w-md mx-auto leading-relaxed"
      >
        This page doesn't exist or has been moved.
      </p>

      <!-- {/* Actions */} -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <!-- {/* Primary Action */} -->
        <!-- onClick="{handleGoHome}" -->
        <RouterLink
          to="/templates"
          class="flex items-center justify-center gap-2 px-6 py-3 bg-white text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors font-medium"
        >
          <span>Go back home</span>
          <ArrowRight class="" />
        </RouterLink>

        <!-- {/* Secondary Action */} -->
        <!-- onClick="{handleCreateStatus}" -->
        <RouterLink
          to="/"
          class="flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-white border border-white rounded-lg hover:bg-neutral-800 hover:text-white hover:border-neutral-600 transition-colors"
        >
          <span>Create a status</span>
          <NotepadTextIcon />
        </RouterLink>
      </div>

      <!-- {/* Optional footer hint */} -->
      <!-- <div class="mt-16 text-white/50 text-sm">
        Looking for something specific? Start from the home page.
      </div> -->
    </div>
  </div>
</template>
