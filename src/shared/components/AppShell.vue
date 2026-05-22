<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Archive,
  Bell,
  Building2,
  CalendarRange,
  DoorOpen,
  FolderKanban,
  History,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  ScrollText,
  Search,
  Settings,
  ShieldCheck,
  Users,
  Video,
} from '@lucide/vue'
import { useAuthStore } from '../../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const mobileOpen = ref(false)
const noticeOpen = ref(false)
const profileOpen = ref(false)

const roleLabel = { master: 'Master', admin: 'Admin', user: 'User' }
const nav = [
  {
    title: '워크스페이스',
    items: [
      { to: '/app/dashboard', label: '대시보드', icon: LayoutDashboard, roles: ['user', 'admin'] },
      { to: '/app/rooms', label: '회의실 예약', icon: CalendarRange, roles: ['user', 'admin'], children: [{ to: '/app/rooms', label: '회의실 예약 현황' }, { to: '/app/my-reservations', label: '내 회의실 예약 현황' }] },
      { to: '/app/meetings', label: '회의', icon: Video, roles: ['user', 'admin'], children: [{ to: '/app/meetings', label: '내 회의 목록' }, { to: '/app/recordings', label: '회의록' }] },
      { to: '/app/mail', label: '메일', icon: Mail, roles: ['user', 'admin'] },
      { to: '/app/workspace', label: '워크스페이스', icon: FolderKanban, roles: ['user', 'admin'] },
    ],
  },
  {
    title: '관리자',
    items: [
      { to: '/admin/dashboard', label: '관리자 대시보드', icon: LayoutDashboard, roles: ['admin', 'master'] },
      { to: '/admin/members', label: '회원 관리', icon: Users, roles: ['admin', 'master'] },
      { to: '/admin/organization', label: '조직/직급 관리', icon: Building2, roles: ['admin', 'master'] },
      { to: '/admin/rooms', label: '회의실 관리', icon: DoorOpen, roles: ['admin', 'master'] },
      { to: '/admin/mail-policy', label: '메일/회의록 정책', icon: Archive, roles: ['admin', 'master'] },
      { to: '/admin/logs', label: '관리자 작업 로그', icon: ScrollText, roles: ['admin', 'master'] },
    ],
  },
  {
    title: '최고 관리자',
    items: [
      { to: '/master/permissions', label: '관리자 권한 관리', icon: ShieldCheck, roles: ['master'] },
      { to: '/master/admin-permissions', label: '관리자 세부 권한', icon: KeyRound, roles: ['master'] },
      { to: '/master/history', label: '권한 변경 이력', icon: History, roles: ['master'] },
    ],
  },
]

const notices = [
  ['새 메일 3건', '김지연 외 2명에게 메일이 도착했습니다.'],
  ['회의 시작 임박', 'Q2 캠페인 킥오프가 10분 후 시작됩니다.'],
  ['회의실 예약 승인', '테헤란로 대 회의실 예약이 승인되었습니다.'],
]
const homePath = computed(() => auth.user?.role === 'user' ? '/app/dashboard' : '/admin/dashboard')
const visibleSections = computed(() => nav.map((section) => ({
  ...section,
  items: section.items.filter((item) => item.roles.includes(auth.user?.role)),
})).filter((section) => section.items.length))

function active(item) {
  return route.path === item.to
    || route.path.startsWith(`${item.to}/`)
    || item.children?.some((child) => route.path === child.to || route.path.startsWith(`${child.to}/`))
}

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex min-h-screen w-full bg-background">
    <aside class="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
      <RouterLink :to="homePath" class="flex h-14 items-center gap-2 border-b border-sidebar-border px-5">
        <span class="grid h-8 w-8 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground">M</span>
        <span class="text-[15px] font-semibold">Meetbowl</span>
      </RouterLink>
      <nav class="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        <section v-for="section in visibleSections" :key="section.title">
          <p class="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-sidebar-foreground/40">{{ section.title }}</p>
          <ul class="space-y-0.5">
            <li v-for="item in section.items" :key="item.to">
              <RouterLink :to="item.to" :class="active(item) ? 'bg-primary font-medium text-primary-foreground' : 'text-sidebar-foreground/80 hover:bg-sidebar-accent'" class="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px]">
                <component :is="item.icon" class="h-4 w-4 shrink-0" />
                <span class="truncate">{{ item.label }}</span>
              </RouterLink>
              <ul v-if="item.children?.length && active(item)" class="ml-6 mt-0.5 space-y-0.5 border-l border-sidebar-border/60 pl-2">
                <li v-for="child in item.children" :key="child.to">
                  <RouterLink :to="child.to" :class="route.path === child.to ? 'bg-primary/10 font-medium text-primary' : 'text-sidebar-foreground/65 hover:bg-sidebar-accent'" class="block rounded-md px-2.5 py-1.5 text-[12.5px]">
                    {{ child.label }}
                  </RouterLink>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </nav>
      <div class="border-t border-sidebar-border p-3">
        <div class="flex items-center gap-2.5 rounded-md p-2">
          <span class="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{{ auth.user?.avatar }}</span>
          <div class="min-w-0">
            <div class="truncate text-[12px] font-medium">{{ auth.user?.name }}</div>
            <div class="truncate text-[11px] text-sidebar-foreground/50">{{ roleLabel[auth.user?.role] }} · {{ auth.user?.department }}</div>
          </div>
        </div>
      </div>
    </aside>

    <div v-if="mobileOpen" class="fixed inset-0 z-50 flex lg:hidden">
      <button class="absolute inset-0 bg-black/50" aria-label="사이드바 닫기" @click="mobileOpen = false" />
      <aside class="relative w-64 bg-sidebar p-4 text-sidebar-foreground">
        <div v-for="item in visibleSections.flatMap((section) => section.items)" :key="item.to" class="mb-1">
          <RouterLink :to="item.to" class="flex items-center gap-2 rounded-md px-3 py-2 text-[13px] hover:bg-sidebar-accent" @click="mobileOpen = false">
            <component :is="item.icon" class="h-4 w-4" /> {{ item.label }}
          </RouterLink>
          <div v-if="item.children?.length" class="ml-7 border-l border-sidebar-border/60 pl-2">
            <RouterLink v-for="child in item.children" :key="child.to" :to="child.to" class="block rounded-md px-2 py-1.5 text-[12px] text-sidebar-foreground/70 hover:bg-sidebar-accent" @click="mobileOpen = false">
              {{ child.label }}
            </RouterLink>
          </div>
        </div>
      </aside>
    </div>

    <div class="flex min-w-0 flex-1 flex-col">
      <header class="flex h-14 items-center gap-3 border-b border-border bg-card px-4 lg:px-6">
        <button class="p-2 lg:hidden" aria-label="메뉴 열기" @click="mobileOpen = true"><Menu class="h-5 w-5" /></button>
        <label class="relative flex-1">
          <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input class="h-9 w-full rounded-md border border-border bg-muted/40 pl-9 pr-3 text-[13px] outline-none focus:border-primary/40 focus:bg-card" placeholder="회의, 회의록, 메일, 동료 검색" />
        </label>
        <div class="relative">
          <button class="relative grid h-9 w-9 place-items-center rounded-md hover:bg-muted" aria-label="알림" @click="noticeOpen = !noticeOpen; profileOpen = false">
            <Bell class="h-4 w-4" /><span class="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>
          <div v-if="noticeOpen" class="absolute right-0 z-20 mt-2 w-[340px] overflow-hidden rounded-lg border border-border bg-card shadow-xl">
            <div class="border-b border-border px-4 py-3 text-[13px] font-semibold">알림</div>
            <div v-for="notice in notices" :key="notice[0]" class="border-b border-border px-4 py-3 text-[12.5px] last:border-0 hover:bg-muted/40">
              <p class="font-medium">{{ notice[0] }}</p><p class="mt-0.5 text-muted-foreground">{{ notice[1] }}</p>
            </div>
          </div>
        </div>
        <div class="relative hidden sm:block">
          <button class="flex h-9 items-center gap-2 rounded-md px-2 hover:bg-muted" @click="profileOpen = !profileOpen; noticeOpen = false">
            <span class="grid h-7 w-7 place-items-center rounded-full bg-navy text-[11px] font-semibold text-navy-foreground">{{ auth.user?.avatar }}</span>
            <span class="text-left text-[12px]"><b class="block font-medium">{{ auth.user?.name }}</b><em class="not-italic text-muted-foreground">{{ roleLabel[auth.user?.role] }}</em></span>
          </button>
          <div v-if="profileOpen" class="absolute right-0 z-20 mt-2 w-64 rounded-lg border border-border bg-card p-2 shadow-xl">
            <RouterLink to="/app/settings" class="flex h-9 items-center gap-2 rounded-md px-3 text-[12.5px] hover:bg-muted" @click="profileOpen = false"><Settings class="h-3.5 w-3.5" /> 설정</RouterLink>
            <button class="flex h-9 w-full items-center gap-2 rounded-md px-3 text-[12.5px] text-red-600 hover:bg-red-50" @click="logout"><LogOut class="h-3.5 w-3.5" /> 로그아웃</button>
          </div>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto"><RouterView /></main>
    </div>
  </div>
</template>
