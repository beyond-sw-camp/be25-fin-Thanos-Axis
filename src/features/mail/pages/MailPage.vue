<script setup>
import { computed, ref } from 'vue'
import { ArrowLeft, FileAudio, FileText, Forward, Paperclip, PenSquare, Reply, Search, Star, X } from '@lucide/vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiCard from '../../../shared/components/UiCard.vue'
import { MAILS } from '../../../shared/api/mock-data'

const tab = ref('inbox')
const query = ref('')
const open = ref(null)
const compose = ref(false)
const tabs = [['inbox', '받은 메일함'], ['sent', '보낸 메일함'], ['notice', '공지 메일함'], ['trash', '휴지통']]
const list = computed(() => MAILS.filter((mail) => mail.category === tab.value && `${mail.subject}${mail.from}`.includes(query.value)))
</script>

<template>
  <div v-if="open" class="mx-auto max-w-[1100px] p-6 lg:p-8">
    <button class="mb-4 grid h-8 w-8 place-items-center rounded-md hover:bg-muted" @click="open = null"><ArrowLeft class="h-4 w-4" /></button>
    <UiCard class="p-7"><div class="flex justify-between gap-3"><h1 class="text-[22px] font-semibold">{{ open.subject }}</h1><Star class="h-4 w-4 text-muted-foreground" /></div><div class="mt-5 flex gap-3 border-b border-border pb-5"><b class="grid h-10 w-10 place-items-center rounded-full bg-navy text-navy-foreground">{{ open.from[0] }}</b><div><p class="font-semibold">{{ open.from }} <span class="text-[12px] font-normal text-muted-foreground">{{ open.dept }}</span></p><p class="text-[12px] text-muted-foreground">받는 사람: 나 · {{ open.date }}</p></div></div><pre class="mt-6 whitespace-pre-wrap font-sans text-[14px] leading-[1.75]">{{ open.body || open.preview }}</pre><div v-if="open.hasAttachment" class="mt-8 grid gap-2 border-t border-border pt-5 sm:grid-cols-2"><div v-for="[name, icon] in [['회의록.pdf', FileText], ['녹음.mp3', FileAudio]]" :key="name" class="flex items-center gap-2 rounded-md border border-border p-3"><component :is="icon" class="h-5 w-5 text-primary" />{{ name }}</div></div><div class="mt-8 flex gap-2"><button class="inline-flex h-9 items-center gap-1 rounded-md border px-4 text-[13px]"><Reply class="h-3.5 w-3.5" /> 답장</button><button class="inline-flex h-9 items-center gap-1 rounded-md border px-4 text-[13px]"><Forward class="h-3.5 w-3.5" /> 전달</button></div></UiCard>
  </div>
  <div v-else class="mx-auto max-w-[1500px] p-6 lg:p-8">
    <PageHeader title="내부 메일" description="사내 내부 사용자 및 부서 간 메일 시스템"><template #action><button class="inline-flex h-9 items-center gap-1 rounded-md bg-primary px-3.5 text-[13px] text-primary-foreground" @click="compose = true"><PenSquare class="h-3.5 w-3.5" /> 새 메일 작성</button></template></PageHeader>
    <div class="mb-4 flex flex-wrap items-center border-b border-border"><button v-for="[id,label] in tabs" :key="id" :class="tab === id ? 'border-primary font-semibold' : 'border-transparent text-muted-foreground'" class="-mb-px h-10 border-b-2 px-4 text-[13px]" @click="tab = id">{{ label }}</button><label class="relative mb-2 ml-auto"><Search class="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><input v-model="query" class="h-8 w-64 rounded-md border bg-card pl-8 pr-3 text-[12.5px]" placeholder="메일 검색" /></label></div>
    <UiCard class="divide-y divide-border"><button v-for="mail in list" :key="mail.id" class="grid w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/40 sm:grid-cols-[220px_1fr_100px]" @click="open = mail"><span :class="mail.unread ? 'font-semibold' : ''">{{ mail.from }} <small class="text-muted-foreground">/ {{ mail.dept }}</small></span><span class="min-w-0 truncate">{{ mail.subject }}<Paperclip v-if="mail.hasAttachment" class="ml-2 inline h-3 w-3" /></span><time class="text-right text-[11.5px] text-muted-foreground">{{ mail.date }}</time></button><p v-if="!list.length" class="p-16 text-center text-muted-foreground">메일이 없습니다.</p></UiCard>
    <div v-if="compose" class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"><UiCard class="w-full max-w-2xl"><div class="flex justify-between border-b border-border px-5 py-3.5"><h3 class="font-semibold">새 메일</h3><button @click="compose = false"><X class="h-4 w-4" /></button></div><div class="space-y-3 p-5"><input class="inp" placeholder="받는 사람" /><input class="inp" placeholder="제목" /><textarea rows="9" class="w-full rounded-md border border-input p-3 text-[13px]" placeholder="내용을 입력하세요..." /></div><div class="flex justify-end gap-2 border-t border-border px-5 py-3"><button class="h-9 rounded-md border px-3.5" @click="compose = false">취소</button><button class="h-9 rounded-md bg-primary px-3.5 text-primary-foreground" @click="compose = false">전송</button></div></UiCard></div>
  </div>
</template>
