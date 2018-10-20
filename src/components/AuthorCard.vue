<template>
	<div class="authorCard">
		<router-link
			:to="/profile/+author.username"
		>{{author.username}}</router-link>
		<button
			v-bind:class="{ followed : author.following }"
			class="btn btn-outline-primary follow-btn"
			v-on:click="followUnfollow"
		>{{followUnfollowText}}</button>
	</div>
</template>

<script>
import UserService from '@/services/UserService';

export default {
	name: 'authorCard',
	props: {
		author: Object
	},
	computed: {
		followUnfollowText() {
			return (this.author.following) ? 'Unfollow' : 'Follow' ;
		}
	},
	methods: {
		async followUnfollow(){
			this.$parent.loading = true;

			const response = await ((this.author.following)? UserService.unfollow(this.author.username) : UserService.follow(this.author.username));
			if (response && response.data && response.data.profile) {
				this.setAuthor(this.author, response.data.profile);
			}

			this.$parent.loading = false;
		},
		setAuthor(author, newAuthor) {
			Object.keys(newAuthor).forEach(function(key) {
				author[key] = newAuthor[key];
			});
		}
	}
}
</script>

<style>
.follow-btn {
	padding: 0 5px;
	margin: 5px;
}
.followed {
	background-color: #007bff !important;
	color: white;
}
</style>
