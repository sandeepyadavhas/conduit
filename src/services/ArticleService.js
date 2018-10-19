import Api from '@/services/Api'

function getAuthHeader() {
	if (localStorage.jwtToken) {
		return { 'Authorization': 'Token ' + localStorage.jwtToken};
	}
	else return {};
}

export default {
	getArticles(limit, offset, tag) {
		let config = {
			params: {
				limit: limit,
				offset: offset,
			},
			headers: getAuthHeader()
		};
		if (tag) {
			config.params.tag = tag;
		}
		return Api().get('/articles', config);
	},
	getFeed(limit, offset) {
		let config = {
			params: {
				limit: limit,
				offset: offset,
			},
			headers: getAuthHeader()
		};
		return Api().get('/articles/feed', config);
	},
	getTags() {
		return Api().get('/tags');
	},
	getArticle(slug) {
		return Api().get('/articles/'+slug);
	},
	addComment(slug, data) {
		return Api().post('/articles/'+slug+'/comments', data, {
			headers: getAuthHeader()
		});
	},
	getComments(slug) {
		return Api().get('/articles/'+slug+'/comments', {
			headers: getAuthHeader()
		});
	},
	addArticle(data) {
		return Api().post('/articles', data, {
			headers: getAuthHeader()
		});
	},
	likePost(slug) {
		return Api().post('/articles/'+slug+'/favorite', {}, {
			headers: getAuthHeader()
		});
	},
	dislikePost(slug) {
		return Api().delete('/articles/'+slug+'/favorite', {
			headers: getAuthHeader()
		});
	}
}
