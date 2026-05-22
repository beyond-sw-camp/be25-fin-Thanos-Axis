import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppShell from '../shared/components/AppShell.vue'
import LoginPage from '../features/auth/pages/LoginPage.vue'
import DashboardPage from '../features/dashboard/pages/DashboardPage.vue'
import RoomsPage from '../features/meeting/pages/RoomsPage.vue'
import MyReservationsPage from '../features/meeting/pages/MyReservationsPage.vue'
import MeetingsPage from '../features/meeting/pages/MeetingsPage.vue'
import MeetingRoomPage from '../features/meeting-room/pages/MeetingRoomPage.vue'
import MailPage from '../features/mail/pages/MailPage.vue'
import MinutesPage from '../features/minutes/pages/MinutesPage.vue'
import WorkspacePage from '../features/workspace/pages/WorkspacePage.vue'
import BackupPage from '../features/workspace/pages/BackupPage.vue'
import SettingsPage from '../features/workspace/pages/SettingsPage.vue'
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage.vue'
import MembersPage from '../features/admin/pages/MembersPage.vue'
import OrganizationPage from '../features/admin/pages/OrganizationPage.vue'
import AdminRoomsPage from '../features/admin/pages/AdminRoomsPage.vue'
import PolicyPage from '../features/admin/pages/PolicyPage.vue'
import AdminLogsPage from '../features/admin/pages/AdminLogsPage.vue'
import AdminReservationsPage from '../features/admin/pages/AdminReservationsPage.vue'
import MasterPermissionsPage from '../features/admin/pages/MasterPermissionsPage.vue'
import AdminPermissionScopesPage from '../features/admin/pages/AdminPermissionScopesPage.vue'
import PermissionHistoryPage from '../features/admin/pages/PermissionHistoryPage.vue'

const routes = [
  { path: '/', redirect: '/app/dashboard' },
  { path: '/login', name: 'login', component: LoginPage, meta: { public: true } },
  {
    path: '/',
    component: AppShell,
    meta: { requiresAuth: true },
    children: [
      { path: 'app/dashboard', component: DashboardPage },
      { path: 'app/rooms', component: RoomsPage },
      { path: 'app/my-reservations', component: MyReservationsPage },
      { path: 'app/meetings', component: MeetingsPage },
      { path: 'app/meeting', component: MeetingRoomPage },
      { path: 'app/mail', component: MailPage },
      { path: 'app/recordings', component: MinutesPage },
      { path: 'app/workspace', component: WorkspacePage },
      { path: 'app/backup/:id', component: BackupPage },
      { path: 'app/settings', component: SettingsPage },
      { path: 'admin/dashboard', component: AdminDashboardPage, meta: { roles: ['admin', 'master'] } },
      { path: 'admin/members', component: MembersPage, meta: { roles: ['admin', 'master'] } },
      { path: 'admin/organization', component: OrganizationPage, meta: { roles: ['admin', 'master'] } },
      { path: 'admin/rooms', component: AdminRoomsPage, meta: { roles: ['admin', 'master'] } },
      { path: 'admin/reservations', component: AdminReservationsPage, meta: { roles: ['admin', 'master'] } },
      { path: 'admin/mail-policy', component: PolicyPage, meta: { roles: ['admin', 'master'] } },
      { path: 'admin/recording-policy', component: PolicyPage, meta: { roles: ['admin', 'master'] } },
      { path: 'admin/logs', component: AdminLogsPage, meta: { roles: ['admin', 'master'] } },
      { path: 'master/permissions', component: MasterPermissionsPage, meta: { roles: ['master'] } },
      { path: 'master/admin-permissions', component: AdminPermissionScopesPage, meta: { roles: ['master'] } },
      { path: 'master/history', component: PermissionHistoryPage, meta: { roles: ['master'] } },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/app/dashboard' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  auth.restore()

  if (to.meta.public && auth.user) return auth.landingPath
  if (to.matched.some((record) => record.meta.requiresAuth) && !auth.user) return '/login'
  if (to.meta.roles && !to.meta.roles.includes(auth.user?.role)) return auth.landingPath
  return true
})

export default router
