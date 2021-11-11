import {createRouter, createWebHistory} from "vue-router";
import Home from '@/views/Home.vue'
import Projects from '@/views/Projects.vue'
import Contacts from '@/views/Contacts.vue'
import About from '@/views/About.vue'
import About_page from '@/views/About_page.vue'
import Founder from '@/views/Founder.vue'
import Projects_cat from '@/views/Projects_cat.vue'
import Project from '@/views/Project.vue'
import Partners from '@/views/Partners.vue'
import Partner from '@/views/Partner.vue'
import _404 from '@/views/404.vue'

let languages = ['ru', 'uk', 'en', 'et'];
let language_def = 'uk';

// name, path, component, path_meta

let components = {
	home: {
			name: 'home',
			path: ['', '', '', ''],
			component: Home,
			path_meta: '/',
		},
	projects: {
			name: 'projects',
			path: ['projects', 'projects', 'projects', 'projects'],
			component: Projects,
			path_meta: '/projects',
		},
	contacts: {
			name: 'contacts',
			path: ['contacts', 'contacts', 'contacts', 'contacts'],
			component: Contacts,
			path_meta: '/contacts',
		},
	about: {
			name: 'about',
			path: ['about', 'o-kompanii', 'about-company', 'ettevõttest'],
			component: About,
			path_meta: '/about/',
		},
	About_page: {
			name: 'About_page',
			path: ['about/:page/', 'o-kompanii/:page/', 'about-company/:page/', 'ettevõttest/:page/'],
			component: About_page,
			path_meta: '/about/',
			category: 'about',
		},
	About_page_founder: {
			name: 'About_page_founder',
			path: ['about/:page/:founder', 'o-kompanii/:page/:founder', 'about-company/:page/:founder', 'ettevõttest/:page/:founder'],
			component: Founder,
			path_meta: '/about/founders',
			category: 'about/',
		},
	implemented: {
			name: 'implemented',
			path: ['projects/implemented', 'projects/implemented', 'projects/implemented', 'projects/implemented'],
			component: Projects_cat,
			path_meta: '/projects/implemented',
		},
	investment: {
			name: 'investment',
			path: ['projects/investment', 'projects/investment', 'projects/investment', 'projects/invest-portfellide'],
			component: Projects_cat,
			path_meta: '/projects/investment',
		},
	in_progress: {
			name: 'in-progress',
			path: ['projects/in-progress', 'projects/in-progress', 'projects/in-progress', 'projects/in-progress'],
			component: Projects_cat,
			path_meta: '/projects/in-progress',
		},
	project_implemented: {
			name: 'project_implemented',
			path: ['projects/implemented/:project', 'projects/implemented/:project', 'projects/implemented/:project', 'projects/implemented/:project'],
			component: Project,
			path_meta: '/projects/implemented/',
			category: 'implemented',
		},
	project_investment: {
			name: 'project_investment',
			path: ['projects/investment/:project', 'projects/investment/:project', 'projects/investment/:project', 'projects/invest-portfellide/:project'],
			component: Project,
			path_meta: '/projects/investment/',
			category: ['investment'],
		},
	project_in_progress: {
			name: 'project_in-progress',
			path: ['projects/in-progress/:project', 'projects/in-progress/:project', 'projects/in-progress/:project', 'projects/in-progress/:project'],
			component: Project,
			path_meta: '/projects/in-progress/',
			category: 'in-progress',
		},
	partners: {
			name: 'partners',
			path: ['partners', 'partners', 'partners', 'partners'],
			component: Partners,
			path_meta: '/partners',
		},
	partners_partner: {
			name: 'partners_partner',
			path: ['partners/:partner', 'partners/:partner', 'partners/:partner', 'partners/:partner'],
			component: Partner,
			path_meta: '/partners/',
		},
	404: {
		name: '404',
		path: ['404', '404', '404', '404'],
		component: _404,
		path_meta: '/404/',
	},
};


let routes = []

for (var route_el in components) {
	for(var i=0; i<languages.length; i++){
		let language = languages[i];
		let route = components[route_el];
		let _path = '';
		let _pathLanguage = '';
		let languages_links = {};
		let linkHome = '';
		let category;

		//check default language
		if ( language === language_def ) {
			_path = '/' + route['path'][i];
			linkHome = '/';
		}else{
			_path = '/' + language + '/' + route['path'][i];
			linkHome = '/'+ language;
		}

		for(var lang=0; lang<languages.length; lang++){
			if ( languages[lang] === language_def ) {
				_pathLanguage = '/' + route['path'][lang];
			}else{
				_pathLanguage = '/' + languages[lang] + '/' + route['path'][lang];
			}
			languages_links[languages[lang]] = _pathLanguage
		}

		if ( route['category'] ) {
			category = route['category'];
		}

		routes.push({
			name: route['name'] +'-'+language,
			path: _path,
			component: route['component'],
			meta: {
				'linkHome': linkHome,
				'languages':  languages,
				'language': language,
				'translate_links': languages_links,
				'name': route['name'],
				'category': category,
			},
		});
	}
}

// routes.push({
// 	path: "/:catchAll(.*)",
// 	name: "NotFound",
// 	component: _404,
// 	redirect: '/404',
// 	meta:{
// 		'path':  '/404',
// 		'language':  language_def,
// 		'languages':  languages,
// 		'linkHome': '/',
// 		'slug': '404',
// 	},
// });

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;
