<template>
	<div class="articleview">
		<div class="loader" v-if="loading"></div>
		<div class="main" v-if="article">
			<h1>{{article.title}}</h1>
			{{article.body}}
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
		article: null
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
		}
	},
	async created() {
		this.article = await this.getArticle(this.slug);
		this.loading = false;
	}
};
</script>

<style>
</style>
