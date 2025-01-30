<template>
  <div
    class="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
  >
    <div class="w-full max-w-md p-6 bg-white rounded-lg">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">How many people?</h2>
        <button
          class="text-gray-400 hover:text-gray-600"
          @click="$emit('close')"
        >
          ×
        </button>
      </div>
      <p class="mb-4 text-sm text-gray-600">
        Enter a number of how many people you want to add to the list ({{
          isTestMode ? "3" : "20"
        }}-100):
      </p>
      <div class="flex items-center gap-2 mb-4">
        <input
          v-model="isTestMode"
          type="checkbox"
          class="w-4 h-4 border-gray-300 rounded focus:ring-orange-500"
        />
        <label class="text-sm text-gray-600">
          Enable testing mode (allows less than 20 people)
        </label>
      </div>
      <input
        v-model="numberOfPeople"
        type="number"
        :min="isTestMode ? 3 : 20"
        max="100"
        class="w-full px-3 py-2 mb-4 border rounded"
        :placeholder="isTestMode ? '3' : '20'"
      />
      <div class="flex justify-end gap-2">
        <button
          class="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
          @click="startGame"
        >
          Start
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isTestMode = ref(false);
const numberOfPeople = ref(20);

const emit = defineEmits(["close", "start"]);

function startGame() {
  const minPeople = isTestMode.value ? 3 : 20;
  if (numberOfPeople.value < minPeople || numberOfPeople.value > 100) {
    alert(`Please enter a number between ${minPeople} and 100`);
    return;
  }
  emit("start", numberOfPeople.value);
}
</script>
