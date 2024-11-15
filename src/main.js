import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import './assets/tailwind.css';
import store from './store'; // استيراد الـ store

const app = createApp(App);

app.use(store); // استخدام الـ store في التطبيق

app.mount('#app');
