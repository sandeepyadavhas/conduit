<template>
	<div class="register">
		<form v-on:submit.prevent="register">
		<input 
			type="text"
			v-model="username"
			name="username"
			placeholder="username"
		/> <br>
		<input 
			type="text"
			v-model="email"
			name="email"
			placeholder="email"
		/> <br>
		<input 
			type="password"
			v-model="password"
			name="password"
			placeholder="password"
		/> <br>
		<input type="submit"> <br>
		{{status}}
		</form>
	</div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
	name: 'Register',
	data: () => { return{
		username: 'a',
		email: 'b',
		password: 'c',
		status: 'status'
	}},
	methods: {
		async register() {
			this.status = 'loading';
			const response = await AuthenticationService.register(this.username, this.email, this.password);
			if (response && response.data && response.data.user) {
				this.status = response.data.user.username;
				localStorage.jwtToken = response.data.user.token;
				this.$root.user = response.data.user;
			}
			else {
				this.status = 'status';
			}
		}
	}
}
/* from
sandep01010
sandep01010@gmail.com
qwertyuiop
*/
</script>

<style scoped lang="scss">
</style>
