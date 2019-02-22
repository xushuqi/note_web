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
								<input type="text" name="userName" class="form-control" id="userName" placeholder="用户名"/>
							</div>
						</div>
						<div class="form-group" style="margin-top:1rem;">
							<div class="col-sm-12">
								<input type="password" name="password" class="form-control" id="password" placeholder="密码"/>
							</div>
						</div>
						<div class="form-group" style="margin-top:1rem;text-align:center;">
							<div class="col-sm-12">
								<div class="" style="float:none;font-family:cursive;">
									<button class="btn btn-info" id="signIn" style="width: 12rem;">登录</button>
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
	
</script>

<style>
	
</style>