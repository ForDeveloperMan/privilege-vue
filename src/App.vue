<template>
	<div :class="'bg-page '+$store.state.bgPage.class" v-if="$store.state.bgPage.src">
		<img :src="$store.state.bgPage.src" class="bg-page__img">
	</div>
	<Header v-if="showHeader" ></Header>
	<router-view :key="$route.name+$route.path" />
</template>
<script>
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
		};
	},
	watch:{
		'$router.currentRoute.value': function() {
			this.checkHome();
			console.log('watch');
		},
	},
	created() {
		this.$store.commit('changeLanguage', this.$route.meta.path);
	},
	mounted() {
		this.checkHome();
	},
	methods: {
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
