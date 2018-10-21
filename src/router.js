import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import ArticleListView from './components/ArticleListView.vue'
import ArticleView from './views//ArticleView.vue'
import NewArticle from './components/NewArticle.vue'
import Profile from './views/Profile.vue'
import Logout from './views/Logout.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: ArticleListView
		},
		{
			path: '/article/:slug',
			name: 'article',
			component: ArticleView
		},
		{
			path: '/register',
			name: 'register',
			component: Register
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/new',
			name: 'createArticle',
			component: NewArticle,
			props: { edit: false }
		},
		{
			path: '/profile/:username',
			name: 'profile',
			component: Profile
		},
		{
			path: '/logout',
			name: 'logout',
			component: Logout
		},
		// {
		// 	path: '/edit/:slug',
		// 	name: 'editArticle',
		// 	component: NewArticle,
		// 	props: { edit: true }
		// }
	]
})
