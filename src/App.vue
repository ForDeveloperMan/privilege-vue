<template>
	<router-view :key="$route.fullPath+$route.params.founder" />
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
