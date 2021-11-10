import { createApp } from 'vue'
import App from './App'
import VueClickAway from "vue3-click-away";
import router from './router'
import { createStore } from 'vuex'
import VueMobileDetection from 'vue-mobile-detection'
import _store from './store.js'
import googleMap from '@fawmi/vue-google-maps'

const store = createStore(_store)

const app = createApp(App)
app
    .use(store)
    .use(router)
    .use(VueClickAway)
    .use(VueMobileDetection)
	.use(googleMap, {
		load: {
			key: 'AIzaSyB7V64UlgTzbXSz-koSkypufXPpATO4NZU',
		},
	})
    .mount('#app');
