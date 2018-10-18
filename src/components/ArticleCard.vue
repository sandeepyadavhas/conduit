<template>
	<div class="articlecard">
		<h3>{{article.title}}</h3>
		{{new Date(article.createdAt).toDateString()}}
		<br>
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
	</div>
</template>

<script>
import Heart from "@/components/Heart.vue";


export default {
	name: 'articlecard',
	props: {
		article: Object
	},
	components: {
		Heart
	}
}
</script>
