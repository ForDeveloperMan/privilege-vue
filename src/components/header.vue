<template>
<transition name="fade">	
<header class="block-header" v-if="showMain">
	<div class="block-header__wrap">
		<div class="block-header__content">
			<router-link :to="this.$route.meta.linkHome" class="block-header__left">
				<img :src="this.info.logo" alt="logo" class="block-header__logo">
			</router-link>
			<div class="block-header__right wrap-menu" v-click-away="hideMenu" v-bind:class="[{active: isActive},{showElms: isShowElms}]">
				<btnLanguage></btnLanguage>
				<Menu v-bind:isActive="isActive" v-on:openMenu="openMenu"></Menu>
			</div>
		</div>
	</div>
</header>
</transition>
</template>
<script>
import btnLanguage from '../components/btnLanguage.vue'
import Menu from '../components/menu.vue'
import axios from 'axios'

export default {
	name: 'Header',
	data(){
		return{
			isActive: false,
			info: Object,
			showMain: false,
			isShowElms: false,
		};
	},
	components: {
		btnLanguage,
		Menu
	},
	beforeMount() {
		this.getInfo();
	},
	mounted(){
	},
	methods: {
		openMenu(e){
			this.isActive = e;
			if ( this.isActive ) {
				if ( window.innerWidth <= 1200 ) {
					this.isShowElms = true;
				}else{
					setTimeout(()=>this.isShowElms = true, 600);
				}
			}else{
				this.isShowElms = false;
			}
		},
		hideMenu(){
			this.isActive = false;
			setTimeout(()=>this.isShowElms = false, 2000);
		},
		getInfo() {
			axios.get('https://privilege.qazxswedc.site/wp-json/vue/v1/header', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.info = response.data;
				this.showMain = true;
			});
		},
	},
}
</script>