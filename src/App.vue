<template>
	<router-view :key="$route.name+$route.path" />
</template>
<script>

export default {
	name: 'App',
	created(){
		this.$store.commit('changeLanguage', this.$route.meta.path);
	},
}

</script>

<style lang="scss">
  @import './assets/sass/style.scss';
</style>
