import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../src/components/lista'
import inserir from '../src/components/inserir'
import newUser from '../src/components/newUser'
import agenda from '../src/components/agenda'
import newHour from '../src/components/newHour'
import metricas from '../src/components/metricas'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: home
    },
    {
        name: 'insertMaterial',
        path: '/insertMaterial',
        component: inserir
    },  
    {
        name: 'newUser',
        path: '/newUser',
        component: newUser
    },
    {
        name: 'schedules',
        path: '/minhaAgenda',
        component: agenda
    },
    {
        name: 'newHour',
        path: '/newHour',
        component: newHour
    },
    {
        name: 'metrics',
        path: '/metrics',
        component: metricas
    },       
]

const router = new VueRouter({routes})

export default router

