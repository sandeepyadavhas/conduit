<template>
	<div class="articleListView container">
		<div class="btn-group">
			<button class="btn btn-outline-primary" v-on:click="setFeed">My feed</button>
			<button class="btn btn-outline-primary" v-on:click="setGlobalArticles">Global feed</button>
		</div>
		<div class="loader" v-if="loading"></div>
		<div class="row" v-if="!loading">
			<div class="col-md-8">
				<h3>{{heading}}</h3>
				<h5>Page {{selectedPage}}</h5>
				<ArticleList 
					:articleData="articleData"
					:articlesInSinglePage="articlesInSinglePage"
					:selectedPage="selectedPage"
					v-on:set-page="setPage($event)"
				></ArticleList>
					
			</div>
			<div class="col-md-4">
				<TagList :tags="tags" v-on:set-tag="setTag($event);"></TagList>
			</div>
		</div>
	</div>
</template>

<script>
import ArticleService from "@/services/ArticleService";
import TagList from "@/components/TagList.vue";
import ArticleList from "@/components/ArticleList.vue"

export default {
	name: "articleListView",
	components: {
		TagList,
		ArticleList
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
			currentlyLoaded: {global: true},
			selectedPage: 0
		};
	},
	computed: {
		heading() {
			if (this.currentlyLoaded) {
				if (this.currentlyLoaded.tag) {
					let tag = this.currentlyLoaded.tag;
					return '#'+tag;
				} else if (this.currentlyLoaded.feed) {
					return 'My Feed';
				} else {
					return 'Global Feed'
				}
			}
		}
	},
	methods: {
		async init() {
			let globalFeedPromise = this.setGlobalArticles();
			let tagPromise = this.getTagList();

			await globalFeedPromise;
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
			} else return {
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
			this.selectedPage = num;

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
			this.selectedPage = 1;

			this.loading = false;
		},
		async setFeed() {
			this.loading = true;

			this.articleData = await this.getArticles(this.articlesInSinglePage, 0, undefined, true);
			this.currentlyLoaded = { feed: true };
			this.selectedPage = 1;

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
			this.selectedPage = 1;

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
