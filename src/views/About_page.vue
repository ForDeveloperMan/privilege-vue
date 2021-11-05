<template>
	<TypesOfActivities :routeLeave="this.routeLeave" v-if="component === 64" :data="this.data" :showMain="this.showMain" :showAnim="this.showAnim"></TypesOfActivities>
	<Founders :routeLeave="this.routeLeave" v-if="component === 66" :data="this.data" :showMain="this.showMain" :showAnim="this.showAnim"></Founders>
</template>

<script>
import axios from 'axios'
import TypesOfActivities from '@/components/TypesOfActivities.vue'
import Founders from '@/components/Founders.vue'

export default {
	name: 'About page',
	data() {
		return {
			data: Object,
			component: Number,
			showMain: false,
			showAnim: false,
			routeLeave: false,
		}
	},
	components: {
		TypesOfActivities,
		Founders
	},
	created() {
	},
	beforeMount() {
		this.getInfo();
	},
	mounted() {	
	},
	beforeRouteLeave(to, from, next) {
		this.showAnim = false;
		this.routeLeave = true;
		function n() {
			next();
		}
		setTimeout(n, 1000);
	},
	methods: {
		getInfo() {
			axios.get('http://privilege.qazxswedc.site/wp-json/vue/v1/about_page', {
				params:{
					lang: this.$route.meta.language,
					page: this.$route.params.page,
				}
			}).then(response => {
				this.data = response.data;
				this.component = this.data.page['category'];
				this.showMain = true;
				setTimeout(() => this.showAnim = true, 100);
			});
		},
	},
}
</script>