<template>
<div class="wrapper">
	<div class="sec-page sec-founder">
		<div class="sec-founder__line sec-founder__line_1"></div>
		<div class="sec-founder__line sec-founder__line_2"></div>
		<div class="sec-founder__line sec-founder__line_3"></div>
		<div class="sec-founder__line sec-founder__line_4"></div>
		<div class="sec-founder__line sec-founder__line_5"></div>
		<div class="sec-page__wrap sec-founder__wrap" v-if="showMain">
			<Header></Header>
			<div class="sec-founder__content">
				<transition name="fadeLeft" v-show="showAnim">
					<h1 class="title title_sec sec-founder__title">{{ pageInfo['title'] }}</h1>
				</transition>
				<transition name="fadeLeft" v-show="showAnim" style="animation-delay: 0.3s">
					<p class="text-info">{{ pageInfo['subtitle'] }}</p>
				</transition>
			</div>
			<img :src="pageInfo['img']" alt="" class="sec-founder__img" v-bind:class="{anim: animImg}">
			<div class="sec-founder__info">
				<transition name="fade" v-show="showAnim" style="animation-delay: 0.6s">
					<div class="sec-founder__info-top">
						<div class="title title_sec sec-founder__info-title">{{ page.post_title }}</div>
						<p class="sec-founder__info-text text-info">{{ pageInfo.info }}</p>
					</div>
				</transition>
				<transition name="fade" v-show="showAnim" style="animation-delay: 0.9s">
					<div class="sec-founder__info-bottom">
						<p class="sec-founder__info-bottom-text text-info">{{ pageInfo.text }}</p>
					</div>
				</transition>
			</div>
			<transition name="fadeUp" v-show="showAnim" style="animation-delay: 1s">
				<div class="sec-founder__socials">
					<div class="sec-founder__socials-content">
						<div class="title-contact sec-founder__socials-title">{{ pageInfo.socials.title }}</div>
						<div class="block-socials">
							<div class="block-socials__el" v-for="(social, ind) in pageInfo.socials.content" v-bind:key="ind" ><a :href="social.ssylka" target="_blank" class="socials-el"><img :src="social.ikonka" alt="" class="socials-el__icon"></a>
							</div>
						</div>
					</div>
				</div>
			</transition>
			<transition name="fadeUp">
				<div v-show="showAnim" style="animation-delay: 1s" class="sec-page__bottom">
					<router-link :to="this.$route.meta.linkHome + 'about'" class="iconLink sec-page__bottom-prev">
						<svg class="iconLink__icon iconLink__margin" width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="1" width="6" height="1" transform="rotate(90 4 1)" fill="white"/><rect x="9" y="8" width="6" height="1" transform="rotate(-180 9 8)" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.24324L6.18333 4L3.5 1.51351L0.816666 4L9.02423e-09 3.24324L3.5 -4.17371e-08L7 3.24324Z" fill="white"/></svg>
						<span class="iconLink__text">{{ pageInfo.goPrev }}</span>
					</router-link>
					<div class="block-links">
						<router-link :to="this.$route.meta.linkHome + this.$route.meta.category  + this.$route.params.page + '/' + pageInfo.postPrev.post_name " class="block-links__el iconLink" v-if="pageInfo.postPrev">
							<svg class="iconLink__icon iconLink__margin" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.78184 0.5L5.72729 1.43333L2.6208 4.5L5.72729 7.56667L4.78184 8.5L0.729893 4.5L4.78184 0.5Z" fill="white"/></svg>
							<span class="iconLink__text">{{ pageInfo.postPrev.post_title }}</span>
						</router-link>
						<router-link :to="this.$route.meta.linkHome + this.$route.meta.category  + this.$route.params.page + '/' + pageInfo.postNext.post_name " class="block-links__el iconLink" v-if="pageInfo.postNext">
							<span class="iconLink__text iconLink__margin">{{ pageInfo.postNext.post_title }}</span>
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
import Header from '../components/header.vue'
export default {
	name: 'Founder page',
	components: {
		Header
	},
	data() {
		return {
			page: Object,
			pageInfo: Object,
			showMain: false,
			showAnim: false,
			animImg: false,
			languagesFounder: Object,
		}
	},
	beforeRouteLeave(to, from, next) {
		this.showAnim = false;
		this.animImg = false;
		this.$store.commit('setFounderLanguages', false);
		function n() {
			next();
		}
		setTimeout(n, 1000);
	},
	beforeMount() {
		this.getInfo();
	},
	methods: {
		getInfo() {
			axios.get('http://privilege.qazxswedc.site/wp-json/vue/v1/founder', {
				params:{
					lang: this.$route.meta.language,
					founder: this.$route.params.founder,
				}
			}).then(response => {
				this.page = response.data.page;
				this.pageInfo = response.data.pageInfo;
				this.showMain = true;
				this.languagesFounder = this.page.languages_post;
				this.$store.commit('setFounderLanguages', this.languagesFounder);
				setTimeout(() => this.showAnim = true, 100);
				setTimeout(() => this.animImg = true, 500);
			});
		},
	},
}
</script>