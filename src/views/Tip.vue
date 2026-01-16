<script setup lang="tsx">
import { HandCoins, Heart } from "lucide-vue-next";
</script>

<template>
  <div class="pt-16 md:pt-16 px-6">
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
            <!-- <span
              class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-white/40 bg-secondary text-gray-300 text-sm"
            >
              +254
            </span> -->
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
          class="w-full flex justify-center items-center bg-green-500 hover:bg-green-400 text-white tracking-wider font-black py-3 px-6 rounded-xl shadow-lg shadow-green-500/20 transition-transform active:scale-95"
        >
          Send Tip
          <HandCoins class="ml-1 max-sm:hidden" />
        </button>

        <p class="text-gray-500 text-sm text-center">
          You'll receive an M-Pesa STK prompt
        </p>
      </form>
    </section>
  </div>
  <!-- Gratitude Section -->
  <section class="text-center">
    <div class="flex items-center justify-center mb-2">
      <Heart class="text-green-500 w-5 h-5 mr-1" />
      <p class="text-gray-400">Thank you for supporting independent tools.</p>
    </div>
  </section>

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
    <a
      href="/"
      class="inline-block px-6 py-2 border border-white/40 rounded-md hover:bg-secondary transition duration-150"
    >
      Continue using Sayless
    </a>
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
