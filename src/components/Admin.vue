<template>
	<div class="container">
		<div class="row">
			<div class="noteId col-sm-12">
				<div class=".form-horizontal">
					<div class="form-group">
						<div class="col-sm-11">
							<input type="text" class="form-control" placeholder="标题" v-model="note.title">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<textarea class="form-control" placeholder="内容" style="width: 100%;height: 20rem;" v-model="note.content"></textarea>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<input type="text" class="form-control" placeholder="提醒手机号" maxlength="11" v-model="note.phone">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<Row>
								<Col span="12" style="width: 100%;">
									<DatePicker :value="note.remindTime" format="yyyy-MM-dd hh:mm" type="datetime" placeholder="提醒时间" style="width: 100%;font-size: 1rem;" :options="options3" v-model="note.remindTime"></DatePicker>
								</Col>
							</Row>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<button class="btn btn-info" type="button" @click="submitNote(note._id)">提交</button>
							<button class="btn btn-info" type="button" style="margin-left: 2rem;" @click="cancel">取消</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	import moment from 'moment'
	export default{
		data() {
			let item = this.$route.params
			return {
				note: {
					_id: item.id,
					title: '',
					content: '',
					remindTime: '',
					phone: sessionStorage.phone
				},
				options3: {
					disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
				}
			}
		},
		mounted: function() {
			let _this = this
			let item = this.$route.params
			let noteId = item.id
			if(noteId === undefined){
				return
			}
			var data = {
				id: noteId
			}
			_this.$axios.post('/note/findById', _this.$qs.stringify(data))
			.then(function(resp) {
				var data = resp.data;
				if(data.meta.code !== 'success'){
					_this.$Message.warning(JSON.stringify(data.meta.msg))
					_this.note = {
						_id: '',
						content: '',
						remindTime: ''
					}
				}else{
					_this.note = data.result
					if(_this.note.phone == '')
						_this.note.phone = sessionStorage.phone
				}
			})
			.catch(function(error) {
				_this.$Message.warning(JSON.stringify(error))
			})
		},
		methods: {
			submitNote() {
				var _this = this
				var _id = _this.note._id
				var title = _this.note.title.trim()
				var content = _this.note.content.trim()
				var phone = _this.note.phone
				var remindTime = _this.note.remindTime
				if(remindTime == 'Invalid date')
					remindTime = ''
				if(title.length > 30){
					_this.$Message.warning('标题长度不能大于30')
					return
				}
				var reg = /^1[3|4|5|7|8][0-9]{9}$/
				if(phone !== '' && !reg.test(phone)){
					_this.$Message.warning('手机号不正确')
					return
				}
				var data = {
					userId: sessionStorage.userId,
					userName: sessionStorage.userName,
					phone: phone,
					_id: _id,
					title: title,
					content: content,
					remindTime: remindTime !== '' ? moment(remindTime).format('YYYY-MM-DD HH:mm') : ''
				}
				_this.$axios.post('/note/admin', _this.$qs.stringify(data))
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
			cancel() {
				this.$router.push({name: 'list'})
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