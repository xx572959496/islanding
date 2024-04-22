import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from "pinia";
import '@varlet/ui/es/style'

const pinia = createPinia()

const app = createApp(App);

app.use(pinia)
    .mount('#app')
