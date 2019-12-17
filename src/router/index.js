import Vue from "vue"
import VueRouter from "vue-router"

const Home = () => import('../views/home/Home') //懒加载
const Cart = () => import('../views/cart/Cart') 
const Category = () => import('../views/category/Category') 
const Profile = () => import('../views/profile/Profile') 
const Detail = () => import('../views/detail/Detail') 


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path:"",
      redirect:"/home"
    },
    {
      path:"/home",
      component: Home
    },
    {
      path:"/cart",
      component: Cart
    },
    {
      path:"/category",
      component: Category
    },
    {
      path:"/profile",
      component: Profile
    },
    {
      path:"/detail:id",
      component: Detail
    }
  ],
  mode: "history"
})

export default router