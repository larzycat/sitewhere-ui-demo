<template>
<div style="background-color: #F5F5F5">
		<section>
			<v-toolbar  class="v-toolbar__content" style="height: 48px;" dense>
				<v-icon class="v-icon material-icons theme--light" >devices_other</v-icon>
				<v-toolbar-title>物计算</v-toolbar-title>
				<v-spacer/>
				<sw-navigation-action-button icon="plus" tooltip="物计算" style="padding-left: 885px;"  />
 			</v-toolbar>
		</section>
		<section class="monitoringpoint">
			<section style="margin: 15px 20px 0 10px;">
				<div style="padding-top: 5px;">
					<webview id="foo" src="http://39.100.14.20:9390/editor" style="display:inline-flex; width:100%; height:500px" allowpopups ></webview>   
				</div>
			</section>
		</section>
	</div>
</template>

<script>
export default {
	data() {
		return {
			basePath:''
		}
	},
	methods:{
		 
	},
	mounted() {
		this.timeDefaultShow = new Date();
		this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
		let get = this.$store.getters;
		this.basePath=get.protocol+'://'+get.server+':'+get.port;
		 
	}
}

</script>

<style lang="less">
	.monitoringpoint{
		.el-pagination{
			margin-top: 15px;
			margin-bottom: 25px;
			text-align: center;
			background-color: #F5F5F5;
		}
	}
</style>