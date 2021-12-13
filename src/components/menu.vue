<template>
  <div class="block-menu" v-on:click="click" v-if="showMain">
    <div class="block-menu__btn">
      <svg class="block-menu__icon" width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="35" y="2" width="35" height="2" transform="rotate(-180 35 2)" fill="#fff"/><rect x="20" y="12" width="20" height="2" transform="rotate(-180 20 12)" fill="#fff"/></svg>
      <div class="block-menu__text">{{ info.name_menu }}</div>
    </div>
    <svg class="block-menu__close" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M16 1.61143L14.3886 0L8 6.38857L1.61143 0L0 1.61143L6.38857 8L0 14.3886L1.61143 16L8 9.61143L14.3886 16L16 14.3886L9.61143 8L16 1.61143Z" fill="#3A3A3A"/></svg>
  </div>
  <div class="block-menu__dropdown" v-bind:class="{active: isActive}" v-if="showMain">
    <div class="block-menu__dropdown-content">
      <div class="block-menu__dropdown-block">
        <router-link :to="{name: 'about-'+this.$route.meta.language}" @click="click" class="block-menu__dropdown-title margin">{{ info.goAbout }}</router-link>
        <ul class="block-menu__dropdown-links">
          <li v-for="(item, index) in info.about" v-bind:key="index"><router-link @click="click" :to="{name: 'About_page-'+this.$route.meta.language, params: {page: item.post_name}}" >{{ item.post_title }}</router-link></li>
        </ul>
      </div>
      <div class="block-menu__dropdown-block">
        <router-link :to="{name: 'projects-'+this.$route.meta.language}" @click="click" class="block-menu__dropdown-title margin">{{ info.goProjects }}</router-link>
        <ul class="block-menu__dropdown-links">
          <li><router-link :to="{name: 'investment'+'-'+this.$route.meta.language}" @click="click">{{ info.projects[0].cat_name }}</router-link></li>
          <li><router-link :to="{name: 'in-progress'+'-'+this.$route.meta.language}" @click="click">{{ info.projects[1].cat_name }}</router-link></li>
          <li><router-link :to="{name: 'implemented'+'-'+this.$route.meta.language}" @click="click">{{ info.projects[2].cat_name }}</router-link></li>
        </ul>
      </div>
      <div class="block-menu__dropdown-block">
        <router-link :to="{name: 'partners-'+this.$route.meta.language}" @click="click" class="block-menu__dropdown-title">{{ info.goPartners }}</router-link>
      </div>
      <div class="block-menu__dropdown-block">
        <router-link :to="{name: 'contacts-'+this.$route.meta.language}" @click="click" class="block-menu__dropdown-title">{{ info.goContacts }}</router-link>
      </div>
      <div class="block-menu__dropdown-bottom">
        <div class="block-menu__dropdown-info">{{ info.socials['title'] }}</div>
        <div class="block-socials">
          <div class="block-socials__el" v-for="(social, ind) in info.socials.content" v-bind:key="ind" ><a :href="social.ssylka" target="_blank" class="socials-el"><img :src="social.ikonka_temnaya" alt="" class="socials-el__icon"></a></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'menu',
  data(){
    return{
      isActicveHere: false,
      info: Object,
      showMain: false,
    };
  },
  beforeMount() {
    this.getInfo();
  },
  props:{
    isActive: Boolean,
  },
  watch:{
    $route() {
      this.getInfo();
    },
    isActicveHere: function () {
      if ( this.isActicveHere ) {
        document.body.classList.add('menuOpen');
      }else{
        document.body.classList.remove('menuOpen');
      }
    }
  },
  methods: {
    click(){
      if ( this.isActive ) {
        this.isActicveHere = false;
      }else{
        this.isActicveHere = true;
      }
      this.$emit("openMenu", this.isActicveHere);
    },
    getInfo() {
      axios.get('https://privilege.qazxswedc.site/wp-json/vue/v1/menu', {
        params:{
          lang: this.$route.meta.language,
        }
      }).then(response => {
        this.info = response.data;
        console.log(this.info);
        this.showMain = true;
      });
    },
  },
}
</script>