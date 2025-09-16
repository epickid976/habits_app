<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  clickable?: boolean

  /** Any valid CSS color: '#7c3aed', 'rgb(99,102,241)', 'hsl(260 100% 72%)', 'rebeccapurple', etc. */
  tint?: string | null
  /** 0…1 how strong the blobs appear (default 0.22) */
  tintStrength?: number
  /** Choose the overlay look */
  tintPattern?: 'blobs' | 'linear' | 'radial'
}>(), {
  padding: 'md',
  hover: true,
  clickable: false,
  tint: null,
  tintStrength: 0.22,
  tintPattern: 'blobs'
})

const paddingClass = computed(() => ({
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8'
}[props.padding]))

const base =
  // note: added overflow-hidden so the overlay respects rounded corners
  'relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 ' +
  'dark:bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] ' +
  'ring-1 ring-black/5 dark:ring-white/10'

const hoverClasses = computed(() =>
  props.hover
    ? 'transition-all duration-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.20)] hover:bg-white/15 dark:hover:bg-white/10 hover:-translate-y-0.5'
    : ''
)

const clickableClasses = computed(() =>
  props.clickable ? 'cursor-pointer select-none active:scale-[0.98]' : ''
)

/** Build a soft gradient overlay using the provided tint color. */
const overlayStyle = computed(() => {
  if (!props.tint) return {}

  const a = Math.min(Math.max(props.tintStrength ?? 0.22, 0), 1)

  // A few tasteful patterns
  if (props.tintPattern === 'linear') {
    return {
      background: `
        linear-gradient(120deg,
          color-mix(in oklab, ${props.tint} ${a * 60}%, transparent) 0%,
          transparent 45%,
          color-mix(in oklab, ${props.tint} ${a * 45}%, transparent) 70%,
          transparent 100%
        )
      `
    }
  }

  if (props.tintPattern === 'radial') {
    return {
      background: `
        radial-gradient(80% 60% at 20% 0%,
          color-mix(in oklab, ${props.tint} ${a * 70}%, transparent) 0%,
          transparent 60%),
        radial-gradient(70% 55% at 95% 85%,
          color-mix(in oklab, ${props.tint} ${a * 55}%, transparent) 0%,
          transparent 65%)
      `
    }
  }

  // default: 'blobs' (two soft blobs, top-left & bottom-right)
  return {
    background: `
      radial-gradient(90% 70% at -10% -10%,
        color-mix(in oklab, ${props.tint} ${a * 65}%, transparent) 0%,
        transparent 60%),
      radial-gradient(80% 65% at 110% 110%,
        color-mix(in oklab, ${props.tint} ${a * 50}%, transparent) 0%,
        transparent 65%)
    `
  }
})
</script>

<template>
  <div :class="[base, paddingClass, hoverClasses, clickableClasses]">
    <!-- subtle tint overlay -->
    <div
      v-if="tint"
      class="pointer-events-none absolute inset-0 mix-blend-soft-light"
      :style="overlayStyle"
      aria-hidden="true"
    />
    <slot />
  </div>
</template>