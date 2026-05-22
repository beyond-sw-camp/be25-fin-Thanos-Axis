<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const demoAccounts = [{ u: 'master', label: 'Master' }, { u: 'admin', label: 'Admin' }, { u: 'user', label: 'User' }]

function quick(account) {
  username.value = account
  password.value = account
}

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(username.value, password.value)
    router.push(auth.landingPath)
  } catch (caught) {
    error.value = caught.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="grid min-h-screen bg-background lg:grid-cols-2">
    <section class="relative hidden flex-col justify-between overflow-hidden bg-navy p-12 text-navy-foreground lg:flex">
      <div class="absolute inset-0 opacity-[0.06]" style="background-image:radial-gradient(circle at 1px 1px, white 1px, transparent 0);background-size:24px 24px" />
      <div class="relative flex items-center gap-2"><span class="grid h-9 w-9 place-items-center rounded-lg bg-primary font-bold text-primary-foreground">M</span><b class="text-xl">Meetbowl</b></div>
      <div class="relative max-w-md space-y-6">
        <h1 class="text-4xl font-semibold leading-tight">회의에서 결정으로,<br />결정에서 실행으로.</h1>
        <p class="text-sm leading-relaxed text-white/70">예약, 화상회의, 자동 회의록, 내부 공유까지 하나의 흐름으로 연결된 사내 업무 플랫폼.</p>
        <div class="grid grid-cols-3 gap-3 text-xs text-white/80"><span v-for="item in ['회의실 예약', '실시간 STT', 'AI 요약']" :key="item" class="rounded-md border border-white/10 bg-white/5 px-3 py-2">{{ item }}</span></div>
      </div>
      <p class="relative text-xs text-white/40">© 2026 Meetbowl Inc.</p>
    </section>
    <section class="flex items-center justify-center p-6 sm:p-12">
      <div class="w-full max-w-sm">
        <div class="mb-8 flex items-center gap-2 lg:hidden"><span class="grid h-9 w-9 place-items-center rounded-lg bg-navy font-bold text-navy-foreground">M</span><b class="text-xl">Meetbowl</b></div>
        <h2 class="text-2xl font-semibold">로그인</h2>
        <p class="mt-1.5 text-sm text-muted-foreground">사내 업무 플랫폼에 접속하세요.</p>
        <form class="mt-8 space-y-4" @submit.prevent="submit">
          <label class="block text-xs font-medium text-foreground/80">아이디<input v-model="username" autofocus class="mt-1.5 h-10 w-full rounded-md border border-input bg-card px-3 text-sm outline-none focus:border-primary" /></label>
          <label class="block text-xs font-medium text-foreground/80">비밀번호<input v-model="password" type="password" class="mt-1.5 h-10 w-full rounded-md border border-input bg-card px-3 text-sm outline-none focus:border-primary" /></label>
          <p v-if="error" class="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">{{ error }}</p>
          <button :disabled="loading" class="h-10 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground disabled:opacity-60">{{ loading ? '로그인 중...' : '로그인' }}</button>
        </form>
        <div class="mt-8 rounded-lg border border-border bg-muted/40 p-4">
          <p class="text-xs font-semibold text-foreground/70">데모 계정</p>
          <div class="mt-2.5 grid grid-cols-3 gap-2">
            <button v-for="account in demoAccounts" :key="account.u" class="rounded-md border border-border bg-card p-2 text-left hover:border-primary/50" @click="quick(account.u)">
              <span class="block text-[10px] uppercase tracking-wider text-muted-foreground">{{ account.label }}</span>
              <span class="mt-0.5 block font-mono text-xs">{{ account.u }} / {{ account.u }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
