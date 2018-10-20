<template>
	<div class="register container">
		<form v-on:submit.prevent="register">

			<div class="form-group">
				<label for="email">Email address</label>
				<input 
					type="text"
					v-model="email"
					name="email"
					placeholder="Enter Email"
					class="form-control"
					id="email"
					aria-describedby="emailHelp"
				/>
			</div>

			<div class="form-group">
				<label for="username">Username</label>
				<input 
					type="text"
					v-model="username"
					name="username"
					placeholder="Enter Username"
					class="form-control"
					id="username"
				/>
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input 
					type="password"
					v-model="password"
					name="password"
					placeholder="Enter Password"
					class="form-control"
					id="password"
				/>
			</div>
			<div class="text-center"><input type="submit"><br>{{status}}</div>
		</form>
	</div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
	name: 'Register',
	data: () => { return{
		username: '',
		email: '',
		password: '',
		status: 'status'
	}},
	methods: {
		async register() {
			this.status = 'loading';
			const response = await UserService.register(this.username, this.email, this.password);
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
