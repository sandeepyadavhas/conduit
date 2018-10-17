import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import About from './views/About.vue'
import ArticleView from './views//ArticleView.vue'

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
			component: About
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
		}
	]
})
