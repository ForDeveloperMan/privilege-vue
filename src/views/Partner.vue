<template>
<div class="wrapper">

<div class="sec-page sec-partner" v-bind:class="{showLines: showLines}">
	<div class="sec-about-page-bg block-anim-bg">
		<div class="block-anim-bg__el" v-for="ind in 16" v-bind:key="ind">
			<transition name="squareEffect" v-show="showAnim" :style="'animation-delay:'+ ( ind * 0.05  ) +'s'">
				<div class="block-anim-bg__dec"></div>
			</transition>
			<transition name="bgLeftAnim" v-show="showAnim" :style="'animation-delay:'+ ( ind * 0.06  ) +'s'">
				<div class="block-anim-bg__el-bg"></div>
			</transition>
		</div>
	</div>
	<div class="sec-partner__line sec-partner__line_1"></div>
	<div class="sec-partner__line sec-partner__line_2"></div>
	<div class="sec-partner__line sec-partner__line_3"></div>
	<div class="sec-partner__line sec-partner__line_4"></div>
	<div class="sec-partner__line sec-partner__line_5"></div>
	<div class="sec-partner__line sec-partner__line_6"></div>
	<div class="sec-partner__line sec-partner__line_7"></div>
	<template v-for="(item, index) in partner.gallery" v-bind:key="index">
		<div :class="['sec-partner__img sec-partner__img_'+(index+1), {anim: showAnimImg}]">
			<img @load="loadImg" :src="item" alt="" class="sec-partner__img-img">
		</div>
	</template>
	<div class="sec-partner__wrap" v-if="showAnimMain">
		<div class="sec-partner__content">
			<transition name="fadeLeft" v-show="showAnim">
				<div class="sec-partner__content-body">
					<router-link :to="this.$route.meta.linkHome + 'partners'" class="sec-partner__link text-link">{{ pageInfo.textBtn }}</router-link>
					<h1 class="title title_sec sec-partner__title">{{ partner[0].post_title }}</h1>
				</div>
			</transition>
		</div>
		<transition name="fade" v-show="showAnim">
			<div style="animation-delay: 1s" class="sec-partner__text text-info" v-html="partner.description"></div>
		</transition>
		<img :src="partner.gallery[0]" v-if="partner.gallery[0]" alt="" class="sec-partner__img-mob sec-partner__img-mob_1">
		<transition name="fadeRight" v-show="showAnim">
			<div style="animation-delay: 1.2s" class="sec-partner__info">
				<div class="sec-partner__info-title" v-if="partner.opisanie_sprava.zagolovok">{{ partner.opisanie_sprava.zagolovok }}</div>
				<p class="sec-partner__info-text">{{ partner.opisanie_sprava.tekst }}</p>
			</div>
		</transition>
		<img :src="partner.gallery[1]" v-if="partner.gallery[1]" alt="" class="sec-partner__img-mob sec-partner__img-mob_1">
		<transition name="fadeUp">
			<div v-show="showAnim" style="animation-delay: 1.3s" class="sec-page__bottom">
				<router-link :to="{name: 'partners-'+this.$route.meta.language}" class="iconLink sec-page__bottom-prev">
					<svg class="iconLink__icon iconLink__margin" width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="1" width="6" height="1" transform="rotate(90 4 1)" fill="white"/><rect x="9" y="8" width="6" height="1" transform="rotate(-180 9 8)" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.24324L6.18333 4L3.5 1.51351L0.816666 4L9.02423e-09 3.24324L3.5 -4.17371e-08L7 3.24324Z" fill="white"/></svg>
					<span class="iconLink__text">{{ pageInfo.goPrev }}</span>
				</router-link>
				<div class="block-links">
					<router-link :to="{ name: 'partners_partner'+'-'+this.$route.meta.language, params: { partner: pageInfo.postNext.post_name, } }" v-if="pageInfo.postNext" class="block-links__el iconLink">
						<svg class="iconLink__icon iconLink__margin" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.78184 0.5L5.72729 1.43333L2.6208 4.5L5.72729 7.56667L4.78184 8.5L0.729893 4.5L4.78184 0.5Z" fill="white"/></svg>
						<span class="iconLink__text">{{ pageInfo.postNext.post_title }}</span>
					</router-link>
					<router-link :to="{ name: 'partners_partner'+'-'+this.$route.meta.language, params: { partner: pageInfo.postPrev.post_name, } }"  v-if="pageInfo.postPrev" class="block-links__el iconLink">
						<span class="iconLink__text iconLink__margin">{{ pageInfo.postPrev.post_title }}</span>
						<svg class="iconLink__icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.67299 0.5L0.727539 1.43333L3.83403 4.5L0.727539 7.56667L1.67299 8.5L5.72494 4.5L1.67299 0.5Z" fill="white"/></svg>
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
	name: 'Partner',
	data() {
		return {
			showAnim: false,
			showAnimMain: false,
			mounted: false,
			pageInfo: Object,
			partner: Object,
			languagesPartner: Object,
			showAnimImg: false,
			showLines: false,
			images: {
				count: Number,
				loaded: 0,
			},
		}
	},
	components: {
	},
	beforeMount() {
		this.getInfo();
	},
	mounted() {
		this.mounted = true;
	},
	beforeRouteLeave(to, from, next) {
		setTimeout(next, 1500);
		this.showAnim = false;
		this.showLines = false;
		this.showAnimImg = false;
		this.$store.commit('setBgPage', {src: '123', class: 'aboutPage'});
	},
	beforeRouteUpdate(to, from, next) {
		setTimeout(next, 1000);
		this.showAnim = false;
		this.showLines = false;
		this.showAnimImg = false;
		this.$store.commit('setBgPage', {src: '123', class: 'aboutPage'});
	},
	methods:{
		loadImg(){
			this.images.loaded = this.images.loaded+1;
			if ( this.images.loaded >= this.images.count ) {
				this.showPage();
			}
		},
		getInfo(){
			axios.get('https://privilege.qazxswedc.site/wp-json/vue/v1/partner', {
				params:{
					lang: this.$route.meta.language,
					partner: this.$route.params.partner,
				}
			}).then(response => {
				this.pageInfo = response.data.pageInfo;
				this.partner = response.data.partner;
				if ( this.partner.description === null ) {
					window.location.href = this.$route.meta.linkHome+'404';
				}
				if ( response.data.partner.gallery.length ) {
					this.images.count = response.data.partner.gallery.length;
				}else{
					this.images.count = 0;
					this.loadImg();
				}
				this.languagesPartner = response.data.partner.languages_post;
				this.$store.commit('setPartnerLanguages', this.languagesPartner);
				this.showAnimMain = true;
				this.showLines = true;
			});
		},
		showPage(){
			setTimeout(() => this.showAnim = true, 100);
			setTimeout(() => this.showAnimImg = true, 500);
		},
	},
}
</script>