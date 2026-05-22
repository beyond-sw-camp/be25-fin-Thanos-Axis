<script setup>
import { computed, ref } from 'vue'
import { BookOpen, CalendarDays, FileText, Folder, Mail, MapPin, Plus, Star, Users } from '@lucide/vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiBadge from '../../../shared/components/UiBadge.vue'
import UiCard from '../../../shared/components/UiCard.vue'
import FloatingChatbot from '../components/FloatingChatbot.vue'
import { BACKUP_MAILS, BACKUP_RECS, CALENDAR_EVENTS, CONTACTS } from '../api/workspace-data'

const tab = ref('calendar')
const selected = ref('2026-05-22')
const extra = ref([])
const newTitle = ref('')
const showAdd = ref(false)
const cells = Array.from({ length: 31 }, (_, index) => `2026-05-${String(index + 1).padStart(2, '0')}`)
const events = computed(() => [...CALENDAR_EVENTS, ...extra.value])
const selectedEvents = computed(() => events.value.filter((event) => event.date === selected.value))
const tabs = [['calendar', '일정', CalendarDays], ['favorites', '즐겨찾기', Star], ['rec', '백업한 회의록', BookOpen], ['mail', '백업한 메일', Mail], ['drive', '개인 드라이브', Folder], ['contacts', '주소록', Users]]
function addEvent() { if (newTitle.value.trim()) { extra.value.push({ date: selected.value, start: '09:00', end: '10:00', title: newTitle.value, who: '나', kind: 'mine' }); newTitle.value = ''; showAdd.value = false } }
</script>

<template>
  <div class="mx-auto max-w-[1500px] p-6 pb-24 lg:p-8">
    <PageHeader title="개인 워크스페이스" description="나의 일정과 팀 일정, 자료, 연락처를 한 곳에서 관리하세요." />
    <nav class="mb-5 flex overflow-x-auto border-b border-border"><button v-for="[id,label,icon] in tabs" :key="id" :class="tab === id ? 'border-primary font-semibold text-primary' : 'border-transparent text-muted-foreground'" class="-mb-px inline-flex h-11 shrink-0 items-center gap-1.5 border-b-2 px-4 text-[13px]" @click="tab = id"><component :is="icon" class="h-3.5 w-3.5" />{{ label }}</button></nav>
    <div v-if="tab === 'calendar'" class="grid gap-5 xl:grid-cols-[1fr_320px]">
      <UiCard class="p-5"><div class="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 class="text-[18px] font-semibold">2026년 5월</h2><button class="inline-flex h-8 items-center gap-1 rounded-md bg-primary px-3 text-[12px] text-primary-foreground" @click="showAdd = true"><Plus class="h-3.5 w-3.5" /> 일정 추가</button></div><div class="grid grid-cols-7 border-l border-t"><span v-for="day in ['일','월','화','수','목','금','토']" :key="day" class="border-b border-r bg-muted/40 py-2 text-center text-[11.5px]">{{ day }}</span><button v-for="date in cells" :key="date" :class="selected === date ? 'ring-2 ring-inset ring-primary' : ''" class="min-h-[88px] border-b border-r p-1.5 text-left hover:bg-muted/40" @click="selected = date"><span class="text-[11.5px]">{{ Number(date.slice(-2)) }}</span><span v-for="event in events.filter((item) => item.date === date).slice(0, 2)" :key="event.title" :class="event.kind === 'mine' ? 'bg-primary/10 text-primary' : 'bg-navy/10 text-navy'" class="mt-1 block truncate rounded px-1 py-0.5 text-[10.5px]">{{ event.start }} {{ event.title }}</span></button></div></UiCard>
      <UiCard class="p-5"><p class="text-[11px] font-semibold uppercase text-muted-foreground">선택한 날짜</p><h3 class="mt-1 text-[18px] font-semibold">{{ selected }}</h3><UiBadge tone="primary">{{ selectedEvents.length }}건</UiBadge><div class="mt-4 space-y-2"><div v-for="event in selectedEvents" :key="event.title" class="rounded-md bg-muted/30 p-3"><b class="text-[12.5px]">{{ event.title }}</b><p class="mt-1 text-[11.5px] text-muted-foreground">{{ event.start }} - {{ event.end }} <span v-if="event.where" class="inline-flex items-center gap-1"><MapPin class="h-3 w-3" />{{ event.where }}</span></p></div></div></UiCard>
    </div>
    <UiCard v-else-if="tab === 'favorites'" class="p-5"><h3 class="mb-4 font-semibold">즐겨찾기한 자료</h3><div v-for="item in ['월간 전사 공유 회의록','[HR] 2분기 평가 기준','디자인 시스템 v2.fig']" :key="item" class="flex items-center gap-3 border-b py-3"><Star class="h-4 w-4 fill-primary text-primary" />{{ item }}</div></UiCard>
    <UiCard v-else-if="tab === 'rec'" class="p-5"><h3 class="mb-4 font-semibold">백업한 회의록</h3><RouterLink v-for="item in BACKUP_RECS" :key="item.id" :to="`/app/backup/${item.id}`" class="flex items-center gap-3 border-b py-3 hover:bg-muted/40"><FileText class="h-4 w-4 text-navy" /><span class="flex-1">{{ item.title }} <small class="block text-muted-foreground">{{ item.meta }} · {{ item.date }}</small></span><UiBadge tone="navy">회의록</UiBadge></RouterLink></UiCard>
    <UiCard v-else-if="tab === 'mail'" class="p-5"><h3 class="mb-4 font-semibold">백업한 메일</h3><RouterLink v-for="item in BACKUP_MAILS" :key="item.id" :to="`/app/backup/${item.id}`" class="flex items-center gap-3 border-b py-3 hover:bg-muted/40"><Mail class="h-4 w-4 text-primary" /><span class="flex-1">{{ item.title }} <small class="block text-muted-foreground">{{ item.from }} · {{ item.preview }}</small></span><UiBadge tone="primary">메일</UiBadge></RouterLink></UiCard>
    <UiCard v-else-if="tab === 'drive'" class="p-5"><h3 class="mb-4 font-semibold">개인 드라이브</h3><div v-for="file in ['OKR_Q2_2026.xlsx','디자인_시안_v3.fig','회의록_5월_3주차.pdf']" :key="file" class="flex items-center gap-2 border-b py-3"><FileText class="h-4 w-4 text-primary" />{{ file }}</div></UiCard>
    <UiCard v-else class="scroll-table p-5"><h3 class="mb-4 font-semibold">주소록</h3><table class="w-full text-[13px]"><tr class="border-b text-muted-foreground"><th class="py-2 text-left">이름</th><th class="text-left">부서</th><th class="text-left">이메일</th><th class="text-left">전화번호</th></tr><tr v-for="contact in CONTACTS" :key="contact.email" class="border-b last:border-0"><td class="py-3 font-medium">{{ contact.name }}</td><td>{{ contact.dept }}</td><td>{{ contact.email }}</td><td>{{ contact.phone }}</td></tr></table></UiCard>
    <div v-if="showAdd" class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"><UiCard class="w-full max-w-md p-5"><h3 class="font-semibold">일정 추가</h3><input v-model="newTitle" class="inp mt-4" placeholder="일정 제목" /><div class="mt-4 flex justify-end gap-2"><button class="h-9 rounded-md border px-3.5" @click="showAdd = false">취소</button><button class="h-9 rounded-md bg-primary px-3.5 text-primary-foreground" @click="addEvent">추가</button></div></UiCard></div>
    <FloatingChatbot />
  </div>
</template>
