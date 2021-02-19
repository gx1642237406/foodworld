import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/Home')
const Login = () => import('@/views/login')
const Video = () => import('@/views/video')
const Play = () => import('@/views/play')
const Menu = () => import('@/views/menu')
const CookBook = () => import('@/views/cookbook')
const Detail = () => import('@/views/detail')
const Detail_menu = ()=>import('@/views/detail_menu')
const Reg = () => import('@/views/reg')
const Menu_detail = ()=>import('@/views/menu_detail')

Vue.use(VueRouter)


//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/reg',
        name: 'Reg',
        component: Reg,
    },
    {
        path: '/video',
        name: 'Video',
        component: Video,
    },
    {
        path: '/video/play/:id',
        name: 'Play',
        component: Play,
    }
    ,
    {
        path: '/cookbook',
        name: 'CookBook',
        component: CookBook,
        meta:{
            keepAlive: true
        }
    }
    ,
    {
        path: '/menu',
        name: 'Menu',
        component: Menu,
    }
    ,
    {
        path: '/detail/:id',
        name: 'detail',
        component: Detail,
    }
    ,
    {
        path: '/detail_menu/:id',
        name: 'detail_menu',
        component: Detail_menu,
    }
    ,
    {
        path: '/menu_detail/:id',
        name: 'menu_detail',
        component: Menu_detail,
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
