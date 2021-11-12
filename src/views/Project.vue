<template>
<div class="wrapper">

<div class="sec-page sec-project">

<div class="sec-project__line sec-project__line_1"></div>
<div class="sec-project__line sec-project__line_2"></div>
<div class="sec-project__line sec-project__line_3"></div>
<div class="sec-project__line sec-project__line_4"></div>
<div class="sec-project__line sec-project__line_5"></div>
<div class="sec-project__line sec-project__line_6"></div>



<transition name="fade" v-if="!this.$store.state.project_page_bg && showAnimMain && gallery[0]">
	<img :src="gallery[0].src" alt="" v-on:load="this.loadImg" class="sec-project__bg" v-bind:class="{anim: showAnim}">
</transition>

<transition name="fade" v-if="this.$store.state.project_page_bg">
	<img :src="this.$store.state.project_page_bg" v-on:load="this.loadImg" alt="" class="sec-project__bg" v-bind:class="{anim: showAnim}">
</transition>




<div class="sec-page__wrap sec-project__wrap">
<div class="sec-page__content sec-project__content" v-if="showAnimMain">
<Header></Header>

<div class="sec-project__info">
	<transition name="fade" style="animation-delay: 0s">
		<div class="sec-project__info-top" v-show="showAnim">
			<h2 class="title title_main sec-project__title">{{ this.project['post_title'] }}</h2>
		</div>
	</transition>
	<div class="sec-project__contentInfo block-project-info" v-bind:class="{anim: showAnim}">
		<transition name="fade" style="animation-delay: 1s">
			<div class="block-project-info__wrap" v-show="showAnim">
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
		</transition>
	</div>
</div>
<div class="sec-project__text" v-bind:class="{anim: showAnim, open: openFullContent}">
	<div class="project-info">
		<transition name="fade">
			<div class="project-info__top" v-show="showAnim" style="animation-delay: 1s">
				<svg @click="openContent" v-if="showArr" class="project-info__arr" width="9" height="22" viewBox="0 0 9 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 -1.96701e-07L-7.59198e-07 4.63158L3.375 4.63158L3.375 22L5.625 22L5.625 4.63158L9 4.63158L4.5 -1.96701e-07Z" fill="#3A5899"/></svg>
				<div class="project-info__info">{{ pageInfo.textType }}</div>
				<div class="project-info__title">{{ description.title }}</div>
			</div>
		</transition>
		<transition name="fade">
			<p class="project-info__text text-info" v-show="showAnim" style="animation-delay: 1s">{{ description.text }}</p>
		</transition>
		<transition name="fade">
			<div @click="openGallery" v-show="showAnim" style="animation-delay: 1s" class="project-info__btn gallery-btn" id="open-gallery">
				<img src="@/assets/img/gallery.png" alt="" class="gallery-btn__icon">
				<div class="gallery-btn__text">{{ pageInfo.textBtn }}</div>
			</div>
		</transition>
	</div>
</div>


<transition name="fadeUp">
<div v-show="showAnim" style="animation-delay: 0s" class="sec-page__bottom">
	<router-link :to="{name: this.$route.meta.category+'-'+this.$route.meta.language}" class="iconLink sec-page__bottom-prev">
		<svg class="iconLink__icon iconLink__margin" width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="1" width="6" height="1" transform="rotate(90 4 1)" fill="white"/><rect x="9" y="8" width="6" height="1" transform="rotate(-180 9 8)" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.24324L6.18333 4L3.5 1.51351L0.816666 4L9.02423e-09 3.24324L3.5 -4.17371e-08L7 3.24324Z" fill="white"/></svg>
		<span class="iconLink__text">{{ pageInfo.goPrev }}</span>
	</router-link>
	<div class="block-links">
		<router-link :to="{ name: this.$route.meta.name+'-'+this.$route.meta.language, params: { project: pageInfo.projectNext.post_name, } }" v-if="pageInfo.projectNext.post_name" class="block-links__el iconLink">
			<svg class="iconLink__icon iconLink__margin" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.78184 0.5L5.72729 1.43333L2.6208 4.5L5.72729 7.56667L4.78184 8.5L0.729893 4.5L4.78184 0.5Z" fill="white"/></svg>
			<span class="iconLink__text">{{ pageInfo.projectNext.post_title }}</span>
		</router-link>
		<router-link :to="{ name: this.$route.meta.name+'-'+this.$route.meta.language, params: { project: pageInfo.projectPrev.post_name, } }" v-if="pageInfo.projectPrev.post_name" class="block-links__el iconLink">
			<span class="iconLink__text iconLink__margin">{{ pageInfo.projectPrev.post_title }}</span>
			<svg class="iconLink__icon" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.67299 0.5L0.727539 1.43333L3.83403 4.5L0.727539 7.56667L1.67299 8.5L5.72494 4.5L1.67299 0.5Z" fill="white"/></svg>
		</router-link>
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
			showAnim: false,
			showAnimMain: false,
			gallery: Array,
			project: Object,
			description: Object,
			pageInfo: Object,
			languagesProject: Object,
			goFrom: false,
			showArr: false,
			openFullContent: false,
			images: {
				count: 1,
				loaded: 0,
			},
		};
	},
	components: {
		Header,
	},
	mounted() {
		this.getProject();
	},
	beforeRouteUpdate(to, from, next) {
		this.showAnim = false;
		this.showAnimMain = false;
		this.$store.commit('setProjectLanguages', false);
		function n() {
			next();
		}
		setTimeout(n, 1500);
	},
	beforeRouteLeave(to, from, next) {
		this.showAnim = false;
		this.showAnimMain = false;
		this.$store.commit('setProjectLanguages', false);
		function n() {
			next();
		}
		setTimeout(n, 1500);
	},
	methods: {
		openContent() {
			this.openFullContent = !this.openFullContent;
		},
		loadImg() {
			this.images.loaded = this.images.loaded + 1;
			if ( this.images.loaded === this.images.count ) {
				this.showPage();
			}
		},
		openGallery() {
			Fancybox.show(this.gallery, {
				trapFocus: false,
				dragToClose : false,
				Carousel: false,
				placeFocusBack : false,
				// touch: false,
				animated: false,
			});
		},
		getProject() {
			axios.get('http://privilege.qazxswedc.site/wp-json/vue/v1/project', {
				params:{
					lang: this.$route.meta.language,
					project: this.$route.params.project,
					category: this.$route.meta.category,
				}
			}).then(response => {
				this.project = response.data.project;
				this.description = response.data.project.description;
				this.pageInfo = response.data.pageInfo;
				this.languagesProject = response.data.project.languages_post;

				if ( this.description === null ) {
					window.location.href = this.$route.meta.linkHome+'404';
				}
				
				this.showArr = true;

				let gallery = [];
				if ( response.data.project.gallery ) {
					response.data.project.gallery.forEach(function(item, i) {
						gallery.push({
							'src': item['sizes']['large']
						});
					});
					this.$store.commit('changePageProjectBg', this.gallery[0].src);
					this.gallery = gallery;
					this.$store.commit('setProjectLanguages', this.languagesProject);
					this.showAnimMain = true;
				}else{
					this.showPage();
					this.$store.commit('setProjectLanguages', this.languagesProject);
					this.showAnimMain = true;
				}
			});
		},
		showPage() {
			setTimeout(() => this.showAnim = true, 1000);
		},
	},
}
</script>