<template>
	<div class="heart" v-bind:class="{liked: isFavorite}">
		<!-- <i class="fas fa-heart"></i> -->
		<button 
			class="btn btn-sm btn-success like-button" 
			v-on:click="$emit('like-post', slug); isFavorite = !isFavorite;"
		>
			<i class="fas fa-heart"></i>
			{{favoritesCount}}
		</button>
	</div>
</template>


<script>
export default {
	name: 'Heart',
	props: {
        favorited: Boolean,
		favoritesCount: Number,
		slug: String
	},
	data: () => { return {
		isFavorite: false
	}}
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

