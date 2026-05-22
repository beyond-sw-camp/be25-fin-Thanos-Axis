<script setup>
import { AlertTriangle, DoorOpen, FileText, Mail, Users } from '@lucide/vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiBadge from '../../../shared/components/UiBadge.vue'
import UiCard from '../../../shared/components/UiCard.vue'
import { ADMIN_LOGS, MEMBERS, ROOMS } from '../../../shared/api/mock-data'
const kpis = [{ label: '전체 사용자', value: MEMBERS.length, sub: '활성 6 · 비활성 1', icon: Users }, { label: '운영 회의실', value: ROOMS.length, sub: '전 층', icon: DoorOpen }, { label: '오늘 회의', value: 8, sub: '진행 중 1', icon: FileText }, { label: '보관 회의록', value: 124, sub: '삭제 예정 12', icon: Mail }]
</script>
<template>
  <div class="mx-auto max-w-[1500px] p-6 lg:p-8">
    <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">Admin Console</p>
    <PageHeader title="관리자 대시보드" description="플랫폼 운영 현황과 관리 활동을 모니터링합니다." />
    <div class="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4"><UiCard v-for="kpi in kpis" :key="kpi.label" class="p-4"><div class="flex justify-between"><div><p class="text-[11px] text-muted-foreground">{{ kpi.label }}</p><b class="mt-1.5 block text-[24px]">{{ kpi.value }}</b><p class="text-[11px] text-muted-foreground">{{ kpi.sub }}</p></div><component :is="kpi.icon" class="h-5 w-5 text-navy" /></div></UiCard></div>
    <div class="grid gap-5 lg:grid-cols-3"><UiCard class="scroll-table lg:col-span-2"><h3 class="border-b px-5 py-3.5 text-sm font-semibold">관리자 작업 로그</h3><table class="w-full text-[12.5px]"><tr class="bg-muted/40 text-muted-foreground"><th v-for="head in ['일시','작업자','영역','작업','결과']" :key="head" class="px-5 py-2 text-left font-medium">{{ head }}</th></tr><tr v-for="log in ADMIN_LOGS" :key="log.id" class="border-t"><td class="px-5 py-2.5 text-muted-foreground">{{ log.time }}</td><td class="px-5 py-2.5">{{ log.actor }}</td><td class="px-5 py-2.5">{{ log.area }}</td><td class="px-5 py-2.5">{{ log.action }}</td><td class="px-5 py-2.5"><UiBadge tone="success">{{ log.result }}</UiBadge></td></tr></table></UiCard><UiCard><h3 class="border-b px-5 py-3.5 text-sm font-semibold"><AlertTriangle class="mr-1 inline h-3.5 w-3.5 text-amber-500" /> 주의 항목</h3><p v-for="item in ['삭제 예정 회의록 12건','사용 제한 회의실 1건','비활성 사용자 1명']" :key="item" class="border-b px-5 py-3 text-[12.5px] last:border-0">{{ item }}</p></UiCard></div>
  </div>
</template>
