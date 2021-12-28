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
    <svg class="btn-language__icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 0C7.16354 0 0 7.16354 0 16C0 24.8365 7.16354 32 16 32C24.8365 32 32 24.8365 32 16C31.9901 7.16771 24.8323 0.00989587 16 0ZM29.8378 21.6052L25.2875 22.3904C25.8083 20.4802 26.0896 18.5128 26.1247 16.5333H30.9201C30.8599 18.2745 30.4935 19.9914 29.8378 21.6052ZM1.07995 16.5333H5.87526C5.91042 18.5128 6.19167 20.4802 6.7125 22.3904L2.16224 21.6052C1.50651 19.9914 1.1401 18.2745 1.07995 16.5333ZM2.16224 10.3948L6.7125 9.60964C6.19167 11.5198 5.91042 13.4872 5.87526 15.4667H1.07995C1.1401 13.7255 1.50651 12.0086 2.16224 10.3948ZM16.5333 8.56328C18.4497 8.58776 20.3615 8.76224 22.2508 9.08542L24.1333 9.41016C24.7117 11.3784 25.0229 13.4154 25.0586 15.4667H16.5333V8.56328ZM22.4326 8.03411C20.4833 7.70104 18.5107 7.52109 16.5333 7.49661V1.09661C19.5909 1.39036 22.2469 4.18984 23.7521 8.26406L22.4326 8.03411ZM15.4667 7.49661C13.4893 7.52109 11.5172 7.70104 9.56797 8.03411L8.24792 8.2625C9.75313 4.18724 12.4091 1.38672 15.4667 1.09427V7.49661ZM9.74974 9.08542C11.6388 8.76224 13.5503 8.58776 15.4667 8.56328V15.4667H6.94141C6.97708 13.4154 7.28828 11.3784 7.86667 9.41016L9.74974 9.08542ZM6.94141 16.5333H15.4667V23.4367C13.5503 23.4122 11.6385 23.2378 9.74922 22.9146L7.86667 22.5898C7.28828 20.6216 6.97708 18.5846 6.94141 16.5333ZM9.56745 23.9659C11.5167 24.2995 13.4891 24.4802 15.4667 24.5063V30.9063C12.4091 30.6122 9.75313 27.8128 8.24792 23.7385L9.56745 23.9659ZM16.5333 24.5063C18.5107 24.4802 20.4828 24.2995 22.432 23.9659L23.7521 23.7375C22.2469 27.8128 19.5909 30.6133 16.5333 30.9057V24.5063ZM22.2503 22.9146C20.3612 23.2378 18.4497 23.4122 16.5333 23.4367V16.5333H25.0586C25.0229 18.5846 24.7117 20.6216 24.1333 22.5898L22.2503 22.9146ZM26.1247 15.4667C26.0896 13.4872 25.8083 11.5198 25.2875 9.60964L29.8378 10.3948C30.4935 12.0086 30.8599 13.7255 30.9201 15.4667H26.1247ZM29.2982 9.21927L24.9365 8.46667C24.1523 5.90859 22.6854 3.61276 20.6932 1.82656C24.4185 3.06979 27.5078 5.7237 29.2982 9.21927ZM11.3068 1.82656C9.31458 3.61276 7.84766 5.90859 7.06354 8.46667L2.70182 9.21927C4.49219 5.7237 7.58151 3.06979 11.3068 1.82656ZM2.70182 22.7807L7.06354 23.5333C7.84766 26.0914 9.31458 28.3872 11.3068 30.1734C7.58151 28.9302 4.49219 26.2763 2.70182 22.7807ZM20.6932 30.1734C22.6854 28.3872 24.1523 26.0914 24.9365 23.5333L29.2982 22.7807C27.5078 26.2763 24.4185 28.9302 20.6932 30.1734Z" fill="white"/></svg>
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