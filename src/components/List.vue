<template>
	<div>
	<div class="container" style="border-bottom: 0.1rem solid #eee;">
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
					<div>
						<label class="control-label">提醒时间</label>
						<span class="font-gray" style="margin-left: 1rem;word-break: break-word;">{{item.meta.remindTime}}</span>
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
	import moment from 'moment'
	import {MessageBox} from 'mint-ui'
	export default{
		inject: ['reload'],
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
					MessageBox('提示', JSON.stringify(data.meta.msg))
					_this.items = []
				}else{
					_this.items = data.result
				}
			})
			.catch(function(err) {
				MessageBox('提示', JSON.stringify(err))
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
				data.remindTime = moment(item.remindTime).format('YYYY-MM-DD hh:mm')
				this.$router.push({name: 'admin', params: data})
			},
			del(item) {
				let _this = this
				MessageBox.confirm('此操作将永久删除该信息，是否继续？').then(action => {
					if(action === 'confirm'){
						_this.$axios.post('/note/del', _this.$qs.stringify({
							id: item._id
						}))
						.then(function(resp) {
							var data = resp.data;
							if(data.meta.code !== 'success'){
								MessageBox('提示', JSON.stringify(data.meta.msg))
							}else{
								MessageBox('提示', '操作执行成功')
								_this.reload()
								// _this.$router.push({name: '/list', query: {_time: new Date().getTime()}})
							}
						})
						.catch(function(error) {
							MessageBox('提示', JSON.stringify(error))
						})
					}
				}).catch(() => {

				})
			}
		}
	}
</script>
<style>
	
</style>