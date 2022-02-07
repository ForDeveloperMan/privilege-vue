<template>
	<div class="wrapper-about" v-if="component === 64 || component === 66 ">
		<TypesOfActivities :routeLeave="this.routeLeave" v-if="component === 64" :data="this.data" :showMain="this.showMain" :showAnim="this.showAnim"></TypesOfActivities>
		<Founders :routeLeave="this.routeLeave" v-if="component === 66" :data="this.data" :showMain="this.showMain" :showAnim="this.showAnim"></Founders>
	</div>
	<AboutText :routeLeave="this.routeLeave" v-if="component === 68" :data="this.data" :showMain="this.showMain" :showAnim="this.showAnim"></AboutText>
</template>

<script>
import axios from 'axios'
import TypesOfActivities from '@/components/TypesOfActivities.vue'
import Founders from '@/components/Founders.vue'
import AboutText from '@/components/AboutText.vue'


export default {
	name: 'About page',
	data() {
		return {
			data: Object,
			component: Number,
			showMain: false,
			showAnim: false,
			routeLeave: false,
		}
	},
	components: {
		TypesOfActivities,
		Founders,
		AboutText,
	},
	created() {
	},
	beforeMount() {
		this.getInfo();
	},
	mounted() {	
	},
	beforeRouteLeave(to, from, next) {
		setTimeout(next, 1500);
		this.showAnim = false;
		this.routeLeave = true;
		this.$store.commit('setAboutLanguages', false);
		// this.$store.commit('setBgPage', {src: '123', class: 'aboutPage'});
	},
	beforeRouteUpdate(to, from, next) {
		setTimeout(next, 1500); 
		this.showAnim = false;
		this.routeLeave = true;
		this.$store.commit('setAboutLanguages', false);
		this.$store.commit('setBgPage', {src: '123', class: 'aboutPage'});
	},
	methods: {
		getInfo() {
			axios.get('https://privilege.qazxswedc.site/wp-json/vue/v1/about_page', {
				params:{
					lang: this.$route.meta.language,
					page: this.$route.params.page,
				}
			}).then(response => {
				this.data = response.data;
				this.component = this.data.page['category'];
				this.showMain = true;
				if ( this.data.pageInfo === null ) {
					window.location.href = this.$route.meta.linkHome+'404';
				}
				this.$store.commit('setAboutLanguages', this.data.page.languages_post);
				setTimeout(() => this.showAnim = true, 100);
			});
		},
	},
}
</script>