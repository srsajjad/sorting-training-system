<template>
  <div class="bg-white rounded-lg shadow">
    <div class="p-4 text-sm font-bold text-right text-gray-900 border-b">
      {{ people.length }} people in the list
    </div>
    <div class="overflow-x-auto">
      <table class="w-full min-w-[800px]">
        <thead class="bg-gray-50">
          <tr>
            <th class="w-10 px-4 py-3"></th>
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
            <th class="px-4 py-3 text-sm font-medium text-left text-gray-600">
              Year
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="person in people"
            :key="person.id"
            :class="{
              'bg-gray-50': isDragging,
              'bg-blue-50': selectedPeople.has(person.id),
            }"
            draggable="true"
            @dragstart="onDragStart($event, person)"
            @dragover="onDragOver($event)"
            @drop="onDrop($event, person)"
            class="border-t cursor-move hover:bg-gray-50"
          >
            <td class="w-10 px-4 py-3">
              <input
                type="checkbox"
                :checked="selectedPeople.has(person.id)"
                @change="$emit('toggle-selection', person.id)"
                class="w-4 h-4 border-gray-300 rounded focus:ring-orange-500"
              />
            </td>
            <td class="px-4 py-3 text-sm">{{ person.email }}</td>
            <td class="px-4 py-3 text-sm font-semibold">
              {{ person.potatoes }}
            </td>
            <td class="px-4 py-3">
              <span
                class="px-4 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-full"
              >
                {{ person.tags }}
              </span>
            </td>
            <td class="px-4 py-3 text-sm">{{ person.name }}</td>
            <td class="px-4 py-3 text-sm">{{ person.location }}</td>
            <td class="px-4 py-3 text-sm">{{ person.year }}</td>
          </tr>
          <tr v-if="!people.length">
            <td colspan="7" class="h-32"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  people: {
    type: Array,
    required: true,
  },
  selectedPeople: {
    type: Set,
    required: true,
  },
});

const emit = defineEmits(["update-people", "toggle-selection"]);

const isDragging = ref(false);

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
  const draggedPersonIndex = props.people.findIndex((p) => p.id === personId);
  const targetIndex = props.people.findIndex((p) => p.id === targetPerson.id);

  if (draggedPersonIndex === -1 || targetIndex === -1) return;

  const newPeople = [...props.people];
  const [draggedPerson] = newPeople.splice(draggedPersonIndex, 1);
  newPeople.splice(targetIndex, 0, draggedPerson);

  emit("update-people", newPeople);
}
</script>
