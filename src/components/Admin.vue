<template>
	<div class="container">
		<div class="row">
			<div class="noteId col-sm-12">
				<div class=".form-horizontal">
					<div class="form-group">
						<div class="col-sm-11">
							<input type="text" name="noteTitle" id="noteTitle" class="form-control" placeholder="标题" style="height: 3rem;line-height: 3rem;">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<textarea name="noteContent" id="noteContent" class="form-control" placeholder="内容" style="width: 100%;height: 32rem;"></textarea>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-11">
							<button class="btn btn-info" id="submit" type="button" @click="submit">提交</button>
							<button class="btn btn-info" id="cancel" type="button" style="margin-left: 2rem;">取消</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		methods: {
			submit() {
				this.$router.push('list')
			}
		}
	}
</script>

<style>
	
</style>