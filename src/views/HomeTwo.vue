<template>
<div class="sec-home sec-home-two" v-if="showAnimMain" v-bind:class="{showLines: showLines}">
<transition name="fade">
	<div class="btnLanguageFixed" v-show="showAnim" style="animation-delay: 1.5s">
		<btnLanguage></btnLanguage>
	</div>
</transition>
<transition name="fade">
	<img v-if="!this.$store.state.home_bg" :src="pageInfo.bg" v-show="showAnim" v-on:load="this.loadImg" alt="" class="sec-home__bg">
</transition>
<transition name="fade">
	<img v-if="this.$store.state.home_bg" :src="this.$store.state.home_bg" v-show="showAnim" alt="" class="sec-home__bg">
</transition>
<transition name="fade">
	<div class="sec-home__wrap">
		<div class="sec-home__content">
			<div class="sec-home__line sec-home__line_1"></div>
			<div class="sec-home__line sec-home__line_2"></div>
			<div class="sec-home__line sec-home__line_3"></div>
			<div class="sec-home__line sec-home__line_4"></div>
			<div class="sec-home__line sec-home__line_5"></div>
			<div class="sec-home__line sec-home__line_6"></div>

			<transition name="fade" v-show="showAnim">
				<div class="sec-home__links" :style="'animation-delay:'+ delay">
					<router-link :to="{name: 'about-'+this.$route.meta.language}" class="sec-home__link sec-home__link_1 sec-home__link_left">{{ this.pageInfo.about_title }}</router-link>
					<router-link :to="{name: 'projects-'+this.$route.meta.language}" class="sec-home__link sec-home__link_2 sec-home__link_right">{{ this.pageInfo.projects_title }}</router-link>
					<router-link :to="{name: 'partners-'+this.$route.meta.language}" class="sec-home__link sec-home__link_3 sec-home__link_left">{{ this.pageInfo.partners_title }}</router-link>
					<router-link :to="{name: 'contacts-'+this.$route.meta.language}" class="sec-home__link sec-home__link_4 sec-home__link_right">{{ this.pageInfo.contacts_title }}</router-link>
				</div>
			</transition>

			<transition name="fade" v-show="showAnim">
				<div class="sec-home__center"><img :src="this.pageInfo.logo" alt="" class="sec-home__logo"></div>
			</transition>
			<transition name="fade" v-show="showAnim">
				<div :style="'animation-delay:'+ delayText" class="sec-home__text">{{ this.pageInfo.text }}</div>
			</transition>
		</div>
	</div>
</transition>
</div>
</template>
<script>
import axios from 'axios'
import btnLanguage from '../components/btnLanguage.vue'

export default {
	name: 'Home',
	data(){
		return{
			showAnim: false,
			showAnimMain: false,
			pageInfo: Object,
			delay: '1s',
			delayText: '0.5s',
			showLines: false,
			images: {
				count: 1,
				loaded: 0,
			},
		};
	},
	components: {
		btnLanguage,
	},
	watch:{
		$route() {
			this.showAnim = false;
			this.getInfo();
			if ( this.$store.state.home_bg ) {
				this.showPage();
			}
		},
	},
	created(){
		this.getInfo();
	},
	beforeRouteLeave(to, from, next) {
		setTimeout(next, 2000);
		this.showAnim = false;
		this.delay = '0s';
		this.delayText = '0s';
		this.showLines = false;
		this.$store.commit('setHomeBg', this.pageInfo.bg);
		if ( this.pageInfo.bg ) {
			this.$store.commit('setBgPage', {src: this.pageInfo.bg, class: 'home'});
		}
	},
	mounted() {
	},
	methods: {
		loadImg(){
			this.images.loaded = this.images.loaded+1;
			if ( this.images.loaded === this.images.count ) {
				this.loadedBg = true;
				this.showPage();
			}
		},
		showPage() {
			this.showLines = true;
			setTimeout(()=>this.showAnim = true, 100);
		},
		getInfo() {
			axios.get('https://privilege.qazxswedc.site/wp-json/vue/v1/home', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.showAnimMain = true;
				if ( this.$store.state.home_bg ) {
					this.showPage();
				}
			});
		},
	},
}

</script>

