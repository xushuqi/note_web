<template>
	<div>
	<div class="container">
		<div class="row">
			<div class="panel panel-default col-sm-12">
				<div class="panel-body col-sm-12" style="text-align: right;">
					<label class="control-label">
						<button type="button" class="btn btn-info" id="addNew">新增</button>
					</label>
				</div>
			</div>
		</div>
	</div>
	<div class="container" id="wrapper" style="overflow: auto;height: 120rem;">
		<div class="row">
			<div id="pullDown">
				<span class="pullDownLabel" id="pullDown-msg" style="display: none;">下拉刷新页面</span>
			</div>
			<div class="panel panel-default col-sm-12">
				<div class="panel-body col-sm-12" style="text-align: left;">
					<div>
						<label class="control-label">主题</label>
						<span style="margin-left: 1rem;"></span>
					</div>
					<div>
						<label class="control-label">创建时间</label>
						<span style="margin-left: 1rem;"></span>
					</div>
					<div>
						<label class="control-label">内容</label>
						<span style="margin-left: 1rem;word-break: break-word;"></span>
					</div>
					<div style="text-align: right;">
						<button type="button" class="btn btn-info edit">编辑</button>
						<button type="button" class="btn btn-danger del" style="margin-left: 2rem;">删除</button>
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
	export default{
		methods: {
			edit() {
				this.$router.push('admin')
			}
		}
	}
</script>
<style>
	
</style>