import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import ArticleList from './components/ArticleList.vue'
import ArticleView from './views//ArticleView.vue'
import NewArticle from './components/NewArticle.vue'
import Profile from './views/Profile.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/article/:slug',
			name: 'article',
			component: ArticleView
		},
		{
			path: '/about',
			name: 'about',
			component: ArticleList
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
			component: NewArticle
		},
		{
			path: '/profile/:username',
			name: 'profile',
			component: Profile
		}
	]
})
