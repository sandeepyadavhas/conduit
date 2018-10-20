import Api from '@/services/Api'

function getAuthHeader(strict) {
	if (localStorage.jwtToken) {
		return { 'Authorization': 'Token ' + localStorage.jwtToken};
	}
	else {
		if (strict) {
			location.href = '/login';
		}
		return {};
	}
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
			headers: getAuthHeader(true)
		});
	},
	getProfile(username) {
		return Api().get('/profiles/'+username, {
			headers: getAuthHeader(false)
		})
	},
	follow(username) {
		return Api().post('/profiles/'+username+'/follow', {}, {
			headers: getAuthHeader(true)
		})
	},
	unfollow(username) {
		return Api().delete('/profiles/'+username+'/follow', {
			headers: getAuthHeader(true)
		})
	}
}
