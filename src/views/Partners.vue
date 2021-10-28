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
	<img src="@/assets/img/bg/partners.jpg" alt="" class="sec-partners__bg">
	<div class="sec-page__wrap sec-partners__wrap">
		<div class="sec-partners__content">
			<div class="sec-partners__content-body">
				<h1 class="title title_sec sec-partners__title">Партнери компанії</h1>
				<p class="text-info">ДК «Привилегия» специализируется на системном управлении недвижимостью: создании концепций, проектировании, строительстве и эксплуатации коммерческой недвижимостью.</p>
			</div>
		</div>
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
			loadedBg: false,
			pageInfo: Object,
			partners: Object,
			mounted: false,
			images: {
				count: 4,
				loaded: 0,
			},
		}
	},
	components: {
		Header
	},
	mounted() {
		this.getInfo();
		this.mounted = true;
		this.showAnim = true;
		if ( this.$store.state.project_bg_main ) {
			this.images.loaded = 1;
		}
	},
	beforeRouteLeave(to, from, next) {
		this.showAnim = false;
		setTimeout(next, 0);
	},
	watch:{
		'$route.params.search': {
			deep: true,
		},
		$route() {
			this.showAnim = false;
			this.showAnimMain = false;
			this.images.loaded = 0;
			if ( this.$store.state.project_bg_main ) {
				this.images.loaded = 1;
			}
			this.getInfo();
		}
	},
	methods:{
		loadImg(){
			this.images.loaded = this.images.loaded+1;
			if ( this.images.loaded === this.images.count ) {
				this.loadedBg = true;
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
			});
		},
		showPage(){
			this.showAnim = true;
			setTimeout(() => this.activeHover = true, 1000);
		},
	},
}
</script>