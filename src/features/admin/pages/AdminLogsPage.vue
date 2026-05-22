<script setup>
import { Search } from '@lucide/vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiBadge from '../../../shared/components/UiBadge.vue'
import UiCard from '../../../shared/components/UiCard.vue'
import { ADMIN_LOGS } from '../../../shared/api/mock-data'
</script>
<template><div class="mx-auto max-w-[1500px] p-6 lg:p-8"><PageHeader title="관리자 작업 로그" description="모든 관리자 작업의 감사 로그를 조회합니다." /><UiCard class="scroll-table"><div class="flex gap-2 border-b p-3"><label class="relative flex-1 max-w-md"><Search class="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><input class="h-9 w-full rounded-md border pl-8 pr-3 text-[12.5px]" placeholder="작업자, 영역, 대상 검색" /></label></div><table class="w-full text-[12.5px]"><tr class="bg-muted/40 text-muted-foreground"><th v-for="head in ['일시','작업자','영역','작업','대상','결과']" :key="head" class="px-5 py-2.5 text-left font-medium">{{ head }}</th></tr><tr v-for="(log, index) in [...ADMIN_LOGS, ...ADMIN_LOGS]" :key="`${log.id}-${index}`" class="border-t"><td class="px-5 py-2.5 text-muted-foreground">{{ log.time }}</td><td class="px-5 py-2.5">{{ log.actor }}</td><td class="px-5 py-2.5">{{ log.area }}</td><td class="px-5 py-2.5">{{ log.action }}</td><td class="px-5 py-2.5 text-muted-foreground">{{ log.target }}</td><td class="px-5 py-2.5"><UiBadge tone="success">{{ log.result }}</UiBadge></td></tr></table></UiCard></div></template>
