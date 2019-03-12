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
							<input type="text" class="form-control" placeholder="用户名" v-model="name">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<input type="password" class="form-control" placeholder="密码" v-model="password">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<input type="password" class="form-control" placeholder="确认密码" v-model="rePassword">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<input type="text" class="form-control" placeholder="手机号" v-model="phone">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<button class="btn btn-info" type="button" @click="submitUser()">提交</button>
							<button class="btn btn-info" type="button" style="margin-left: 2rem;" @click="cancel">取消</button>
							<button class="btn btn-danger" type="button" style="margin-left: 2rem;">注销</button>
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
			let item = this.$route.params
			return item
		},
		methods: {
			submitNote() {
				alert('标题长度不能大于30')
				//this.$router.push({name: 'list'})
			},
			cancel() {
				this.$router.push({name: 'list'})
			}
		}
	}
</script>

<style>
	
</style>