<template>
  <section>
  <h1 class="text-4xl font-bold pb-10 text-white drop-shadow-[0_4px_12px_rgba(139,92,246,0.6)] animate-fadeInUp">
  Home
</h1>
    <h1 class="text-xl font-semibold">Example Heading</h1>

    <section>
      <GlassCard class="mt-8" tint="purple">
      <h2 class="subheading">Latin</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullamco laboriosam, nisi ut aliquid ex ea commodi consequatur. Duis aute irure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </GlassCard>

      <GlassCard class="mt-8" tint="blue">
      <h2 class="subheading">Spanish</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisci elit, pero se produce un cierto tiempo de esfuerzo con trabajo y dolor. Para obtener el mínimo beneficio, ¿quién de nosotros soportaría un trabajo tan duro, a menos que de ello resultara alguna ventaja? Quien evita el placer culpable, experimenta dolor en el deseo de ser liberado. Quien está cegado por la codicia no se da cuenta de la culpa de los que descuidan sus deberes.</p>
      </GlassCard>

      <GlassCard class="mt-8" tint="green">
      <h2 class="subheading">French</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisci elit, mais pendant un certain temps, il faut supporter la peine et la douleur. Pour en tirer le moindre profit, qui d’entre nous accepterait un tel labeur, si quelque avantage n’en résultait pas ? Celui qui évite le plaisir fautif ressent la douleur dans le désir de s’en libérer. Celui que la cupidité aveugle ne se rend pas compte de la faute de ceux qui négligent leurs devoirs.</p>
      </GlassCard>

      <GlassCard class="mt-8" tint="yellow">
      <h2 class="subheading">Portuguese</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisci elit, mas durante algum tempo é necessário suportar trabalho e dor. Para obter o mínimo de benefício, quem de nós suportaria tamanho esforço, a menos que dele resultasse alguma vantagem? Quem evita o prazer culposo sente dor no desejo de se libertar. Quem é cegado pela cobiça não percebe a culpa daqueles que negligenciam os seus deveres.</p>
      </GlassCard>

      <GlassCard class="mt-8" tint="orange">
      <h2 class="subheading">Dutch</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisci elit, maar voor een tijd moet men arbeid en pijn verdragen. Om enig voordeel te behalen, wie van ons zou zo’n zware taak verdragen, tenzij daaruit enig nut voortkwam? Wie het schuldige genot vermijdt, ervaart pijn in het verlangen bevrijd te worden. Wie door hebzucht wordt verblind, beseft niet de schuld van hen die hun plichten veronachtzamen.</p>
      </GlassCard>
    </section>

  </section>
</template>

<style>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}
</style>

<script setup lang="ts">

import GlassCard from "@/components/GlassCard.vue";
</script>