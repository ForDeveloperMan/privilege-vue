export default {
	state () {
		return {
			language: 'uk',
			language_def: 'uk',
			home_bg: false,
			project_bg: false,
			project_bg_main: false,
			project_page_bg: false,
			projectLanguages: false,
			partnersBg: false,
		}
	},
	mutations: {
		changeLanguage(state, val_language) {
			state.language = val_language;
		},
		setHomeBg(state, val) {
			state.home_bg = val;
		},
		changeProjectBg(state, val) {
			state.project_bg = val;
		},
		changeProjectBgMain(state, val) {
			state.project_bg_main = val;
		},
		changePageProjectBg(state, val) {
			state.project_page_bg = val;
		},
		setProjectLanguages(state, val) {
			state.projectLanguages = val;
		},
		setPartnersBg(state, val) {
			state.partnersBg = val;
		},
	},
	getters:{
		languageDef(state){
			return state.language_def;
		}
	},
};