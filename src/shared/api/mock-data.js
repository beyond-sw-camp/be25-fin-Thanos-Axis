export const ROOMS = [
  { id: 'r1', name: '테헤란로(대 회의실)', floor: 12, capacity: 14, equipment: ['프로젝터', '화상회의'], site: '테헤란로' },
  { id: 'r2', name: '테헤란로(중 회의실)', floor: 12, capacity: 10, equipment: ['TV', '화상회의'], site: '테헤란로' },
  { id: 'r3', name: '테헤란로(소 회의실)', floor: 12, capacity: 6, equipment: ['TV'], site: '테헤란로' },
  { id: 'r4', name: '테헤란로(1층 미팅룸)', floor: 1, capacity: 4, equipment: ['TV'], site: '테헤란로' },
  { id: 'r5', name: '봉은사로(회의실 1)', floor: 5, capacity: 8, equipment: ['TV', '화상회의'], site: '봉은사로' },
  { id: 'r6', name: '봉은사로(회의실 2)', floor: 5, capacity: 6, equipment: ['TV'], site: '봉은사로' },
  { id: 'r7', name: '봉은사로(회의실 3)', floor: 5, capacity: 12, equipment: ['프로젝터', '화상회의'], site: '봉은사로' },
  { id: 'r8', name: '안양(대 : 도시계획부)', floor: 3, capacity: 16, equipment: ['프로젝터', '화상회의', '마이크'], site: '안양' },
  { id: 'r9', name: '안양(중 : 단지설계부)', floor: 3, capacity: 8, equipment: ['TV', '화상회의'], site: '안양' },
]

export const TODAY_RESERVATIONS = [
  { id: 'b1', roomId: 'r1', title: '권성환 회의', owner: '권성환', start: '10:00', end: '12:00', status: 'booked', attendees: [] },
  { id: 'b2', roomId: 'r1', title: '민경정 리뷰', owner: '민경정', start: '14:30', end: '16:00', status: 'booked', attendees: [] },
  { id: 'b3', roomId: 'r2', title: '탁호균 종일 사용', owner: '탁호균', start: '06:00', end: '23:30', status: 'booked', attendees: [] },
  { id: 'b4', roomId: 'r3', title: '이경필 작업', owner: '이경필', start: '13:00', end: '16:00', status: 'booked', attendees: [] },
  { id: 'b5', roomId: 'r3', title: '장병욱 미팅', owner: '장병욱', start: '16:00', end: '18:00', status: 'booked', attendees: [] },
  { id: 'b6', roomId: 'r6', title: '곽준호 1on1', owner: '이지연', start: '10:00', end: '11:30', status: 'mine', attendees: ['박서연'] },
  { id: 'b7', roomId: 'r7', title: '김재욱 종일 사용', owner: '김재욱', start: '06:00', end: '23:30', status: 'booked', attendees: [] },
  { id: 'b8', roomId: 'r8', title: '박헌일 검토', owner: '박헌일', start: '16:00', end: '18:00', status: 'booked', attendees: [] },
  { id: 'b9', roomId: 'r9', title: '한유진 단지 회의', owner: '이지연', start: '08:00', end: '10:00', status: 'mine', attendees: ['이지연', '박서연'] },
]

export const MAILS = [
  { id: 'm1', from: '김지연', dept: '프로덕트팀', subject: '[회의록 공유] 5월 제품 전략 회의', preview: '5월 제품 전략 회의 회의록과 결정 사항을 공유드립니다.', date: '2026-05-22', unread: true, hasAttachment: true, category: 'inbox', body: '안녕하세요.\n\n5월 제품 전략 회의 회의록을 공유드립니다.\n- Q2 캠페인 일정 조정\n- 신규 제품 라인 PoC 시작\n- 리소스 영향 분석 5/24 정리' },
  { id: 'm2', from: '현재진', dept: '운영팀', subject: '보안 정책 변경 안내', preview: '5월 25일부터 적용되는 보안 정책 변경 사항입니다.', date: '2026-05-21', unread: true, hasAttachment: false, category: 'inbox', body: 'VPN 접속 시 2차 인증이 적용됩니다.' },
  { id: 'm3', from: '윤정윤', dept: '디자인팀', subject: '디자인 리뷰 일정 조정', preview: '다음 주 디자인 리뷰 일정 변경 요청드립니다.', date: '2026-05-20', unread: false, hasAttachment: false, category: 'inbox' },
  { id: 'm4', from: '이지연', dept: '전략기획팀', subject: '주간 전략 회의 자료 공유', preview: '이번 주 전략 회의 사전 자료입니다.', date: '2026-05-19', unread: false, hasAttachment: true, category: 'sent' },
  { id: 'm5', from: '박서연', dept: '프로덕트팀', subject: '[백업] Q1 회의록 모음', preview: 'Q1 분기 주요 회의록을 백업 공유드립니다.', date: '2026-05-10', unread: false, hasAttachment: true, category: 'backup' },
  { id: 'm6', from: '경영지원실', dept: '경영지원실', subject: '[공지] 6월 휴무일 안내', preview: '6월 휴무일 안내드립니다.', date: '2026-05-18', unread: false, hasAttachment: false, category: 'notice' },
]

export const RECORDINGS = [
  { id: 'rec1', title: '주간 전략 회의', date: '2026-05-20', duration: '58분', attendees: 5, summary: 'OKR 진행률 점검 및 Q2 우선순위 재정렬.', expireDays: 30 },
  { id: 'rec2', title: 'Q2 캠페인 킥오프', date: '2026-05-19', duration: '1시간 24분', attendees: 8, summary: '타겟 세그먼트 확정, 6월 1일 런칭 일정 합의.', expireDays: 21 },
  { id: 'rec3', title: '제품 디자인 리뷰', date: '2026-05-15', duration: '42분', attendees: 4, summary: '대시보드 IA 변경안 승인.', expireDays: 7 },
  { id: 'rec4', title: '월간 전사 공유', date: '2026-05-02', duration: '1시간 12분', attendees: 47, summary: '전사 매출 현황과 분기 전략 발표.', expireDays: 60 },
]

export const MY_MEETINGS = [
  { id: 'mt1', title: '주간 전략 회의', role: 'host', start: '2026-05-22 10:00', status: 'live', attendees: ['박서연', '정도현', '김민수'], room: '테헤란로(대 회의실)' },
  { id: 'mt2', title: '디자인 리뷰', role: 'attendee', start: '2026-05-22 14:00', status: 'upcoming', attendees: ['윤정윤', '김민수'], room: '원격' },
  { id: 'mt3', title: 'Q2 캠페인 킥오프 후속', role: 'host', start: '2026-05-23 11:00', status: 'upcoming', attendees: ['정도현', '박서연'], room: '봉은사로(회의실 1)' },
  { id: 'mt4', title: '신규 입사자 OJT', role: 'attendee', start: '2026-05-20 14:00', status: 'ended', attendees: ['HR팀'], room: '테헤란로(중 회의실)' },
]

export const ADMIN_LOGS = [
  { id: 'l1', time: '2026-05-21 09:12', actor: '박관리', area: '회원 관리', action: '회원 비활성화', target: '최정훈', result: '성공' },
  { id: 'l2', time: '2026-05-21 08:48', actor: '김마스터', area: '권한 관리', action: 'Admin 권한 부여', target: '박관리', result: '성공' },
  { id: 'l3', time: '2026-05-20 17:22', actor: '박관리', area: '회의실 관리', action: '회의실 수정', target: '테헤란로(대 회의실)', result: '성공' },
  { id: 'l4', time: '2026-05-20 14:05', actor: '박관리', area: '보관 정책', action: '보관 기간 변경', target: '기본 30일 -> 60일', result: '성공' },
]

export const MEMBERS = [
  { id: '1', name: '김마스터', email: 'master@meetbowl.co', dept: '경영지원실', position: '이사', role: 'Master', status: '활성' },
  { id: '2', name: '박관리', email: 'admin@meetbowl.co', dept: 'IT운영팀', position: '팀장', role: 'Admin', status: '활성' },
  { id: '3', name: '이지연', email: 'user@meetbowl.co', dept: '전략기획팀', position: '선임', role: 'User', status: '활성' },
  { id: '4', name: '정도현', email: 'doh@meetbowl.co', dept: '마케팅팀', position: '책임', role: 'User', status: '활성' },
  { id: '5', name: '박서연', email: 'seo@meetbowl.co', dept: '프로덕트팀', position: '수석', role: 'User', status: '활성' },
  { id: '6', name: '김민수', email: 'min@meetbowl.co', dept: '디자인팀', position: '선임', role: 'User', status: '활성' },
  { id: '7', name: '최정훈', email: 'choi@meetbowl.co', dept: '영업팀', position: '사원', role: 'User', status: '비활성' },
]
