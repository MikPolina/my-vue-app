import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import CasesPage from '@/views/CasesPage.vue'
import MarketingPage from '@/views/MarketingPage.vue'
import PromoPage from '@/views/PromoPage.vue'
import ShopPage from '@/views/ShopPage.vue'
import DevelopPage from '@/views/DevelopPage.vue'
import ContactPage from '@/views/ContactPage.vue'
import CalculPage from '@/views/CalculPage.vue'
import TheoryPage from '@/views/TheoryPage.vue'
import Theory2Page from '@/views/Theory2Page.vue'
import PolicyPage from '@/views/PolicyPage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/about',
        name: 'about',
        component: AboutPage
    },
    {
        path: '/cases',
        name: 'cases',
        component: CasesPage
    },
    {
        path: '/marketing',
        name: 'marketing',
        component: MarketingPage
    },
    {
        path: '/promo',
        name: 'promo',
        component: PromoPage
    },
    {
        path: '/shop',
        name: 'shop',
        component: ShopPage
    },
    {
        path: '/develop',
        name: 'develop',
        component: DevelopPage
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactPage
    },
    {
        path: '/calcul',
        name: 'calcul',
        component: CalculPage
    },
    {
        path: '/theory',
        name: 'theory',
        component: TheoryPage
    },
    {
        path: '/theory2',
        name: 'theory2',
        component: Theory2Page
    },
    {
        path: '/policy',
        name: 'policy',
        component: PolicyPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router