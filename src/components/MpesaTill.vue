<script setup lang="tsx">
import { ref } from "vue";

const mpesaTill = ref<number[]>([3, 5, 4, 7, 8, 4, 4]);
const telcos = [
  {
    imgSrc: "/images/airtel.png",
    width: 169,
    height: 157,
    name: "airtel",
  },
  {
    imgSrc: "/images/mpesa1.png",
    width: 195,
    height: 54,
    name: "mpesa",
  },
  {
    imgSrc: "/images/telkom.png",
    width: 120,
    height: 136,
    name: "telkom",
  },
];
</script>

<template>
  <div
    class="mb-12 max-w-3xl mx-auto space-y-6 bg-black p-4 sm:p-6 rounded-2xl border border-white/50"
  >
    <div class="flex flex-col space-y-3 bg-white">
      <div class="bg-green-500">
        <h2 class="text-6xl flex justify-center my-10 font-bold"> <span class="flex">Lipa na <span class="font-extrabold flex ml-3 text-6xl">M <img class="h-20" src="/images/phone.png"/>pesa</span></span></h2>
      </div>
      <div class="bg-white flex flex-col">
        <h3
          class="uppercase text-center mb-3 text-green-500 mt-6 text-5xl font-extrabold"
        >
          Till Number
        </h3>
        <p class="flex justify-center gap-4">
          <span
            v-for="digit in mpesaTill"
            class="border-4 border-green-500 px-4 py-2 text-black text-6xl font-extrabold rounded-sm"
            >{{ digit || 3547844 }}</span
          >
        </p>
      </div>
      <div class="">
        <p class="text-black text-center font-bold text-lg my-2 uppercase">
          Make payments to the till from any network
        </p>
        <div class="flex max-w-md mx-auto items-start gap-2 justify-between mb-8">
          <img
            v-for="{ imgSrc, name, width, height } in telcos"
            class="h-fit w-20"
            :key="name"
            :src="imgSrc"
            :width="width"
            :height="height"
            :alt="name"
          />
        </div>
      </div>
    </div>
  </div>
</template>
