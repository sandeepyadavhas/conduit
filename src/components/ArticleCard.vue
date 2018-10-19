<template>
	<div class="articleCard">
		<div class="loader" v-if="loading"></div>
		<div v-bind:class="{ fade: loading}">
			<h3>{{article.title}}</h3>
			<AuthorCard :author="article.author"></AuthorCard>
			{{new Date(article.createdAt).toDateString()}}
			<br>
			<span>{{article.description}}</span>
			<br>
			<span v-for="(tag, index) in article.tagList" :key="index">
				{{tag}}|
			</span>
			<Heart class="heart"
				:favoriteData = "favoriteData"
				:slug="article.slug"
				v-on:like-post="likeDislikePost($event)"
			></Heart>
			<br>
			<router-link :to="'/article/'+article.slug">Read More...</router-link>
		</div>
	</div>
</template>

<script>
import Heart from "@/components/Heart.vue";
import ArticleService from '@/services/ArticleService';
import AuthorCard from '@/components/AuthorCard.vue';

export default {
	name: 'articleCard',
	props: {
		article: Object
	},
	components: {
		Heart,
		AuthorCard
	},
	data() { return {
		loading: false
	}},
	computed: {
		favoriteData() {
			return {
				favorited: this.article.favorited,
				favoritesCount: this.article.favoritesCount
			}
		}
	},
	methods: {
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
	}
}
</script>

<style>
.articleCard {
	/* border: 1px solid red; */
	position: relative;
}
.fade {
	opacity: 0.5;
}
.heart {
	top: 10px;
	right: 10px;
	position: absolute;
	/* float: right; */
}
</style>
