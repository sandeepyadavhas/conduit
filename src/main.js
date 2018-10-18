import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import UserService from './services/UserService'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
	data: () => { return {
		user: null,
		loading: true
	}},
	async created() {
		if (localStorage.jwtToken) {
			const response = await UserService.getUser();
			// console.log(response);
			this.user = response.data.user;
			console.log('logged in');
		}
		else {
			console.log('not logged');
		}
		this.loading = false;
	}
}).$mount('#app')
