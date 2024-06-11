import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import './styles/style.css'

import App from './App.vue'
import HomePage from './components/HomePage.vue'
import About from './components/About.vue'
import FCFS from './components/Algorithm/FCFS.vue'
import SPF from './components/Algorithm/SPF.vue'
import RR from './components/Algorithm/RR.vue'


const routes = [
    {
        path: '/',
        redirect: '/FCFS',
        component: HomePage,
        children:[
            {
                path: '/FCFS',
                component: FCFS
            },
            {
                path: '/SJF',
                component: SPF
            },
            {
                path: '/RR',
                component: RR
            },
        ]
    },
    {
        path: '/about',
        component: About,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// Create Vue app instance and use router
const app = createApp(App)
app.use(router)
app.mount('#app')

