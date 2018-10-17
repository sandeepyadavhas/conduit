import Api from '@/services/Api'

export default {
	getArticles(limit, offset, tag) {
		let paramObj = {
			params: {
				limit: limit,
				offset: offset,
			}
		};
		if (tag) {
			paramObj.params.tag = tag;
		}
		return Api().get('/articles', paramObj);
	},
	getFeed(limit, offset) {
		let paramObj = {
			params: {
				limit: limit,
				offset: offset,
			}
		};
		let authHeader = {
			'Authorization': 'Token ' + localStorage.jwtToken
		};
		return Api().get('/articles/feed', paramObj, {
			headers: authHeader
		});
	},
	getTags() {
		return Api().get('/tags');
	}
}
