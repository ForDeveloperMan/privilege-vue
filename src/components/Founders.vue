<template>
<div class="wrapper">
<div class="sec-page sec-founders">
	<div class="sec-founders__line sec-founders__line_1"></div>
	<div class="sec-founders__line sec-founders__line_2"></div>
	<div class="sec-founders__line sec-founders__line_3"></div>
	<div class="sec-founders__line sec-founders__line_4"></div>
	<div class="sec-founders__line sec-founders__line_5"></div>
	<div class="sec-founders__line sec-founders__line_6"></div>
	<div class="sec-page__wrap sec-founders__wrap" v-if="showMain">
		<Header></Header>
		<div class="sec-founders__content">
			<transition name="fadeLeft" v-show="showAnim">
				<h1 class="title title_sec sec-founders__title">{{ page['post_title'] }}</h1>
			</transition>
			<transition name="fadeLeft" v-show="showAnim" style="animation-delay: 0.3s">
				<p class="text-info">{{ pageInfo['text'] }}</p>
			</transition>
		</div>
		<div class="sec-founders__elements">
			<template v-for="(item, index) in pageInfo.pages" v-bind:key="index">
				<transition :style="'animation-delay:'+ ( 0.6 + index * 0.1 + 0.1 ) +'s'" name="fadeRight" v-show="showAnim">
					<router-link :to="{name: 'About_page_founder-'+this.$route.meta.language, params: {page: this.$route.params.page, founder: item.slug}}" :class="'sec-founders__elements-el '+'sec-founders__elements-el_'+(index+1)">
						<div class="sec-founders__elements-title">{{ item.name }}</div>
						<p class="sec-founders__elements-text text-info">{{ item.text }}</p>
					</router-link>
				</transition>
			</template>
		</div>
		<transition name="fadeUp">
			<div v-show="showAnim" style="animation-delay: 1s" class="sec-page__bottom">
				<router-link :to="{name: 'about-'+this.$route.meta.language}" class="iconLink sec-page__bottom-prev">
					<svg class="iconLink__icon iconLink__margin" width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="1" width="6" height="1" transform="rotate(90 4 1)" fill="white"/><rect x="9" y="8" width="6" height="1" transform="rotate(-180 9 8)" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.24324L6.18333 4L3.5 1.51351L0.816666 4L9.02423e-09 3.24324L3.5 -4.17371e-08L7 3.24324Z" fill="white"/></svg>
					<span class="iconLink__text">{{ pageInfo.goAbout }}</span>
				</router-link>
				<div class="block-links">
					<router-link :to="{name: 'About_page-'+this.$route.meta.language, params: {page: pageInfo.pagePrev.post_name}}" class="block-links__el iconLink" v-if="pageInfo.pagePrev">
						<svg class="iconLink__icon iconLink__margin" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.78184 0.5L5.72729 1.43333L2.6208 4.5L5.72729 7.56667L4.78184 8.5L0.729893 4.5L4.78184 0.5Z" fill="white"/></svg>
						<span class="iconLink__text">{{ pageInfo.pagePrev.post_title }}</span>
					</router-link>
					<router-link :to="{name: 'About_page-'+this.$route.meta.language, params: {page: pageInfo.pageNext.post_name}}" class="block-links__el iconLink" v-if="pageInfo.pageNext">
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
import Header from '../components/header.vue'

export default {
	name: 'Founders',
	data() {
		return {
			page: Object,
			pageInfo: Object,
		}
	},
	components: {
		Header
	},
	props: {
		data: Object,
		showMain: Boolean,
		showAnim: Boolean,
	},
	mounted() {
		this.page = this.data.page;
		this.pageInfo = this.data.pageInfo;
	},
	methods: {},
}

</script>