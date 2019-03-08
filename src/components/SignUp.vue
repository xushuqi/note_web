<template>
	<div id="app">
		<div class="container">
			<div class="row">
				<div style="width:100%;float:right;">
					<div class="form-horizontal">
						<div class="form-group" style="margin-top:1rem;text-align:center;">
							<div class="col-sm-12">
								<p style="float:none;font-size:3rem;font-family:cursive;">记事本</p>
							</div>
						</div>
						<div class="form-group" style="margin-top:1rem;">
							<div class="col-sm-12">
								<input type="text" name="userName" class="form-control" id="userName" placeholder="用户名"
								style="font-family:cursive;" v-model="userName"/>
							</div>
						</div>
						<div class="form-group" style="margin-top:1rem;">
							<div class="col-sm-12">
								<input type="password" name="password" class="form-control" id="password" placeholder="密码"
								style="font-family:cursive;" v-model="password"/>
							</div>
						</div>
						<div class="form-group" style="margin-top:1rem;">
							<div class="col-sm-12">
								<input type="password" name="rePassword" class="form-control" id="rePassword" placeholder="确认密码"
								style="font-family:cursive;" v-model="rePassword"/>
							</div>
						</div>
						<div class="form-group" style="margin-top:1rem;text-align:center;">
							<div class="col-sm-12">
								<div class="" style="float:none;font-family:cursive;">
									<button class="btn btn-info" id="signUp" style="width: 12rem;" @click="signUp">注册</button>
									<span style="vertical-align: middle;">/</span>
									<router-link to="signIn" class="btn" id="signIn">登录</router-link>
								</div>
							</div>
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
		name: 'app',
		data() {
			return {
				userName: '',
				password: '',
				rePassword: ''
			}
		},
		methods: {
			signUp() {
				if(this.userName.trim() == ''){
					MessageBox.alert('请输入用户名').then(action => {

					})
					this.userName = this.userName.trim();
					return;
				}
				if(this.password.trim() == ''){
					MessageBox.alert('请输入密码').then(action => {
						
					})
					return;
				}
				if(this.rePassword.trim() == ''){
					MessageBox.alert('请输入确认密码').then(action => {
						
					})
					return;
				}
				if(this.password !== this.rePassword){
					MessageBox.alert('确认密码和密码不一致，请检查').then(action => {
						
					})
					return;
				}
				this.$axios.post('/user/signUp', this.$qs.stringify({
					name: this.userName,
					password: this.password
				}))
				.then(function(resp) {
					var data = resp.data;
					if(data.meta.code !== 'success'){
						MessageBox.alert(JSON.stringify(data.meta.msg)).then(action => {
							
						})
					}else{
						this.$router.push({name: 'list', params: {userName: data.result.name}})
					}
				}.bind(this))
				.catch(function(error) {
					MessageBox.alert(JSON.stringify(error)).then(action => {
						
					})
				})
			}
		}
	}
</script>

<style>
	
</style>