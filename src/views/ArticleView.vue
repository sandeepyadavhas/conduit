<template>
	<div class="articleview container">
		<div class="loader" v-if="loading"></div>
		<div class="main" v-if="article">
			<h1>{{article.title}}</h1>
			<div class="like-container">
				<AuthorCard :author="article.author"></AuthorCard>
				<Heart class="heart"
					:favoriteData = "favoriteData"
					:slug="article.slug"
					v-on:like-post="likeDislikePost($event)"
				></Heart>
				<div v-if="isOwner" class="edit-delete">
					<router-link class="btn btn-outline-primary" :to="'/edit/'+slug"><i class="fas fa-edit"></i></router-link>&nbsp;
					<button class="btn btn-outline-primary" v-on:click="deleteArticle"><i class="fas fa-trash"></i></button>
				</div>
			</div>
			<p v-html="printWithNewLine(article.body)"></p>
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
import AuthorCard from "@/components/AuthorCard.vue";
import Heart from "@/components/Heart.vue";

export default {
	name: "articleview",
	components: {
		AuthorCard,
		Heart
	},
	data: () => {return {
		loading: true,
		article: null,
		commentText: '',
		comments: []
	}},
	computed: {
		slug() {
			return this.$route.params.slug;
		},
		favoriteData() {
			return {
				favorited: this.article.favorited,
				favoritesCount: this.article.favoritesCount
			}
		},
		isOwner() {
			if (this.$root.user && this.$root.user.username == this.article.author.username) {
				return true;
			}
			return false;
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
				this.comments.unshift(response.data.comment);
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
		},
		printWithNewLine(str) {
			return str.replace(/\n/g, '<br>');
		},
		async deleteArticle() {
			alert('delete not working');
		},
		async likeDislikePost(slug) {
			this.loading = true;

			const response = await ((this.article.favorited)? ArticleService.dislikePost(slug) : ArticleService.likePost(slug));
			if (response && response.data && response.data.article) {
				this.setArticle(this.article, response.data.article);
			}

			this.loading = false;
		},
		setArticle(article, NewArticle) {
			Object.keys(NewArticle).forEach(function(key) {
				article[key] = NewArticle[key];
			});
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
.like-container {
	position: relative;
	margin-bottom: 50px;
}
.heart {
	top: 0px;
	right: 10px;
	position: absolute;
	/* float: right; */
}
AuthorCard {
	display: inline-block;
	margin: 0px 50px 0px 0px;
}
.edit-delete {
	display: inline;
}
</style>
