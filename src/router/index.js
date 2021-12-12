import {createRouter, createWebHistory} from "vue-router";
import Home from '@/views/Home.vue'
import HomeTwo from '@/views/HomeTwo.vue'
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
	homeTwo: {
			name: 'homeTwo',
			path: ['/homeTwo', '/homeTwo', '/homeTwo', '/homeTwo'],
			component: HomeTwo,
			path_meta: '/homeTwo',
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
			path: ['about', 'o-kompanii', 'about-company', 'ettevottest'],
			component: About,
			path_meta: '/about/',
		},
	About_page: {
			name: 'About_page',
			path: ['about/:page/', 'o-kompanii/:page/', 'about-company/:page/', 'ettevottest/:page/'],
			component: About_page,
			path_meta: '/about/',
			category: 'about',
		},
	About_page_founder: {
			name: 'About_page_founder',
			path: ['about/:page/:founder', 'o-kompanii/:page/:founder', 'about-company/:page/:founder', 'ettevottest/:page/:founder'],
			component: Founder,
			path_meta: '/about/founders',
			category: 'about/',
		},
	investment: {
			name: 'investment',
			path: ['projects/invest-proekty', 'projects/invest-proekti', 'projects/investment-projects', 'projects/invest-portfellide'],
			component: Projects_cat,
			path_meta: '/projects/investment',
		},
	in_progress: {
			name: 'in-progress',
			path: ['projects/v-roboti', 'projects/v-roboti', 'projects/at-work', 'projects/toos'],
			component: Projects_cat,
			path_meta: '/projects/in-progress',
		},
	implemented: {
			name: 'implemented',
			path: ['projects/realizovannye', 'projects/realizovani', 'projects/implemented', 'projects/teostatud-projektid'],
			component: Projects_cat,
			path_meta: '/projects/implemented',
		},
	project_investment: {
			name: 'project_investment',
			path: ['projects/invest-proekty/:project', 'projects/invest-proekti/:project', 'projects/investment-projects/:project', 'projects/invest-portfellide/:project'],
			component: Project,
			path_meta: '/projects/investment/',
			category: ['investment'],
		},
	project_in_progress: {
			name: 'project_in-progress',
			path: ['projects/v-roboti/:project', 'projects/v-roboti/:project', 'projects/at-work/:project', 'projects/toos/:project'],
			component: Project,
			path_meta: '/projects/in-progress/',
			category: 'in-progress',
		},
	project_implemented: {
			name: 'project_implemented',
			path: ['projects/realizovannye/:project', 'projects/realizovani/:project', 'projects/implemented/:project', 'projects/teostatud-projektid/:project'],
			component: Project,
			path_meta: '/projects/implemented/',
			category: 'implemented',
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

routes.push({
	path: "/:catchAll(.*)",
	name: "NotFound",
	component: _404,
	redirect: '/404',
	meta:{
		'path':  '/404',
		'language':  language_def,
		'languages':  languages,
		'linkHome': '/',
		'slug': '404',
	},
});

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;
