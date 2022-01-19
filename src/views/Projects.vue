<template>

<div class="wrapper">


<div class="sec-projects sec-page" v-bind:class="{showLines: showLines}">

<transition name="fade" v-if="this.projects_info.bg">
	<img :src="this.projects_info.bg" v-on:load="this.loadImg" class="sec-projects__content-bg" style="visibility: hidden;">
</transition>
<div class="sec-page__bg sec-projects__content-bg block-anim-bg">
	<div class="block-anim-bg__el" v-for="ind in 16" v-bind:key="ind">
		<transition name="squareEffect" v-show="showAnim" :style="'animation-delay:'+ ( ind * 0.05  ) +'s'">
			<div class="block-anim-bg__dec"></div>
		</transition>
		<transition name="bgLeftAnim" v-show="showAnim" :style="'animation-delay:'+ ( ind * 0.06  ) +'s'">
			<div :style="'background-image: url('+this.projects_info.bg+');'" class="block-anim-bg__el-bg"></div>
		</transition>
	</div>
</div>

<div class="sec-projects__line sec-projects__line_1"></div>
<div class="sec-projects__line sec-projects__line_2"></div>
<div class="sec-projects__line sec-projects__line_3"></div>
<div class="sec-projects__line sec-projects__line_4"></div>
<div class="sec-projects__line sec-projects__line_5"></div>
<div class="sec-projects__line sec-projects__line_6"></div>
<div class="sec-projects__line sec-projects__line_7"></div>
<div class="sec-projects__line sec-projects__line_8"></div>


<div class="sec-projects__bg-wrap" v-bind:class="{ anim : (parseInt(this.bg) === 0 )}">
	<img v-if="showAnimMain" class="sec-projects__bg" v-bind:class="{ anim : (parseInt(this.bg) === 0 )}" v-on:load="this.loadImg" :src="this.projects_cats[0]['acf_bg']">
</div>
<div class="sec-projects__bg-wrap" v-bind:class="{ anim : (parseInt(this.bg) === 1 )}">
	<img v-if="showAnimMain" class="sec-projects__bg" v-bind:class="{ anim : (parseInt(this.bg) === 1 )}" v-on:load="this.loadImg" :src="this.projects_cats[1]['acf_bg']">
</div>
<div class="sec-projects__bg-wrap" v-bind:class="{ anim : (parseInt(this.bg) === 2 )}">
	<img v-if="showAnimMain" class="sec-projects__bg" v-bind:class="{ anim : (parseInt(this.bg) === 2 )}" v-on:load="this.loadImg" :src="this.projects_cats[2]['acf_bg']">
</div>



<transition name="fade">
	<div class="sec-page__wrap sec-projects__wrap" v-if="showAnimMain">
		<div class="sec-page__content sec-projects__content">
			<div class="sec-projects__text">
				<transition name="fadeLeft">
					<h2 v-show="showAnim" class="title title_sec sec-projects__title">{{ this.projects_info.title }}</h2>
				</transition>
				<transition name="fadeLeft">
					<p v-show="showAnim" style="animation-delay: 0s" class="text-info sec-projects__text-text">{{ this.projects_info.text }}</p>
				</transition>
			</div>
			<transition name="fadeRight">
				<router-link :to="{name: 'investment'+'-'+this.$route.meta.language}" v-show="showAnim" style="animation-delay: 0.5s" class="sec-projects__el sec-projects__el_1" @mouseenter="showBg" @mouseleave="hideBg" data-bg="0">
					<div class="project-el">
						<img :src="this.projects_cats[0]['acf_icon']" :alt="this.projects_cats[0]['name']" class="project-el__icon">
						<p class="project-el__text">{{this.projects_cats[0]['name']}}</p>
					</div>
				</router-link>
			</transition>
			<transition name="fadeRight">
				<router-link :to="{name: 'in-progress'+'-'+this.$route.meta.language}" v-show="showAnim" style="animation-delay: 0.6s" class="sec-projects__el sec-projects__el_2" @mouseenter="showBg" @mouseleave="hideBg" data-bg="1">
					<div class="project-el">
						<img :src="this.projects_cats[1]['acf_icon']" :alt="this.projects_cats[1]['name']" class="project-el__icon">
						<p class="project-el__text">{{this.projects_cats[1]['name']}}</p>
					</div>
				</router-link>
			</transition>
			<transition name="fadeRight">
				<router-link :to="{name: 'implemented'+'-'+this.$route.meta.language}" v-show="showAnim" style="animation-delay: 0.7s" class="sec-projects__el sec-projects__el_3" @mouseenter="showBg" @mouseleave="hideBg" data-bg="2">
					<div class="project-el">
						<img :src="this.projects_cats[2]['acf_icon']" :alt="this.projects_cats[2]['name']" class="project-el__icon">
						<p class="project-el__text">{{this.projects_cats[2]['name']}}</p>
					</div>
				</router-link>
			</transition>
			<transition name="fadeUp">
				<div v-show="showAnim" style="animation-delay: 1s" class="sec-page__bottom">
					<router-link :to="{name: 'home-'+this.$route.meta.language}" class="iconLink sec-page__bottom-prev">
						<svg class="iconLink__icon iconLink__margin" width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="1" width="6" height="1" transform="rotate(90 4 1)" fill="white"/><rect x="9" y="8" width="6" height="1" transform="rotate(-180 9 8)" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.24324L6.18333 4L3.5 1.51351L0.816666 4L9.02423e-09 3.24324L3.5 -4.17371e-08L7 3.24324Z" fill="white"/></svg>
						<span class="iconLink__text">{{ this.projects_info.goHome }}</span>
					</router-link>
					<div class="block-links">
						<router-link :to="{name: 'about-'+this.$route.meta.language}" class="block-links__el iconLink">
							<svg class="iconLink__icon iconLink__margin" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.78184 0.5L5.72729 1.43333L2.6208 4.5L5.72729 7.56667L4.78184 8.5L0.729893 4.5L4.78184 0.5Z" fill="white"/></svg>
							<span class="iconLink__text">{{ this.projects_info.goAbout }}</span>
						</router-link>
						<router-link :to="{name: 'partners-'+this.$route.meta.language}" class="block-links__el iconLink">
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
			showLines: false,
			showBgMain: false,
			images: {
				count: 3,
				loaded: 0,
			},
		}
	},
	components: {
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
		setTimeout(next, 2000);
		this.showAnim = false;
		this.activeHover = false;
		this.showLines = false;
		if ( this.projects_info.bg ) {
			this.$store.commit('setBgPage', {src: '123', class: 'aboutPageText'});
		}
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
			axios.get('https://privilege.qazxswedc.site/wp-json/vue/v1/project_cat', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.projects_cats = response.data.cats;
				this.projects_info = response.data.pageInfo;
				this.showAnimMain = true;
				this.showLines = true;
				this.$store.commit('changeProjectBgMain', this.projects_info.bg);
			});
		},
		showPage(){
			// this.showAnim = true;
			setTimeout(() => this.showAnim = true, 100);
			setTimeout(() => this.showBgMain = true, 100);
			setTimeout(() => this.activeHover = true, 1000);
		},
	},
}
</script>