<template>
<div class="wrapper">
	<div class="sec-page sec-contacts" v-bind:class="[{openForm: showForm}, {showLines: showLines}]">
		<div class="sec-contacts__line sec-contacts__line_1"></div>
		<div class="sec-contacts__line sec-contacts__line_2"></div>
		<div class="sec-contacts__line sec-contacts__line_3"></div>
		<div class="sec-contacts__line sec-contacts__line_4"></div>
		<div class="sec-contacts__line sec-contacts__line_5"></div>
		<div class="sec-page__wrap sec-contacts__wrap" v-if="showMain">
			<transition name="fadeLeft" v-show="!showForm && showAnim">
				<div class="sec-contacts__content">
					<div class="sec-contacts__content-body">
						<h1 class="title title_sec sec-contacts__title">{{ pageInfo.title }}</h1>
						<p class="text-info sec-contacts__text">{{ pageInfo.descrp }}</p>
					</div>
				</div>
			</transition>
			<transition name="fade" v-show="!showForm && showAnim">
				<GMapMap class="sec-contacts__map" v-if="showMain"
					:center="center"
					:zoom="7"
					:options="options"
				>
				</GMapMap>
			</transition>
			<transition name="fadeRight" v-show="!showForm && showAnim">
				<div class="sec-contacts__locate">
					<div class="sec-contacts__locate-content">
						<div class="locate-el sec-contacts__locate-el" v-for="(locate, ind) in pageInfo.adresa" v-bind:key="ind">
							<div class="locate-el__title title-contact">{{ pageInfo.adresa_title }}</div>
							<p class="locate-el__text" v-html="locate.adres"></p>
							<p class="locate-el__info">{{ locate.informaciya }}</p>
						</div>
					</div>
				</div>
			</transition>
			<transition name="fadeUp" v-show="!showForm && showAnim">
				<div class="sec-contacts__info">
					<div class="sec-contacts__info-content">
						<div class="sec-contacts__info-el contact-el">
							<div class="contact-el__title title-contact">{{ pageInfo.number.title }}</div>
							<a :href="'tel:+'+(pageInfo.number.val.replace(/[^a-zа-яё0-9\s]/gi, '').split(' ').join(''))" class="contact-el__text link-contact">{{ pageInfo.number.val }}</a>
						</div>
						<div class="sec-contacts__info-el contact-el">
							<div class="contact-el__title title-contact">{{ pageInfo.mail.title }}</div>
							<a :href="'mailto:'+pageInfo.mail.val" class="contact-el__text link-contact">{{ pageInfo.mail.val }}</a>
						</div>
					</div>
				</div>
			</transition>
			<transition name="fadeUp" v-show="!showForm && showAnim">
				<div class="sec-contacts__socials">
					<div class="sec-contacts__socials-content">
						<div class="sec-contacts__socials-title title-contact">{{ pageInfo.socials.title }}</div>
						<div class="block-socials">
							<div class="block-socials__el" v-for="(social, ind) in pageInfo.socials.content" v-bind:key="ind" ><a :href="social.ssylka" target="_blank" class="socials-el"><img :src="social.ikonka_belaya" alt="" class="socials-el__icon"></a></div>
						</div>
					</div>
				</div>
			</transition>
			<transition name="fade" v-show="showForm && showAnim">
				<div class="sec-contacts__form">
					<div class="sec-contacts__form-close" @click="closeForm"><svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.60531L12.59 0.195312L7 5.78531L1.41 0.195312L0 1.60531L5.59 7.19531L0 12.7853L1.41 14.1953L7 8.60531L12.59 14.1953L14 12.7853L8.41 7.19531L14 1.60531Z" fill="#222222"/></svg></div>
					<transition name="fade">
						<div class="sec-contacts__form-thanks" v-if="thanksForm">
							<div class="title title_sec sec-contacts__form-title">{{ pageInfo.form_thanks.zagolovok }}</div>
							<div class="sec-contacts__form-text">{{ pageInfo.form_thanks.tekst }}</div>
						</div>
					</transition>
					<div class="sec-contacts__form-content" v-if="!thanksForm">
						<div class="block-form">
							<div class="block-form__inps">
								<div class="block-form__el block-form__inps-el form-el">
									<input type="text" name="name" class="form-el__inp" required @blur="blur" @focus="focus" @input="inputForm">
									<div class="form-el__placeholder">{{pageInfo.form.name}}</div>
								</div>
								<div class="block-form__el block-form__inps-el form-el">
									<input type="text" name="tel" class="form-el__inp" required @blur="blur" @focus="focus" @input="inputForm">
									<div class="form-el__placeholder">{{pageInfo.form.tel}}</div>
								</div>
							</div>
							<div class="block-form__el form-el">
								<input type="text" name="mail" class="form-el__inp" required @blur="blur" @focus="focus" @input="inputForm">
								<div class="form-el__placeholder">{{pageInfo.form.mail}}</div>
							</div>
							<div class="block-form__btnWrap">
								<a href="#" class="block-form__btn" @click.prevent="sendForm">{{ pageInfo.form.btn }}</a>
							</div>
						</div>
					</div>
				</div>
			</transition>
			<transition name="fadeUp" v-show="!showForm && showAnim">
				<div class="sec-contacts__btn" @click="openForm">{{ pageInfo.btn }}</div>
			</transition>
		</div>
	</div>
</div>
</template>
<script>
import axios from 'axios'

export default {
	name: 'Contacts',
	data() {
		return {
			thanksForm: false,
			showForm: false,
			formError: false,
			showMain: false,
			showAnim: false,
			showLines: false,
			pageInfo: Object,
			center: {lat: 51.093048, lng: 6.842120},
			options: {
				styles: [
					{
					"elementType": "geometry",
					"stylers": [
					{
					"color": "#f5f5f5"
					}
					]
					},
					{
					"elementType": "labels.icon",
					"stylers": [
					{
					"visibility": "off"
					}
					]
					},
					{
					"elementType": "labels.text.fill",
					"stylers": [
					{
					"color": "#616161"
					}
					]
					},
					{
					"elementType": "labels.text.stroke",
					"stylers": [
					{
					"color": "#f5f5f5"
					}
					]
					},
					{
					"featureType": "administrative.land_parcel",
					"elementType": "labels.text.fill",
					"stylers": [
					{
					"color": "#bdbdbd"
					}
					]
					},
					{
					"featureType": "poi",
					"elementType": "geometry",
					"stylers": [
					{
					"color": "#eeeeee"
					}
					]
					},
					{
					"featureType": "poi",
					"elementType": "labels.text.fill",
					"stylers": [
					{
					"color": "#757575"
					}
					]
					},
					{
					"featureType": "poi.park",
					"elementType": "geometry",
					"stylers": [
					{
					"color": "#e5e5e5"
					}
					]
					},
					{
					"featureType": "poi.park",
					"elementType": "labels.text.fill",
					"stylers": [
					{
					"color": "#9e9e9e"
					}
					]
					},
					{
					"featureType": "road",
					"elementType": "geometry",
					"stylers": [
					{
					"color": "#ffffff"
					}
					]
					},
					{
					"featureType": "road.arterial",
					"elementType": "labels.text.fill",
					"stylers": [
					{
					"color": "#757575"
					}
					]
					},
					{
					"featureType": "road.highway",
					"elementType": "geometry",
					"stylers": [
					{
					"color": "#dadada"
					}
					]
					},
					{
					"featureType": "road.highway",
					"elementType": "labels.text.fill",
					"stylers": [
					{
					"color": "#616161"
					}
					]
					},
					{
					"featureType": "road.local",
					"elementType": "labels.text.fill",
					"stylers": [
					{
					"color": "#9e9e9e"
					}
					]
					},
					{
					"featureType": "transit.line",
					"elementType": "geometry",
					"stylers": [
					{
					"color": "#e5e5e5"
					}
					]
					},
					{
					"featureType": "transit.station",
					"elementType": "geometry",
					"stylers": [
					{
					"color": "#eeeeee"
					}
					]
					},
					{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [
					{
					"color": "#c9c9c9"
					}
					]
					},
					{
					"featureType": "water",
					"elementType": "labels.text.fill",
					"stylers": [
					{
					"color": "#9e9e9e"
					}
					]
					}
					]
			},
		};
	},
	components: {
	},
	mounted() {
		this.getInfo();
	},
	beforeRouteLeave(to, from, next) {
		setTimeout(next, 1000);
		this.showAnim = false;
		this.showLines = false;
	},
	methods: {
		blur(e) {
			if ( e.target.value === '' || e.target.value === null || e.target.value === false || e.target.value === undefined  ) {
				e.target.closest('.form-el').classList.remove('focus');
				e.target.closest('.form-el').classList.add('error');
			}
		},
		focus(e) {
			e.target.closest('.form-el').classList.add('focus');
		},
		inputForm(e) {
			if ( e.target.value === '' || e.target.value === null || e.target.value === false || e.target.value === undefined  ) {
				e.target.classList.remove('focus');
			}else{
				e.target.classList.add('focus');
				e.target.closest('.form-el').classList.remove('error');
			}
		},
		openForm() {
			this.showForm = true;
		},
		closeForm() {
			this.showForm = false;
		},
		sendForm(e) {
			let wrap = e.target.closest('.block-form');
			let inps = wrap.getElementsByClassName('form-el__inp');
			let inps_check = 0;
			for(let i=0; i < inps.length; i++){
				if ( inps[i].value === '' || inps[i].value === null || inps[i].value === false || inps[i].value === undefined  ) {
					inps[i].classList.add('error');
				}else{
					inps[i].classList.remove('error');
					inps_check++;
				}
			}

			if( inps_check !== inps.length ){
				return false;
			}

			let inp_name = wrap.querySelector('.form-el__inp[name="name"]').value;
			let inp_tel = wrap.querySelector('.form-el__inp[name="tel"]').value;
			let inp_mail = wrap.querySelector('.form-el__inp[name="mail"]').value;

			let formData = new FormData();
			formData.append('inp_name', inp_name);
			formData.append('tel', inp_tel);
			formData.append('mail', inp_mail);
			
			axios.post('https://privilege.qazxswedc.site/wp-json/contact-form-7/v1/contact-forms/272/feedback', formData).then(response => {
				if ( response.data.status === 'mail_sent' ) {
					this.thanksForm = true;
				}
				if ( response.data.status === 'validation_failed' ) {
					this.formError = true;
					alert('Что-то пошло не так, проверьте заполненность полей!');
				}
			});
		},
		getInfo() {
			axios.get('https://privilege.qazxswedc.site/wp-json/vue/v1/contacts', {
				params:{
					lang: this.$route.meta.language,
				}
			}).then(response => {
				this.pageInfo = response.data;
				this.showMain = true;
				this.showLines = true;
				setTimeout(()=>this.showAnim = true, 100);
			});
		},
	},
}
</script>