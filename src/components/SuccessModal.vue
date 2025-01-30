<template>
  <div
    class="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
    style="z-index: 999"
  >
    <div
      class="w-full max-w-md p-8 transform bg-white rounded-lg shadow-xl animate-bounce-once"
    >
      <div class="text-center">
        <div class="mb-4 text-6xl">🏆</div>
        <h2 class="mb-2 text-3xl font-bold text-gray-900">Outstanding!</h2>
        <p class="mb-6 text-lg text-gray-600">
          You've mastered the art of potato sorting!
          <br />
          Time: {{ formatTime(time) }}
        </p>
        <div class="space-y-4">
          <div class="p-4 rounded-lg bg-orange-50">
            <p class="font-medium text-orange-700">
              "In Potatostan, efficiency is next to godliness!"
            </p>
          </div>
          <button
            @click="$emit('close')"
            class="px-6 py-3 text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
          >
            Continue Training
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatTime } from "../utils/formatters";

defineProps({
  time: {
    type: Number,
    required: true,
  },
});

defineEmits(["close"]);
</script>

<style scoped>
@keyframes bounce-once {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25px);
  }
}

.animate-bounce-once {
  animation: bounce-once 1s ease-in-out;
}
</style>
