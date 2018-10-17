<template>
	<div class="about">
		<p :v-if="articleData.articlesCount == 0">No Articles</p>
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
					v-on:like-post="print($event);"
				></Heart>
			</li>
		</ul>
		<PaginationNumbering 
			:articlesCount="articleData.articlesCount"
			:articlesInSinglePage="articlesInSinglePage"
			v-on:set-page="print($event)"
		></PaginationNumbering>
		<TagList :tags="tags" v-on:set-tag="setTag($event);"></TagList>
	</div>
</template>

<script>
import Heart from '@/components/Heart.vue'
import ArticleService from '@/services/ArticleService'
import TagList from '@/components/TagList.vue'
import PaginationNumbering from '@/components/PaginationNumbering.vue'

export default {
	name: 'home',
	components: {
		TagList,
		PaginationNumbering,
		Heart
	},
	data: () => { return{
		loading: true,
		articleData: {
			articles: null,
			articlesCount: 0
		},
		tags: null,
		articlesInSinglePage: 10
	}},
	methods: {
		print(str) {
			console.log(str);
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
			}
			else {
				response = await ArticleService.getArticles(limit, offset, tag);
			}
			if (response && response.data) {
				return response.data;
			}
			else return {
				articles: null,
				articlesCount: 0
			};
		},
		async getTagList() {
			const response = await ArticleService.getTags();
			if (response && response.data && response.data.tags) {
				return response.data.tags;
			}
			else return [];
		},
		async setPage(num) {
			console.log(num);
		},
		async setTag(tag) {
			this.loading = true;
			const response = await this.getArticles(this.articlesInSinglePage, 0, tag);
			if (response && response.data) {
				this.articleData = response.data;
			}
			this.loading = false;
		},
		async setFeed() {
			this.loading = true;
			const response = await this.getArticles(this.articlesInSinglePage, 0, undefined, true);
			if (response && response.data) {
				this.articleData = response.data;
			}
			this.loading = false;
		}
	},
	async created() {
		this.init();
	}
}
</script>
