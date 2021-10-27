<template>
<div class="wrapper">

<div class="sec-page sec-project">

<div class="sec-project__line sec-project__line_1"></div>
<div class="sec-project__line sec-project__line_2"></div>
<div class="sec-project__line sec-project__line_3"></div>
<div class="sec-project__line sec-project__line_4"></div>
<div class="sec-project__line sec-project__line_5"></div>
<div class="sec-project__line sec-project__line_6"></div>

<img src="@/assets/img/project-bg/3.jpg" alt="" class="sec-project__bg">

<Header></Header>

<div class="sec-page__wrap sec-project__wrap">
<div class="sec-page__content sec-project__content" v-if="showAnimMain">

<div class="sec-project__text">
	<div class="project-info">
		<div class="project-info__top">
			<svg class="project-info__arr" width="9" height="22" viewBox="0 0 9 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 -1.96701e-07L-7.59198e-07 4.63158L3.375 4.63158L3.375 22L5.625 22L5.625 4.63158L9 4.63158L4.5 -1.96701e-07Z" fill="#3A5899"/></svg>
			<div class="project-info__info">{{ pageInfo.textType }}</div>
			<div class="project-info__title">{{ description.title }}</div>
		</div>
		<p class="project-info__text text-info">{{ description.text }}</p>
		<div @click="openGallery" class="project-info__btn gallery-btn" id="open-gallery">
			<img src="@/assets/img/gallery.png" alt="" class="gallery-btn__icon">
			<div class="gallery-btn__text">{{ pageInfo.textBtn }}</div>
		</div>
	</div>
</div>
<div class="sec-project__info">
	<div class="sec-project__info-top">
		<h2 class="title title_main sec-project__title">{{ this.project['post_title'] }}</h2>
	</div>
	<div class="sec-project__contentInfo block-project-info">
		<div class="block-project-info__el">
			<div class="block-project-info__val">
				<div class="block-project-info__val-count">{{ this.description.ploshad.znachenie }}</div>
				<div class="block-project-info__val-text">{{ description.ploshad.m2 }}</div>
			</div>
			<div class="block-project-info__title">{{ description.ploshad.zagolovok }}</div>
		</div>
		<div class="block-project-info__el">
			<div class="block-project-info__val">
				<div class="block-project-info__val-count">{{ description.kol_vo_domov.znachenie }}</div>
			</div>
			<div class="block-project-info__title">{{ description.kol_vo_domov.zagolovok }}</div>
		</div>
	</div>
</div>


<transition name="fadeUp">
<div v-show="showAnim" style="animation-delay: 1.9s" class="sec-page__bottom">
	<router-link :to="this.$route.meta.linkHome + 'projects/'" class="iconLink">
		<svg class="iconLink__icon iconLink__margin" width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="1" width="6" height="1" transform="rotate(90 4 1)" fill="white"/><rect x="9" y="8" width="6" height="1" transform="rotate(-180 9 8)" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.24324L6.18333 4L3.5 1.51351L0.816666 4L9.02423e-09 3.24324L3.5 -4.17371e-08L7 3.24324Z" fill="white"/></svg>
		<span class="iconLink__text">Проекти</span>
	</router-link>
	<div class="block-links">
		<a href="#" class="block-links__el iconLink">
			<svg class="iconLink__icon iconLink__margin" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.78184 0.5L5.72729 1.43333L2.6208 4.5L5.72729 7.56667L4.78184 8.5L0.729893 4.5L4.78184 0.5Z" fill="white"/></svg>
			<span class="iconLink__text">Проект 1</span>
		</a>
		<a href="#" class="block-links__el iconLink">
			<span class="iconLink__text iconLink__margin">Проект 2</span>
			<svg class="iconLink__icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.67275 0.5L0.727295 1.43333L3.83379 4.5L0.727295 7.56667L1.67275 8.5L5.7247 4.5L1.67275 0.5Z" fill="white"/></svg>
		</a>
	</div>
</div>
</transition>
</div>
</div>
</div>

</div>
</template>
<script>
import axios from 'axios'
import Header from '../components/header.vue'
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

export default{
	name: 'Project',
	data() {
		return {
			showAnim: true,
			showAnimMain: false,
			gallery: Array,
			project: Object,
			description: Object,
			pageInfo: Object,
		};
	},
	components: {
		Header,
	},
	mounted() {
		this.getProject();
	},
	methods: {
		openGallery() {
			Fancybox.show(this.gallery);
		},
		getProject() {
			axios.get('http://privilege.qazxswedc.site/wp-json/vue/v1/project', {
				params:{
					lang: this.$route.meta.language,
					project: this.$route.params.project,
				}
			}).then(response => {
				this.project = response.data.project[0];
				this.description = response.data.project.description;
				this.pageInfo = response.data.pageInfo;
				let gallery = [];
				response.data.project.gallery.forEach(function(item, i) {
					gallery.push({
						'src': item['sizes']['large']
					});
				});
				this.gallery = gallery;
				this.showAnimMain = true;
				console.log(this.description);
			});
		},
	},
}
</script>