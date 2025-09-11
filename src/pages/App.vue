<!-- src/App.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const mobileOpen = ref(false)
const route = useRoute()

// Close the mobile menu whenever the route changes
watch(() => route.fullPath, () => { mobileOpen.value = false })

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}
</script>

<template>
  <!-- Accessibility: skip link for keyboard users -->
  <a class="skip" href="#main">Skip to content</a>

  <nav class="nav">
    <!-- Brand -->
    <RouterLink to="/" class="brand">
      <!-- TODO: Replace with a logo image -->
      <span class="brand-dot" aria-hidden="true"></span>
      <span class="brand-text">My App</span>
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
      <span class="bar"></span><span class="bar"></span><span class="bar"></span>
    </button>

    <!-- Mobile panel -->
    <ul id="primary-nav" class="links mobile" :class="{ 'mobile-open': mobileOpen }">
      <li>
        <RouterLink to="/" class="link" active-class="active" exact-active-class="active">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/about" class="link" active-class="active">About</RouterLink>
      </li>
    </ul>
  </nav>

  <!-- Main content area -->
  <main id="main" class="main-content">
    <RouterView />
  </main>
</template>

<style scoped>
/* Layout */
.nav {
  position: sticky;
  top: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 12px;
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(0,0,0,.08);
  background: color-mix(in oklab, canvas 90%, transparent);
  backdrop-filter: blur(8px);
}
@media (prefers-color-scheme: dark) {
  .nav { border-bottom-color: rgba(255,255,255,.12); }
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;
}
.brand-text { font-weight: 600; font-size: 1.05rem; }
.brand-dot { width: 18px; height: 18px; border-radius: 50%; background: currentColor; opacity: .8; }

/* Links */
.links {
  list-style: none;
  display: flex;
  gap: 14px;
  margin: 0;
  padding: 0;
}
.link {
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 8px;
  opacity: .9;
  color: inherit;
  transition: all 0.2s ease;
}
.link:hover {
  opacity: 1;
  background: rgba(0,0,0,.06);
}
@media (prefers-color-scheme: dark) {
  .link:hover { background: rgba(255,255,255,.08); }
}
.active {
  font-weight: 600;
  opacity: 1;
  background: rgba(0,0,0,.06);
}
@media (prefers-color-scheme: dark) {
  .active { background: rgba(255,255,255,.08); }
}

/* Desktop / Mobile visibility */
.desktop { display: none; }

.hamburger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 0;
  cursor: pointer;
  border-radius: 8px;
  flex-direction: column;
  gap: 2px;
  transition: all 0.2s ease;
}
.hamburger:hover { background: rgba(0,0,0,.06); }
@media (prefers-color-scheme: dark) {
  .hamburger:hover { background: rgba(255,255,255,.08); }
}

.hamburger .bar {
  display: block;
  width: 20px;
  height: 2px;
  background: currentColor;
  transition: all 0.3s ease;
  transform-origin: center;
}

/* Animated hamburger */
.hamburger-active .bar:nth-child(2) {
  transform: rotate(45deg);
}
.hamburger-active .bar:nth-child(3) {
  transform: rotate(-45deg) translate(0, -2px);
}
.hamburger-active .bar:nth-child(4) {
  opacity: 0;
}

.mobile {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  flex-direction: column;
  gap: 4px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(0,0,0,.08);
  background: color-mix(in oklab, canvas 95%, transparent);
  backdrop-filter: blur(8px);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
}
@media (prefers-color-scheme: dark) {
  .mobile {
    border-bottom-color: rgba(255,255,255,.12);
    background: color-mix(in oklab, canvas 95%, transparent);
  }
}

.mobile-open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  padding: 12px 16px 16px;
}

@media (min-width: 768px) {
  .desktop { display: flex; }
  .hamburger, .mobile { display: none; }
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