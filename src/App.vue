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
            @click="isGameStarted ? resetGame() : (showModal = true)"
            class="px-4 py-2 text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
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

      <div class="bg-white rounded-lg shadow">
        <div class="p-4 text-sm text-right text-gray-600 border-b">
          {{ people.length }} people in the list
        </div>
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-sm font-medium text-left text-gray-600">
                Email
              </th>
              <th class="px-4 py-3 text-sm font-medium text-left text-gray-600">
                Potatoes
              </th>
              <th class="px-4 py-3 text-sm font-medium text-left text-gray-600">
                Tags
              </th>
              <th class="px-4 py-3 text-sm font-medium text-left text-gray-600">
                Full name
              </th>
              <th class="px-4 py-3 text-sm font-medium text-left text-gray-600">
                Location
              </th>
              <th
                class="px-4 py-3 text-sm font-medium text-left text-gray-600"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="person in people"
              :key="person.id"
              :class="{ 'bg-gray-50': isDragging }"
              draggable="true"
              @dragstart="onDragStart($event, person)"
              @dragover="onDragOver($event)"
              @drop="onDrop($event, person)"
              class="border-t cursor-move hover:bg-gray-50"
            >
              <td class="px-4 py-3 text-sm">{{ person.email }}</td>
              <td class="px-4 py-3 text-sm font-semibold">
                {{ person.potatoes }}
              </td>
              <td class="px-4 py-3">
                <span class="px-2 py-1 text-xs bg-gray-100 rounded">{{
                  person.tags
                }}</span>
              </td>
              <td class="px-4 py-3 text-sm">{{ person.name }}</td>
              <td class="px-4 py-3 text-sm">{{ person.location }}</td>
              <td class="px-4 py-3 text-sm text-gray-400">{{ person.year }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="p-6 bg-white rounded-lg w-96">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold">How many people?</h2>
            <button
              @click="showModal = false"
              class="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <p class="mb-4 text-sm text-gray-600">
            Enter a number of how many people you want to add to the list
            (20-100):
          </p>
          <input
            v-model="numberOfPeople"
            type="number"
            min="20"
            max="100"
            class="w-full px-3 py-2 mb-4 border rounded"
            placeholder="20"
          />
          <div class="flex justify-end gap-2">
            <button
              @click="showModal = false"
              class="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              @click="startGame"
              class="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showModal = ref(false);
const numberOfPeople = ref(20);
const people = ref([]);
const timer = ref(0);
const timerInterval = ref(null);
const isGameStarted = ref(false);
const showSuccess = ref(false);
const isDragging = ref(false);

// Generate random data
function generateRandomEmail() {
  const names = [
    "john",
    "jane",
    "bob",
    "alice",
    "peter",
    "mary",
    "james",
    "sarah",
  ];
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "potatostan.gov"];
  const name = names[Math.floor(Math.random() * names.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${name}${Math.floor(Math.random() * 1000)}@${domain}`;
}

function generateRandomName() {
  const firstNames = [
    "Ivan",
    "Boris",
    "Natasha",
    "Vladimir",
    "Olga",
    "Dmitri",
    "Anna",
    "Mikhail",
  ];
  const lastNames = [
    "Potatov",
    "Spudnik",
    "Tuberov",
    "Yamnaya",
    "Rootski",
    "Soilovich",
  ];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }`;
}

function generateUniqueNumbers(count) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * 1000) + 1);
  }
  return Array.from(numbers);
}

function startGame() {
  if (numberOfPeople.value < 20 || numberOfPeople.value > 100) {
    alert("Please enter a number between 20 and 100");
    return;
  }

  const potatoCounts = generateUniqueNumbers(numberOfPeople.value);
  people.value = Array.from({ length: numberOfPeople.value }, (_, index) => ({
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

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
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
  }
}

// Drag and drop handlers
function onDragStart(e, person) {
  isDragging.value = true;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("personId", person.id);
}

function onDragOver(e) {
  e.preventDefault();
}

function onDrop(e, targetPerson) {
  e.preventDefault();
  isDragging.value = false;

  const personId = parseInt(e.dataTransfer.getData("personId"));
  const draggedPersonIndex = people.value.findIndex((p) => p.id === personId);
  const targetIndex = people.value.findIndex((p) => p.id === targetPerson.id);

  if (draggedPersonIndex === -1 || targetIndex === -1) return;

  const [draggedPerson] = people.value.splice(draggedPersonIndex, 1);
  people.value.splice(targetIndex, 0, draggedPerson);

  checkSorting();
}

function resetGame() {
  people.value = [];
  isGameStarted.value = false;
  showSuccess.value = false;
  timer.value = 0;
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
}
</script>
