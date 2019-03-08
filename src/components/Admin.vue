<template>
	<div class="container">
		<div class="row">
			<div class="noteId col-sm-12">
				<div class=".form-horizontal">
					<div class="form-group">
						<div class="col-sm-11">
							<input type="text" class="form-control" placeholder="标题" v-model="title">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<textarea class="form-control" placeholder="内容" style="width: 100%;height: 20rem;" v-model="content"></textarea>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<input type="text" class="form-control" placeholder="提醒时间" v-model="remindTime">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<button class="btn btn-info" type="button" @click="submitNote(id)">提交</button>
							<button class="btn btn-info" type="button" style="margin-left: 2rem;" @click="cancel">取消</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {MessageBox} from 'mint-ui'
	export default{
		data() {
			let item = this.$route.params
			item = item.title ? item : {id: '', title: '', content: '', remindTime: ''}
			if(item.remindTime == undefined){
				item.remindTime = '';
			}
			return item
		},
		methods: {
			submitNote() {
				let _this = this
				let id = _this.id
				let title = _this.title.trim()
				let content = _this.content.trim()
				let remindTime = _this.remindTime
				if(title.length > 30){
					MessageBox.alert('标题长度不能大于30').then(action => {
						
					})
					return;
				}
				_this.$axios.post('/note/admin', _this.$qs.stringify({
					id: id,
					title: title,
					content: content,
					remindTime: remindTime
				}))
				.then(function(resp) {
					var data = resp.data;
					if(data.meta.code !== 'success'){
						MessageBox.alert(JSON.stringify(data.meta.msg)).then(action => {
							
						})
					}else{
						MessageBox.alert('操作执行成功').then(action => {
							_this.$router.push({name: 'list'})
						})
					}
				})
				.catch(function(error) {
					MessageBox.alert(JSON.stringify(error)).then(action => {
						
					})
				})
			},
			cancel() {
				this.$router.push({name: 'list'})
			}
		}
	}
</script>

<style>
	
</style>