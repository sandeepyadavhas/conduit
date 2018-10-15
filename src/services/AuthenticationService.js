import Api from '@/services/Api'

export default {
	register (username, email, password) {
		return Api().post('/users', {
			user: {
				username: username,
				email: email,
				password: password
			}
		})
	},
	logout() {
		localStorage.clear();
	},
	login(email, password) {
		return Api().post('/users/login', {
			user: {
				email: email,
				password: password
			}
		});
	},
	getUser() {
		let authHeader = {
			'Authorization': 'Token ' + localStorage.jwtToken
		};
		return Api().get('/user', {
			headers: authHeader
		});
	}
}
