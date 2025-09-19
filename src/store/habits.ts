import {defineStore} from 'pinia'
import localforage from "localforage"
import { toRaw } from 'vue'

localforage.config({
    name: 'habits-app',
    storeName: 'habits-store', //IndexedDB object store
    description: 'Habit data without auth'
})

export type Habit = {
    id: string,
    title: string,
    cadence: 'daily' | 'weekly' | 'monthly' | 'custom',
    archived?: boolean,
    createdAt: number
}

type State = {
    version: number,
    habits: Habit[]
}

const STORAGE_KEY = 'habits_state_v1'

export const useHabitsStore = defineStore('habits', {
    state: () => ({ version: 1, habits: [] as Habit[] }),
    actions: {
        async persist() {
            const plainHabits = toRaw(this.habits).map(h => ({ ...h }))
            await localforage.setItem(STORAGE_KEY, JSON.stringify({
                version: this.version,
                habits: plainHabits
            }))
        },
        async init() {
            const raw = await localforage.getItem(STORAGE_KEY)
            if (!raw) {
                await this.persist()
                return
            }
            try {
                let state: State
                if (typeof raw === 'string') {
                    // Current format: JSON string
                    state = JSON.parse(raw) as State
                } else {
                    // Legacy format: plain object previously saved without JSON.stringify
                    state = raw as State
                    // Normalize to current format (stringified)
                    await localforage.setItem(STORAGE_KEY, JSON.stringify(state))
                }
                this.$patch(state)
            } catch (err) {
                // If parsing fails for any reason, reset the key to a safe default
                console.error('Failed to load habits from storage; resetting key', err)
                await localforage.removeItem(STORAGE_KEY)
                await this.persist()
            }
        },
        async addHabit(title: string, cadence: Habit['cadence']) {
            this.habits.push({
                id: crypto.randomUUID(),
                title,
                cadence,
                createdAt: Date.now(),
            })
            await this.persist()
        },
        async archiveHabit(id: string) {
            const h = this.habits.find(h => h.id === id)
            if (h) {
                h.archived = true
                await this.persist()
            }
        },
        async removeHabit(id: string) {
            this.habits = this.habits.filter(h => h.id !== id)
            await this.persist()
        },
        async migrate(oldState: State): Promise<State> {
            // Example migration skeleton
            return {version: 1, habits: oldState.habits || []}
        },
        //Export/Import for portability
        exportJSON(): string {
            const plainHabits = toRaw(this.habits).map(h => ({ ...h }))
            return JSON.stringify({
                version: this.version,
                habits: plainHabits
            })
        },
        async resetStorage() {
            this.$patch({ version: 1, habits: [] })
            await localforage.removeItem(STORAGE_KEY)
            await this.persist()
        },
        async importJSON(json: string) {
            const parsed = JSON.parse(json) as State
            //optionally validate shape
            this.$patch(parsed)
            await this.persist()
        },
        async fetchById(id: string): Promise<Habit|undefined> {
            return this.habits.find(h => h.id === id)
        }
    }
})