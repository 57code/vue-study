import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

export function createApp () {
    const router = createRouter()
    const store = createStore()
    const app = new Vue({
        router,
        store,
        // context,
        render: h => h(App)
    })
    return { app, router }
}