<script setup>
import { computed, ref } from 'vue'
import { ChevronLeft, ChevronRight, Paperclip, Plus, Users, Video, X } from '@lucide/vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiBadge from '../../../shared/components/UiBadge.vue'
import UiCard from '../../../shared/components/UiCard.vue'
import { ROOMS, TODAY_RESERVATIONS } from '../../../shared/api/mock-data'

const hours = Array.from({ length: 18 }, (_, index) => index + 6)
const hourWidth = 70
const reservations = ref(TODAY_RESERVATIONS.map((item) => ({ ...item })))
const site = ref('all')
const modal = ref(null)
const detail = ref(null)
const title = ref('')
const attendees = ref('박서연, 정도현')
const sites = [...new Set(ROOMS.map((room) => room.site))]
const rooms = computed(() => ROOMS.filter((room) => site.value === 'all' || room.site === site.value))

function minutes(value) {
  const [hour, minute] = value.split(':').map(Number)
  return hour * 60 + minute
}
function x(value) {
  return ((minutes(value) - 360) / 60) * hourWidth
}
function book(room, event) {
  const rect = event.currentTarget.getBoundingClientRect()
  const index = Math.floor((event.clientX - rect.left) / hourWidth)
  modal.value = { roomId: room.id, start: `${String(index + 6).padStart(2, '0')}:00`, end: `${String(index + 7).padStart(2, '0')}:00` }
}
function save() {
  reservations.value.push({
    id: `n-${Date.now()}`,
    roomId: modal.value.roomId,
    title: title.value || '새 회의',
    owner: '이지연',
    start: modal.value.start,
    end: modal.value.end,
    status: 'mine',
    attendees: attendees.value.split(',').map((item) => item.trim()).filter(Boolean),
  })
  title.value = ''
  modal.value = null
}
</script>

<template>
  <div class="mx-auto max-w-[1700px] p-6 lg:p-8">
    <PageHeader title="회의실 예약 현황" description="시간대별 회의실 사용 현황을 한눈에 확인하고 빈 영역을 클릭해 예약하세요." />
    <UiCard class="overflow-hidden">
      <div class="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3">
        <div class="inline-flex h-8 items-center gap-1 rounded-md border border-border px-1"><button class="grid h-6 w-6 place-items-center"><ChevronLeft class="h-3.5 w-3.5" /></button><span class="px-2 text-[13px]">2026-05-19 (화)</span><button class="grid h-6 w-6 place-items-center"><ChevronRight class="h-3.5 w-3.5" /></button></div>
        <select v-model="site" class="ml-auto h-8 rounded-md border border-border bg-card px-3 text-[12.5px]"><option value="all">전체 지점</option><option v-for="item in sites" :key="item">{{ item }}</option></select>
        <div class="flex gap-3 text-[11px] text-muted-foreground"><span><i class="mr-1 inline-block h-2.5 w-2.5 rounded bg-navy" />예약됨</span><span><i class="mr-1 inline-block h-2.5 w-2.5 rounded bg-primary" />내 예약</span></div>
      </div>
      <div class="overflow-x-auto">
        <div class="min-w-fit">
          <div class="flex border-b border-border bg-muted/30"><b class="w-[180px] shrink-0 border-r border-border px-4 py-2.5 text-[12px]">회의실</b><div class="flex" :style="{ width: `${hours.length * hourWidth}px` }"><span v-for="hour in hours" :key="hour" class="border-r border-border px-2 py-2.5 text-[11.5px] text-muted-foreground" :style="{ width: `${hourWidth}px` }">{{ String(hour).padStart(2, '0') }}</span></div></div>
          <div v-for="room in rooms" :key="room.id" class="flex border-b border-border">
            <div class="w-[180px] shrink-0 border-r border-border px-4 py-3 text-[12.5px]"><p class="truncate">{{ room.name }}</p><p class="text-[10.5px] text-muted-foreground">정원 {{ room.capacity }}명</p></div>
            <div class="relative h-14" :style="{ width: `${hours.length * hourWidth}px` }" @click="book(room, $event)">
              <span v-for="(hour, index) in hours" :key="hour" class="absolute inset-y-0 border-r border-border/60" :style="{ left: `${index * hourWidth}px`, width: `${hourWidth}px` }" />
              <button v-for="item in reservations.filter((reservation) => reservation.roomId === room.id)" :key="item.id" :style="{ left: `${x(item.start)}px`, width: `${Math.max(40, x(item.end) - x(item.start))}px` }" :class="item.status === 'mine' ? 'bg-primary text-primary-foreground' : 'bg-navy text-navy-foreground'" class="absolute bottom-1.5 top-1.5 overflow-hidden rounded px-2 text-left text-[11.5px] shadow-sm" @click.stop="detail = item">{{ item.owner }} {{ item.start }}~{{ item.end }}</button>
            </div>
          </div>
        </div>
      </div>
    </UiCard>
    <UiCard class="mt-5"><h3 class="border-b border-border px-5 py-4 text-[14px] font-semibold">내 예약 현황</h3><div v-for="item in reservations.filter((reservation) => reservation.status === 'mine')" :key="item.id" class="flex flex-wrap items-center gap-4 border-b border-border px-5 py-3 text-[13px] last:border-0"><span class="w-48">{{ ROOMS.find((room) => room.id === item.roomId)?.name }}</span><span class="text-muted-foreground">{{ item.start }} ~ {{ item.end }}</span><span class="flex-1">{{ item.title }}</span><UiBadge tone="primary">내 예약</UiBadge></div></UiCard>
    <div v-if="modal" class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <UiCard class="w-full max-w-2xl">
        <div class="flex items-center justify-between border-b border-border px-5 py-4"><h3 class="font-semibold">새 회의 예약</h3><button @click="modal = null"><X class="h-4 w-4" /></button></div>
        <div class="grid gap-4 p-5 md:grid-cols-2">
          <label class="md:col-span-2 text-[11.5px]">회의 제목<input v-model="title" class="inp mt-1" placeholder="제품 전략 정기 회의" /></label>
          <label class="text-[11.5px]">회의실<select v-model="modal.roomId" class="inp mt-1"><option v-for="room in ROOMS" :key="room.id" :value="room.id">{{ room.name }}</option></select></label>
          <label class="text-[11.5px]">참석자<input v-model="attendees" class="inp mt-1" /></label>
          <label class="text-[11.5px]">시작<input v-model="modal.start" type="time" class="inp mt-1" /></label>
          <label class="text-[11.5px]">종료<input v-model="modal.end" type="time" class="inp mt-1" /></label>
          <button class="inline-flex h-9 items-center gap-1 rounded-md border border-dashed border-border px-3 text-[12.5px] text-muted-foreground"><Paperclip class="h-3.5 w-3.5" /> 파일 첨부</button>
          <div class="flex justify-end gap-2 md:col-span-2"><button class="h-9 rounded-md border border-border px-4 text-[13px]" @click="modal = null">취소</button><button class="inline-flex h-9 items-center gap-1 rounded-md bg-primary px-4 text-[13px] text-primary-foreground" @click="save"><Plus class="h-3.5 w-3.5" /> 회의 예약하기</button></div>
        </div>
      </UiCard>
    </div>
    <div v-if="detail" class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <UiCard class="w-full max-w-md p-5"><div class="flex justify-between"><h3 class="font-semibold">{{ detail.title }}</h3><button @click="detail = null"><X class="h-4 w-4" /></button></div><div class="mt-4 space-y-2 text-[13px]"><p>{{ detail.start }} - {{ detail.end }}</p><p><Users class="mr-1 inline h-3.5 w-3.5" />{{ detail.attendees.join(', ') || '미지정' }}</p></div><RouterLink to="/app/meeting" class="mt-5 inline-flex h-9 items-center gap-1 rounded-md bg-navy px-3 text-[13px] text-navy-foreground"><Video class="h-3.5 w-3.5" /> 화상회의 입장</RouterLink></UiCard>
    </div>
  </div>
</template>
