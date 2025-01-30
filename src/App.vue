<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">Sorting Training System</h1>
        <div class="flex items-center gap-4">
          <div v-if="isGameStarted" class="font-mono text-lg">
            Time: {{ formatTime(timer) }}
          </div>
          <button
            class="px-4 py-2 text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
            @click="isGameStarted ? resetGame() : (showModal = true)"
          >
            {{ isGameStarted ? "Reset" : "Start sorting!" }}
          </button>
        </div>
      </div>

      <!-- Success Message -->
      <div
        v-if="showSuccess"
        class="p-4 mb-6 text-green-700 bg-green-100 rounded-lg"
      >
        <p class="text-lg font-semibold">Congratulations! 🎉</p>
        <p>
          You've successfully sorted all citizens by their potato count in
          {{ formatTime(timer) }}!
        </p>
      </div>

      <SortableTable
        :people="people"
        :selected-people="selectedPeople"
        @update-people="updatePeople"
        @toggle-selection="toggleSelection"
      />

      <StartModal
        v-if="showModal"
        @close="showModal = false"
        @start="startGame"
      />

      <SuccessModal
        v-if="showSuccessModal"
        :time="timer"
        @close="showSuccessModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  generateRandomEmail,
  generateRandomName,
  generateUniqueNumbers,
} from "./utils/generators";
import { formatTime } from "./utils/formatters";
import { useConfetti } from "./composables/useConfetti";
import SortableTable from "./components/SortableTable.vue";
import StartModal from "./components/StartModal.vue";
import SuccessModal from "./components/SuccessModal.vue";

const showModal = ref(false);
const showSuccessModal = ref(false);
const people = ref([]);
const timer = ref(0);
const timerInterval = ref(null);
const isGameStarted = ref(false);
const showSuccess = ref(false);
const selectedPeople = ref(new Set());
const { triggerConfetti } = useConfetti();

function startGame(numberOfPeople) {
  const potatoCounts = generateUniqueNumbers(numberOfPeople);
  people.value = Array.from({ length: numberOfPeople }, (_, index) => ({
    id: index + 1,
    email: generateRandomEmail(),
    potatoes: potatoCounts[index],
    tags: "Citizen",
    name: generateRandomName(),
    location: "Potatostan",
    year: "2024",
  }));

  showModal.value = false;
  isGameStarted.value = true;
  timer.value = 0;
  showSuccess.value = false;

  // Start timer
  timerInterval.value = setInterval(() => {
    timer.value++;
  }, 1000);
}

function updatePeople(newPeople) {
  people.value = newPeople;
  checkSorting();
}

function toggleSelection(personId) {
  if (selectedPeople.value.has(personId)) {
    selectedPeople.value.delete(personId);
  } else {
    selectedPeople.value.add(personId);
  }
}

function checkSorting() {
  const sortedPotatoes = [...people.value].sort(
    (a, b) => b.potatoes - a.potatoes
  );
  const isCorrect = people.value.every(
    (person, index) => person.potatoes === sortedPotatoes[index].potatoes
  );

  if (isCorrect) {
    clearInterval(timerInterval.value);
    showSuccess.value = true;
    showSuccessModal.value = true;
    triggerConfetti();
  }
}

function resetGame() {
  people.value = [];
  isGameStarted.value = false;
  showSuccess.value = false;
  showSuccessModal.value = false;
  timer.value = 0;
  selectedPeople.value.clear();
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
}
</script>

<style>
/* Existing styles */

/* Add Roboto font to the entire app */
:root {
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-variation-settings: "wdth" 100;
}

/* Specific font weights for different elements */
h1,
h2 {
  font-weight: 700;
}

.text-sm {
  font-weight: 400;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

/* Rest of existing styles */

input[type="checkbox"] {
  appearance: none;
  background-color: #fff;
  width: 1rem;
  height: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  background-color: #f97316;
  border-color: #f97316;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23ffffff' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

input[type="checkbox"]:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow:
    0 0 0 2px #fff,
    0 0 0 4px #f97316;
}

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
