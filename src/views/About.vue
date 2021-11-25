<template>
<div class="wrapper">

<div class="sec-page sec-about" v-bind:class="{noscroll: readMoreMob}">
	<div class="sec-about__line sec-about__line_1"></div>
	<div class="sec-about__line sec-about__line_2"></div>
	<div class="sec-about__line sec-about__line_3"></div>
	<div class="sec-about__line sec-about__line_4"></div>
	<div class="sec-about__line sec-about__line_5"></div>
	<div class="sec-about__line sec-about__line_6"></div>
	<div class="sec-about__line sec-about__line_7"></div>
	<div class="sec-about__line sec-about__line_8"></div>
	<div class="sec-about__line sec-about__line_9"></div>
	<transition name="fade" v-show="showAnim">
		<img :src="pageInfo.bg" v-on:load="this.loadImg" alt="about" class="sec-about__bg">
	</transition>
	<div class="sec-page__wrap sec-about__wrap" v-if="showAnimMain">
		<Header></Header>
		<div class="sec-about__content" v-bind:class="{readMore: readMoreMob}">
			<svg class="sec-about__content-close" v-if="readMoreMob" @click="readMoreMob = !readMoreMob" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#222222"/></svg>
			<transition name="fadeLeft" v-show="showAnim">
				<h1 class="title title_sec sec-about__title">{{ pageInfo.title }}</h1>
			</transition>
			<transition name="fadeLeft" v-show="showAnim" style="animation-delay: 0.3s">
				<div class="sec-about__content-text text-info" v-html="pageInfo.content"></div>
			</transition>
			<transition name="fadeLeft" v-show="showAnim" style="animation-delay: 0.3s">
				<div class="sec-about__content-btn" @click="readMoreMob = !readMoreMob">{{ pageInfo.readMore }}</div>
			</transition>
		</div>
		<div class="sec-about__pages">
			<template v-for="(page, index) in pages" v-bind:key="index">
				<transition :style="'animation-delay:'+ ( 0.6 + index * 0.1 + 0.1 ) +'s'" name="fadeRight" v-show="showAnim">
					<router-link :to="{name: 'About_page-'+this.$route.meta.language, params: {page: page.post_name}}" :class="'sec-about__page '+'sec-about__page_'+(index+1)"><div class="about-el"><img :src="page.acf_icon" :alt="page.post_title" class="about-el__icon"><p class="about-el__text">{{ page.post_title }}</p></div></router-link>
				</transition>
			</template>
		</div>
		<transition name="fadeUp">
			<div v-show="showAnim" style="animation-delay: 1s" class="sec-page__bottom sec-about__bottom">
				<router-link :to="{name: 'home-'+this.$route.meta.language}" class="iconLink sec-page__bottom-prev">
					<svg class="iconLink__icon iconLink__margin" width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="1" width="6" height="1" transform="rotate(90 4 1)" fill="white"/><rect x="9" y="8" width="6" height="1" transform="rotate(-180 9 8)" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.24324L6.18333 4L3.5 1.51351L0.816666 4L9.02423e-09 3.24324L3.5 -4.17371e-08L7 3.24324Z" fill="white"/></svg>
					<span class="iconLink__text">{{ pageInfo.goHome }}</span>
				</router-link>
				<div class="block-links">
					<router-link :to="{name: 'partners-'+this.$route.meta.language}" class="block-links__el iconLink">
						<svg class="iconLink__icon iconLink__margin" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.78184 0.5L5.72729 1.43333L2.6208 4.5L5.72729 7.56667L4.78184 8.5L0.729893 4.5L4.78184 0.5Z" fill="white"/></svg>
						<span class="iconLink__text">{{ pageInfo.goPartners }}</span>
					</router-link>
					<router-link :to="{name: 'projects-'+this.$route.meta.language}" class="block-links__el iconLink">
						<span class="iconLink__text iconLink__margin">{{ pageInfo.goProject }}</span>
						<svg class="iconLink__icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.67275 0.5L0.727295 1.43333L3.83379 4.5L0.727295 7.56667L1.67275 8.5L5.7247 4.5L1.67275 0.5Z" fill="white"/></svg>
					</router-link>
				</div>
			</div>
		</transition>
	</div>
</div>

</div>
</template>

<script>
import Header from '../components/header.vue'
import axios from 'axios'

export default {
	name: 'About',
	data() {
		return {
			pageInfo: Object,
			pages: Object,
			showAnimMain: false,
			showAnim: false,
			readMoreMob: false,
			images: {
				count: 1,
				loaded: 0,
			},
		}
	},
	components: {
		Header
	},
	watch: {
		readMoreMob(e) {
			if ( e ) {
				document.getElementsByClassName('sec-about')[0].scrollTo(0, 0);
			}
		}
	},
	beforeRouteLeave(to, from, next) {
		this.showAnim = false;
		setTimeout(next, 1000);
	},
	created() {
		this.getInfo();
	},
	mounted() {
	},
	methods: {
		loadImg(){
			this.images.loaded = this.images.loaded+1;
			if ( this.images.loaded >= this.images.count ) {
				this.showPage();
			}
		},
		showPage(){
			setTimeout(() => this.showAnim = true, 100);
		},
		getInfo() {
			axios.get('https://privilege.qazxswedc.site/wp-json/vue/v1/about', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.pages = response.data.pages;
				this.showAnimMain = true;
			});
		},
	},
}
</script>