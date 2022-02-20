<template>
	<div :class="'bg-page '+$store.state.bgPage.class" v-if="$store.state.bgPage.src">
		<img :src="$store.state.bgPage.src" class="bg-page__img">
	</div>
	<Header v-if="showHeader" ></Header>
	<router-view :key="$route.name+$route.path" />
</template>
<script>
import axios from 'axios'
import Header from '@/components/header.vue'

export default {
	name: 'App',
	components: {
		Header
	},
	data() {
		return {
			showHeader: true,
			classBg: false,
			pageInfo: Object,
		};
	},
	watch:{
		'$router.currentRoute.value': function() {
			this.checkHome();
			console.log('watch');
		},
	},
	created() {
		this.getInfo();
		this.$store.commit('changeLanguage', this.$route.meta.path);
	},
	mounted() {
		this.checkHome();
	},
	methods: {
		getInfo() {
			axios.get('https://privilege.qazxswedc.site/wp-json/vue/v1/getMain', {
				params:{
					lang: 'en',
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.$store.commit('setHome_bg_main',this.pageInfo.bgHome);
			});
		},
		checkHome() {
			if ( this.$store.state.bgPage.class ) {
				this.classBg = this.$store.state.bgPage.class;
			}
			if ( this.$router.currentRoute.value.meta.name === 'home' || this.$router.currentRoute.value.meta.name === 'homeTwo' ) {
				this.showHeader = false;
			}else{
				this.showHeader = true;
			}
		},
	},
}

</script>

<style lang="scss">
  @import './assets/sass/style.scss';
</style>
