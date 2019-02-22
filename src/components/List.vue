<template>
	<div>
	<div class="container">
		<div class="row">
			<div class="panel panel-default col-sm-12">
				<div class="panel-body col-sm-12" style="text-align: right;">
					<label class="control-label">
						<button type="button" class="btn btn-info" id="addNew">新增</button>
					</label>
				</div>
			</div>
		</div>
	</div>
	<div class="container" id="wrapper" style="overflow: auto;">
		<div class="row">
			<div id="pullDown">
				<span class="pullDownLabel" id="pullDown-msg" style="display: none;">下拉刷新页面</span>
			</div>
			<div v-for="item of items" v-bind:key="item._id" class="panel panel-default col-sm-12" style="padding-bottom: 1rem;">
				<div class="panel-body col-sm-12" style="text-align: left;border: 0.1rem solid #eee;padding: 0.5rem">
					<div>
						<label class="control-label">主题</label>
						<span class="font-gray" style="margin-left: 1rem;">{{item.title}}</span>
					</div>
					<div>
						<label class="control-label">创建时间</label>
						<span class="font-gray" style="margin-left: 1rem;">{{item.meta.createAt}}</span>
					</div>
					<div>
						<label class="control-label">内容</label>
						<span class="font-gray" style="margin-left: 1rem;word-break: break-word;">{{item.content}}</span>
					</div>
					<div style="text-align: right;">
						<button type="button" class="btn btn-info edit">编辑</button>
						<button type="button" class="btn btn-danger del" style="margin-left: 2rem;">删除</button>
					</div>
				</div>
			</div>
			<div id="pullUp">
				<span class="pullDownLabel pullUp-msg"></span>
			</div>
		</div>
	</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				items: [
					{_id: '123', title: 'abc', content: 'abc123', meta:{createAt: '2019-2-22'}},
					{_id: '456', title: 'bbc', content: 'bbc123bbc123bbc123bbc123bbc123bbc123bbc123bbc123bbc123bbc123bbc123bbc123bbc123', meta:{createAt: '2019-2-21'}}
				]
			}
		},
		methods: {
			edit() {
				this.$router.push('admin')
			}
		}
	}
</script>
<style>
	
</style>