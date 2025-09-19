<template>
  <section>
    <h1 class="text-4xl font-bold pb-5 text-white drop-shadow-[0_4px_12px_rgba(139,92,246,0.6)] animate-fadeInUp">
      About
    </h1>

    <GlassCard>
      <p>This is an example habit app to learn vue. Vue is truly amazing when you get acquainted with it. Here we go!</p>

    </GlassCard>

    <h2 class="subheading pt-5 pb-3"> FAQ</h2>
    <GlassCard>
      <ul class="list-disc list-inside">
        <li><strong>Why?</strong> Because I want to learn more about Vue.</li>
        <li><strong>What's next?</strong> I will add some features and polish the UI a bit.</li>
        <li><strong>How can I contribute?</strong> By writing code.</li>
      </ul>
    </GlassCard>
  </section>
</template>

<script setup lang="ts">

import GlassCard from "@/components/GlassCard.vue";
</script>