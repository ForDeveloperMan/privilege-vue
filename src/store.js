export default {
	state () {
		return {
			language: 'uk',
			language_def: 'uk',
			project_bg: false,
			project_bg_main: false,
		}
	},
	mutations: {
		changeLanguage(state, val_language) {
			state.language = val_language;
		},
		changeProjectBg(state, val) {
			state.project_bg = val;
		},
		changeProjectBgMain(state, val) {
			state.project_bg_main = val;
		},
	},
	getters:{
		languageDef(state){
			return state.language_def;
		}
	},
};