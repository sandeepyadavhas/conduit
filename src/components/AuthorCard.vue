<template>
	<div class="authorCard">
		<router-link
			:to="/profile/+author.username"
		><img class="profile-pic" :src="author.image">{{author.username}}</router-link>
	</div>
</template>

<script>
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
.profile-pic {
	height: 1.5em;
	widows: auto;
	border-radius: 50%;
}
</style>
