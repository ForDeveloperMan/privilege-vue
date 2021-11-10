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

let components = [
	['home', '/', Home, '/'], 
	['projects', 'projects', Projects, '/projects'],
	['contacts', 'contacts', Contacts, '/contacts'],

	['about', 'about', About, '/about/'],
	['About_page', 'about/:page/', About_page, '/about/', 'about'],
	['About_page_founder', 'about/:page/:founder', Founder, '/about/founders', 'about/'],

	['implemented', 'projects/implemented', Projects_cat, '/projects/implemented'],
	['investment', 'projects/investment', Projects_cat, '/projects/investment'],
	['in-progress', 'projects/in-progress', Projects_cat, '/projects/in-progress'],
	['project_implemented', 'projects/implemented/:project', Project, '/projects/implemented/', 'implemented'],
	['project_investment', 'projects/investment/:project', Project, '/projects/investment/', 'investment'],
	['project_in-progress', 'projects/in-progress/:project', Project, '/projects/in-progress/', 'in-progress'],
	['partners', 'partners', Partners, '/partners'],
	['partners_partner', 'partners/:partner', Partner, '/partners/'],
	['404', '/404', _404, '/404/'],
];

let routes = []


for(var l=0; l<components.length; l++){
	for(var i=0; i<languages.length; i++){
		let language = languages[i];
		let _path = '/';
		if ( language === language_def ) {
			language = '';
			if ( components[l][1] !== '/' ) {
				_path = _path + components[l][1];
			}
		}else{
			if ( components[l][1] !== '/' ) {
				_path = _path + language.toLowerCase() + '/' + components[l][1];
			}else{
				_path = _path + language.toLowerCase();
			}
		}
		var linkHome = '';
		if ( languages[i] === language_def ) {
			linkHome = '/';
		}else{
			linkHome = '/' + languages[i] + '/';
		}
		routes.push({
			name: components[l][0] +'_'+language,
			path: _path,
			component: components[l][2],
			meta:{
				'path':  components[l][3],
				'language':  languages[i],
				'languages':  languages,
				'linkHome': linkHome,
				'slug': components[l][0],
				'category': components[l][4],
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
