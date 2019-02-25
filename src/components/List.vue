<template>
	<div>
	<div class="container">
		<div class="row">
			<div class="panel panel-default col-sm-12">
				<div class="panel-body col-sm-12" style="text-align: right;">
					<label class="control-label">
						<button type="button" class="btn btn-info" @click="addNew">新增</button>
						<button type="button" class="btn btn-info" style="margin-left: 2rem;">导出</button>
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
			<div v-for="item of items" v-bind:key="item.id" class="panel panel-default col-sm-12" style="padding-bottom: 1rem;">
				<div class="panel-body col-sm-12" style="text-align: left;border: 0.1rem solid #eee;padding: 0.5rem">
					<div>
						<label class="control-label">标题</label>
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
						<button type="button" class="btn btn-info edit" @click="edit(item)">提醒</button>
						<button type="button" class="btn btn-info edit" @click="edit(item)" style="margin-left: 2rem;">编辑</button>
						<button type="button" class="btn btn-danger del" style="margin-left: 2rem;" @click="del(item.id)">删除</button>
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
		inject: ['reload'],//注入reload方法
		data(){
			this.$axios.get('/list')
				.then(function(resp) {
					alert(resp)
				})
				.catch(function(err) {
					alert(err)
				})
			return {
				items: [
					{id: '1', title: '测试title1', content: '测试content1', meta:{createAt: '2019-2-22'}},
					{id: '2', title: 'test', content: '测试content信息测试content信息测试content信息测试content信息测试content信息测试content信息测试content信息', meta:{createAt: '2019-2-21'}}
				]
			}
		},
		methods: {
			addNew() {
				this.$router.push('admin')
			},
			edit(item) {
				let data = {}
				data.id = item.id
				data.title = item.title
				data.content = item.content
				this.$router.push({name: 'admin', params: data})
			},
			del() {
				//alert(id)
				this.reload()
			}
		}
	}
</script>
<style>
	
</style>