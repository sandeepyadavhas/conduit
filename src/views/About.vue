<template>
	<div class="about container">
		<button class="btn">your feed</button>&nbsp;&nbsp;
		<button class="btn">Global feed</button>
		<div class="loader" v-if="loading"></div>
		<div class="row" v-if="!loading">
			<div class="col-md-8">
				<div class="main">
					<p v-if="articleData.articlesCount == 0">No Articles</p>
					<ul>
						<li v-for="(article, index) in articleData.articles" :key="index">
							<h3>{{article.title}}</h3>
							{{new Date(article.createdAt).toDateString()}}<br>
							<span>{{article.description}}</span>
							<br>
							<span v-for="(tag, index) in article.tagList" :key="index">
								{{tag}}|
							</span>
							<Heart 
								:favorited="article.favorited" 
								:favoritesCount="article.favoritesCount" 
								:slug="article.slug"
								v-on:like-post="likePost($event);"
							></Heart>
							<br>
							<router-link :to="'/article/'+article.slug">Read More...</router-link>
						</li>
					</ul>
					<PaginationNumbering 
						:articlesCount="articleData.articlesCount"
						:articlesInSinglePage="articlesInSinglePage"
						v-on:set-page="setPage($event)"
					></PaginationNumbering>
					
				</div>
			</div>
			<div class="col-md-4">
				<TagList :tags="tags" v-on:set-tag="setTag($event);"></TagList>
			</div>
		</div>

		
	</div>
</template>

<script>
import Heart from "@/components/Heart.vue";
import ArticleService from "@/services/ArticleService";
import TagList from "@/components/TagList.vue";
import PaginationNumbering from "@/components/PaginationNumbering.vue";

export default {
	name: "home",
	components: {
		TagList,
		PaginationNumbering,
		Heart
	},
	data: () => {
		return {
			loading: true,
			articleData: {
				articles: null,
				articlesCount: 0
			},
			tags: null,
			articlesInSinglePage: 10,
			currentlyLoaded: {global: true}
		};
	},
	methods: {
		likePost(slug) {
			console.log(slug);
		},
		async init() {
			let articlePromise = this.getArticles(this.articlesInSinglePage, 0);
			let tagPromise = this.getTagList();

			this.articleData = await articlePromise;
			this.tags = await tagPromise;

			this.loading = false;
		},
		async getArticles(limit, offset, tag, feed) {
			let response;
			if (feed) {
				response = await ArticleService.getFeed(limit, offset);
			} else {
				response = await ArticleService.getArticles(limit, offset, tag);
			}
			if (response && response.data) {
				return response.data;
			} else
				return {
					articles: null,
					articlesCount: 0
				};
		},
		async getTagList() {
			const response = await ArticleService.getTags();
			if (response && response.data && response.data.tags) {
				return response.data.tags;
			} else return [];
		},
		async setPage(num) {
			this.loading = true;

			let limit = this.articlesInSinglePage;
			let offset = (num - 1) * this.articlesInSinglePage;
			let newArticleData;

			if (this.currentlyLoaded.tag) {
				let tag = this.currentlyLoaded.tag;
				newArticleData = await this.getArticles(limit, offset, tag);
			} else if (this.currentlyLoaded.feed) {
				newArticleData = await this.getArticles(limit, offset, undefined, true);
			} else {
				newArticleData = await this.getArticles(limit, offset);
			}
			this.articleData = newArticleData;

			this.loading = false;
		},
		async setTag(tag) {
			this.loading = true;
			const newArticleData = await this.getArticles(
				this.articlesInSinglePage,
				0,
				tag
			);
			this.articleData = newArticleData;
			this.currentlyLoaded = { tag: tag };
			this.loading = false;
		},
		async setFeed() {
			this.loading = true;
			const newArticleData = await this.getArticles(
				this.articlesInSinglePage,
				0,
				undefined,
				true
			);
			this.articleData = newArticleData;
			this.currentlyLoaded = { feed: true };
			this.loading = false;
		},
		async setGlobalArticles() {
			this.loading = true;
			const newArticleData = await this.getArticles(
				this.articlesInSinglePage,
				0
			);
			this.articleData = newArticleData;
			this.currentlyLoaded = { global: true };
			this.loading = false;
		}
	},
	async created() {
		this.init();
	}
};
</script>

<style>

</style>
