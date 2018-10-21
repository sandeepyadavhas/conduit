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
	getArticles(limit, offset, tag) {
		let config = {
			params: {
				limit: limit,
				offset: offset,
			},
			headers: getAuthHeader(false)
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
			headers: getAuthHeader(true)
		};
		return Api().get('/articles/feed', config);
	},
	getTags() {
		return Api().get('/tags');
	},
	getArticle(slug) {
		return Api().get('/articles/'+slug, {
			headers: getAuthHeader(false)
		});
	},
	addComment(slug, data) {
		return Api().post('/articles/'+slug+'/comments', data, {
			headers: getAuthHeader(true)
		});
	},
	getComments(slug) {
		return Api().get('/articles/'+slug+'/comments', {
			headers: getAuthHeader(false)
		});
	},
	addArticle(data) {
		return Api().post('/articles', data, {
			headers: getAuthHeader(true)
		});
	},
	likePost(slug) {
		return Api().post('/articles/'+slug+'/favorite', {}, {
			headers: getAuthHeader(true)
		});
	},
	dislikePost(slug) {
		return Api().delete('/articles/'+slug+'/favorite', {
			headers: getAuthHeader(true)
		});
	},
	getPostByAuthor(author, limit, offset, favorited) {
		let config = {
			params: {
				author: author,
				limit: limit,
				offset: offset,
			},
			headers: getAuthHeader(false)
		};
		if (favorited) {
			delete config.params.author;
			config.params.favorited = author;
		}
		return Api().get('/articles', config);
	}
}
