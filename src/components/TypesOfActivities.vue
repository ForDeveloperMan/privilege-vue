<template>
<div class="wrapper">
<div class="sec-page sec-types" v-bind:class="[{showLines: showLines}]">
	<div class="sec-types__line sec-types__line_1"></div>
	<div class="sec-types__line sec-types__line_2"></div>
	<div class="sec-types__line sec-types__line_3"></div>
	<div class="sec-types__line sec-types__line_4"></div>
	<div class="sec-types__line sec-types__line_5"></div>
	<div class="sec-types__line sec-types__line_6"></div>
	<div class="sec-types__wrap" v-if="showMainHere">
		<div class="sec-types__content">
			<transition name="fadeLeft" v-show="showAnimHere">
				<h1 class="title title_sec sec-types__title">{{ page['post_title'] }}</h1>
			</transition>
			<transition name="fadeLeft" v-show="showAnimHere" style="animation-delay: 0.3s">
				<p class="text-info">{{ pageInfo['text'] }}</p>
			</transition>
		</div>
		<div class="sec-types__elements">
			<template v-for="(item, index) in pageInfo.content" v-bind:key="index">
				<transition :style="'animation-delay:'+ ( 0.6 + index * 0.1 + 0.1 ) +'s'" name="fadeRight" v-show="showAnimHere">
					<div :class="'sec-types__elements-el '+'sec-types__elements-el_'+(index+1)" @mouseenter="mouseenter" @mouseleave="mouseleave" @click="click">
						<div class="sec-types__elements-hover text-info">
							<svg class="sec-types__elements-hover-close" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#222222"/></svg>
							{{ item.zagolovok }}
							<br>
							<br>
							{{ item.tekst }}
						</div>
						<div class="sec-types__elements-content">
							<img :src="item.ikonka" :alt="item.zagolovok" class="sec-types__elements-icon">
							<div class="sec-types__elements-title">{{ item.zagolovok }}</div>
						</div>
					</div>
				</transition>
			</template>
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
	name: 'About page',
	data() {
		return {
			page: Object,
			pageInfo: Object,
			languagesPage: Object,
			showLines: false,
			showMainHere: false,
			showAnimHere: false,
		}
	},
	components: {
	},
	beforeMount() {
	},
	mounted() {
		this.page = this.data.page;
		this.pageInfo = this.data.pageInfo;
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
				console.log('watch types уход: '+val);
				if ( val ) {
					this.showLines = false;
					this.showAnimHere = false;
				}else{
					setTimeout(()=>this.showLines = true, 10);
					setTimeout(()=>this.showMainHere = this.showMain, 500);
					setTimeout(()=>this.showAnimHere = this.showAnim, 500);
				}
			}
		},
	},
	methods: {
		click(e) {
			if ( window.innerWidth <= 1200 ) {
				if ( e.target.closest('.sec-types__elements-el').classList.contains('active') ) {
					e.target.closest('.sec-types__elements-el').classList.remove('active');
					e.target.closest('.wrapper-about').classList.remove('zInd');
				}else{
					e.target.closest('.sec-types__elements-el').classList.add('active');
					e.target.closest('.wrapper-about').classList.add('zInd');
				}
			}
		},
		mouseenter(e) {
			if ( window.innerWidth <= 1200 ) {
				console.log();
			}else{
				var edge = this.closestEdge(e, e.target);
				e.target.classList.remove('out-left');
				e.target.classList.remove('out-right');
				e.target.classList.remove('out-top');
				e.target.classList.remove('out-bottom');
				if ( edge === 'left' ) {
					e.target.classList.add('in-left');
				}else if ( edge === 'right' ) {
					e.target.classList.add('in-right');
				}else if ( edge === 'top' ) {
					e.target.classList.add('in-top');
				}else if ( edge === 'bottom' ) {
					e.target.classList.add('in-bottom');
				}
			}
		},
		mouseleave(e) {
			if ( window.innerWidth <= 1200 ) {
				console.log();
			}else{
				var edge = this.closestEdge(e, e.target);
				e.target.classList.remove('in-left');
				e.target.classList.remove('in-right');
				e.target.classList.remove('in-top');
				e.target.classList.remove('in-bottom');
				if ( edge === 'left' ) {
					e.target.classList.add('out-left');
				}else if ( edge === 'right' ) {
					e.target.classList.add('out-right');
				}else if ( edge === 'top' ) {
					e.target.classList.add('out-top');
				}else if ( edge === 'bottom' ) {
					e.target.classList.add('out-bottom');
				}
			}
		},
		closestEdge(mouse, elem) {
			var elemBounding = elem.getBoundingClientRect();
		
			var elementLeftEdge = elemBounding.left;
			var elementTopEdge = elemBounding.top;
			var elementRightEdge = elemBounding.right;
			var elementBottomEdge = elemBounding.bottom;

			var mouseX = mouse.pageX;
			var mouseY = mouse.pageY;

			var topEdgeDist = Math.abs(elementTopEdge - mouseY);
			var bottomEdgeDist = Math.abs(elementBottomEdge - mouseY);
			var leftEdgeDist = Math.abs(elementLeftEdge - mouseX);
			var rightEdgeDist = Math.abs(elementRightEdge - mouseX);

			var min = Math.min(topEdgeDist, bottomEdgeDist, leftEdgeDist, rightEdgeDist);

			switch(min) {
				case leftEdgeDist: return "left";
				case rightEdgeDist: return "right";
				case topEdgeDist: return "top";
				case bottomEdgeDist: return "bottom";
			}
		},
	},
}
</script>