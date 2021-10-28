<template>
<header class="block-header">
	<div class="block-header__wrap">
		<div class="block-header__content">
			<router-link :to="this.$route.meta.linkHome" class="block-header__left">
				<img src="../assets/img/logo_small.png" alt="logo" class="block-header__logo">
			</router-link>
			<div class="block-header__right wrap-menu" v-click-away="hideMenu" v-bind:class="{active: isActive}">
				<btnLanguage></btnLanguage>
				<Menu v-bind:isActive="isActive" v-on:openMenu="openMenu"></Menu>
			</div>
		</div>
	</div>
</header>
</template>
<script>
import btnLanguage from '../components/btnLanguage.vue'
import Menu from '../components/menu.vue'

export default {
	name: 'Header',
	data(){
		return{
			isActive: false,
		};
	},
	components: {
		btnLanguage,
		Menu
	},
	mounted(){
	},
	methods: {
		openMenu(e){
			this.isActive = e;
		},
		hideMenu(){
			this.isActive = false;
		},
	},
}
</script>