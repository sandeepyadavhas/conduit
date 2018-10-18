<template>
	<div class="login">
		<form v-on:submit.prevent="login">
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
import UserService from '@/services/UserService'

export default {
	name: 'Login',
	data: () => { return{
		email: '',
		password: '',
		status: 'status'
	}},
	methods: {
		async login() {
			this.status = 'loading';
			const response = await UserService.login(this.email, this.password);
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
