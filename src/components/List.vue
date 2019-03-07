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
						<button type="button" class="btn btn-danger del" style="margin-left: 2rem;" @click="del(item)">删除</button>
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
	import {Message} from 'element-ui'
	export default{
		inject: ['reload'],//注入reload方法
		data(){
			return {
				items: []
			}
		},
		mounted: function() {
			let _this = this
			_this.$axios.post('/note/list')
			.then(function(resp) {
				var data = resp.data;
				if(data.meta.code !== 'success'){
					Message({
						showClose: true,
						message: JSON.stringify(data.meta.msg),
						type: 'error'
					})
					_this.items = []
				}else{
					_this.items = data.result
				}
			})
			.catch(function(err) {
				Message({
					showClose: true,
					message: JSON.stringify(err),
					type: 'error'
				})
				_this.items = []
			})
		},
		methods: {
			addNew() {
				this.$router.push({name: 'admin', params: {}})
			},
			edit(item) {
				let data = {}
				data.id = item._id
				data.title = item.title
				data.content = item.content
				this.$router.push({name: 'admin', params: data})
			},
			del(item) {
				let _this = this
				_this.$axios('/note/del', _this.$qs.stringify({
					id: item._id
				}))
				.then(function(resp) {
					var data = resp.data;
					if(data.meta.code !== 'success'){
						Message({
							showClose: true,
							message: JSON.stringify(data.meta.msg),
							type: 'error'
						})
					}else{
						Message({
							showClose: true,
							message: '操作执行成功',
							type: 'error'
						})
						this.reload()
					}
				})
				.catch(function(error) {
					Message({
						showClose: true,
						message: JSON.stringify(error),
						type: 'error'
					})
				})
			}
		}
	}
</script>
<style>
	
</style>