<template>
	<div class="wrapper">
		<div class="sec-page sec-404">
			<div class="sec-404__line sec-404__line_1"></div>
			<div class="sec-404__line sec-404__line_2"></div>
			<div class="sec-page__wrap sec-404__wrap" v-if="showMain">
				<Header></Header>
				<div class="sec-404__content">
					<h1 class="title title_main sec-404__title">404</h1>
					<p class="text-info sec-404__text">{{ pageInfo.title }}</p>
					<router-link :to="this.$route.meta.linkHome" class="link-contact">{{ pageInfo.goHome }} <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.67275 0.5L0.727295 1.43333L3.83379 4.5L0.727295 7.56667L1.67275 8.5L5.7247 4.5L1.67275 0.5Z" fill="white"/></svg></router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Header from '@/components/header.vue'
import axios from 'axios'
export default {
	name: 'NotFound',
	data() {
		return {
			pageInfo: Object,
			showMain: false,
			showAnim: false,
		}
	},
	components: {
		Header
	},
	beforeRouteLeave(to, from, next) {
		this.showAnim = false;
		setTimeout(next, 1000);
	},
	created() {
		this.getInfo();
	},
	mounted() {
		console.log(this.$route);
	},
	methods: {
		getInfo() {
			axios.get('http://privilege.qazxswedc.site/wp-json/vue/v1/notfound', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.showMain = true;
				setTimeout(() => this.showAnim = true, 100);
			});
		},
	},
}
</script>