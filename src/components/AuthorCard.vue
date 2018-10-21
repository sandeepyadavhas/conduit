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
	},
	methods: {
	}
}
</script>

<style>
.profile-pic {
	height: 1.5em;
	widows: auto;
	border-radius: 50%;
}
.authorCard {
	display: inline;
	margin-right: 30px;
}
</style>
