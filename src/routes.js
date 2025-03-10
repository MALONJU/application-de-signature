import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from './components/LoginComponent.vue'; // Chemin vers votre composant SignIn
import SignInComponent from './components/SignInComponent.vue';   // Chemin vers votre composant Login
import DashboardComponent from './components/DashboardComponent.vue'
import SignatureComponent from './components/SignatureComponent.vue'
const routes = [
  { path: '/LoginComponent', name: 'LoginComponentpage', component: LoginComponent },
  { path: '/SignInComponent', name: 'SignInComponentpage', component: SignInComponent },
  { path: '/DashboardComponent', name: 'DashboardComponent', component: DashboardComponent },
 
  { path: '/signature/:token', 
    component: SignatureComponent ,
    props: true,}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;