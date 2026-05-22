<script setup>
import { ref } from 'vue'
import { Plus } from '@lucide/vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiBadge from '../../../shared/components/UiBadge.vue'
import UiCard from '../../../shared/components/UiCard.vue'
import { ROOMS } from '../../../shared/api/mock-data'
const rooms = ref(ROOMS.map((room, index) => ({ ...room, active: index !== 4 })))
function add() { rooms.value.push({ id: `r-${Date.now()}`, name: '신규 회의실', floor: 1, capacity: 6, equipment: ['TV'], site: '테헤란로', active: true }) }
</script>
<template><div class="mx-auto max-w-[1300px] p-6 lg:p-8"><PageHeader title="회의실 관리" description="회의실을 등록·수정하고 사용 가능 여부를 제어합니다."><template #action><button class="inline-flex h-9 items-center gap-1 rounded-md bg-primary px-3.5 text-[13px] text-primary-foreground" @click="add"><Plus class="h-3.5 w-3.5" /> 회의실 등록</button></template></PageHeader><UiCard class="scroll-table"><table class="w-full text-[12.5px]"><tr class="bg-muted/40 text-muted-foreground"><th v-for="head in ['회의실','사이트','층','정원','장비','상태']" :key="head" class="px-5 py-2.5 text-left font-medium">{{ head }}</th></tr><tr v-for="room in rooms" :key="room.id" class="border-t"><td class="px-5 py-3 font-medium">{{ room.name }}</td><td class="px-5 py-3">{{ room.site }}</td><td class="px-5 py-3">{{ room.floor }}F</td><td class="px-5 py-3">{{ room.capacity }}명</td><td class="px-5 py-3 text-muted-foreground">{{ room.equipment.join(', ') }}</td><td class="px-5 py-3"><UiBadge :tone="room.active ? 'success' : 'warning'">{{ room.active ? '운영 중' : '사용 제한' }}</UiBadge></td></tr></table></UiCard></div></template>
