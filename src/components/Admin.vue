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
							<button class="btn btn-info" type="button" @click="submitNote(id)">提交</button>
							<button class="btn btn-info" type="button" style="margin-left: 2rem;">取消</button>
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
				this.$router.push({name: 'list'})
			}
		}
	}
</script>

<style>
	
</style>