<script setup>
import { ref } from 'vue'
import { Calendar, MapPin, Users, X } from '@lucide/vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiBadge from '../../../shared/components/UiBadge.vue'
import UiCard from '../../../shared/components/UiCard.vue'
import { ROOMS, TODAY_RESERVATIONS } from '../../../shared/api/mock-data'

const items = ref([
  ...TODAY_RESERVATIONS.filter((item) => item.status === 'mine' || item.owner === '이지연').map((item) => ({ ...item, date: '2026-05-21' })),
  { id: 'u1', roomId: 'r2', title: '스프린트 리뷰', owner: '이지연', start: '10:00', end: '11:00', status: 'mine', attendees: ['박서연', '정도현'], date: '2026-05-22' },
  { id: 'u2', roomId: 'r4', title: '월말 회고', owner: '이지연', start: '14:00', end: '15:30', status: 'mine', attendees: ['전사'], date: '2026-05-30' },
])
const editing = ref(null)
const editForm = ref(null)
function room(id) { return ROOMS.find((item) => item.id === id)?.name }
function cancel(item) { if (confirm('예약을 취소하시겠어요?')) items.value = items.value.filter((row) => row.id !== item.id) }
function openEdit(item) {
  editing.value = item
  editForm.value = { ...item, attendees: item.attendees.join(', ') }
}
function save() {
  items.value = items.value.map((item) => item.id === editForm.value.id
    ? { ...editForm.value, attendees: editForm.value.attendees.split(',').map((name) => name.trim()).filter(Boolean) }
    : item)
  editing.value = null
  editForm.value = null
}
</script>

<template>
  <div class="mx-auto max-w-[1300px] p-6 lg:p-8">
    <PageHeader title="내 예약 현황" description="내가 예약한 회의와 참석 예정 회의를 한 눈에 확인하세요." />
    <div class="mb-5 grid grid-cols-3 gap-3"><UiCard v-for="[label, value] in [['예약된 회의', items.length], ['이번 주', 3], ['이번 달', 8]]" :key="label" class="p-4"><p class="text-[11px] text-muted-foreground">{{ label }}</p><b class="mt-1.5 block text-[24px]">{{ value }}</b></UiCard></div>
    <UiCard class="scroll-table">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5">
        <h3 class="text-sm font-semibold">다가오는 예약</h3>
        <div class="flex gap-1.5">
          <button v-for="(label, index) in ['전체', '오늘', '이번 주', '이번 달']" :key="label" :class="index === 0 ? 'bg-navy text-navy-foreground' : 'text-foreground/70 hover:bg-muted'" class="h-7 rounded px-2.5 text-[12px]">{{ label }}</button>
        </div>
      </div>
      <table class="w-full text-[12.5px]"><thead class="bg-muted/40 text-muted-foreground"><tr><th v-for="head in ['회의 제목','날짜','시간','회의실','참석자','상태','']" :key="head" class="px-5 py-2.5 text-left font-medium">{{ head }}</th></tr></thead><tbody><tr v-for="item in items" :key="item.id" class="border-t border-border hover:bg-muted/30"><td class="px-5 py-3 font-medium">{{ item.title }}</td><td class="px-5 py-3 tabular-nums">{{ item.date }}</td><td class="px-5 py-3 tabular-nums">{{ item.start }} - {{ item.end }}</td><td class="px-5 py-3">{{ room(item.roomId) }}</td><td class="px-5 py-3 text-muted-foreground">{{ item.attendees.length || 3 }}명</td><td class="px-5 py-3"><UiBadge tone="primary">내 예약</UiBadge></td><td class="px-5 py-3 text-right"><button class="mr-3 text-foreground/70 hover:text-foreground" @click="openEdit(item)">수정</button><button class="text-destructive hover:underline" @click="cancel(item)">취소</button></td></tr></tbody></table>
    </UiCard>
    <div v-if="editing && editForm" class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" @click="editing = null; editForm = null">
      <UiCard class="w-full max-w-lg overflow-hidden" @click.stop>
        <div class="flex items-center justify-between border-b border-border px-5 py-3.5">
          <h3 class="text-[14px] font-semibold">회의실 예약 수정</h3>
          <button class="grid h-7 w-7 place-items-center rounded hover:bg-muted" @click="editing = null; editForm = null"><X class="h-4 w-4" /></button>
        </div>
        <div class="space-y-4 p-5">
          <label class="block text-[11.5px] font-medium text-muted-foreground"><Calendar class="mr-1 inline h-3.5 w-3.5" /> 회의 제목<input v-model="editForm.title" class="inp mt-1.5 text-foreground" /></label>
          <label class="block text-[11.5px] font-medium text-muted-foreground">날짜<input v-model="editForm.date" type="date" class="inp mt-1.5 text-foreground" /></label>
          <div class="grid grid-cols-2 gap-3">
            <label class="text-[11.5px] font-medium text-muted-foreground">시작<input v-model="editForm.start" type="time" class="inp mt-1.5 text-foreground" /></label>
            <label class="text-[11.5px] font-medium text-muted-foreground">종료<input v-model="editForm.end" type="time" class="inp mt-1.5 text-foreground" /></label>
          </div>
          <label class="block text-[11.5px] font-medium text-muted-foreground"><MapPin class="mr-1 inline h-3.5 w-3.5" /> 회의실<select v-model="editForm.roomId" class="inp mt-1.5 text-foreground"><option v-for="roomItem in ROOMS" :key="roomItem.id" :value="roomItem.id">{{ roomItem.name }}</option></select></label>
          <label class="block text-[11.5px] font-medium text-muted-foreground"><Users class="mr-1 inline h-3.5 w-3.5" /> 참석자 (쉼표로 구분)<input v-model="editForm.attendees" class="inp mt-1.5 text-foreground" /></label>
        </div>
        <div class="flex justify-end gap-2 border-t border-border px-5 py-3">
          <button class="h-9 rounded-md border border-border px-3.5 text-[13px]" @click="editing = null; editForm = null">취소</button>
          <button class="h-9 rounded-md bg-primary px-3.5 text-[13px] font-medium text-primary-foreground" @click="save">저장</button>
        </div>
      </UiCard>
    </div>
  </div>
</template>
