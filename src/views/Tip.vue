<script setup lang="tsx">
import { AlertCircle, HandCoins, Heart } from "lucide-vue-next";

const pay = async () => {
  await fetch("/api/mpesa/stkpush", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: "254796626586",
      amount: 1,
    }),
  });
};
</script>

<template>
  <div class="pt-16 md:pt-16">
    <!--  -->
    <!--  -->
    <!-- M-Pesa Form -->
    <section
      class="mb-12 max-w-xl mx-auto space-y-6 bg-black p-4 sm:p-6 rounded-2xl border border-white/50"
    >
      <h3 class="text-xl font-normal mb-4">Tip via M-Pesa</h3>
      <p class="text-gray-400 mb-6">
        Enter your M-Pesa number and approve the prompt on your phone.
      </p>

      <form id="supportForm" class="space-y-4">
        <div>
          <label for="phone" class="block text-sm text-gray-400 mb-1"
            >Phone number</label
          >
          <div class="flex">
            <input
              type="tel"
              id="phone"
              placeholder="07XXXXXXXX"
              class="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-white/40 bg-secondary focus:ring-0 focus:border-gray-500"
              required
            />
          </div>
        </div>

        <div>
          <label for="amount" class="block text-sm text-gray-400 mb-1"
            >Amount</label
          >
          <input
            type="number"
            placeholder="Enter amount"
            id="amount"
            value=""
            class="block w-full px-3 py-2 border border-white/40 bg-secondary rounded-md text-gray-300"
          />
        </div>

        <button
          @click="pay"
          disabled="true"
          class="w-full flex cursor-not-allowed justify-center items-center bg-green-500 hover:bg-green-400 text-white tracking-wider font-black py-3 px-6 rounded-xl shadow-lg shadow-green-500/20 transition-transform active:scale-95"
        >
          Send Tip
          <HandCoins class="ml-1 max-sm:hidden" />
        </button>

        <p class="text-gray-500 text-sm text-center mb-2">
          You'll receive an M-Pesa STK prompt
        </p>
        <p class="bg-red-500"><AlertCircle /></p>
      </form>
    </section>
  </div>
  <!-- Gratitude Section -->
  <div class="flex justify-center">
    <p class="flex items-start mb-2">
      <Heart class="text-green-500 w-6 h-6 mr-1" />
      <span class="text-white">
        Thank you for supporting <span class="font-bold">Sayless</span>.
      </span>
    </p>
  </div>

  <!-- Success State (hidden by default) -->
  <div id="successState" class="text-center hidden py-8">
    <div class="mb-6">
      <i
        data-feather="check-circle"
        class="w-12 h-12 text-green-400 mx-auto"
      ></i>
    </div>
    <h3 class="text-2xl mb-2">
      Thank you <span class="text-yellow-300">💛</span>
    </h3>
    <p class="text-gray-400 mb-6">Your support keeps Sayless alive.</p>
    <RouterLink
      to="/"
      class="inline-block px-6 py-2 border border-white/40 rounded-md hover:bg-secondary transition duration-150"
    >
      Continue using Sayless
    </RouterLink>
  </div>

  <!-- Error State (hidden by default) -->
  <div id="errorState" class="hidden text-center py-8">
    <div class="mb-6">
      <i data-feather="x-circle" class="w-12 h-12 text-red-400 mx-auto"></i>
    </div>
    <h3 class="text-2xl mb-2">Payment not completed</h3>
    <p class="text-gray-400 mb-6">No worries — you can try again anytime.</p>
    <button
      onclick="resetForm()"
      class="px-6 py-2 border border-white/40 rounded-md hover:bg-secondary transition duration-150"
    >
      Retry
    </button>
  </div>
</template>
