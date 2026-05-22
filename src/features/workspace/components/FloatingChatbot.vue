<script setup>
import { ref } from 'vue'
import { MessageSquare, Send, Sparkles, X } from '@lucide/vue'

const open = ref(false)
const query = ref('')
const messages = ref([{ role: 'ai', text: '안녕하세요. 회의록, 메일, 개인 자료를 검색해 드릴게요.' }])
function send(text = query.value) {
  if (!text.trim()) return
  messages.value.push({ role: 'user', text })
  query.value = ''
  messages.value.push({ role: 'ai', text: `"${text}" 검색 결과 3건을 찾았습니다.\n주간 전략 회의록, 디자인 시안 v3, 관련 메일 2건` })
}
</script>

<template>
  <button class="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg" aria-label="AI 챗봇 열기" @click="open = true"><MessageSquare class="h-5 w-5" /></button>
  <div v-if="open" class="fixed inset-0 z-50 flex items-end justify-end bg-black/30 p-0 sm:p-6">
    <section class="flex h-[80vh] w-full flex-col overflow-hidden rounded-t-xl border border-border bg-card shadow-2xl sm:h-[600px] sm:w-[420px] sm:rounded-xl">
      <header class="flex h-14 items-center justify-between border-b border-border px-4"><div class="flex items-center gap-2"><Sparkles class="h-4 w-4 text-primary" /><div><b class="block text-[13.5px]">AI 어시스턴트</b><small class="text-muted-foreground">메일·회의록·자료 검색</small></div></div><button @click="open = false"><X class="h-4 w-4" /></button></header>
      <div class="flex-1 space-y-3 overflow-y-auto bg-muted/20 p-4"><div v-for="message in messages" :key="message.text" :class="message.role === 'user' ? 'text-right' : ''"><p :class="message.role === 'user' ? 'bg-primary text-primary-foreground' : 'border bg-card'" class="inline-block max-w-[85%] whitespace-pre-line rounded-lg px-3 py-2 text-left text-[12.5px]">{{ message.text }}</p></div></div>
      <footer class="border-t border-border p-3"><div class="mb-2 flex gap-1.5"><button v-for="text in ['지난주 전략회의 요약','박서연 공유 자료']" :key="text" class="rounded-full border px-2.5 py-1 text-[11px]" @click="send(text)">{{ text }}</button></div><div class="flex gap-2"><input v-model="query" class="h-10 flex-1 rounded-md border px-3 text-[13px]" placeholder="질문을 입력하세요" @keydown.enter="send()" /><button class="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground" @click="send()"><Send class="h-4 w-4" /></button></div></footer>
    </section>
  </div>
</template>
