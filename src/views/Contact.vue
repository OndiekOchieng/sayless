<script setup lang="ts">
import { Phone, SendHorizonal } from "lucide-vue-next";
import { socials } from "../data";
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!--  -->
    <!-- Form -->
    <!-- Contact Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Get In <span class="gradient-text">Touch</span>
        </h2>
        <p class="text-gray-400 mb-8">
          Have questions, suggestions or feedback about our templates? We would
          love to hear from you.
        </p>

        <div class="space-y-6">
          <div class="flex items-start">
            <div class="text-amber-500 text-xl mt-1 mr-4">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <!-- <div>
              <h3 class="text-white font-bold mb-1">Our Studio</h3>
              <p class="text-gray-400">
                Pj plaza, Links Rd, Mombasa, Kenya
              </p>
            </div> -->
          </div>

          <!-- <div class="flex items-start">
            <div class="text-amber-500 text-xl mt-1 mr-4">
              <i class="fas fa-envelope"></i>
            </div>
            <div>
              <h3 class="text-white font-bold mb-1">Email Us</h3>
              <p class="text-gray-400">pragmacia254@gmail.com</p>
            </div>
          </div> -->

          <div class="flex items-center">
            <div class=" mt-1 mr-3">
              <Phone class="" :size="24" />
            </div>
            <div>
              <!-- <h3 class="text-white font-bold mb-1">Call Us</h3> -->
              <p class=" text-white">+254 742 814 436</p>
            </div>
          </div>

          <div class="flex flex-col gap-6 ">
            <a
              v-for="{ iconSrc, path, name } in socials"
              :key="name"
              :href="path"
              class="text-white hover:text-green-500 w-fit flex items-center gap-2"
            >
              <img :src="iconSrc" :alt="name" width="36" height="36" />
              <span class="capitalize">{{ name }}</span>
            </a>
          </div>
        </div>
      </div>
      <!-- Contact Form -->
      <div class="bg-black rounded-2xl shadow-sm p-4 sm:p-8">
        <form id="contactForm" class="space-y-6">
          <div>
            <label for="name" class="label">Name</label>
            <input type="text" id="name" name="name" required class="input" />
          </div>

          <div>
            <label for="email" class="label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              class="input"
            />
          </div>

          <!-- <div>
            <label for="subject" class="label">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              class="input"
            />
          </div> -->

          <div>
            <label for="message" class="label">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              class="input"
            ></textarea>
          </div>

          <button type="submit" class="btn2" disabled="true">
            Send Message
            <SendHorizonal class="ml-2 cursor-not-allowed" />
          </button>
        </form>

        <!-- Success Message (hidden by default) -->
        <div
          id="successMessage"
          class="hidden mt-6 p-4 bg-green-50 text-green-700 rounded-lg"
        >
          <div class="flex items-center">
            <i data-feather="check-circle" class="mr-2"></i>
            <span>Your message has been sent successfully!</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
