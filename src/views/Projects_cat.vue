<template>
<div class="wrapper">
	<div class="sec-page sec-projects-cat">
		<transition name="fade">
			<img v-if="!this.$store.state.project_bg && showAnimMain" v-show="showAnim" @load="this.loadImg" :src="this.pageInfo.bg" alt="" class="sec-projects-cat__bg">
		</transition>
		<img v-if="this.$store.state.project_bg" v-show="mounted" :src="this.$store.state.project_bg" alt="" class="sec-projects-cat__bg">
		<Header></Header>
		<div class="sec-page__wrap sec-projects-cat__wrap" v-if="showAnimMain">
			<div class="sec-projects-cat__line sec-projects-cat__line_1"></div>
			<div class="sec-projects-cat__line sec-projects-cat__line_2"></div>
			<div class="sec-projects-cat__line sec-projects-cat__line_3"></div>
			<div class="sec-projects-cat__line sec-projects-cat__line_4"></div>
			<div class="sec-projects-cat__line sec-projects-cat__line_5"></div>
			<div class="sec-projects-cat__line sec-projects-cat__line_6"></div>
			<template v-for="(item, index) in this.projects" v-bind:key="index">
				<transition name="fade">
					<img v-show="parseInt(this.bg) === index" v-if="item.acf_bg" v-on:load="this.loadImg" :src="item.acf_bg[0]['sizes']['large']" alt="" class="sec-projects-cat__img">
				</transition>
			</template>
			<div class="sec-page__content sec-projects-cat__content">
				<div class="sec-projects-cat__info">
					<transition name="fadeLeft">
						<div v-show="showAnim">
							<router-link :to="this.$route.meta.linkHome + 'projects/'" style="animation-delay: 0.6s" class="sec-projects-cat__link">{{ this.pageInfo.goProject }}</router-link>
						</div>
					</transition>
					<transition name="fadeLeft">
						<h2 v-show="showAnim" class="title title_sec sec-projects-cat__title">{{ this.pageInfo.title }}</h2>
					</transition>
					<transition name="fadeLeft">
						<p v-show="showAnim" style="animation-delay: 0.5s" class="text-info">{{ this.pageInfo.text }}</p>
					</transition>
				</div>
				<div class="sec-projects-cat__projects">
					<template v-for="(item, index) in this.projects" v-bind:key="index">
						<transition :style="'animation-delay:'+ ( 0.6 + index * 0.1 + 0.1 ) +'s'" name="fadeRight">
							<router-link :to="{ name: 'project_'+this.$route.meta.name+'-'+this.$route.meta.language, params: { project: item.post_name, } }" v-show="showAnim" @mouseenter="showBg" @mouseleave="hideBg" :data-bg="index" class="sec-projects-cat__el"><div class="project-el-cat"><div class="project-el-cat__title">{{ item.post_title }}</div></div></router-link>
						</transition>
					</template>
				</div>
				<transition name="fadeUp">
					<div v-show="showAnim" style="animation-delay: 1.9s" class="sec-page__bottom">
						<router-link :to="{name: 'projects-'+this.$route.meta.language}" class="iconLink sec-page__bottom-prev">
							<svg class="iconLink__icon iconLink__margin" width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="1" width="6" height="1" transform="rotate(90 4 1)" fill="white"/><rect x="9" y="8" width="6" height="1" transform="rotate(-180 9 8)" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 3.24324L6.18333 4L3.5 1.51351L0.816666 4L9.02423e-09 3.24324L3.5 -4.17371e-08L7 3.24324Z" fill="white"/></svg>
							<span class="iconLink__text">{{ this.pageInfo.goPrev }}</span>
						</router-link>
						<div class="block-links">
							<router-link :to="{name: 'partners-'+this.$route.meta.language}" class="block-links__el iconLink">
								<svg class="iconLink__icon iconLink__margin" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.78184 0.5L5.72729 1.43333L2.6208 4.5L5.72729 7.56667L4.78184 8.5L0.729893 4.5L4.78184 0.5Z" fill="white"/></svg>
								<span class="iconLink__text">{{ this.pageInfo.goPartners }}</span>
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
</div>
</template>
<script>
import Header from '../components/header.vue'
import axios from 'axios'

export default {
	name: 'Projects cat',
	data() {
		return{
			bg: false,
			showAnim: false,
			showAnimMain: Boolean,
			projects: Object,
			pageInfo: Object,
			activeHover: false,
			mounted: false,
			images: {
				count: Number,
				loaded: 0,
			},
		};
	},
	components: {
		Header
	},
	beforeRouteLeave(to, from, next) {
		this.showAnim = false;
		this.activeHover = false;
		this.$store.commit('changeProjectBg', this.pageInfo.bg);
		setTimeout(next, 1500);
	},
	mounted() {
		this.getProjects();
		this.mounted = true;
		if ( this.$store.state.project_bg ) {
			this.images.loaded = 1;
		}
	},
	watch:{
		$route() {
			this.showAnimMain = false;
			this.showAnim = false;
			if ( this.$store.state.project_bg ) {
				this.images.loaded = 1;
			}
			this.getProjects();
		}
	},
	methods: {
		showBg(e){
			if ( this.activeHover ) {
				this.bg = e.target.getAttribute('data-bg');
				if ( this.projects[0].acf_bg !== false ) {
					this.$store.commit('changePageProjectBg', this.projects[this.bg].acf_bg[0]['sizes']['large']);
				}
			}
		},
		hideBg(e){
			if ( this.activeHover ) {
				this.bg = false;
			}
		},
		loadImg() {
			this.images.loaded = this.images.loaded + 1;
			console.log(this.images.loaded);
			if ( this.images.loaded === this.images.count ) {
				this.showPage();
			}
		},
		getProjects() {
			axios.get('http://privilege.qazxswedc.site/wp-json/vue/v1/projects', {
				params:{
					lang: this.$route.meta.language,
					cat: this.$route.meta.name,
				}
			}).then(response => {
				this.projects = response.data.projects;
				this.pageInfo = response.data.pageInfo;
				// +1 bg
				this.images.count = 1;
				for( var i=0; i<response.data.projects.length; i++ ){
					if ( response.data.projects[i].acf_bg ) {
						this.images.count = this.images.count+1;
					}
				}
				this.showAnimMain = true;
				if ( response.data.projects ) {
					if ( !response.data.projects[0].acf_bg ) {
						this.showPage();
					}
				}
			});
		},
		showPage() {
			this.showAnim = true;
			setTimeout(() => this.activeHover = true, 1000);
		},
	},
}
</script>