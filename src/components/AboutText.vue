<template>
<div class="wrapper">
	<div class="sec-page sec-text" v-bind:class="[{showLines: showLines}]">
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
		<div class="sec-text__line sec-text__line_1"></div>
		<div class="sec-text__line sec-text__line_2"></div>
		<div class="sec-text__line sec-text__line_3"></div>
		<div class="sec-text__line sec-text__line_4"></div>
		<div class="sec-text__line sec-text__line_5"></div>
		<div class="sec-text__line sec-text__line_6"></div>
		<div class="sec-text__line sec-text__line_7"></div>
		<div class="sec-page__wrap sec-text__wrap" v-if="showMainHere">
			<transition name="fade" v-show="showAnimHere" style="animation-delay: 0.7s">
				<div class="sec-text__content"><img class="sec-text__content-icon" :src="pageInfo.icon" alt=""><svg v-if="showArr" @click.self="clickArr" class="sec-text__content-arr" width="9" height="22" viewBox="0 0 9 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 -1.96701e-07L-7.59198e-07 4.63158L3.375 4.63158L3.375 22L5.625 22L5.625 4.63158L9 4.63158L4.5 -1.96701e-07Z" fill="white" fill-opacity="0.3"/></svg><div class="sec-text__content-body" v-html="pageInfo.content"></div></div>
			</transition>
			<div class="sec-text__img-wrap">
				<div class="square-effect">
				<transition style="animation-duration: 1s" name="squareEffect" v-show="showAnimHere">
					<div></div>
				</transition>
				</div>
				<div class="sec-text__img" v-bind:class="{anim: animImg}">
					<img :src="pageInfo.img" alt="" class="sec-text__img-img">
				</div>
			</div>
			<transition name="fadeUp">
				<div v-show="showAnimHere" style="animation-delay: 1s" class="sec-page__bottom">
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

export default {
	name: 'AboutPageText',
	data() {
		return {
			page: Object,
			pageInfo: Object,
			showArr: false,
			animImg: false,
			countScroll: 0,
			showLines: false,
			showMainHere: false,
			showAnimHere: false,
		}
	},
	created() {
		if ( this.$store.state.toAboutTextPage ) {
			this.showLines=true;
		}
	},
	mounted() {
		this.page = this.data.page;
		this.pageInfo = this.data.pageInfo;


		setTimeout(() => this.animImg = true, 1000);
		this.$nextTick(function () {
			setTimeout(this.setScroll, 800);
		});
		window.addEventListener("resize", this.setScroll);
	},
	props: {
		data: Object,
		showMain: Boolean,
		showAnim: Boolean,
		routeLeave: Boolean,
	},
	watch:{
		routeLeave: {
			immediate: true,
			deep: true,
			handler(val) {
				console.log('watch text уход: '+val);
				let wrapBg = document.querySelector('.bg-page');
				if ( wrapBg ) {
					let lines = wrapBg.querySelectorAll('.sec-about__line');
					if ( lines.length ) {
						for(var i=0; i<lines.length; i++){
							lines[i].remove();
						}
					}
				}
				if (val) {
					this.showLines = false;
					this.showAnimHere = false;
					this.animImg = false;
					}else{
					setTimeout(()=>this.showLines = true, 10);
					setTimeout(()=>this.showMainHere = this.showMain, 500);
					setTimeout(()=>this.showAnimHere = this.showAnim, 500);
				}
			}
		},
	},
	methods: {
		setScroll() {
			let wrap = document.getElementsByClassName('sec-text__content')[0];
			let body = document.getElementsByClassName('sec-text__content-body')[0];
			if ( body.offsetHeight >= wrap.offsetHeight ) {
				this.scrollContent();
				this.showArr = true;
			}
		},
		clickArr(e) {
			let wrap = document.getElementsByClassName('sec-text__content')[0];
			let body = document.getElementsByClassName('sec-text__content-body')[0];
			console.log(e);
			if ( e.target.classList.contains('active') ) {
				body.style.transition = '1s';
				body.style.transform = 'translateY('+0+'px)';
				e.target.classList.remove('active');
				this.countScroll = ( (body.offsetHeight - wrap.offsetHeight) * -1 );
				this.scrollContent();
			}else{
				body.style.transition = '1s';
				body.style.transform = 'translateY('+( (body.offsetHeight - wrap.offsetHeight) * -1 )+'px)';
				e.target.classList.add('active');
				this.countScroll = ( (body.offsetHeight - wrap.offsetHeight) * -1 );
				this.scrollContent();
			}
		},
		scrollContent() {
			let wrap = document.getElementsByClassName('sec-text__content')[0];
			let body = document.getElementsByClassName('sec-text__content-body')[0];
			wrap.addEventListener('mousewheel', scroll);
			let stepScroll = 40;
			let countScroll = this.countScroll;
			function scroll(e) {
				let direction;
				if ( ( countScroll * -1 ) >= ( body.offsetHeight - wrap.offsetHeight ) ) {
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
				body.style.transition = '.2s';
				body.style.transform = 'translateY('+countScroll+'px)';
			}
		},
	},
}
</script>