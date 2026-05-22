<script setup>
import { computed, ref } from 'vue'
import { Calendar, MapPin, Plus, Users, Video, X } from '@lucide/vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiBadge from '../../../shared/components/UiBadge.vue'
import UiCard from '../../../shared/components/UiCard.vue'
import { MY_MEETINGS } from '../../../shared/api/mock-data'

const tab = ref('all')
const list = ref(MY_MEETINGS.map((item) => ({ ...item })))
const editing = ref(null)
const form = ref({})
const filtered = computed(() => list.value.filter((item) => tab.value === 'all' || item.role === tab.value))
function open(item) {
  editing.value = item ?? {}
  form.value = item ? { ...item, attendees: item.attendees.join(', ') } : { title: '', start: '2026-05-23 10:00', room: '원격', attendees: '' }
}
function save() {
  if (!form.value.title?.trim()) return
  const payload = { ...form.value, id: editing.value.id ?? `mt-${Date.now()}`, role: editing.value.role ?? 'host', status: editing.value.status ?? 'upcoming', attendees: form.value.attendees.split(',').map((item) => item.trim()).filter(Boolean) }
  list.value = editing.value.id ? list.value.map((item) => item.id === payload.id ? payload : item) : [payload, ...list.value]
  editing.value = null
}
</script>

<template>
  <div class="mx-auto max-w-[1400px] p-6 lg:p-8">
    <PageHeader title="회의" description="내가 참여하거나 주최한 회의를 한 곳에서 관리합니다."><template #action><button class="inline-flex h-9 items-center gap-1 rounded-md bg-primary px-3.5 text-[13px] text-primary-foreground" @click="open()"><Plus class="h-3.5 w-3.5" /> 내 회의 생성</button></template></PageHeader>
    <div class="mb-4 flex border-b border-border"><button v-for="[id, label] in [['all','전체'],['host','내가 주최한 회의'],['attendee','초대된 회의']]" :key="id" :class="tab === id ? 'border-primary font-semibold' : 'border-transparent text-muted-foreground'" class="-mb-px h-10 border-b-2 px-4 text-[13px]" @click="tab = id">{{ label }}</button></div>
    <UiCard class="divide-y divide-border">
      <div v-for="meeting in filtered" :key="meeting.id" class="grid gap-3 px-5 py-4 hover:bg-muted/30 sm:grid-cols-[1fr_auto]">
        <div class="min-w-0"><div class="flex flex-wrap items-center gap-2"><b class="truncate text-[14px]">{{ meeting.title }}</b><UiBadge :tone="meeting.status === 'live' ? 'danger' : meeting.status === 'ended' ? 'muted' : 'navy'">{{ meeting.status === 'live' ? '진행 중' : meeting.status === 'ended' ? '종료' : '예정' }}</UiBadge><UiBadge :tone="meeting.role === 'host' ? 'primary' : 'default'">{{ meeting.role === 'host' ? '주최자' : '참석자' }}</UiBadge></div><p class="mt-1.5 flex flex-wrap gap-4 text-[12px] text-muted-foreground"><span class="inline-flex items-center gap-1"><Calendar class="h-3 w-3" />{{ meeting.start }}</span><span class="inline-flex items-center gap-1"><MapPin class="h-3 w-3" />{{ meeting.room }}</span><span class="inline-flex items-center gap-1"><Users class="h-3 w-3" />{{ meeting.attendees.join(', ') }}</span></p></div>
        <div class="flex items-center gap-2"><button v-if="meeting.role === 'host' && meeting.status !== 'ended'" class="h-9 rounded-md border border-border px-3 text-[12.5px]" @click="open(meeting)">수정</button><RouterLink :to="meeting.status === 'ended' ? '/app/recordings' : '/app/meeting'" class="inline-flex h-9 items-center gap-1 rounded-md bg-primary px-4 text-[12.5px] text-primary-foreground"><Video v-if="meeting.status !== 'ended'" class="h-3.5 w-3.5" />{{ meeting.status === 'ended' ? '회의록 보기' : '입장' }}</RouterLink></div>
      </div>
    </UiCard>
    <div v-if="editing" class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <UiCard class="w-full max-w-lg"><div class="flex justify-between border-b border-border px-5 py-4"><h3 class="font-semibold">{{ editing.id ? '회의 수정' : '내 회의 생성' }}</h3><button @click="editing = null"><X class="h-4 w-4" /></button></div><div class="space-y-3 p-5"><label class="block text-[11.5px]">회의 제목<input v-model="form.title" class="inp mt-1" /></label><div class="grid grid-cols-2 gap-3"><label class="text-[11.5px]">시작<input v-model="form.start" class="inp mt-1" /></label><label class="text-[11.5px]">회의실<input v-model="form.room" class="inp mt-1" /></label></div><label class="block text-[11.5px]">참석자<input v-model="form.attendees" class="inp mt-1" /></label></div><div class="flex justify-end gap-2 border-t border-border px-5 py-3"><button class="h-9 rounded-md border px-3.5 text-[13px]" @click="editing = null">취소</button><button class="h-9 rounded-md bg-primary px-3.5 text-[13px] text-primary-foreground" @click="save">저장</button></div></UiCard>
    </div>
  </div>
</template>
