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
							<input type="text" class="form-control" placeholder="提醒时间" v-model="remindTime" @click="openPicker">
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
		<mt-datetime-picker
			ref="picker"
			type="datetime"
			v-model="remindTime"
			@confirm="handleConfirm">
		</mt-datetime-picker>
	</div>
</template>
<script>
	import moment from 'moment'
	import {MessageBox} from 'mint-ui'
	export default{
		data() {
			let item = this.$route.params
			item = item.title ? item : {id: '', title: '', content: '', remindTime: ''}
			if(item.remindTime == undefined){
				item.remindTime =  moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
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
					MessageBox('提示', '标题长度不能大于30')
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
						MessageBox('提示', JSON.stringify(data.meta.msg))
					}else{
						MessageBox.alert('操作执行成功').then(function() {
							_this.$router.push({name: 'list'})
						})
					}
				})
				.catch(function(error) {
					MessageBox('提示', JSON.stringify(error))
				})
			},
			cancel() {
				this.$router.push({name: 'list'})
			},
			openPicker() {
				this.$refs.picker.open()
			},
			handleConfirm(date) {
				let datetime = moment(date).format('YYYY-MM-DD hh:mm')
				this.remindTime = datetime.toString()
			}
		}
	}
</script>

<style>
	
</style>