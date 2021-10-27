<template>
<btnLanguage class="fixed"></btnLanguage>
<transition name="fade">
<div class="sec-home" v-if="showAnim">
	<div class="sec-home__wrap">
		<div class="sec-home__content">
			<div class="sec-home__line sec-home__line_1"></div>
			<div class="sec-home__line sec-home__line_2"></div>
			<div class="sec-home__line sec-home__line_3"></div>
			<div class="sec-home__line sec-home__line_4"></div>
			<div class="sec-home__line sec-home__line_5"></div>
			<div class="sec-home__line sec-home__line_6"></div>

			<router-link :to="this.$route.meta.linkHome+'projects'" class="sec-home__link sec-home__link_1 sec-home__link_left">{{ this.pageInfo.projects_title }}</router-link>
			<div class="sec-home__link sec-home__link_2 sec-home__link_right">Партнери</div>
			<div class="sec-home__link sec-home__link_3 sec-home__link_left">Про компанію</div>
			<div class="sec-home__link sec-home__link_4 sec-home__link_right">Контакти</div>
			<div class="sec-home__center"><img :src="this.pageInfo.logo" alt="" class="sec-home__logo"></div>
			<div class="sec-home__text">{{ this.pageInfo.text }}</div>
		</div>
	</div>
</div>
</transition>
</template>

<script>
import axios from 'axios'
import btnLanguage from '../components/btnLanguage.vue'

export default {
	name: 'Home',
	data(){
		return{
			showAnim: false,
			pageInfo: Object,
		};
	},
	components: {
		btnLanguage,
	},
	created(){
		this.getProjects();
	},
	beforeUpdate(){
		this.showAnim = false;
	},
	updated(){
		this.getProjects();
	},
	methods: {
		getProjects(){
			axios.get('http://privilege.qazxswedc.site/wp-json/vue/v1/home', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.showAnim = true;
			});
		},
	},
}

</script>

