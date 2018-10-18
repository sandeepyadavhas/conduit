<template>
	<div class="newarticle container">
		<div class="loader" v-if="loading"></div>
		<div class="main" v-if="!loading">
			<form v-on:submit.prevent="publishArticle">
				<div class="form-group">
					<label for="articleTitle">Article Title</label>
					<input type="text" class="form-control" id="articleTitle" placeholder="Article Title" v-model="article.title">
				</div>
				<div class="form-group">
					<label for="articleAbout">What's this article about?</label>
					<input type="text" class="form-control" id="articleAbout" placeholder="Article Description" v-model="article.description">
				</div>
				<div class="form-group">
					<label for="articleBody">Article Body</label>
					<textarea class="form-control" id="articleBody" rows="6" placeholder="Write your article (in markdown)" v-model="article.body"></textarea>
				</div>
				<div class="form-group">
					<label for="articleTags">Article Tags</label>
					<input type="text" class="form-control" id="articleTags" placeholder="Enter Tags (separated by comma',')" v-model="article.tagList">
				</div>

				<div class="text-center">
					<input type="submit" class="btn btn-success" value="Publish Container">
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import ArticleService from "@/services/ArticleService";

export default {
	name: 'newarticle',
	data: () => { return {
		loading: false,
		article: {
			title: '',
			description: '',
			body: '',
			tagList: '',
		}
	}},
	methods: {
		async publishArticle() {
			this.loading = true;
			let article = this.article;
			let data = {
				title: article.title,
				description: article.description,
				body: article.body,
				tagList: article.tagList.split(',')
			}
			const response = await ArticleService.addArticle(data);
			if (response && response.data && response.data.article) {
				this.$router.push('/article/'+response.data.article.slug);
			}
			this.loading = false;
		}
	}
}
</script>
