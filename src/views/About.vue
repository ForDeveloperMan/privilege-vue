<template>
<div class="wrapper">

<div class="sec-page sec-about" v-bind:class="[{noscroll: readMoreMob}, {showLines: showLines}, {toTextPage: toTextPage}]">
	<div class="sec-about__line sec-about__line_1"></div>
	<div class="sec-about__line sec-about__line_2"></div>
	<div class="sec-about__line sec-about__line_3"></div>
	<div class="sec-about__line sec-about__line_4"></div>
	<div class="sec-about__line sec-about__line_5"></div>
	<div class="sec-about__line sec-about__line_6"></div>
	<div class="sec-about__line sec-about__line_7"></div>
	<div class="sec-about__line sec-about__line_8"></div>
	<div class="sec-about__line sec-about__line_9"></div>
	<transition name="fade" v-if="this.pageInfo.bg">
		<img :src="pageInfo.bg" v-on:load="this.loadImg" alt="about" class="sec-about__bg" style="visibility: hidden;">
	</transition>
	<!-- <div class="sec-about__bg block-anim-bg" v-bind:class="{anim: showAnim}"> -->
	<div class="sec-about__bg block-anim-bg">
		<div class="block-anim-bg__el" v-for="ind in 16" v-bind:key="ind">
			<transition name="squareEffect" v-show="showAnim" :style="'animation-delay:'+ ( ind * 0.05  ) +'s'">
				<div class="block-anim-bg__dec"></div>
			</transition>
			<transition name="bgLeftAnim" v-show="showAnim" :style="'animation-delay:'+ ( ind * 0.06  ) +'s'">
				<div :style="'background-image: url('+pageInfo.bg+');'" class="block-anim-bg__el-bg"></div>
			</transition>
		</div>
	</div>
	<div class="sec-page__wrap sec-about__wrap" v-if="showAnimMain">
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
				<router-link :to="{name: 'About_page-'+this.$route.meta.language, params: {page: page.post_name}}" v-bind:class="[{not: goFrom}, 'sec-about__page '+'sec-about__page_'+(index+1)]">
					<transition style="animation-duration: 1s" :style="'animation-delay:'+ ( 0.6 + index * 0.1 + 0.1 ) +'s'" name="animAbout" v-show="showAnim">
						<div class="about-el"><img :src="page.acf_icon" :alt="page.post_title" class="about-el__icon"><p class="about-el__text">{{ page.post_title }}</p></div>
					</transition>
				</router-link>
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
import axios from 'axios'

export default {
	name: 'About',
	data() {
		return {
			pageInfo: Object,
			pages: Object,
			showAnimMain: false,
			showAnim: false,
			showBg: false,
			readMoreMob: false,
			showLines: false,
			toTextPage: false,
			showFrom: false,
			sizeWindow: 0,
			goFrom: false,
			images: {
				count: 1,
				loaded: 0,
			},
		}
	},
	components: {
	},
	watch: {
		readMoreMob(e) {
			document.getElementsByClassName('about-page')[0].classList.remove('readMore');
			if ( e ) {
				document.getElementsByClassName('sec-about')[0].scrollTo(0, 0);
				document.getElementsByClassName('about-page')[0].classList.add('readMore');
			}
		}
	},
	beforeRouteLeave(to, from, next) {
		this.goFrom = true;
		if ( this.pageInfo.bg ) {
			this.$store.commit('setBgPage', {src: this.pageInfo.bg, class: 'aboutPageText'});
		}
		if ( ( to.params.page === "missiya-ta-principi" || to.params.page === "missiya-i-principy" || to.params.page === "mission-and-principles" || to.params.page === "missioon-ja-pohimotted" ) && window.screen.width >= 1201 ) {
			this.showAnim = false;
			this.toTextPage = true;
			this.showFrom = true;
			this.$store.commit('setToAboutTextPage', true);
			this.$store.commit('setBgPage', {src: this.pageInfo.bg, class: 'aboutPageText'});

			function set() {
				let lines = document.getElementsByClassName('sec-about__line');
				let wrapBg = document.querySelector('.bg-page');
				// wrapBg.appendChild( document.querySelector('.sec-about__pages') );
				for(var i=0; i<lines.length; i++){
					wrapBg.appendChild(lines[i]);
				}
			}
			setTimeout(set, 2000);
			setTimeout(next, 2000);
		}else{
			this.showAnim = false;
			this.showLines = false;
			setTimeout(next, 2000);
		}
	},
	created() {
		this.getInfo();
		this.sizeWindow = window.clientWidth +' ' +window.clientHtight;
	},
	mounted() {
		this.$nextTick(() => {
			document.getElementsByTagName('body')[0].classList.add('about-page');
		});
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
			setTimeout(() => this.showBg = true, 100);
		},
		getInfo() {
			axios.get('https://privilege.qazxswedc.site/wp-json/vue/v1/about', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.pages = response.data.pages;
				this.showLines = true;
				this.showAnimMain = true;
			});
		},
	},
}
</script>