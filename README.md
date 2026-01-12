# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

<!--  -->
<!--  -->
<!--  -->
<template>
  <div class="min-h-screen bg-[#121212] text-white font-sans p-4 md:p-8">
    <header class="max-w-6xl mx-auto mb-10 flex items-center gap-2">
      <div class="bg-green-500 p-2 rounded-lg">
        <v-icon name="check" class="text-black w-6 h-6" />
      </div>
      <h1 class="text-2xl font-black tracking-tighter">VibeCheck</h1>
    </header>

    <main class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

      <section class="space-y-6 bg-[#1e1e1e] p-6 rounded-2xl border border-white/5">
        <h2 class="text-xl font-bold mb-4">Create Your Status</h2>

        <div class="flex items-center gap-6 p-4 bg-black/20 rounded-xl">
          <div class="relative group">
            <img :src="profileImg" :style="{ transform: `scale(${imgScale})` }" class="w-16 h-16 rounded-full object-cover border border-white/10 overflow-hidden" />
            <input type="file" @change="handleFileUpload" class="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
          <div class="flex-1">
            <label class="block text-xs uppercase text-gray-400 mb-2 font-bold">Resize Profile Picture</label>
            <input type="range" v-model="imgScale" min="1" max="3" step="0.1" class="w-full accent-green-500" />
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-xs uppercase text-gray-400 mb-1 ml-1">Username</label>
            <input v-model="username" type="text" placeholder="Your Name" class="w-full bg-black/40 border border-white/10 rounded-lg p-3 focus:border-green-500 outline-none transition" />
          </div>
          <div>
            <label class="block text-xs uppercase text-gray-400 mb-1 ml-1">Handle</label>
            <input v-model="handle" type="text" placeholder="@handle" class="w-full bg-black/40 border border-white/10 rounded-lg p-3 focus:border-green-500 outline-none transition" />
          </div>
          <div>
            <label class="block text-xs uppercase text-gray-400 mb-1 ml-1">Post Text</label>
            <textarea v-model="postText" rows="4" maxlength="280" class="w-full bg-black/40 border border-white/10 rounded-lg p-3 focus:border-green-500 outline-none transition resize-none"></textarea>
            <p class="text-right text-xs text-gray-500 mt-1">{{ postText.length }}/280</p>
          </div>
        </div>

        <button @click="downloadStatus" class="w-full bg-green-500 hover:bg-green-400 text-black font-black py-4 rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20">
          DOWNLOAD IMAGE
        </button>
      </section>

      <section class="flex flex-col items-center">
        <h2 class="text-xl font-bold mb-6 text-gray-400">Preview</h2>

        <div id="status-canvas" class="w-[360px] h-[640px] bg-black relative flex flex-col justify-center px-8 shadow-2xl border border-white/5 overflow-hidden">

          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                 <img :src="profileImg" :style="{ transform: `scale(${imgScale})` }" class="w-full h-full object-cover" />
              </div>
              <div>
                <div class="font-bold text-[15px] leading-tight">{{ username || 'Username' }}</div>
                <div class="text-gray-500 text-[14px]">{{ handle || '@handle' }}</div>
              </div>
              <div class="ml-auto text-gray-600">•••</div>
            </div>

            <div class="text-[22px] leading-snug break-words">
              {{ postText || 'What’s happening?' }}
            </div>

            <div class="pt-2 text-gray-500 text-sm border-t border-white/10">
              {{ currentTime }} • <span class="text-white font-semibold">VibeCheck</span>
            </div>

            <div class="flex justify-between items-center text-gray-500 pt-2 px-1">
              <span class="flex items-center gap-2 text-xs">💬 0</span>
              <span class="flex items-center gap-2 text-xs">🔁 0</span>
              <span class="flex items-center gap-2 text-xs">❤️ 0</span>
              <span class="flex items-center gap-2 text-xs">📤</span>
            </div>
          </div>

        </div>
      </section>

    </main>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toPng } from 'html-to-image';

// State
const username = ref('Gemini Flash');
const handle = ref('@google_ai');
const postText = ref('This is how your WhatsApp status will look. Minimal, dark, and sleek.');
const profileImg = ref('https://via.placeholder.com/150');
const imgScale = ref(1);
const currentTime = ref('');

// Get current time in Twitter format
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' · ' + now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
};

// Image Upload Handler
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    profileImg.value = URL.createObjectURL(file);
  }
};

// Download Function
const downloadStatus = async () => {
  const element = document.getElementById('status-canvas');
  try {
    const dataUrl = await toPng(element, { quality: 1.0, pixelRatio: 3 });
    const link = document.createElement('a');
    link.download = `VibeCheck-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Download failed', err);
  }
};

onMounted(() => {
  updateTime();
});
</script>

<style>
/* Custom Slider Style */
input[type='range'] {
  -webkit-appearance: none;
  background: #333;
  height: 4px;
  border-radius: 2px;
}
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  background: #22c55e;
  border-radius: 50%;
  cursor: pointer;
}
</style>
<!--  -->
<!--  -->
<!--  -->

<template>
  <div class="min-h-screen bg-[#121212] text-white font-sans p-4 md:p-8">
    <header class="max-w-6xl mx-auto mb-10 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <div class="bg-green-500 p-2 rounded-lg text-black font-bold">✓</div>
        <h1 class="text-2xl font-black tracking-tighter text-white">VibeCheck</h1>
      </div>
      
      <div class="flex bg-black p-1 rounded-xl border border-white/10">
        <button 
          @click="templateMode = 'twitter'" 
          :class="templateMode === 'twitter' ? 'bg-[#22c55e] text-black' : 'text-gray-400'"
          class="px-4 py-2 rounded-lg font-bold text-xs transition-all uppercase"
        >
          Twitter Style
        </button>
        <button 
          @click="templateMode = 'plain'" 
          :class="templateMode === 'plain' ? 'bg-[#22c55e] text-black' : 'text-gray-400'"
          class="px-4 py-2 rounded-lg font-bold text-xs transition-all uppercase"
        >
          Plain Noir
        </button>
      </div>
    </header>

    <main class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      
      <section class="space-y-6 bg-[#1e1e1e] p-6 rounded-2xl border border-white/5">
        <h2 class="text-xl font-bold mb-4">Customize</h2>
        
        <div v-if="templateMode === 'twitter'" class="space-y-4">
          <div class="flex items-center gap-6 p-4 bg-black/20 rounded-xl">
            <div class="relative w-16 h-16 rounded-full overflow-hidden border border-white/10">
              <img :src="profileImg" :style="{ transform: `scale(${imgScale})` }" class="w-full h-full object-cover" />
              <input type="file" @change="handleFileUpload" class="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
            <div class="flex-1">
              <label class="block text-xs uppercase text-gray-400 mb-2 font-bold">Zoom Avatar</label>
              <input type="range" v-model="imgScale" min="1" max="3" step="0.1" class="w-full accent-green-500" />
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <input v-model="username" type="text" placeholder="Name" class="w-full bg-black/40 border border-white/10 rounded-lg p-3 outline-none" />
            <input v-model="handle" type="text" placeholder="@handle" class="w-full bg-black/40 border border-white/10 rounded-lg p-3 outline-none" />
          </div>
        </div>

        <div>
          <label class="block text-xs uppercase text-gray-400 mb-1 ml-1">Message</label>
          <textarea v-model="postText" rows="5" class="w-full bg-black/40 border border-white/10 rounded-lg p-4 focus:border-green-500 outline-none transition resize-none text-lg"></textarea>
        </div>

        <button @click="downloadStatus" class="w-full bg-green-500 hover:bg-green-400 text-black font-black py-4 rounded-xl shadow-lg shadow-green-500/20 transition-transform active:scale-95">
          DOWNLOAD IMAGE
        </button>
      </section>

      <section class="flex flex-col items-center">
        <div id="status-canvas" class="w-[360px] h-[640px] bg-black relative flex flex-col p-8 overflow-hidden shadow-2xl">
          
          <div v-if="templateMode === 'twitter'" class="h-full flex flex-col justify-center space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                 <img :src="profileImg" :style="{ transform: `scale(${imgScale})` }" class="w-full h-full object-cover" />
              </div>
              <div>
                <div class="font-bold text-[15px] leading-tight text-white">{{ username || 'Username' }}</div>
                <div class="text-gray-500 text-[14px]">{{ handle || '@handle' }}</div>
              </div>
            </div>
            <div class="text-[24px] leading-snug text-white font-normal break-words py-2">
              {{ postText || 'Share a vibe...' }}
            </div>
            <div class="text-gray-500 text-sm pt-2 border-t border-white/10 flex justify-between">
              <span>{{ currentTime }}</span>
              <span class="text-green-500 font-bold tracking-widest">VibeCheck</span>
            </div>
          </div>

          <div v-else class="h-full flex flex-col justify-center items-center text-center">
             <div class="text-[32px] font-medium leading-tight text-white px-4">
               {{ postText || 'Minimal text status.' }}
             </div>
             <div class="absolute bottom-10 opacity-20 text-[10px] tracking-[0.5em] uppercase text-white">
               VibeCheck
             </div>
          </div>
          
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { toPng } from 'html-to-image';

const templateMode = ref('twitter'); // 'twitter' or 'plain'
const username = ref('Vibe User');
const handle = ref('@vibecheck');
const postText = ref('Your mood, formatted perfectly for WhatsApp Status.');
const profileImg = ref('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix');
const imgScale = ref(1);
const currentTime = ref('');

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) profileImg.value = URL.createObjectURL(file);
};

const downloadStatus = async () => {
  const element = document.getElementById('status-canvas');
  const dataUrl = await toPng(element, { pixelRatio: 3 });
  const link = document.createElement('a');
  link.download = `VibeCheck-${templateMode.value}.png`;
  link.href = dataUrl;
  link.click();
};

onMounted(updateTime);
</script>
