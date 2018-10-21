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
				
				<div v-if="articleLoading" class="loader"></div>
				<div v-else>
					<div class="btn-group">
						<button class="btn btn-outline-primary" v-on:click="getAuthorArticles(false)">Articles Posted</button>
						<button class="btn btn-outline-primary" v-on:click="getAuthorArticles(true)">Favorite Articles</button>
					</div>
					<h3>{{(favoritedArticlesShowing)? 'Favorited Articles' : 'Articles Posted'}}</h3>
					<h5>Page {{selectedPage}}</h5>
					<ArticleList 
						:articleData="articleData"
						:articlesInSinglePage="articlesInSinglePage"
						:selectedPage="selectedPage"
						v-on:set-page="setPage($event)"
					></ArticleList>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import UserService from "@/services/UserService";
import ArticleList from "@/components/ArticleList.vue";
import ArticleService from "@/services/ArticleService";

export default {
	name: "profile",
	components: {
		ArticleList
	},
	data: () => {return {
		loading: true,
		profile: null,
		articleData: {
			articles: null,
			articlesCount: 0
		},
		articlesInSinglePage: 5,
		selectedPage: 0,
		favoritedArticlesShowing: false,
		articleLoading: true
	}},
	computed: {
		username() {
			return this.$route.params.username;
		}
	},
	methods: {
		async getAuthorArticles(favorited) {
			this.articleLoading = true;

			const response = await ArticleService.getPostByAuthor(this.username, this.articlesInSinglePage, 0, favorited);

			if (response && response.data) {
				this.articleData = response.data;
			}
			else this.articleData = {
				articles: null,
				articlesCount: 0
			};

			this.favoritedArticlesShowing = favorited;
			this.selectedPage = 1;

			this.articleLoading = false;
		},
		async setPage(num) {
			this.articleLoading = true;

			let limit = this.articlesInSinglePage;
			let offset = (num - 1) * this.articlesInSinglePage;

			const response = await ArticleService.getPostByAuthor(this.username, limit, offset, this.favoritedArticlesShowing);
			
			if (response && response.data) {
				this.articleData = response.data;
			}
			else this.articleData = {
				articles: null,
				articlesCount: 0
			};

			this.selectedPage = num;

			this.articleLoading = false;
		},
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

			this.profile = await this.getProfile(this.username);
			await this.getAuthorArticles(false);

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
