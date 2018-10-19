<template>
	<div class="PaginationNumbering">
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
		width: 90%;
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		margin: 0 auto;
	}
	ul > a > li{
		height: 25px;
		width: 25px;
		// margin: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		border:2px solid #5CB85C;
		border-radius: 5px;
		// margin-right: 8px;
	}
	ul > a{
		margin: 4px;
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
