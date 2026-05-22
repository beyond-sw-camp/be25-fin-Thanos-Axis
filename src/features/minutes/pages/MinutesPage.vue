<script setup>
import { computed, ref } from 'vue'
import { Clock, Download, FileAudio, ListChecks, Search, Share2, Sparkles, Users, X } from '@lucide/vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiBadge from '../../../shared/components/UiBadge.vue'
import UiCard from '../../../shared/components/UiCard.vue'
import { RECORDINGS } from '../../../shared/api/mock-data'

const selected = ref(RECORDINGS[0])
const query = ref('')
const share = ref(false)
const filtered = computed(() => RECORDINGS.filter((item) => item.title.toLowerCase().includes(query.value.toLowerCase())))
const transcript = [
  { t: '00:00:08', who: '이지연', text: '오늘은 OKR 점검과 Q2 우선순위 재정렬을 진행하겠습니다.' },
  { t: '00:00:42', who: '박서연', text: '프로덕트팀 KR-1은 진행률 78%로, 6월 첫 주 완료 가능합니다.' },
  { t: '00:01:21', who: '정도현', text: '마케팅 측에서는 캠페인 일정을 한 주 당기는 것을 제안합니다.' },
  { t: '00:02:03', who: '이지연', text: '좋습니다. 일정 변경에 따른 리소스 영향은 박서연 책임이 정리해 주세요.' },
]
const files = [
  { name: '회의록.pdf', size: '240KB' },
  { name: '녹음.mp3', size: '42.1MB' },
  { name: '발표자료_v2.pdf', size: '3.7MB' },
]
</script>

<template>
  <div class="mx-auto max-w-[1500px] p-6 lg:p-8">
    <PageHeader title="회의 기록" description="자동 생성된 회의록과 녹음을 검색하고 공유하세요." />
    <div class="grid gap-5 lg:grid-cols-[360px_1fr]">
      <UiCard class="overflow-hidden">
        <label class="relative block border-b border-border p-3">
          <Search class="absolute left-5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input v-model="query" class="h-9 w-full rounded-md border border-border bg-card pl-8 pr-3 text-[12.5px] outline-none focus:border-primary/40" placeholder="회의록 검색" />
        </label>
        <ul class="max-h-[70vh] divide-y divide-border overflow-y-auto">
          <li v-for="item in filtered" :key="item.id">
            <button :class="selected.id === item.id ? 'border-l-2 border-primary bg-primary/5' : ''" class="block w-full px-4 py-3.5 text-left hover:bg-muted/50" @click="selected = item">
              <div class="flex items-center justify-between gap-2">
                <b class="truncate text-[13px] font-medium">{{ item.title }}</b>
                <UiBadge v-if="item.expireDays <= 14" tone="danger">D-{{ item.expireDays }}</UiBadge>
              </div>
              <p class="mt-1 flex items-center gap-3 text-[11px] tabular-nums text-muted-foreground">
                <span>{{ item.date }}</span>
                <span>·</span>
                <span>{{ item.duration }}</span>
                <span class="inline-flex items-center gap-1"><Users class="h-3 w-3" />{{ item.attendees }}</span>
              </p>
            </button>
          </li>
        </ul>
      </UiCard>
      <UiCard>
        <header class="flex flex-wrap items-start justify-between gap-3 border-b border-border px-6 py-5">
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-[17px] font-semibold">{{ selected.title }}</h2>
              <UiBadge v-if="selected.expireDays <= 14" tone="danger">{{ selected.expireDays }}일 후 삭제 예정</UiBadge>
            </div>
            <p class="mt-1.5 flex flex-wrap items-center gap-3 text-[12.5px] text-muted-foreground">
              <span class="inline-flex items-center gap-1"><Clock class="h-3.5 w-3.5" />{{ selected.date }} · {{ selected.duration }}</span>
              <span class="inline-flex items-center gap-1"><Users class="h-3.5 w-3.5" />참석자 {{ selected.attendees }}명</span>
            </p>
          </div>
          <div class="flex shrink-0 flex-wrap gap-1.5">
            <button title="회의록 다운로드" class="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-[12.5px] hover:bg-muted">
              <Download class="h-3.5 w-3.5" />
              <span class="hidden xl:inline">회의록 다운로드</span>
            </button>
            <button title="녹음 다운로드" class="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-[12.5px] hover:bg-muted">
              <FileAudio class="h-3.5 w-3.5" />
              <span class="hidden xl:inline">녹음 다운로드</span>
            </button>
            <button class="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-[12.5px] text-primary-foreground" @click="share = true">
              <Share2 class="h-3.5 w-3.5" /> 내부 메일 공유
            </button>
          </div>
        </header>
        <div class="grid gap-5 p-6 md:grid-cols-3">
          <aside class="space-y-4">
            <div class="rounded-md border border-primary/20 bg-primary/5 p-4">
              <p class="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary"><Sparkles class="h-3 w-3" /> AI 요약</p>
              <p class="mt-2 text-[13px] leading-relaxed text-foreground/90">{{ selected.summary }}</p>
            </div>
            <div class="rounded-md border border-border p-4">
              <p class="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"><ListChecks class="h-3 w-3" /> 결정 사항</p>
              <ul class="mt-2 space-y-1.5 text-[12.5px]">
                <li class="flex gap-1.5"><span class="text-primary">·</span> Q2 캠페인 일정 1주 앞당김</li>
                <li class="flex gap-1.5"><span class="text-primary">·</span> 신규 제품 라인 PoC 시작</li>
                <li class="flex gap-1.5"><span class="text-primary">·</span> 리소스 영향 분석 - 박서연 (5/24)</li>
              </ul>
            </div>
            <div class="rounded-md border border-border p-4">
              <p class="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">첨부파일</p>
              <div class="mt-2 space-y-1.5">
                <div v-for="file in files" :key="file.name" class="flex items-center justify-between rounded border border-border bg-muted/30 p-2 text-[12px]">
                  <span class="truncate">{{ file.name }}</span>
                  <span class="ml-2 shrink-0 tabular-nums text-muted-foreground">{{ file.size }}</span>
                </div>
              </div>
            </div>
          </aside>
          <div class="md:col-span-2">
            <h3 class="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">회의 원문 (STT)</h3>
            <div class="max-h-[55vh] space-y-3 overflow-y-auto pr-2">
              <div v-for="line in transcript" :key="line.t" class="flex gap-3 text-[13px]">
                <time class="w-16 shrink-0 pt-0.5 text-[11px] tabular-nums text-muted-foreground">{{ line.t }}</time>
                <div class="flex-1">
                  <b class="text-[12px] font-medium">{{ line.who }}</b>
                  <p class="mt-0.5 leading-relaxed">{{ line.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UiCard>
    </div>
    <div v-if="share" class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <UiCard class="w-full max-w-md p-5">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="font-semibold">내부 메일로 공유</h3>
          <button title="닫기" class="rounded p-1 text-muted-foreground hover:bg-muted" @click="share = false"><X class="h-4 w-4" /></button>
        </div>
        <div class="space-y-3 text-[13px]">
          <label class="block">
            <span class="text-[11.5px] text-foreground/70">받는 사람</span>
            <input class="mt-1 h-9 w-full rounded-md border border-input bg-card px-3 text-[12.5px]" value="박서연; 정도현; 김민수" />
          </label>
          <label class="block">
            <span class="text-[11.5px] text-foreground/70">제목</span>
            <input class="mt-1 h-9 w-full rounded-md border border-input bg-card px-3 text-[12.5px]" :value="`[회의록 공유] ${selected.title}`" />
          </label>
          <div class="rounded-md bg-muted/40 p-2.5 text-[12px]"><FileAudio class="mr-1 inline h-3.5 w-3.5" /> 회의록.pdf · 녹음.mp3</div>
        </div>
        <div class="mt-5 flex justify-end gap-2">
          <button class="h-9 rounded-md border border-border px-3.5 text-[13px]" @click="share = false">취소</button>
          <button class="h-9 rounded-md bg-primary px-3.5 text-[13px] text-primary-foreground" @click="share = false">전송</button>
        </div>
      </UiCard>
    </div>
  </div>
</template>
