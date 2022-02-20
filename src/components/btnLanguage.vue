<template>

<div class="btn-language" :class="{fixed: classEl}" @mouseover="show = true" @mouseleave="show = false">

<transition name="fadeLeft" style="animation-duration: 0.3s">
  <div v-show="show" class="btn-language__content">
  <template v-for="(language) in languages" :key="language" >
    <router-link
        @click="routLinkClick" 
        :to="languages_links[language]" 
        class="btn-language__link" v-if="language != 'et'">
                {{ language }}
    </router-link>
  </template>
  </div>
</transition>
    <svg class="btn-language__icon" width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34 0V68" stroke="white" stroke-width="2"/><path d="M34 67C52.2254 67 67 52.2254 67 34C67 15.7746 52.2254 1 34 1C15.7746 1 1 15.7746 1 34C1 52.2254 15.7746 67 34 67Z" stroke="white" stroke-width="2"/><path d="M61.7371 15.2101C53.766 21.298 45.8781 23.0646 35.6357 23.2544C25.3934 23.4442 15.3752 20.406 7.1582 14.6182" stroke="white" stroke-width="2"/><path d="M61.7371 52.7899C53.766 46.702 45.8781 44.9354 35.6357 44.7456C25.3934 44.5558 15.3752 47.594 7.1582 53.3818" stroke="white" stroke-width="2"/><path d="M33.4434 66.8852C22.2397 57.5294 15.9697 46.8014 15.6205 34.7799C15.2712 22.7585 21.9 11.8739 32.5516 2.22949" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M33.4434 66.8852C45.3472 57.3681 52.0091 46.4551 52.3802 34.2264C52.7513 21.9977 45.7082 10.9254 34.3908 1.11475" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M68 34H0" stroke="white" stroke-width="2"/></svg>

</div>
</template>
<script>


export default {
  name: 'btnLanguage',
  data() {
    return {
      show: false,
      languages_links: Array,
      languages: Array,
      language: this.$route.meta.language,
      mobile: false,
      params: '',
    }
  },
  created() {
    this.mobile = this.$isMobile();
  },
  mounted() {
    this.getLanguages();
  },
  watch:{
    $route() {
      this.getLanguages();
    },
    '$store.state.aboutLanguages': function() {
      this.getLanguages();
    },
    '$store.state.projectLanguages': function() {
      this.getLanguages();
    },
    '$store.state.partnerLanguages': function() {
      this.getLanguages();
    },
    '$store.state.founderLanguages': function() {
      this.getLanguages();
    },
  },
  methods: {
    hide() {
      this.show = false;
    },
    routLinkClick(e){
      this.$store.commit('changeLanguage', e.target.innerHTML);
      this.language = e.target.innerHTML;
      this.getLanguages();
    },
    getLanguages() {
      let languages_arr = [];
      for(var i=0; i<this.$route.meta.languages.length; i++){
        if ( this.$route.meta.languages[i] !== this.language ) {
          languages_arr.push(this.$route.meta.languages[i]);
        }
      }
      this.languages = languages_arr;
      console.log(this.$route);
      // if posts
      if ( this.$store.state.aboutLanguages ) {
        let languages_page = {};
        for( const [key, val] of Object.entries(this.$store.state.aboutLanguages) ) {
          let url_page = this.$route.meta.translate_links[key].split(':')[0] + val;
          languages_page[key] = url_page;
        }
        this.languages_links = languages_page;
      }
      else if( this.$store.state.founderLanguages ) {
        let languages_page = {};
        for( const [key, val] of Object.entries(this.$store.state.founderLanguages) ) {
          let url_page = this.$route.meta.translate_links[key].split(':')[0] + this.$route.params.page + '/' + val;
          languages_page[key] = url_page;
        }
        this.languages_links = languages_page;
      }
      else if( this.$store.state.projectLanguages ) {
        let languages_page = {};
        for( const [key, val] of Object.entries(this.$store.state.projectLanguages) ) {
          console.log(this.$store.state.projectLanguages);
          let url_page = this.$route.meta.translate_links[key].split(':')[0] + val;
          languages_page[key] = url_page;
        }
        this.languages_links = languages_page;
      }
      else if( this.$store.state.partnerLanguages ) {
        let languages_page = {};
        for( const [key, val] of Object.entries(this.$store.state.partnerLanguages) ) {
          let url_page = this.$route.meta.translate_links[key].split(':')[0] + val;
          languages_page[key] = url_page;
        }
        this.languages_links = languages_page;
        console.log(this.languages_links);
      }
      else {
        this.languages_links = this.$route.meta.translate_links;
      }
    },
  },
  props:{
    classEl: String,
  }
}
</script>