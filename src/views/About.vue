<template>
<div class="wrapper">

<div class="sec-page sec-about">
	<Header></Header>
	<div class="sec-page__wrap sec-about__wrap">
	</div>
</div>

</div>
</template>

<script>
import Header from '../components/header.vue'
import axios from 'axios'

export default {
	name: 'About',
	data() {
		return {
		}
	},
	components: {
		Header
	},
	mounted() {
	},
}
</script>