<template>
<div class="wrapper">

<div class="sec-page sec-partners" v-bind:class="{showLines: showLines}">
	<div class="sec-partners__line sec-partners__line_1"></div>
	<div class="sec-partners__line sec-partners__line_2"></div>
	<div class="sec-partners__line sec-partners__line_3"></div>
	<div class="sec-partners__line sec-partners__line_4"></div>
	<div class="sec-partners__line sec-partners__line_5"></div>
	<div class="sec-partners__line sec-partners__line_6"></div>
	<transition name="fade" v-if="this.pageInfo.bg">
		<img v-if="this.pageInfo.bg" :src="this.pageInfo.bg" v-on:load="this.loadImg" class="sec-partners__bg" style="visibility: hidden;">
	</transition>
	<div class="sec-page__bg sec-partners__bg block-anim-bg">
		<div class="block-anim-bg__el" v-for="ind in 16" v-bind:key="ind">
			<transition name="squareEffect" v-show="showAnim" :style="'animation-delay:'+ ( ind * 0.05  ) +'s'">
				<div class="block-anim-bg__dec"></div>
			</transition>
			<transition name="bgLeftAnim" v-show="showAnim" :style="'animation-delay:'+ ( ind * 0.06  ) +'s'">
				<div :style="'background-image: url('+this.pageInfo.bg+');'" class="block-anim-bg__el-bg"></div>
			</transition>
		</div>
	</div>

	<div class="sec-page__wrap sec-partners__wrap" v-if="showAnimMain">
		<div class="sec-partners__content">
			<div class="sec-partners__content-body">
				<transition name="fadeLeft" v-show="showAnim">
					<h1 class="title title_sec sec-partners__title">{{ this.pageInfo.title }}</h1>
				</transition>
				<transition name="fadeLeft" v-show="showAnim">
					<p style="animation-delay: 0.3s" class="text-info">{{ this.pageInfo.text }}</p>
				</transition>
			</div>
		</div>
		<div class="sec-partners__items">
			<template v-for="(item, index) in this.partners" v-bind:key="index">
				<transition :style="'animation-delay:'+ ( 0.6 + index * 0.1 + 0.1 ) +'s'" name="fadeRight">
					<router-link :to="{ name: 'partners_partner'+'-'+this.$route.meta.language, params: { partner: item.post_name, } }" v-show="showAnim" class="sec-partners__item"><img :src="item.logo" alt="" class="sec-partners__item-img"></router-link>
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
					<router-link :to="{name: 'projects-'+this.$route.meta.language}" class="block-links__el iconLink">
						<svg class="iconLink__icon iconLink__margin" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.78184 0.5L5.72729 1.43333L2.6208 4.5L5.72729 7.56667L4.78184 8.5L0.729893 4.5L4.78184 0.5Z" fill="white"/></svg>
						<span class="iconLink__text">{{ this.pageInfo.goProject }}</span>
					</router-link>
					<router-link :to="{name: 'about-'+this.$route.meta.language}" class="block-links__el iconLink">
						<span class="iconLink__text iconLink__margin">{{ this.pageInfo.goAbout }}</span>
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
	name: 'Partners',
	data() {
		return {
			showAnim: false,
			showAnimBg: false,
			showAnimMain: false,
			pageInfo: Object,
			partners: Object,
			mounted: false,
			showLines: false,
			images: {
				count: 1,
				loaded: 0,
			},
		}
	},
	components: {
	},
	mounted() {
		this.mounted = true;
		this.getInfo();
	},
	beforeRouteLeave(to, from, next) {
		setTimeout(next, 1500);
		this.showAnim = false;
		this.showLines = false;
		this.$store.commit('setPartnersBg', this.pageInfo.bg);
		if ( this.pageInfo.bg ) {
			this.$store.commit('setBgPage', {src: this.pageInfo.bg, class: 'aboutPageText'});
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
			axios.get('https://privilege.qazxswedc.site/wp-json/vue/v1/partners', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.partners = response.data.partners;
				this.showAnimMain = true;
				this.showLines = true;
				if ( this.$store.state.partnersBg ) {
					this.loadImg();
				}
			});
		},
		showPage(){
			// this.showAnim = true;
			setTimeout(() => this.showAnim = true, 100);
			setTimeout(() => this.showAnimBg = true, 100);
		},
	},
}
</script>