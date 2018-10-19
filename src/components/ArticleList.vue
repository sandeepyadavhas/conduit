<template>
	<div class="article">
		<p v-if="articleData.articlesCount == 0">No Articles</p>
		<ul>
			<li v-for="(article, index) in articleData.articles" :key="index">
				<ArticleCard :article="article"></ArticleCard>
			</li>
		</ul>
		<PaginationNumbering 
			:articlesCount="articleData.articlesCount"
			:articlesInSinglePage="articlesInSinglePage"
			:selectedPage="selectedPage"
			v-on:set-page="$emit('set-page', $event)"
		></PaginationNumbering>
	</div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
import PaginationNumbering from "@/components/PaginationNumbering.vue";

export default {
	name: 'articleList',
	props: {
		articleData: Object,
		articlesInSinglePage: Number,
		selectedPage: Number
	},
	components: {
		PaginationNumbering,
		ArticleCard
	}
}
</script>
