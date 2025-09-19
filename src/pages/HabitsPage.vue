<script setup lang="ts">
import { onMounted } from 'vue'
import { ref} from 'vue'
import { storeToRefs } from 'pinia'
import { useHabitsStore } from '@/store/habits'
import type { Habit } from '@/store/habits'
import { PlusCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'
import GlassCard from "@/components/GlassCard.vue";
const habitsStore = useHabitsStore()
const { habits } = storeToRefs(habitsStore)

onMounted(async () => {
  // Make sure store loads from IndexedDB on first mount
  await habitsStore.init()
})

const showSheet = ref(false)

const title = ref('')
const cadence = ref<'daily' | 'weekly' | 'monthly' | 'custom'>('daily')
const archived = ref(false)

const error = ref<string | null>(null)
const editId = ref<string | null>(null)

async function saveHabit() {
  const t = title.value.trim()
  if (!t) {
    error.value = 'Title is required.'
    return
  }

  if (!editId.value) {
    // Add new habit
    if (habits.value.some((h) => h.title === t)) {
      error.value = 'A habit with that title already exists.'
      return
    }
    await habitsStore.addHabit(t, cadence.value)
  } else {
    // Edit existing habit
    const h = habits.value.find(h => h.id === editId.value)
    if (h) {
      h.title = t
      h.cadence = cadence.value
      await habitsStore.persist() // or make a habitsStore.updateHabit() action
    }
  }

  // Reset state
  title.value = ''
  cadence.value = 'daily'
  archived.value = false
  editId.value = null
  showSheet.value = false
}

function startEdit(habit: Habit) {
  // set edit state
  editId.value = habit.id
  title.value = habit.title
  cadence.value = habit.cadence
  showSheet.value = true
}
async function removeHabit(id: string) {
  // optionally confirm
  await habitsStore.removeHabit(id)
}


</script>

<template>
  <div>
    <!-- HStack{} Spacer() Button{}-->
    <div class="flex items-center justify-between">
      <h1 class="text-4xl font-bold text-white drop-shadow-[0_4px_12px_rgba(139,92,246,0.6)] animate-fadeInUp">
        Your Habits
      </h1>

      <button @click="showSheet = true" class="transition">
        <PlusCircleIcon class="w-8 h-8" />
      </button>
    </div>

    <div class="my-4"></div>


    <ul>

      <li
          v-for="habit in habits"
          :key="habit.id"
          class="group relative pr-12 mb-4"
      >
        <GlassCard>
          <div class="flex items-center justify-between">
            <div>
              <p>{{habit.title}}</p>
              <span class="italic"> {{ habit.cadence.charAt(0).toUpperCase() + habit.cadence.slice(1) }}</span>
            </div>

            <!-- trailing buttons -->
            <div
                class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2
           opacity-100 md:opacity-0 md:group-hover:opacity-100
           focus-within:opacity-100 transition"
            >
              <!-- Edit -->
              <button
                  class="p-2 rounded-full bg-white/70 dark:bg-gray-700/70 backdrop-blur-md ring-1 ring-white/40 dark:ring-white/10
             hover:bg-white/90 dark:hover:bg-gray-700/90"
                  aria-label="Edit habit"
                  @click.stop="startEdit(habit)"
              >
                <PencilSquareIcon class="w-5 h-5" />
              </button>

              <!-- Delete -->
              <button
                  class="p-2 rounded-full bg-white/70 dark:bg-gray-700/70 backdrop-blur-md ring-1 ring-white/40 dark:ring-white/10
             hover:bg-white/90 dark:hover:bg-gray-700/90"
                  aria-label="Delete habit"
                  @click.stop="removeHabit(habit.id)"
              >
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </GlassCard>
      </li>

    </ul>

    <p v-if="!habits.length" class="text-gray-500 mt-4">
      No habits yet. Add one!
    </p>

    <!-- "sheet" -->
    <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-10"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-10"
    >
      <div
          v-if="showSheet"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 shadow-lg">

          <h2 class="text-xl font-bold mb-4">{{ editId ? 'Edit Habit' : 'Add Habit' }}</h2>

          <form @submit.prevent="saveHabit" class="space-y-4">            <!-- Title input (glassmorphic) -->
            <label for="habitTitle" class="sr-only">Habit title</label>
            <div
                class="relative rounded-xl px-4 py-3 bg-white/10 dark:bg-white/10 backdrop-blur-md
         ring-1 ring-white/40 dark:ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)]
         focus-within:ring-violet-400 transition"
            >
              <input
                  id="habitTitle"
                  v-model="title"
                  type="text"
                  placeholder="Habit title (e.g., Drink Water)"
                  class="w-full bg-transparent placeholder-black/50 dark:placeholder-white/50
           text-gray-900 dark:text-gray-100 outline-none"
                  autocomplete="off"
                  autofocus
              />
            </div>

            <!-- Cadence select (glassmorphic) -->
            <label class="block">
              <span class="sr-only">Cadence</span>
              <div
                  class="relative rounded-xl px-4 py-3 bg-white/10 dark:bg-white/10 backdrop-blur-md ring-1 ring-white/40 dark:ring-white/10
                       shadow-[0_8px_30px_rgba(0,0,0,0.12)] focus-within:ring-violet-400 transition"
              >
                <select
                    v-model="cadence"
                    class="w-full bg-transparent text-gray-900 dark:text-gray-100 outline-none
                         [appearance:none] pr-8"
                >
                  <option class="bg-white dark:bg-gray-800" value="daily">Daily</option>
                  <option class="bg-white dark:bg-gray-800" value="weekly">Weekly</option>
                  <option class="bg-white dark:bg-gray-800" value="monthly">Monthly</option>
                  <option class="bg-white dark:bg-gray-800" value="custom">Custom</option>
                </select>
                <!-- Chevron indicator -->
                <svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                </svg>
              </div>
            </label>

            <!-- Error message -->
            <p v-if="error" class="text-red-500">{{ error }}</p>

            <div class="mt-4 flex justify-end gap-2">
              <button @click="showSheet = false" class="px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-700">
                Cancel
              </button>
              <button
                  type="submit"
                  :disabled="!title.trim()"
                  class="px-4 py-2 rounded-full bg-violet-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>

</style>