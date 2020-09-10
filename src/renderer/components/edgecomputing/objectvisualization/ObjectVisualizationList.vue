<template>
	<div style="background-color: #F5F5F5;height: 100%">
		<section>
			<v-toolbar  class="v-toolbar__content" style="height: 48px;" dense>
				<v-icon class="v-icon material-icons theme--light" >devices_other</v-icon>
				<v-toolbar-title>物可视</v-toolbar-title>
				<v-spacer/>
				<sw-navigation-action-button icon="plus" tooltip="物可视管理" style="padding-left: 885px;"  />
 			</v-toolbar>
		</section>
		<section>
			<div style="margin: 15px 0px 0 10px;">
				<webview id="foo" src="http://39.106.222.235/" style="display:inline-flex; width:100%; height:630px" allowpopups ></webview>
			</div>
		</section>

	</div>
</template>

<script>
export default {
	name: "monitoringpoint",
	data() {
		return {
		basePath:'',
		loading: false,
		};
	},
	methods:{

		editData: function (row) {

		},
	},
	created() {

	},
	mounted() {

		}
}
</script>

<style lang="less">

</style>
