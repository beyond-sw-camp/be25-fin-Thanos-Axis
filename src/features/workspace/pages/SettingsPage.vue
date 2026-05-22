<script setup>
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiCard from '../../../shared/components/UiCard.vue'
import { useAuthStore } from '../../../stores/auth'
const auth = useAuthStore()
</script>

<template>
  <div class="mx-auto max-w-3xl p-6 lg:p-8">
    <PageHeader title="설정" description="개인 정보와 알림 환경을 관리합니다." />
    <UiCard class="p-6"><h3 class="mb-4 text-sm font-semibold">프로필</h3><div class="grid grid-cols-2 gap-4 text-[13px]"><label v-for="[label,value] in [['이름',auth.user?.name],['이메일',auth.user?.email],['부서',auth.user?.department],['직급',auth.user?.position]]" :key="label" class="text-[11.5px] text-muted-foreground">{{ label }}<input :value="value" class="inp mt-1 text-foreground" /></label></div></UiCard>
    <UiCard class="mt-4 p-6"><h3 class="mb-4 text-sm font-semibold">알림</h3><label v-for="label in ['회의 시작 10분 전 알림','회의록 생성 완료 알림','새 내부 메일 알림']" :key="label" class="flex items-center justify-between py-1 text-[13px]">{{ label }}<input type="checkbox" checked class="accent-primary" /></label></UiCard>
  </div>
</template>
