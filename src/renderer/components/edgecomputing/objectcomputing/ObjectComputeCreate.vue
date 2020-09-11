<template>
<div style="background-color: #F5F5F5;height: 100%">
		<section>
			<v-toolbar  class="v-toolbar__content" style="height: 48px;" dense>
				<v-icon class="v-icon material-icons theme--light" >devices_other</v-icon>
				<v-toolbar-title>创建物计算</v-toolbar-title>
				<v-spacer/>
				<sw-navigation-action-button icon="plus" tooltip="创建物计算" style="padding-left: 885px;"  />
 			</v-toolbar>
		</section>
		<section class="monitoringpoint">
			<section style="margin: 15px 20px 0 10px;">
				<div style="margin-top:10px;background-color: #FFFFFF;heidht:700px">
					<el-form :inline="true" :model="query" :rules="rules" size="large" ref="query" style="padding-top: 20px;padding-left: 15px;">
						<el-form-item label="物计算名称" style="margin-left: 10px;" prop="computeName">
							<el-input v-model="query.computeName" placeholder="物计算名称"></el-input>
						</el-form-item>

						<el-form-item label="设备类型">
							<el-select v-model="query.deviceType" clearable filterable placeholder="请选择" style="width: 200px;">
								<el-option
										v-for="item in dataOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="设备ID">
							<el-select v-model="query.deviceId" clearable filterable placeholder="请选择" style="width: 200px;">
								<el-option
										v-for="item in dataOptions1"
										:key="item.value"
										:label="item.label"
										:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="info" @click="createObjCompute('query')" >创建</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div style="padding-top: 5px;">
					<webview id="webviewId" src="" style="display:inline-flex; width:100%; height:500px" allowpopups ></webview>
				</div>
				<!-- 打开siddhi窗口 -->
				<v-dialog width="90%" v-model="editDialogStatus" persistent>
					<v-card class="box-card">
						<webview id="webviewId" src="http://39.100.14.20:9390/editor" style="display:inline-flex; width:100%; height:600px" allowpopups ></webview>
					</v-card>
					<v-btn @click="closeComputeDialog()">取 消</v-btn>
				</v-dialog>
			</section>
		</section>
	</div>
</template>

<script>
import {getDeviceTypeList,createComputing} from '../api/api.js';

export default {
	data() {
		 let reg=/^[A-Za-z0-9]/;
		 var validateFiled=(rule,value,callback)=>{
			if(!reg.test(value)){
				callback(new Error('请输入英文或数字组合'));
				this.validFlag= false;
			}else{
				this.validFlag= true;
			}
		}
		return {
		 	modelV:[],
			query: {//用于查询
				deviceType: '',//必须要定义下拉菜单，否则下拉菜单会不能进行选择
				deviceId:'',
				computeName:''
			},
			rules:{
				computeName: [
						{required: true, trigger: 'blur', message: '物计算名称不能为空'},
						{validator: validateFiled, trigger: 'blur'}
						],
				deviceType: [{required: true, trigger: 'blur', message: '设备类型名称不能为空'}],
				deviceId: [{required: true, trigger: 'blur', message: '设备ID不能为空'}],
			},
			dataOptions: [{label:'五米热压罐',value:'1'},{label:'类型2',value:'2'},{label:'类型3',value:'3'}],//下拉菜单
			dataOptions1: [{label:'设备ID1',value:'1'},{label:'设备ID2',value:'2'},{label:'设备ID3',value:'3'}],//下拉菜单
			basePath:'',
			editDialogStatus: false,
			validFlag:false
		}
	},
	methods:{
		//初始化下拉菜单20200911
		deviceTypeSelect(){
			let _self = this;
			var url=_self.basePath+'/edgecompute/module/getDeviceType';
			_self.dataOptions.unshift({value: '', label: '请选择'});
			getDeviceTypeList({url:url}).then(response => {
				response.data.forEach(item => {
					let arr = {
						value: item.deviceType,
						label: item.deviceType
					};
					_self.dataOptions.push(arr);
				});

				_self.query.deviceType = _self.dataOptions[0].value;
			});
		},
		createObjCompute(formName){
			let _self = this;
			this.$refs[formName].validate(valid => {
				if (valid) {
					_self.validFlag= true;
				} else {
					_self.validFlag= false;
				}
			});
			var url=_self.basePath+'/edgecompute/compute/createCompute';
			if(_self.validFlag){
				createComputing({
					url:url,
					deviceId: _self.query.deviceId,
					telentToken:''
				}).then(rsp => {
					if (rsp.success) {

					} else {
						// _self.$message.error(rsp.message);
					}
				});
				const webview = document.querySelector('webview');
				webview.src="http://39.100.14.20:9390/editor";
				_self.editDialogStatus = true;
			}
			//this.$message.success("执行编辑操作");
		},
		closeComputeDialog(){
			let _self = this;
			_self.editDialogStatus =  false;

		}
	},
	mounted() {
		var token=this.$route.params.token;
		this.modelV=JSON.parse(decodeURIComponent(token));
		this.query.deviceType=this.modelV.name;

		let get = this.$store.getters;
		this.basePath=get.protocol+'://'+get.server+':'+get.port;
		this.deviceTypeSelect();
	}
}

</script>

<style lang="less">
	.monitoringpoint{
		 	height: 600px;
			margin-top: 15px;
			margin-bottom: 25px;
			text-align: center;
			background-color: #F5F5F5;
		 
	}
</style>
