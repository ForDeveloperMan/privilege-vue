import { createApp } from 'vue'
import App from './App'
import VueClickAway from "vue3-click-away";
import router from './router'
import { createStore } from 'vuex'
import _store from './store.js'

const store = createStore(_store)

const app = createApp(App)
app
    .use(store)
    .use(router)
    .use(VueClickAway)
    .mount('#app');
