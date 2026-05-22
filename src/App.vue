<script setup>
const setupItems = ['Vite dev server', 'Vue single-file components', 'Production build scripts']
</script>

<template>
  <main class="app-shell">
    <section class="setup-panel">
      <p class="eyebrow">MeetBowl Frontend</p>
      <h1>Vue 기본 환경 준비 완료</h1>
      <ul>
        <li v-for="item in setupItems" :key="item">
          {{ item }}
        </li>
      </ul>
    </section>
  </main>
</template>
