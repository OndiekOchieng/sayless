<script setup lang="ts">
import { CheckCircle2, CheckLineIcon, Clock } from "lucide-vue-next";
const pricingPlans = [
  {
    title: "Monthly",
    duration: "1 Month",
    price: 99,
    description: "Pay once. Use for 30 days",
    perks: [
      "Unlimited status generations",
      "All templates unlocked",
      "No watermarks",
      "No ads",
    ],
  },
  {
    title: "Annual",
    duration: "12 Months",
    price: "499",
    description: "Pay once. Use for the whole year",
    perks: [
      "Unlimited status generations",
      "All templates unlocked",
      "No watermarks",
      "No ads",
    ],
  },
  {
    title: "Decade",
    duration: "10 Years",
    description: "Pay once. Use for 10 years",
    price: 10000,
    perks: [
      "Unlimited status generations",
      "All templates unlocked",
      "No watermarks",
      "No ads",
    ],
  },
];
</script>

<template>
  <div id="pricing" class="min-h-screen text-white py-24 pt-12 md:pt-8 px-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
      <div
        v-for="{ title, price, perks, duration } in pricingPlans"
        :key="title"
        class="rounded-lg border border-white p-12 space-y-8"
      >
        <h2 class="text-center uppercase tracking-wider text-green-400">
          {{ title }}
        </h2>

        <div class="text-center space-y-2">
          <div class="text-5xl">KES {{ price }}</div>
          <!-- <p class="text-white/60">{{ description }}</p> -->
          <div class="flex justify-center gap-4">
            <p class="text-white/60 flex items-center justify-center">
              <Clock class="mr-1" /> {{ duration }}
            </p>
            <p
              v-if="title === 'Annual'"
              class="text-white/60 flex items-center justify-center"
            >
              <CheckLineIcon class="mr-1" /><span>Recommended</span>
            </p>
          </div>
        </div>

        <ul class="space-y-3 text-white/80">
          <li v-for="perk in perks" class="flex items-center">
            <CheckCircle2 class="mr-2 text-green-400" /><span>{{ perk }}</span>
          </li>
        </ul>

        <div class="space-y-4 pt-4">
          <button
            class="w-full rounded-lg px-8 py-3 flex items-center justify-center bg-white text-black tracking-wider hover:opacity-90 transition-opacity duration-150"
          >
            <span>Pay Now</span>
            <img
              class="ml-1"
              src="/images/mpesa.png"
              width="28"
              height="28"
              alt="mpesa-logo"
            />
          </button>
          <p class="text-center text-white/40">Secure one-time payment</p>
        </div>
      </div>
    </div>
  </div>
</template>
