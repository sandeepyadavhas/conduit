<template>
	<div class="articleview">
		<div class="loader" v-if="loading"></div>
		<div class="main" v-if="article">
			<h1>{{article.title}}</h1>
			{{article.body}}
			<form v-on:submit.prevent="addComment">
				<textarea v-model="commentText">
				</textarea>
				<input type="submit" class="btn" value="Add Comment">
			</form>
			<ul>
				<li v-for="(comment, index) in comments" :key="index">
					{{comment.body}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import ArticleService from "@/services/ArticleService";


export default {
	name: "articleview",
	components: {},
	data: () => {return {
		loading: true,
		article: null,
		commentText: '',
		comments: []
	}},
	computed: {
		slug() {
			return this.$route.params.slug;
		}
	},
	methods: {
		async getArticle(slug) {
			const response = await ArticleService.getArticle(slug);
			if (response && response.data && response.data.article) {
				return response.data.article;
			}
			else return null;
		},
		async addComment() {
			this.loading = true;
			let obj = {
				comment: {
					body: this.commentText
				}
			};
			const response = await ArticleService.addComment(this.slug, obj);
			if (response && response.data && response.data.comment) {
				this.comments.push(response.data.comment);
			}
			this.commentText = '';

			this.loading = false;
		},
		async getComments(slug) {
			const response = await ArticleService.getComments(slug);
			if (response && response.data && response.data.comments) {
				return response.data.comments;
			}
			else return [];
		}
	},
	async created() {
		let articlePromise = this.getArticle(this.slug);
		let commentPromise = this.getComments(this.slug);

		this.article = await articlePromise;
		this.comments = await commentPromise;

		this.loading = false;
	}
};
</script>

<style>
</style>
