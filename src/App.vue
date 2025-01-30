<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">Sorting Training System</h1>
        <button
          @click="showModal = true"
          class="px-4 py-2 text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
        >
          Start sorting!
        </button>
      </div>

      <div class="bg-white rounded-lg shadow">
        <div class="p-4 text-sm text-right text-gray-600 border-b">
          20 people in the list
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
            <tr v-for="(person, index) in people" :key="index" class="border-t">
              <td class="px-4 py-3 text-sm">{{ person.email }}</td>
              <td class="px-4 py-3 text-sm">{{ person.potatoes }}</td>
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
            Enter a number of how many people you want to add to the list:
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

const people = ref([
  {
    email: "juozas@bybosas.lt",
    potatoes: 1,
    tags: "Customers",
    name: "Juozas Bybosas",
    location: "Lithuania",
    year: "2019",
  },
  {
    email: "john@smith.com",
    potatoes: 5,
    tags: "Customers",
    name: "Gintare Peckyte",
    location: "Lithuania",
    year: "2019",
  },
  {
    email: "gintare.peckyte@gmail.com",
    potatoes: 6,
    tags: "Customers",
    name: "Gintare Peckyte",
    location: "Lithuania",
    year: "2019",
  },
  {
    email: "gintare.peckyte@gmail.com",
    potatoes: 8,
    tags: "Customers",
    name: "Gintare Peckyte",
    location: "Lithuania",
    year: "2019",
  },
  {
    email: "gintare.peckyte@gmail.com",
    potatoes: 9,
    tags: "Customers",
    name: "",
    location: "Lithuania",
    year: "2019",
  },
  {
    email: "kazkas@gmail.com",
    potatoes: 4,
    tags: "Customers",
    name: "Lorem Ipsum",
    location: "Lithuania",
    year: "2019",
  },
  {
    email: "gintare.peckyte@gmail.com",
    potatoes: 2,
    tags: "Customers, VIP",
    name: "Dolor Sit",
    location: "Lithuania",
    year: "2019",
  },
  {
    email: "bbbbbd@gmail.com HOVER",
    potatoes: 7,
    tags: "Customers",
    name: "Amet Bibendum",
    location: "Lithuania",
    year: "2019",
  },
  {
    email: "rolandas.paksas@mail.ru",
    potatoes: 3,
    tags: "Customers",
    name: "",
    location: "Lithuania",
    year: "2019",
  },
  {
    email: "gintare.peckyte@gmail.com",
    potatoes: 10,
    tags: "Customers",
    name: "",
    location: "Lithuania",
    year: "2019",
  },
]);

function startGame() {
  // Implement game start logic here
  showModal.value = false;
}
</script>
