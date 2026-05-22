<script setup>
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiBadge from '../../../shared/components/UiBadge.vue'
import UiCard from '../../../shared/components/UiCard.vue'
import { ROOMS, TODAY_RESERVATIONS } from '../../../shared/api/mock-data'
const room = (id) => ROOMS.find((item) => item.id === id)?.name
</script>
<template><div class="mx-auto max-w-[1500px] p-6 lg:p-8"><PageHeader title="예약 현황 관리" description="전사 회의실 예약을 조회·관리합니다." /><UiCard class="scroll-table"><table class="w-full text-[12.5px]"><tr class="bg-muted/40 text-muted-foreground"><th v-for="head in ['회의 제목','주최자','회의실','날짜','시간','상태','']" :key="head" class="px-5 py-2.5 text-left font-medium">{{ head }}</th></tr><tr v-for="item in TODAY_RESERVATIONS" :key="item.id" class="border-t"><td class="px-5 py-3 font-medium">{{ item.title }}</td><td class="px-5 py-3">{{ item.owner }}</td><td class="px-5 py-3">{{ room(item.roomId) }}</td><td class="px-5 py-3">2026-05-21</td><td class="px-5 py-3">{{ item.start }} - {{ item.end }}</td><td class="px-5 py-3"><UiBadge :tone="item.status === 'restricted' ? 'warning' : 'default'">예약됨</UiBadge></td><td class="px-5 py-3 text-right text-destructive">강제 취소</td></tr></table></UiCard></div></template>
