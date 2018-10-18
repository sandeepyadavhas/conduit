import Api from '@/services/Api'

function getAuthHeader() {
	if (localStorage.jwtToken) {
		return { 'Authorization': 'Token ' + localStorage.jwtToken};
	}
	else return {};
}

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
		return Api().get('/user', {
			headers: getAuthHeader()
		});
	},
	getProfile(username) {
		return Api().get('/profiles/'+username, {
			headers: getAuthHeader()
		})
	}
}
