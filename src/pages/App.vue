<!-- src/App.vue -->
<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import VueLogo from '../assets/vue.svg'

const mobileOpen = ref(false)
const scrolled = ref(false)
const route = useRoute()

watch(() => route.fullPath, () => { mobileOpen.value = false })

watch(mobileOpen, v => {
  document.documentElement.style.overflow = v ? 'hidden' : ''
})
function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}

function onScroll() {
  scrolled.value = window.scrollY > 2
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>

  <nav class="nav" :class="{ scrolled }">
    <div class="nav-inner">
      <!-- Brand -->
      <RouterLink to="/" class="brand">
        <img :src="VueLogo" alt="Vue.js" class="h-6 w-6" />
        <span class="brand-text">egzanp</span>
      </RouterLink>

      <!-- Desktop links -->
      <ul class="links desktop">
        <li>
          <RouterLink to="/" class="link" active-class="active" exact-active-class="active">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="link" active-class="active">About</RouterLink>
        </li>
      </ul>

      <!-- Mobile hamburger -->
      <button
          class="hamburger"
          :class="{ 'hamburger-active': mobileOpen }"
          :aria-expanded="mobileOpen ? 'true' : 'false'"
          aria-controls="primary-nav"
          @click="toggleMobile"
      >
        <span class="sr-only">Toggle navigation</span>
        <span class="bars">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </span>
      </button>

      <!-- Mobile panel -->
<ul id="primary-nav" class="links mobile layered-glass" :class="{ 'mobile-open': mobileOpen }">
        <li><RouterLink to="/" class="link" exact-active-class="active">Home</RouterLink></li>
        <li><RouterLink to="/about" class="link">About</RouterLink></li>
      </ul>
    </div>
  </nav>

  <div
      class="mobile-scrim"
      :class="{ 'scrim-show': mobileOpen }"
      aria-hidden="true"
      @click="mobileOpen = false"
  />

  <main id="main" class="main-content">
    <RouterView v-slot="{ Component, route }">
      <Transition
          enter-from-class="opacity-0 translate-y-2"
          enter-active-class="transition-all duration-300 ease-out"
          enter-to-class="opacity-100 translate-y-0"
          leave-from-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-to-class="opacity-0 translate-y-1"
          mode="out-in"
      >
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </RouterView>
  </main>
</template>

<style scoped>
/* Layout */
/* Theme tokens for the nav */
:root {
  --nav-bg: color-mix(in oklab, canvas 88%, transparent);
  --nav-bg-strong: color-mix(in oklab, canvas 94%, transparent);
  --nav-border: rgba(0,0,0,.08);
  --nav-hover: rgba(0,0,0,.06);
  --nav-active: rgba(0,0,0,.08);
}
@media (prefers-color-scheme: dark) {
  :root {
    --nav-bg: color-mix(in oklab, canvas 78%, transparent);
    --nav-bg-strong: color-mix(in oklab, canvas 86%, transparent);
    --nav-border: rgba(255,255,255,.12);
    --nav-hover: rgba(255,255,255,.08);
    --nav-active: rgba(255,255,255,.10);
  }
}

/* Layout */
.nav {
  position: sticky;
  top: 0;
  z-index: 100; /* was 80 */
  backdrop-filter: blur(10px);
  background: var(--nav-bg);
  border-bottom: 1px solid var(--nav-border);
  transition: background .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.nav.scrolled {
  background: var(--nav-bg-strong);
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
}

.nav-inner {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 12px;
  height: 56px;
  padding: 0 16px;
  max-width: 1100px;
  margin: 0 auto;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;
}
.brand-text { font-weight: 700; font-size: 1.05rem; letter-spacing: -0.01em; }

/* Links */
.links {
  list-style: none;
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 0;
}

/* Larger hit targets, sleeker radii */
.link {
  position: relative;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 10px;
  color: inherit;
  opacity: .92;
  transition: opacity .2s, background .2s, transform .15s;
}
.link:hover {
  opacity: 1;
  background: var(--nav-hover);
}

/* Active style via ARIA (Vue Router sets aria-current="page") */
.link[aria-current="page"] {
  font-weight: 700;
  opacity: 1;
  background: var(--nav-active);
}

/* Modern underline indicator */
.link::after {
  content: '';
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 4px;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  opacity: .6;
  transition: transform .25s ease;
}
.link:hover::after,
.link[aria-current="page"]::after {
  transform: scaleX(1);
}

/* Layered Glass Mobile Menu */
.mobile.layered-glass {
  padding: 20px 16px 24px; /* More padding for the outer container */
  background: var(--nav-bg-strong); /* Use your existing color variables */
  border-radius: 0 0 18px 18px; /* Only round bottom corners */
}

.mobile.layered-glass .link {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  text-decoration: none;
  color: inherit; /* Use inherited color instead of white */
  background: var(--nav-hover); /* Use your existing hover color */
  border: 1px solid var(--nav-border);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  opacity: 0.95;
}

.mobile.layered-glass .link::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, currentColor, rgba(128,128,128,0.3));
  border-radius: 0 4px 4px 0;
  transform: scaleY(0);
  transition: transform 0.3s ease;
  opacity: 0.7;
}

.mobile.layered-glass .link:hover {
  background: var(--nav-active);
  padding-left: 32px;
  opacity: 1;
  transform: translateX(4px);
}

.mobile.layered-glass .link:hover::before {
  transform: scaleY(1);
}

/* Active state for layered glass */
.mobile.layered-glass .link[aria-current="page"] {
  background: var(--nav-active);
  font-weight: 600;
  opacity: 1;
  padding-left: 32px;
}

.mobile.layered-glass .link[aria-current="page"]::before {
  transform: scaleY(1);
}

/* Desktop / Mobile visibility */
.desktop { display: none; }

.hamburger {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px; height: 40px;
  background: transparent; border: 0; cursor: pointer;
  border-radius: 10px;
  transition: background .2s ease, transform .15s ease;
}
.hamburger:hover { background: var(--nav-hover); }

/* keep bars grouped so nth-child is stable */
.hamburger .bars {
  position: relative;
  width: 22px; height: 16px;
}

.hamburger .bar {
  position: absolute; left: 0; right: 0;
  height: 2px; background: currentColor; border-radius: 1px;
  transition: transform .25s ease, opacity .2s ease;
}
.hamburger .bar:nth-child(1) { top: 0; }
.hamburger .bar:nth-child(2) { top: 7px; }
.hamburger .bar:nth-child(3) { top: 14px; }

/* active (X) state */
.hamburger-active .bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger-active .bar:nth-child(2) {
  opacity: 0;
}
.hamburger-active .bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile panel */
.mobile {
  position: fixed;
  top: 56px; left: 0; right: 0;
  z-index: 110; /* was 100 */
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px 16px;
  border-bottom: 1px solid var(--nav-border);
  background: var(--nav-bg-strong);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0,0,0,.18);
  max-height: calc(100vh - 56px);
  overflow: auto;

  opacity: 0; visibility: hidden;
  transform: translateY(-8px) scale(.98);
  transform-origin: top;
  transition: opacity .2s ease, transform .2s ease, visibility .2s ease;
}
.mobile-open {
  opacity: 1; visibility: visible;
  transform: translateY(0) scale(1);
}

/* Scrim */
.mobile-scrim {
  position: fixed;
  top: 56px; left: 0; right: 0; bottom: 0;
  z-index: 90; /* was 90 but keep < nav (100) */
  background: rgba(0,0,0,0);
  opacity: 0;
  pointer-events: none;
  transition: opacity .2s ease, backdrop-filter .2s ease, background .2s ease;
}
.mobile-scrim.scrim-show {
  background: rgba(0,0,0,.65);
  backdrop-filter: blur(6px);
  opacity: 1;
  pointer-events: auto;
}
@media (prefers-reduced-motion: reduce) {
  .mobile-scrim { transition: none !important; }
}

@media (min-width: 768px) {
  .desktop { display: flex; }
  .hamburger, .mobile { display: none; }
  .mobile-scrim { display: none; }
}



/* Main content */
.main-content {
  min-height: calc(100vh - 56px);
  padding: 20px;
}

/* A11y helpers */
.skip {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: 100;
}
.skip:focus {
  left: 8px;
  top: 8px;
  width: auto;
  height: auto;
  padding: 8px 10px;
  background: #ffd;
  color: #000;
  border-radius: 6px;
  text-decoration: none;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
</style>