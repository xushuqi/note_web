<template>
	<div id="app">
		<div class="container">
			<div class="row">
				<div style="width:100%;height:45rem;float:right;">
					<div class="form-horizontal">
						<div class="form-group" style="margin-top:1rem;text-align:center;">
							<div class="col-sm-12">
								<p style="float:none;font-size:3rem;font-family:cursive;">记事本</p>
							</div>
						</div>
						<div class="form-group" style="margin-top:1rem;">
							<div class="col-sm-12">
								<input type="text" class="form-control" v-model="name" placeholder="用户名"/>
							</div>
						</div>
						<div class="form-group" style="margin-top:1rem;">
							<div class="col-sm-12">
								<input type="password" class="form-control" v-model="password" placeholder="密码"/>
							</div>
						</div>
						<div class="form-group" style="margin-top:1rem;text-align:center;">
							<div class="col-sm-12">
								<div class="" style="float:none;font-family:cursive;">
									<button class="btn btn-info" id="signIn" style="width: 12rem;" @click="signIn">登录</button>
									<span style="vertical-align: middle;">/</span>
									<router-link to="signUp" class="btn" id="signUp">注册</router-link>
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
				name: '',
				password: ''
			}
		},
		methods: {
			signIn: function() {

				this.$axios.post('/user/signIn', this.$qs.stringify({
					name: this.name,
					password: this.password
				}))
				.then(function(resp) {
					var data = resp.data;
					if(data.meta.code !== 'success'){
						MessageBox.alert(JSON.stringify(data.meta.msg)).then(action => {
							
						})
					}else{
						this.$router.push({name: 'list', params: {userName: data.result[0].name}})
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