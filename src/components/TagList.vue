<template>
	<div class="TagList">
		<ul>
			<a v-for="(tag, index) in tags" :key="index" v-on:click="$emit('set-tag', tag)">
				<li>
					{{tag}}
				</li>
			</a>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'TagList',
	props: {
		tags: Array
	}
}
</script>

<style>
	ul > a {
		cursor: pointer;
	}
</style>
