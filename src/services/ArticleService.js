import Api from '@/services/Api'

function getAuthHeader() {
	if (localStorage.jwtToken) {
		return { 'Authorization': 'Token ' + localStorage.jwtToken};
	}
	else return {};
}
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
		return Api().get('/articles/feed', paramObj, {
			headers: getAuthHeader()
		});
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
	}
}
