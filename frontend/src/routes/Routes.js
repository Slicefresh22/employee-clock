import { createWebHistory, createRouter } from "vue-router";
import Login from '../components/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import AuthService from "../services/AuthService";
import AppService from "../services/AppService";

function authGuard(to, from, next){
  AuthService.VerifyJWT(AppService.readLocalStorage('token')).then(res => {
    if(to.name !== 'Login' && (res.data === false || res.data === undefined )){
      return next({name : 'Login'})
    }
    else{
      return next();
    }
  })
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Login,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  { 
    path: "/dashboard",
    name: "Dashboard",
    meta: {title: 'Dashboard'},
    component: Dashboard, 
    beforeEnter: authGuard
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});




export default router;