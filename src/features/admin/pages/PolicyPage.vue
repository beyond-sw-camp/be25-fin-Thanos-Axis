<script setup>
import { FileText, Mail } from '@lucide/vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import UiCard from '../../../shared/components/UiCard.vue'
const mail = [['받은 메일 보관 기간','365','일'],['휴지통 자동 삭제 기준','14','일'],['첨부파일 최대 크기','100','MB']]
const records = [['STT 원문 보관 기간','180','일'],['회의록 보관 기간','365','일'],['녹음 파일 보관 기간','90','일']]
</script>
<template><div class="mx-auto max-w-[1200px] p-6 lg:p-8"><PageHeader title="메일/회의록 정책 관리" description="메일과 회의록의 보관 및 자동 삭제 정책을 한 곳에서 설정합니다." /><div class="grid gap-5 lg:grid-cols-2"><UiCard v-for="[title, icon, rows] in [['메일 보관 정책', Mail, mail],['회의록 보관 정책', FileText, records]]" :key="title" class="space-y-5 p-6"><h2 class="border-b pb-3 font-semibold"><component :is="icon" class="mr-2 inline h-4 w-4 text-primary" />{{ title }}</h2><label v-for="row in rows" :key="row[0]" class="flex items-center justify-between border-b pb-4 text-[13px]">{{ row[0] }}<span><input :value="row[1]" class="h-9 w-28 rounded-md border px-3 text-right" /> <small class="text-muted-foreground">{{ row[2] }}</small></span></label><div class="flex justify-end gap-2"><button class="h-9 rounded-md border px-3.5">초기화</button><button class="h-9 rounded-md bg-primary px-3.5 text-primary-foreground">저장</button></div></UiCard></div></div></template>
