<script setup>
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiBadge from '../../../shared/components/UiBadge.vue'
import UiCard from '../../../shared/components/UiCard.vue'
const history = [{ time: '2026-05-21 08:48', actor: '김마스터', target: '박관리', change: 'User -> Admin', note: '신임 팀장 발령' }, { time: '2026-05-18 14:10', actor: '김마스터', target: '박관리', change: '회의록 정책 권한 부여', note: '' }, { time: '2026-05-12 11:02', actor: '김마스터', target: '최정훈', change: 'Admin -> User', note: '부서 이동' }]
</script>
<template><div class="mx-auto max-w-[1300px] p-6 lg:p-8"><PageHeader title="권한 변경 이력" description="모든 권한 변경 이력을 감사할 수 있습니다." /><UiCard class="scroll-table"><table class="w-full text-[12.5px]"><tr class="bg-muted/40 text-muted-foreground"><th v-for="head in ['일시','작업자','대상','변경','비고']" :key="head" class="px-5 py-2.5 text-left font-medium">{{ head }}</th></tr><tr v-for="item in history" :key="item.time" class="border-t"><td class="px-5 py-3 text-muted-foreground">{{ item.time }}</td><td class="px-5 py-3">{{ item.actor }}</td><td class="px-5 py-3 font-medium">{{ item.target }}</td><td class="px-5 py-3"><UiBadge tone="primary">{{ item.change }}</UiBadge></td><td class="px-5 py-3 text-muted-foreground">{{ item.note || '-' }}</td></tr></table></UiCard></div></template>
