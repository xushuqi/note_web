<template>
	<div class="container">
		<div class="row">
			<div class="noteId col-sm-12">
				<div class=".form-horizontal">
					<div class="form-group">
						<div class="col-sm-11">
							<p style="float:none;font-size:2rem;font-family:cursive;">用户信息管理</p>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<input type="text" class="form-control" placeholder="用户名" v-model="name" disabled="disabled">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<input type="password" class="form-control" placeholder="密码  (如不填则表示使用原密码)" v-model="password">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<input type="password" class="form-control" placeholder="确认密码  (如不填则表示使用原密码)" v-model="rePassword">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<input type="text" class="form-control" placeholder="手机号" v-model="phone">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<button class="btn btn-info" type="button" @click="submitUser">提交</button>
							<button class="btn btn-info" type="button" style="margin-left: 2rem;" @click="cancel">取消</button>
							<button class="btn btn-danger" type="button" style="margin-left: 2rem;" @click="logout">注销</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data() {
			return {
				name: '',
				password: '',
				rePassword: '',
				phone: ''
			}
		},
		mounted: function() {
			let _this = this
			_this.$axios.post('/user/info', _this.$qs.stringify({
				id: sessionStorage.userId
			}))
			.then(function(resp) {
				var data = resp.data;
				if(data.meta.code !== 'success'){
					this.$Message.warning(JSON.stringify(data.meta.msg))
					_this.name = ''
					_this.password = ''
					_this.rePassword = ''
					_this.phone = ''
				}else{
					data.result.password = ''
					_this.name = data.result.name
					_this.phone = data.result.phone
				}
			})
			.catch(function(err) {
				this.$Message.warning(JSON.stringify(err))
				_this.name = ''
				_this.password = ''
				_this.rePassword = ''
				_this.phone = ''
			})
		},
		methods: {
			submitUser() {
				let _this = this
				let password = _this.password.trim()
				let rePassword = _this.rePassword.trim()
				let phone = typeof _this.phone !== 'undefined' ? _this.phone.trim() : ''
				if((password.length != 0 || rePassword.length != 0) && password != rePassword){
					_this.$Message.warning('确认密码和密码不一致，请检查')
					return
				}
				if(phone.length == 0){
					_this.$Message.warning('请填写手机号，以用于事件提醒时发生短信')
					return
				}
				var reg = /^1[3|4|5|7|8][0-9]{9}$/
				if(phone !== '' && !reg.test(phone)){
					_this.$Message.warning('手机号不正确')
					return
				}
				var data = {
					id: sessionStorage.userId,
					phone: phone
				}
				password !== '' ? data.password = password : data.password = undefined
				_this.$axios.post('/user/update', _this.$qs.stringify(data))
				.then(function(resp) {
					var data = resp.data;
					if(data.meta.code !== 'success'){
						_this.$Message.warning(JSON.stringify(data.meta.msg))
					}else{
						sessionStorage.phone = data.result.phone
						_this.$Message.warning('操作执行成功')
						_this.$router.push({name: 'list', params: {userName: sessionStorage.userName}})
					}
				})
				.catch(function(err) {
					_this.$Message.warning(JSON.stringify(err))
				})
			},
			cancel() {
				this.$router.push({name: 'list', params: {userName: sessionStorage.userName}})
			},
			logout() {

			}
		}
	}
</script>

<style>
	
</style>