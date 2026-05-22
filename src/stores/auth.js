import { defineStore } from 'pinia'

const KEY = 'meetbowl.auth'

const accounts = {
  master: {
    password: 'master',
    user: {
      id: 'u-master',
      username: 'master',
      name: '김마스터',
      role: 'master',
      department: '경영지원실',
      position: '이사',
      email: 'master@meetbowl.co',
      avatar: 'M',
    },
  },
  admin: {
    password: 'admin',
    user: {
      id: 'u-admin',
      username: 'admin',
      name: '박관리',
      role: 'admin',
      department: 'IT운영팀',
      position: '팀장',
      email: 'admin@meetbowl.co',
      avatar: 'A',
    },
  },
  user: {
    password: 'user',
    user: {
      id: 'u-user',
      username: 'user',
      name: '이지연',
      role: 'user',
      department: '전략기획팀',
      position: '선임',
      email: 'user@meetbowl.co',
      avatar: 'U',
    },
  },
}

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null, restored: false }),
  getters: {
    landingPath: (state) =>
      state.user?.role === 'master'
        ? '/master/permissions'
        : state.user?.role === 'admin'
          ? '/admin/dashboard'
          : '/app/dashboard',
  },
  actions: {
    restore() {
      if (this.restored) return
      this.restored = true
      try {
        const raw = localStorage.getItem(KEY)
        this.user = raw ? JSON.parse(raw) : null
      } catch {
        this.user = null
      }
    },
    async login(username, password) {
      const account = accounts[username.trim().toLowerCase()]
      if (!account || account.password !== password) {
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.')
      }
      this.user = account.user
      localStorage.setItem(KEY, JSON.stringify(account.user))
    },
    logout() {
      this.user = null
      localStorage.removeItem(KEY)
    },
  },
})
