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
					:title="'Follow @'+profile.username"
					v-bind:class="{ followed : followed}"
					v-on:click="followUser()"
				>
					<i class="fa fa-user-plus" aria-hidden="true"></i>
				</button>
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
		profile: null,
		followed: false
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
		async followUser() {
			this.followed = !this.followed;
		}
	},
	async created() {
        this.profile = await this.getProfile(this.username);
		this.loading = false;
	}
};
</script>

<style>
.profile-img {
	border-radius: 50%;
}
.followed {
	background-color: lightgreen;
	color: white;
}
</style>
