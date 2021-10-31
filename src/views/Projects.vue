<template>

<div class="wrapper">


<div class="sec-projects sec-page">


<transition name="fade">
	<img v-if="!this.$store.state.project_bg_main" v-show="showAnim" v-on:load="this.loadImg" class="sec-projects__content-bg" :src="this.projects_info.bg">
</transition>
<transition name="fade">
	<img v-if="this.$store.state.project_bg_main" v-show="mounted" :src="this.$store.state.project_bg_main" alt="" class="sec-projects-cat__bg">
</transition>

<div class="sec-projects__line sec-projects__line_1"></div>
<div class="sec-projects__line sec-projects__line_2"></div>
<div class="sec-projects__line sec-projects__line_3"></div>
<div class="sec-projects__line sec-projects__line_4"></div>
<div class="sec-projects__line sec-projects__line_5"></div>
<div class="sec-projects__line sec-projects__line_6"></div>
<div class="sec-projects__line sec-projects__line_7"></div>
<div class="sec-projects__line sec-projects__line_8"></div>

<transition name="fade" v-if="showAnimMain">
	<img class="sec-projects__bg" v-on:load="this.loadImg" style="animation-duration: 0.5s" :src="this.projects_cats[0]['acf_bg']" v-show="parseInt(this.bg) === 0">
</transition>
<transition name="fade" v-if="showAnimMain">
	<img class="sec-projects__bg" v-on:load="this.loadImg" style="animation-duration: 0.5s" :src="this.projects_cats[1]['acf_bg']" v-show="parseInt(this.bg) === 1">
</transition>
<transition name="fade" v-if="showAnimMain">
	<img class="sec-projects__bg" v-on:load="this.loadImg" style="animation-duration: 0.5s" :src="this.projects_cats[2]['acf_bg']" v-show="parseInt(this.bg) === 2">
</transition>

<Header></Header>

<transition name="fade">
	<div class="sec-page__wrap sec-projects__wrap" v-if="showAnimMain">
		<div class="sec-page__content sec-projects__content">
			<div class="sec-projects__text">
				<transition name="fadeLeft">
					<h2 v-show="showAnim" class="title title_sec sec-projects__title">{{ this.projects_info.title }}</h2>
				</transition>
				<transition name="fadeLeft">
					<p v-show="showAnim" style="animation-delay: 0.5s" class="text-info sec-projects__text-text">{{ this.projects_info.text }}</p>
				</transition>
			</div>
			<transition name="fadeRight">
				<router-link :to="this.$route.meta.linkHome+'projects/'+this.projects_cats[0]['slug']" v-show="showAnim" style="animation-delay: 1s" class="sec-projects__el sec-projects__el_1" @mouseenter="showBg" @mouseleave="hideBg" data-bg="0">
					<div class="project-el">
						<img :src="this.projects_cats[0]['acf_icon']" :alt="this.projects_cats[0]['name']" class="project-el__icon">
						<p class="project-el__text">{{this.projects_cats[0]['name']}}</p>
					</div>
				</router-link>
			</transition>
			<transition name="fadeRight">
				<router-link :to="this.$route.meta.linkHome+'projects/'+this.projects_cats[1]['slug']" v-show="showAnim" style="animation-delay: 1.3s" class="sec-projects__el sec-projects__el_2" @mouseenter="showBg" @mouseleave="hideBg" data-bg="1">
					<div class="project-el">
						<img :src="this.projects_cats[1]['acf_icon']" :alt="this.projects_cats[1]['name']" class="project-el__icon">
						<p class="project-el__text">{{this.projects_cats[1]['name']}}</p>
					</div>
				</router-link>
			</transition>
			<transition name="fadeRight">
				<router-link :to="this.$route.meta.linkHome+'projects/'+this.projects_cats[2]['slug']" v-show="showAnim" style="animation-delay: 1.6s" class="sec-projects__el sec-projects__el_3" @mouseenter="showBg" @mouseleave="hideBg" data-bg="2">
					<div class="project-el">
						<img :src="this.projects_cats[2]['acf_icon']" :alt="this.projects_cats[2]['name']" class="project-el__icon">
						<p class="project-el__text">{{this.projects_cats[2]['name']}}</p>
					</div>
				</router-link>
			</transition>
			<transition name="fadeUp">
				<div v-show="showAnim" style="animation-delay: 1.9s" class="sec-page__bottom">
					<router-link :to="this.$route.meta.linkHome" class="iconLink sec-page__bottom-prev">
						<svg class="iconLink__icon iconLink__margin" width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="1" width="6" height="1" transform="rotate(90 4 1)" fill="white"/><rect x="9" y="8" width="6" height="1" transform="rotate(-180 9 8)" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.24324L6.18333 4L3.5 1.51351L0.816666 4L9.02423e-09 3.24324L3.5 -4.17371e-08L7 3.24324Z" fill="white"/></svg>
						<span class="iconLink__text">{{ this.projects_info.goHome }}</span>
					</router-link>
					<div class="block-links">
						<a href="#" class="block-links__el iconLink">
							<svg class="iconLink__icon iconLink__margin" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.78184 0.5L5.72729 1.43333L2.6208 4.5L5.72729 7.56667L4.78184 8.5L0.729893 4.5L4.78184 0.5Z" fill="white"/></svg>
							<span class="iconLink__text">Про компанію</span>
						</a>
						<router-link :to="this.$route.meta.linkHome+'partners'" class="block-links__el iconLink">
							<span class="iconLink__text iconLink__margin">{{ this.projects_info.goPartners }}</span>
							<svg class="iconLink__icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.67275 0.5L0.727295 1.43333L3.83379 4.5L0.727295 7.56667L1.67275 8.5L5.7247 4.5L1.67275 0.5Z" fill="white"/></svg>
						</router-link>
					</div>
				</div>
			</transition>
		</div>
	</div>
</transition>
</div>
</div>
</template>

<script>
import Header from '../components/header.vue'
import axios from 'axios'

export default {
	name: 'Projects',
	data() {
		return {
			bg: false,
			showAnim: false,
			showAnimMain: false,
			loadedBg: false,
			projects_cats: Object,
			projects_info: Object,
			activeHover: false,
			mounted: false,
			images: {
				count: 3,
				loaded: 0,
			},
		}
	},
	components: {
		Header
	},
	beforeMount() {
		this.getProjects();
	},
	mounted() {
		this.$nextTick(function () {
			this.mounted = true;
			if ( this.$store.state.project_bg_main ) {
				this.loadImg();
			}
		});
	},
	beforeRouteLeave(to, from, next) {
		this.showAnim = false;
		this.activeHover = false;
		function n() {
			next();
		}
		setTimeout(n, 2000);
	},
	watch:{
		'$route.params.search': {
			deep: true,
		},
		$route() {
			this.images.loaded = 0;
			if ( this.$store.state.project_bg_main ) {
				this.loadImg();
			}
			this.getProjects();
		}
	},
	methods:{
		loadImg(e){
			this.images.loaded = this.images.loaded + 1;
			if ( this.images.loaded >= this.images.count ) {
				this.loadedBg = true;
				this.showPage();
			}
		},
		showBg(e){
			if ( this.activeHover ) {
				this.bg = e.target.getAttribute('data-bg');
				this.$store.commit('changeProjectBg', this.projects_cats[this.bg]['acf_bg']);
			}
		},
		hideBg(e){
			if ( this.activeHover ) {
				this.bg = false;
			}
		},
		getProjects(){
			axios.get('http://privilege.qazxswedc.site/wp-json/vue/v1/project_cat', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.projects_cats = response.data.cats;
				this.projects_info = response.data.pageInfo;
				this.showAnimMain = true;
				this.$store.commit('changeProjectBgMain', this.projects_info.bg);
			});
		},
		showPage(){
			// this.showAnim = true;
			setTimeout(() => this.showAnim = true, 100);
			setTimeout(() => this.activeHover = true, 1000);
		},
	},
}
</script>