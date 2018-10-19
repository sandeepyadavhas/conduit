<template>
	<div class="PaginationNumbering">
		<h3>PaginationNumbering {{selectedPage}}</h3>
		<ul>
			<a v-for="index in numberOfPages" :key="index" v-on:click="$emit('set-page', index)">
				<li v-bind:class="{ active: (index == selectedPage) }">
					{{index}}
				</li>
			</a>
		</ul>
	</div>
</template>



<script>
export default {
	name: 'PaginationNumbering',
	props: {
		articlesCount: Number,
		articlesInSinglePage: Number,
		selectedPage: Number
	},
	data: () => { return {}},
	computed: {
		numberOfPages() {
			return Math.ceil(this.articlesCount / this.articlesInSinglePage);
		}
	}

}
</script>

<style lang="scss" scoped>
	ul{
		width: 800px;
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		margin: 0 auto;
	}
	ul > a > li{
		height: 25px;
		width: 25px;
		margin-bottom: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		border:2px solid #5CB85C;
		border-radius: 5px;
		margin-right: 8px;
	}
	ul > a{
		cursor: pointer;
		text-decoration: none;
		color:#5CB85C;
		font-size: 12px;
		font-weight: bolder;
	}
	ul > a > li:hover {
		background: #ddd;
	}
	.active {
		background: #ddd;
	}
</style>
