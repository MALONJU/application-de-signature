import { createApp } from 'vue';
import App from './App.vue';
import router from './routes'; // Vérifiez bien ce chemin
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);

app.use(router); // Utilisation du router
app.mount('#app');