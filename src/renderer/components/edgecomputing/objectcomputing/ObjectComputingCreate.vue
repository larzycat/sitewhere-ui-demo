<template>
<div style="background-color: #F5F5F5">
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
					<el-form :inline="true" :model="query" :rules="rules" size="large" style="padding-top: 20px;padding-left: 15px;">
						<el-col :span="24">
							<el-form-item  label="物计算名称" prop="name">
								<el-input v-model="query.name" placeholder="请输入名称"></el-input>
							</el-form-item>
							<el-form-item label="站点" prop="station" >
								<el-select v-model="query.station" placeholder="请选择" style="width: 200px;">
									<el-option
											v-for="item in datastation"
											:key="item.value"
											:label="item.label"
											:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>	
						<el-col :span="24">
							<el-form-item label="设备类型" prop="type">
								<el-select v-model="query.type"  clearable filterable placeholder="请选择" style="width: 200px;">
									<el-option
											v-for="item in datatype"
											:key="item.value"
											:label="item.label"
											:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="设备ID" prop="device" >
								<el-select v-model="query.device" placeholder="请选择" style="width: 200px;">
									<el-option
											v-for="item in datadevice"
											:key="item.value"
											:label="item.label"
											:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-form-item>
							<el-button type="primary" @click="createObjCompute">创建</el-button>
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
import {getDeviceType,createComputing,getSiteInfo,getDeviceTypeMetedata} from '../api/api.js';
export default {

	data() {
		 let reg=/^[A-Za-z0-9]/;
		 var validateFiled=(rule,value,callback)=>{
			if(!reg.test(value)){
				callback(new Error('请输入中文或数字组合'));
			}
		}
		return {
			datadevice:[{label:'110920',value:'1'},{label:'11009280',value:'2'}],//下拉菜单
			datastation:[{label:'站点1',value:'1'},{label:'11009280',value:'2'}],//下拉菜单
			datatype:[{label:'五米热压罐',value:'1'},{label:'十米热压罐',value:'2'},{label:'自动下料机',value:'3'}],//下拉菜单

		 	modelV:[],
			query: {//用于查询
				datadevice: '',//必须要定义下拉菜单，否则下拉菜单会不能进行选择
				datastation:'',
				datatype:''
			},
			rules:{
				name: [{required: true, trigger: 'blur', message: '名称不能为空'}],
				station: [{required: true, trigger: 'blur', message: '站点不能为空'}],
				type: [{required: true, trigger: 'blur', message: '类型不能为空'}],
				device: [{required: true, trigger: 'blur', message: '设备不能为空'}],
			},
			basePath:'',
			editDialogStatus: false,
		}
	},
	methods:{
		//初始化下拉菜单
		deviceTypeSelect(){
			let _self = this;
			var url=_self.basePath+'/edgecompute/module/getDeviceType';
			_self.dataOptions.unshift({value: '', label: '请选择'});
			getDeviceType({url:url}).then(response => {
				response.data.forEach(item => {
					let arr = {
						value: item.deviceType,
						label: item.deviceType
					};
					_self.dataOptions.push(arr);
				});

				_self.query.type = _self.dataOptions[0].value;
			});
		},
		iteInfoSelect(){
			let _self = this;
			var url=_self.basePath+'/edgecompute/module/getSiteInfo';
			_self.dataOptions.unshift({value: '', label: '请选择'});
			getSiteInfo({url:url}).then(response => {
				response.data.forEach(item => {
					let arr = {
						value: item.deviceType,
						label: item.deviceType
					};
					_self.dataOptions.push(arr);
				});

				_self.query.station = _self.dataOptions[0].value;
			});
		},
		deviceTypeMetedataSelect(){
			let _self = this;
			var url=_self.basePath+'/edgecompute/module/getDeviceTypeMetedata';
			_self.dataOptions.unshift({value: '', label: '请选择'});
			getDeviceTypeMetedata({url:url}).then(response => {
				response.data.forEach(item => {
					let arr = {
						value: item.deviceType,
						label: item.deviceType
					};
					_self.dataOptions.push(arr);
				});

				_self.query.device = _self.dataOptions[0].value;
			});
		},
		createObjCompute(){
			let _self = this;
			if(_self.query.name=="" ||typeof(_self.query.station) == "undefined"||typeof(_self.query.type) == "undefined"||typeof(_self.query.device) == "undefined"){
				alert("请填写全部带*号的内容");
				return false;
			}else{
				var url=_self.basePath+'/edgecompute/compute/createCompute';
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
			//this.$message.success("执行编辑操作");
			}
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
		this.iteInfoSelect();
		this.deviceTypeMetedataSelect();
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
