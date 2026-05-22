<script setup>
import { computed, ref } from 'vue'
import { CalendarRange, Clock, FileText, Mail, MapPin, Users, Video } from '@lucide/vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiBadge from '../../../shared/components/UiBadge.vue'
import UiCard from '../../../shared/components/UiCard.vue'
import { MAILS, MY_MEETINGS, RECORDINGS, TODAY_RESERVATIONS } from '../../../shared/api/mock-data'
import { useAuthStore } from '../../../stores/auth'

const auth = useAuthStore()
const todays = MY_MEETINGS.filter((meeting) => meeting.start.startsWith('2026-05-22'))
const selectedId = ref(todays[0].id)
const selected = computed(() => MY_MEETINGS.find((meeting) => meeting.id === selectedId.value) ?? MY_MEETINGS[0])
const kpis = [
  { label: '읽지 않은 메일', value: MAILS.filter((mail) => mail.unread).length, icon: Mail },
  { label: '오늘 예정된 회의', value: todays.length, icon: CalendarRange },
  { label: '최근 회의록', value: RECORDINGS.length, icon: FileText },
  { label: '현재 진행 중', value: MY_MEETINGS.filter((meeting) => meeting.status === 'live').length, icon: Video },
]
</script>

<template>
  <div class="mx-auto max-w-[1500px] p-6 lg:p-8">
    <PageHeader :title="`안녕하세요, ${auth.user?.name}님`" description="오늘의 회의 일정과 업무 현황을 한 눈에 확인하세요." />
    <div class="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <UiCard v-for="kpi in kpis" :key="kpi.label" class="p-4">
        <div class="flex items-center justify-between"><div><p class="text-[11.5px] text-muted-foreground">{{ kpi.label }}</p><b class="mt-1.5 block text-[22px]">{{ kpi.value }}</b></div><span class="grid h-9 w-9 place-items-center rounded-md bg-muted"><component :is="kpi.icon" class="h-4 w-4" /></span></div>
      </UiCard>
    </div>
    <div class="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div class="space-y-5">
        <UiCard class="min-h-[430px]">
          <div class="border-b border-border px-5 py-4"><h3 class="text-sm font-semibold">오늘의 회의 타임라인</h3><p class="mt-0.5 text-[11.5px] text-muted-foreground">내가 참여·생성한 회의 · 2026년 5월 22일</p></div>
          <button v-for="meeting in todays" :key="meeting.id" :class="selectedId === meeting.id ? 'bg-primary/10' : 'hover:bg-muted/50'" class="flex w-full items-stretch gap-3 px-5 py-3 text-left" @click="selectedId = meeting.id">
            <span class="w-14 pt-0.5 text-[12px] tabular-nums">{{ meeting.start.split(' ')[1] }}</span>
            <span :class="meeting.status === 'live' ? 'bg-red-500' : meeting.role === 'host' ? 'bg-primary' : 'bg-navy'" class="w-1 rounded-full" />
            <span class="min-w-0 flex-1"><span class="flex flex-wrap items-center gap-2 text-[13px] font-medium">{{ meeting.title }}<UiBadge v-if="meeting.status === 'live'" tone="danger">진행 중</UiBadge><UiBadge :tone="meeting.role === 'host' ? 'primary' : 'navy'">{{ meeting.role === 'host' ? '주최' : '참석' }}</UiBadge></span><small class="mt-1 flex gap-3 text-muted-foreground"><span class="inline-flex items-center gap-1"><MapPin class="h-3 w-3" />{{ meeting.room }}</span><span class="inline-flex items-center gap-1"><Users class="h-3 w-3" />{{ meeting.attendees.length }}명</span></small></span>
          </button>
        </UiCard>
        <UiCard class="p-5">
          <h3 class="mb-4 text-sm font-semibold">회의 상세</h3>
          <div class="flex flex-wrap items-start justify-between gap-3"><div><h4 class="text-[15px] font-semibold">{{ selected.title }}</h4><UiBadge class="mt-2" :tone="selected.status === 'live' ? 'danger' : 'primary'">{{ selected.status === 'live' ? '진행 중' : '예정' }}</UiBadge></div><RouterLink v-if="selected.status === 'live'" to="/app/meeting" class="rounded-md bg-primary px-3 py-2 text-[12.5px] text-primary-foreground">회의 입장</RouterLink></div>
          <dl class="mt-4 grid gap-3 text-[12.5px] sm:grid-cols-2">
            <div v-for="[icon, label, value] in [[Clock, '일시', selected.start], [MapPin, '장소', selected.room], [Users, '참여자', selected.attendees.join(', ')], [FileText, '주제', selected.title]]" :key="label" class="flex gap-3"><span class="grid h-7 w-7 place-items-center rounded-md bg-muted"><component :is="icon" class="h-3.5 w-3.5" /></span><span><dt class="text-[10.5px] uppercase text-muted-foreground">{{ label }}</dt><dd>{{ value }}</dd></span></div>
          </dl>
        </UiCard>
      </div>
      <div class="space-y-5">
        <UiCard class="p-5"><h3 class="text-sm font-semibold">2026년 5월</h3><div class="mt-4 grid grid-cols-7 gap-1 text-center text-[12px]"><span v-for="day in ['일','월','화','수','목','금','토']" :key="day" class="py-1 text-muted-foreground">{{ day }}</span><span v-for="day in 31" :key="day" :class="day === 22 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'" class="grid h-8 place-items-center rounded">{{ day }}</span></div></UiCard>
        <UiCard><div class="border-b border-border px-5 py-3 text-sm font-semibold">개인 일정</div><div v-for="meeting in MY_MEETINGS" :key="meeting.id" class="border-b border-border px-5 py-3 last:border-0"><p class="text-[12.5px] font-medium">{{ meeting.title }}</p><p class="text-[11px] text-muted-foreground">{{ meeting.start }}</p></div><div v-for="reservation in TODAY_RESERVATIONS.filter((item) => item.status === 'mine')" :key="reservation.id" class="px-5 py-3 text-[12.5px]">{{ reservation.title }} <UiBadge tone="primary">예약</UiBadge></div></UiCard>
      </div>
    </div>
  </div>
</template>
