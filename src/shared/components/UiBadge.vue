<script setup>
import { computed } from 'vue'

const props = defineProps({
  tone: { type: String, default: 'default' },
})

const tones = {
  default: 'bg-muted text-foreground/70 border-border',
  primary: 'bg-primary/10 text-primary border-primary/20',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  navy: 'bg-navy/10 text-navy border-navy/20',
  muted: 'bg-muted text-muted-foreground border-border',
}

const toneClass = computed(() => tones[props.tone] ?? tones.default)
</script>

<template>
  <span :class="toneClass" class="inline-flex h-5 items-center rounded border px-2 text-[11px] font-medium">
    <slot />
  </span>
</template>
