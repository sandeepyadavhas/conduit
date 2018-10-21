<template>
	<div class="heart" v-bind:class="{liked: favoriteData.favorited}">
		<!-- <i class="fas fa-heart"></i> -->
		<button 
			class="btn btn-sm btn-success like-button" 
			v-on:click="$emit('like-post', slug)"
		>
			<i class="fas fa-heart"></i>
			{{favoriteData.favoritesCount}}
		</button>
	</div>
</template>


<script>
export default {
	name: 'Heart',
	props: {
		favoriteData: Object,
		slug: String
	},
	data: () => { return {
	}},
	created() {
	}
}
</script>
<style>
	.heart{
		display: inline-block;
	}
	.heart :hover {
		color: white;
		background-color: #5CB85C;
	}
	.liked {
		color: white;
		background-color: #5CB85C;
	}
	.liked > .like-button {
		color: white;
	}
	.like-button {
		color: #5CB85C;
		background-color: transparent;
		border-color: #5CB85C !important;
	}
</style>

