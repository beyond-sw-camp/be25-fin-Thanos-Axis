import { createApp } from 'vue'
import App from '../App.vue'
import router from '../router'
import { pinia } from '../stores'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import './styles/main.css'

export function createMeetBowlApp() {
  return createApp(App).use(pinia).use(router)
}
