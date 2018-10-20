<template>
	<div class="logout">
		<p>Thanks for visiting {{username}}!!</p>
		<p v-if="loggedOut">Redirecting in {{count}}...</p>
	</div>
</template>

<script>
// @ is an alias to /src
import UserService from '@/services/UserService'

export default {
	name: 'logout',
	components: {},
	data: () => { return{
		username: '',
		loggedOut: false,
		count: 5
	}},
	methods: {
		async logout() {
			await UserService.logout();
			this.$root.user = null;
			console.log('logged out');
		}
	},
	computed: {
		user() {
			return this.$root.user;
		}
	},
	async created() {
		if (!this.$root.user) {
			this.$router.push('/login');
		}
		this.username = this.$root.user.username;

		await this.logout();
		this.loggedOut = true;

		setInterval(() => {
			if (this.count == 0) {
				location.href = '/';
			}
			else {
				this.count -= 1;
			}
		}, 1000);
	}
}
</script>

<style>
</style>
