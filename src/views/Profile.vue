<template>
	<div class="profile container">
		<div class="loader" v-if="loading"></div>
		<div class="main" v-if="profile">
			<div class="text-center">
				<img class="profile-img" :src="profile.image">
				<h3>{{profile.username}}</h3>
				<button 
					type="button"
					class="btn btn-outline-primaryy"
					data-toggle="tooltip"
					data-placement="top"
					:title="((profile.following)?'Unfollow':'Follow') + ' @'+profile.username"
					v-bind:class="{ followed : profile.following}"
					v-on:click="followUnfollow()"
				>
					<i class="fa fa-user-plus" aria-hidden="true"></i>
				</button>
				<p v-html="printWithNewLine(profile.bio)"></p>
			</div>
		</div>
	</div>
</template>

<script>
import UserService from "@/services/UserService";


export default {
	name: "profile",
	components: {},
	data: () => {return {
		loading: true,
		profile: null
	}},
	computed: {
		username() {
			return this.$route.params.username;
		}
	},
	methods: {
		async getProfile(username) {
			const response = await UserService.getProfile(username);
			if (response && response.data && response.data.profile) {
				return response.data.profile;
			}
			else return null;
		},
		async followUnfollow(){
			this.loading = true;

			const response = await ((this.profile.following)? UserService.unfollow(this.profile.username) : UserService.follow(this.profile.username));
			if (response && response.data && response.data.profile) {
				this.setProfile(this.profile, response.data.profile);
			}

			this.loading = false;
		},
		setProfile(profile, newProfile) {
			Object.keys(newProfile).forEach(function(key) {
				profile[key] = newProfile[key];
			});
		},
		printWithNewLine(str) {
			if (str) {
				return str.replace(/\n/g, '<br>');
			}
			else return '';
		},
		async init() {
			this.loading = true;
			console.log('created profile');
			this.profile = await this.getProfile(this.username);
			this.loading = false;
		}
	},
	async created() {
		this.init();
	},
	watch: {
		// '$route' (to, from) {
		'$route' () {
			this.init();
		}
	}
};
</script>

<style>
.profile-img {
	border-radius: 50%;
	height: 128px;
	width: auto;
	max-width: 128px;
}
.followed {
	background-color: lightgreen;
	color: white;
}
</style>
