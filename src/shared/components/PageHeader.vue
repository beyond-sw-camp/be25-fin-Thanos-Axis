<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
})
</script>

<template>
  <header class="mb-6 flex flex-wrap items-end justify-between gap-3">
    <div>
      <h1 class="text-[22px] font-semibold text-foreground">{{ title }}</h1>
      <p v-if="description" class="mt-1 text-[13px] text-muted-foreground">{{ description }}</p>
    </div>
    <slot name="action" />
  </header>
</template>
