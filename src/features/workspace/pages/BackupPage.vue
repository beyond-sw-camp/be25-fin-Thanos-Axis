<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, FileText, Mail } from '@lucide/vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiBadge from '../../../shared/components/UiBadge.vue'
import UiCard from '../../../shared/components/UiCard.vue'
import { BACKUP_MAILS, BACKUP_RECS } from '../api/workspace-data'

const route = useRoute()
const record = computed(() => BACKUP_RECS.find((item) => item.id === route.params.id))
const mail = computed(() => BACKUP_MAILS.find((item) => item.id === route.params.id))
const transcript = ['오늘은 OKR 점검과 Q2 우선순위 재정렬을 진행하겠습니다.', '캠페인 일정 변경을 검토합니다.', '후속 액션을 메일로 공유합니다.']
</script>

<template>
  <div class="mx-auto max-w-[1100px] p-6 lg:p-8">
    <RouterLink to="/app/workspace" class="mb-4 inline-flex items-center gap-1 text-[13px] text-muted-foreground"><ArrowLeft class="h-3.5 w-3.5" /> 워크스페이스로</RouterLink>
    <template v-if="record"><PageHeader :title="record.title" :description="`${record.date} · ${record.meta}`" /><div class="grid gap-5 lg:grid-cols-[1fr_320px]"><UiCard class="p-6"><h2 class="mb-3 font-semibold"><FileText class="mr-1 inline h-4 w-4" /> STT 원문</h2><p v-for="line in transcript" :key="line" class="border-b py-3 text-[13px]">{{ line }}</p></UiCard><UiCard class="h-fit p-5"><p class="text-[11px] font-semibold uppercase text-muted-foreground">AI 요약</p><p class="mt-2 text-[13px]">{{ record.summary }}</p><UiBadge class="mt-4" tone="navy">회의록 백업</UiBadge></UiCard></div></template>
    <UiCard v-else-if="mail" class="p-7"><div class="flex justify-between"><h1 class="text-[22px] font-semibold">{{ mail.title }}</h1><UiBadge tone="primary">메일 백업</UiBadge></div><p class="mt-5 border-b pb-5"><Mail class="mr-1 inline h-4 w-4" /> {{ mail.from }} · {{ mail.date }}</p><p class="mt-6 whitespace-pre-line text-[14px]">{{ mail.preview }}<br /><br />본 메일은 워크스페이스에 백업된 사본입니다.</p></UiCard>
    <UiCard v-else class="p-8 text-center text-muted-foreground">백업 자료를 찾을 수 없습니다.</UiCard>
  </div>
</template>
