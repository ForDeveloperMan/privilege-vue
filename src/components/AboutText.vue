<template>
<div class="wrapper">
	<div class="sec-page sec-text">
		<div class="sec-text__line sec-text__line_1"></div>
		<div class="sec-text__line sec-text__line_2"></div>
		<div class="sec-text__line sec-text__line_3"></div>
		<div class="sec-text__line sec-text__line_4"></div>
		<div class="sec-text__line sec-text__line_5"></div>
		<div class="sec-text__line sec-text__line_6"></div>
		<div class="sec-text__line sec-text__line_7"></div>
		<div class="sec-page__wrap sec-text__wrap" v-if="showMain">
			<Header></Header>
			<transition name="fade" v-show="showAnim" style="animation-delay: 0.7s">
				<div class="sec-text__content"><img class="sec-text__content-icon" :src="pageInfo.icon" alt=""><svg v-if="showArr" class="sec-text__content-arr" width="9" height="22" viewBox="0 0 9 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 -1.96701e-07L-7.59198e-07 4.63158L3.375 4.63158L3.375 22L5.625 22L5.625 4.63158L9 4.63158L4.5 -1.96701e-07Z" fill="white" fill-opacity="0.3"/></svg><div class="sec-text__content-body" v-html="pageInfo.content"></div></div>
			</transition>
			<img :src="pageInfo.img" alt="" class="sec-text__img" v-bind:class="{anim: animImg}">
			<transition name="fadeUp">
				<div v-show="showAnim" style="animation-delay: 1s" class="sec-page__bottom">
					<router-link :to="this.$route.meta.linkHome + 'about'" class="iconLink sec-page__bottom-prev">
						<svg class="iconLink__icon iconLink__margin" width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="1" width="6" height="1" transform="rotate(90 4 1)" fill="white"/><rect x="9" y="8" width="6" height="1" transform="rotate(-180 9 8)" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.24324L6.18333 4L3.5 1.51351L0.816666 4L9.02423e-09 3.24324L3.5 -4.17371e-08L7 3.24324Z" fill="white"/></svg>
						<span class="iconLink__text">{{ pageInfo.goAbout }}</span>
					</router-link>
					<div class="block-links">
						<router-link :to="this.$route.meta.linkHome + 'about/' + pageInfo.pagePrev.post_name " class="block-links__el iconLink" v-if="pageInfo.pagePrev">
							<svg class="iconLink__icon iconLink__margin" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.78184 0.5L5.72729 1.43333L2.6208 4.5L5.72729 7.56667L4.78184 8.5L0.729893 4.5L4.78184 0.5Z" fill="white"/></svg>
							<span class="iconLink__text">{{ pageInfo.pagePrev.post_title }}</span>
						</router-link>
						<router-link :to="this.$route.meta.linkHome + 'about/' + pageInfo.pageNext.post_name " class="block-links__el iconLink" v-if="pageInfo.pageNext">
							<span class="iconLink__text iconLink__margin">{{ pageInfo.pageNext.post_title }}</span>
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
import Header from '@/components/header.vue'

export default {
	name: 'AboutPageText',
	components: {
		Header
	},
	data() {
		return {
			page: Object,
			pageInfo: Object,
			showArr: false,
			animImg: false,
		}
	},
	props: {
		data: Object,
		showMain: Boolean,
		showAnim: Boolean,
		routeLeave: Boolean,
	},
	mounted() {
		this.page = this.data.page;
		this.pageInfo = this.data.pageInfo;
		setTimeout(() => this.animImg = true, 200);
		this.$nextTick(function () {
			setTimeout(f, 800, this);
			function f(t) {
				let wrap = document.getElementsByClassName('sec-text__content')[0];
				let body = document.getElementsByClassName('sec-text__content-body')[0];
				if ( body.offsetHeight >= wrap.offsetHeight ) {
					t.scrollContent();
					t.showArr = true;
				}
			}
		})
	},
	methods: {
		scrollContent() {
			let wrap = document.getElementsByClassName('sec-text__content')[0];
			let body = document.getElementsByClassName('sec-text__content-body')[0];
			wrap.addEventListener('mousewheel', scroll);
			let stepScroll = 40;
			let countScroll = 0;
			function scroll(e) {
				let direction;
				if ( ( countScroll * -1 ) >= body.offsetHeight ) {
					console.log();
				}else{
					if( e.wheelDeltaY < 0 ) {
						direction = 'down';
						countScroll -= stepScroll;
					}
				}
				if ( countScroll >= 0 ){
					console.log();
				}else{
					if( e.wheelDeltaY >= 0 ){
						direction = 'up';
						countScroll += stepScroll;
					}
				}
				body.style.transform = 'translateY('+countScroll+'px)';
			}
		},
	},
}
</script>