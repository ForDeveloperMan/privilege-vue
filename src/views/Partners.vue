<template>
<div class="wrapper">

<Header></Header>
<div class="sec-page sec-partners">
	<div class="sec-partners__line sec-partners__line_1"></div>
	<div class="sec-partners__line sec-partners__line_2"></div>
	<div class="sec-partners__line sec-partners__line_3"></div>
	<div class="sec-partners__line sec-partners__line_4"></div>
	<div class="sec-partners__line sec-partners__line_5"></div>
	<div class="sec-partners__line sec-partners__line_6"></div>

	<transition name="fade">
		<img v-if="!this.$store.state.partnersBg" v-show="showAnim" v-on:load="this.loadImg" class="sec-partners__bg" :src="this.pageInfo.bg">
	</transition>
	<transition name="fade">
		<img v-if="this.$store.state.partnersBg" v-show="mounted" :src="this.$store.state.partnersBg" alt="" class="sec-partners__bg">
	</transition>

	<div class="sec-page__wrap sec-partners__wrap" v-if="showAnimMain">
		<div class="sec-partners__content">
			<transition name="fadeLeft" v-show="showAnim">
				<div class="sec-partners__content-body">
					<h1 class="title title_sec sec-partners__title">{{ this.pageInfo.title }}</h1>
					<p class="text-info">{{ this.pageInfo.text }}</p>
				</div>
			</transition>
		</div>
		<div class="sec-partners__items">
			<template v-for="(item, index) in this.partners" v-bind:key="index">
				<transition :style="'animation-delay:'+ ( 0.6 + index * 0.1 + 0.1 ) +'s'" name="fadeRight">
					<router-link :to="this.$route.meta.linkHome+this.$route.meta.slug + '/' + item.post_name" v-show="showAnim" class="sec-partners__item"><img :src="item.logo" alt="" class="sec-partners__item-img"></router-link>
				</transition>
			</template>
		</div>
		<transition name="fadeUp">
			<div v-show="showAnim" style="animation-delay: 1s" class="sec-page__bottom">
				<router-link :to="this.$route.meta.linkHome" class="iconLink sec-page__bottom-prev">
					<svg class="iconLink__icon iconLink__margin" width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="1" width="6" height="1" transform="rotate(90 4 1)" fill="white"/><rect x="9" y="8" width="6" height="1" transform="rotate(-180 9 8)" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.24324L6.18333 4L3.5 1.51351L0.816666 4L9.02423e-09 3.24324L3.5 -4.17371e-08L7 3.24324Z" fill="white"/></svg>
					<span class="iconLink__text">{{ this.pageInfo.goHome }}</span>
				</router-link>
				<div class="block-links">
					<router-link :to="this.$route.meta.linkHome+'projects'" class="block-links__el iconLink">
						<svg class="iconLink__icon iconLink__margin" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.78184 0.5L5.72729 1.43333L2.6208 4.5L5.72729 7.56667L4.78184 8.5L0.729893 4.5L4.78184 0.5Z" fill="white"/></svg>
						<span class="iconLink__text">{{ this.pageInfo.goProject }}</span>
					</router-link>
					<a href="#" class="block-links__el iconLink">
						<span class="iconLink__text iconLink__margin">Про компанію</span>
						<svg class="iconLink__icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.67275 0.5L0.727295 1.43333L3.83379 4.5L0.727295 7.56667L1.67275 8.5L5.7247 4.5L1.67275 0.5Z" fill="white"/></svg>
					</a>
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
	name: 'Partners',
	data() {
		return {
			showAnim: false,
			showAnimMain: false,
			pageInfo: Object,
			partners: Object,
			mounted: false,
			images: {
				count: 1,
				loaded: 0,
			},
		}
	},
	components: {
		Header
	},
	mounted() {
		this.mounted = true;
		this.getInfo();
	},
	beforeRouteLeave(to, from, next) {
		this.showAnim = false;
		this.$store.commit('setPartnersBg', this.pageInfo.bg);
		setTimeout(next, 1500);
	},
	watch:{
		'$route.params.search': {
			deep: true,
		},
		$route() {
		}
	},
	methods:{
		loadImg(){
			this.images.loaded = this.images.loaded+1;
			if ( this.images.loaded >= this.images.count ) {
				this.showPage();
			}
		},
		getInfo(){
			axios.get('http://privilege.qazxswedc.site/wp-json/vue/v1/partners', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.partners = response.data.partners;
				this.showAnimMain = true;
				if ( this.$store.state.partnersBg ) {
					this.loadImg();
				}
			});
		},
		showPage(){
			// this.showAnim = true;
			setTimeout(() => this.showAnim = true, 100);
		},
	},
}
</script>