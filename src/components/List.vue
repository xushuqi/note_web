<template>
	<div>
	<div class="container" style="border-bottom: 0.1rem solid #eee;">
		<div class="row">
			<div class="panel panel-default col-sm-12">
				<div class="panel-body col-sm-12" style="text-align: right;">
					<label class="control-label">
						<button type="button" class="btn btn-info" @click="addNew">新增</button>
						<button type="button" class="btn btn-info" style="margin-left: 2rem;" @click="exportExcel">导出</button>
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
						<label class="control-label">标题</label>
						<span class="font-gray" style="margin-left: 1rem;">{{item.title}}</span>
					</div>
					<div>
						<label class="control-label">创建时间</label>
						<span class="font-gray" style="margin-left: 1rem;">{{item.createAt}}</span>
					</div>
					<div>
						<label class="control-label">内容</label>
						<span class="font-gray" style="margin-left: 1rem;word-break: break-word;">{{item.content}}</span>
					</div>
					<div>
						<label class="control-label">提醒时间</label>
						<span class="font-gray" style="margin-left: 1rem;word-break: break-word;">{{item.remindTime}}</span>
					</div>
					<div>
						<label class="control-label">手机号</label>
						<span class="font-gray" style="margin-left: 1rem;word-break: break-word;">{{item.phone}}</span>
					</div>
					<div style="text-align: right;">
						<button type="button" class="btn btn-info edit" @click="remind(item)">提醒</button>
						<button type="button" class="btn btn-info edit" @click="edit(item)" style="margin-left: 2rem;">编辑</button>
						<i-button class="btn btn-danger" @click="delConfirm(item)" style="margin-left: 2rem;">删除</i-button>
					</div>
				</div>
			</div>
			<div id="pullUp">
				<span class="pullDownLabel pullUp-msg"></span>
			</div>
			<modal v-model="showDelConfirm">
				<p slot="header" style="color: #f60;text-align: center;">
					<icon type="ios-information-circle"></icon>
					<span>警告</span>
				</p>
				<div style="text-align: center;">
					<p>此操作将永久删除该信息，是否继续？</p>
				</div>
				<div slot="footer">
					<i-button type="error" size="large" @click="delOk">删除</i-button>
				</div>
			</modal>
		</div>
	</div>
	</div>
</template>
<script>
	export default{
		inject: ['reload'],
		data(){
			return {
				showDelConfirm: false,
				items: []
			}
		},
		mounted: function() {
			let _this = this
			_this.$axios.post('/note/list', _this.$qs.stringify({
				_id: sessionStorage.userId
			}))
			.then(function(resp) {
				var data = resp.data;
				if(data.meta.code !== 'success'){
					this.$Message.warning(JSON.stringify(data.meta.msg))
					_this.items = []
				}else{
					_this.items = data.result
				}
			})
			.catch(function(err) {
				this.$Message.warning(JSON.stringify(err))
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
				this.$router.push({name: 'admin', params: data})
			},
			delConfirm(item) {
				let _this = this
				_this.showDelConfirm = true
				sessionStorage.note = JSON.stringify(item)
			},
			delOk() {
				let _this = this
				var note = JSON.parse(sessionStorage.note)
                _this.$axios.post('/note/del', _this.$qs.stringify({
					id: note._id
				}))
				.then(function(resp) {
					var data = resp.data;
					if(data.meta.code !== 'success'){
						_this.$Message.warning(JSON.stringify(data.meta.msg))
					}else{
						_this.$Message.warning('操作执行成功')
						_this.reload()
					}
				})
				.catch(function(error) {
					_this.$Message.warning(JSON.stringify(error))
				})
            },
            remind(item) {
				let _this = this
				let id = item._id
				let content = item.content.trim()
				let remindTime = item.remindTime.trim()
				let phone = item.phone
				if(!phone){
					_this.$Message.warning('请先设置手机号')
					return
				}
				if(remindTime == ''){
					_this.$Message.warning('请先设置提醒时间')
					return
				}
				if(new Date(remindTime) < new Date()){
					_this.$Message.warning('提醒时间已过期，请重新设置')
					return
				}
				_this.$axios.post('/note/remind', _this.$qs.stringify({
					noteId: id,
					userId: sessionStorage.userId,
					userName: sessionStorage.userName,
					phone: phone,
					content: content,
					remindTime: remindTime
				}))
				.then(function(resp) {
					var data = resp.data;
					if(data.meta.code !== 'success'){
						_this.$Message.warning(JSON.stringify(data.meta.msg))
					}else{
						_this.$Message.warning('操作执行成功')
						_this.$router.push({name: 'list'})
					}
				})
				.catch(function(error) {
					_this.$Message.warning(JSON.stringify(error))
				})
            },
            exportExcel() {
				let _this = this
                _this.$axios.get('/note/download')
				.then(function(resp) {
					var data = resp.data;
					if(data.meta.code !== 'success'){
						_this.$Message.warning(JSON.stringify(data.meta.msg))
					}else{
						_this.$Message.warning('操作执行成功')
						_this.reload()
					}
				})
				.catch(function(error) {
					_this.$Message.warning(JSON.stringify(error))
				})
            }
		}
	}
</script>
<style>
	
</style>