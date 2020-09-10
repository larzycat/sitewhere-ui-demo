<template>
	<div style="background-color: #F5F5F5">
		<section>
			<v-toolbar  class="v-toolbar__content" style="height: 48px;" dense>
				<v-icon class="v-icon material-icons theme--light" >devices_other</v-icon>
				<v-toolbar-title>物计算</v-toolbar-title>
				<v-spacer/>
				<sw-navigation-action-button icon="plus" tooltip="创建物计算" style="padding-left: 885px;"  />
 			</v-toolbar>
		</section>
		<section class="monitoringpoint">
			<section style="margin: 15px 20px 0 10px;">
				<div style="margin-top:10px;background-color: #FFFFFF">
					<el-form :inline="true" :model="query" size="large" style="padding-top: 20px;padding-left: 15px;">
						<el-form-item label="设备类型">
							<el-select v-model="query.waterName" clearable filterable placeholder="请选择" style="width: 100px;">
								<el-option
										v-for="item in dataOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item  label="物计算名称" prop="siteName">
							<el-col :span="24">
								<el-input v-model="query.name" placeholder="请输入名称"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item  label="设备类型名称" prop="siteName">
							<el-col :span="24">
								<el-input v-model="query.type" placeholder="请输入设备类型名称"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item>
							<el-button type="info" @click="search" icon="el-icon-search">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="info" @click="addData" icon="el-icon-cread">创建</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div style="padding-top: 5px;">
					<el-table :data="dataList" stripe fit v-loading="tableLoading" :height="tableHeight">
						<el-table-column fixed label="序号" prop="number" width="50" align="center"></el-table-column>
						<el-table-column prop="name" label="物计算名称" align="center" ></el-table-column>
						<el-table-column prop="edgeid" label="物计算ID" align="center"></el-table-column>
						<el-table-column prop="type" label="设备类型" align="center"></el-table-column>
						<el-table-column prop="station" label="站点" align="center"></el-table-column>
						<el-table-column prop="device" label="关联设备" align="center"></el-table-column>
						<el-table-column label="关联物可视" align="center">
							<template slot-scope="scope">
								<img :src="scope.row.img" width="40" height="40" class="head_pic"/>
							</template>
						</el-table-column>
						<el-table-column prop="connect" label="关联物应用" align="center"></el-table-column>
						<el-table-column prop="version" label="版本号" align="center"></el-table-column>
						<el-table-column prop="createdate" label="创建时间" align="center"></el-table-column>
						<el-table-column prop="creatuser" label="创建人" align="center" :show-overflow-tooltip="true"></el-table-column>
						<!-- 操作区 -->
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<div>
									<el-button type="text" size="small" @click="attiveData(scope.row)">启用</el-button>
									<el-button type="text" size="small" @click="editData(scope.row)">编辑</el-button>	
								</div>
								<div>
									<el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
									<el-button type="text" size="small" @click="detil(scope.row)">详情</el-button>
								</div>	
								
							</template>
						</el-table-column>
					</el-table>

					<!-- 页码区 -->
					<div class="block">
						<el-pagination
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="page.curPage"
								:page-sizes="[10, 15, 20, 30]"
								:page-size="page.size"
								layout="total, sizes, prev, pager, next, jumper"
								:total="page.total">
						</el-pagination>
					</div>
				</div>
			</section>
			
			<!-- 编辑区 -->
			<el-dialog :title="dialogTitle" :visible.sync="editDialog" width="40%">
				<el-card class="box-card" >
					<el-form :model="dialogData" :rules="rules" ref="dialogForm" label-width="100px" :inline="true">
						<el-form-item  label="站点名称" prop="siteName">
							<el-col :span="24">
								<el-input v-model="dialogData.siteName" placeholder="请输入站点名称"></el-input>
							</el-col>
						</el-form-item>

					</el-form>
				</el-card>
				<span slot="footer" class="dialog-footer">
					<el-button @click="editDialog = false">取 消</el-button>
					<el-button type="primary" @click="saveData">确 定</el-button>
				</span>
			</el-dialog>
			<!-- 详情区 -->
			<el-dialog :visible.sync="detileDialog"  width="80%">
				<el-card class="box-card" style="height: 883px;">
					<div style="float:left;" >	
						<el-form :model="dialogData" ref="dialogForm" label-width="100px" :inline="true">
							<el-row>
								<el-col span="24">
									<el-form-item  label="物计算名称">
										<el-input v-model="dialogData.name" readonly="readonly"></el-input>
									</el-form-item>
									<el-form-item label="设备类型">
										<el-input v-model="dialogData.type" readonly="readonly"></el-input>
									</el-form-item>
									<el-form-item label="设备ID">
										<el-input v-model="dialogData.device" readonly="readonly"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</div>	
					<el-col :span="24">	
						<div style="float:left;" >	
							<el-tag size="medium" type="info">设备元数据定义
								<div style="padding-top: 5px;">
									<el-table :data="devicedataList" stripe fit v-loading="tableLoading">
										<el-table-column fixed label="序号" prop="rownumber" width="150" align="center"></el-table-column>
										<el-table-column prop="rowname" label="名称" align="center" width="350" ></el-table-column>
										<el-table-column prop="labaddress" label="标签地址" align="center" width="350"></el-table-column>
									</el-table>
								</div>
							</el-tag>
						</div>
					</el-col>
					<el-col :span="24">
						<div style="float:left;height: 250px;" >
							<el-tag size="medium" type="info">设备数据源主题定义
								<el-form :model="dialogData" ref="dialogForm" label-width="100px" :inline="true">
									<el-row style="padding-top: 10px;">	
										<el-form-item label="Kafka Topic">
											<el-col :span="24">
												<el-input v-model="dialogData.belongBasin"  style="width:350px" readonly="readonly"></el-input>
											</el-col>
										</el-form-item>
									</el-row>
									<el-row style="padding-top: 10px;">
										<el-form-item  label="Kafka Broker">
											<el-col :span="24">
												<el-input v-model="dialogData.belongLocation" style="width:350px" readonly="readonly"></el-input>
											</el-col>
										</el-form-item>
									</el-row>
									<el-row style="padding-top: 10px;">
										<el-form-item label="Kafka Port" >
											<el-col :span="24">
												<el-input v-model="dialogData.siteStatus" style="width:350px"  readonly="readonly"></el-input>
											</el-col>
										</el-form-item>
									</el-row>
								</el-form>	
							</el-tag>	
						</div>
					</el-col>
					<el-col :span="24">
						<div style="float:left">
							<el-tag size="medium" type="info">设备目的地主题定义
								<el-form :model="dialogData" ref="dialogForm" label-width="100px" :inline="true">
									<el-row style="padding-top: 10px;">
										<el-form-item label="Kafka Topic">
											<el-col :span="24">
												<el-input v-model="dialogData.belongBasin" style="width:350px"></el-input>
											</el-col>
										</el-form-item>
									</el-row>
									<el-row style="padding-top: 10px;">
										<el-form-item  label="Kafka Broker">
											<el-col :span="24">
												<el-input v-model="dialogData.belongLocation" style="width:350px"></el-input>
											</el-col>
										</el-form-item>
									</el-row>
									<el-row style="padding-top: 10px;">
										<el-form-item label="Kafka Port" >
											<el-col :span="24">
												<el-input v-model="dialogData.siteStatus" style="width:350px"></el-input>
											</el-col>
										</el-form-item>
									</el-row>
								</el-form>		
							</el-tag>	
						</div>
					</el-col>
				</el-card>
				<span slot="footer" class="dialog-footer">
					<el-button @click="detileDialog = false">返回</el-button>
				</span>
			</el-dialog>
		</section>
	</div>
</template>

<script>
import {getSiteList, waterNameInfo, addSiteInfo} from '../api/api.js';
import {routeTo} from "../../common/Utils";
export default {
	name: "monitoringpoint",
	data() {
		return {
			query: {//用于查询
				waterName: '',//必须要定义下拉菜单，否则下拉菜单会不能进行选择
			},
			dataOptions: [{label:'类型1',value:'1'},{label:'类型2',value:'2'},{label:'类型3',value:'3'}],//下拉菜单


			tableLoading: false,//加载中
			tableHeight: window.innerHeight  - 280,
			searchdataList:[
				{
					number:"1",
					name:"OEE统计",
					edgeid:"10000",
					type:"五米热压罐",
					station:"613分厂",
					device:"11009280",
					image:"https://s3.amazonaws.com/sitewhere-demo/construction/ekahau/ekahau-ts1.jpg",
					connect:"",
					version:"Ver.1.0",
					createdate:"2020-7-20",
					creatuser:"张三",
					
				},

			],
			devicedataList:[
				{	
					rownumber:"1",
					rowname:"调整时间",
					labaddress:""	
				},
				{	
					rownumber:"2",
					rowname:"平均速度",
					labaddress:""	
				},
				{	
					rownumber:"3",
					rowname:"开机时间",
					labaddress:""	
				},
				{	
					rownumber:"4",
					rowname:"停机时间",
					labaddress:""	
				},
			],
			dataList: [
				{
					number:"1",
					name:"OEE统计",
					edgeid:"10000",
					type:"五米热压罐",
					station:"613分厂",
					device:"11009280",
					image:"https://s3.amazonaws.com/sitewhere-demo/construction/ekahau/ekahau-ts1.jpg",
					connect:"",
					version:"Ver.1.0",
					createdate:"2020-7-20",
					creatuser:"张三",
					
				},
				{
					number:"2",
					name:"温度补偿计算",
					edgeid:"10001",
					type:"五米热压罐",
					station:"613分厂",
					device:"11009280",
					image:"https://s3.amazonaws.com/sitewhere-demo/construction/ekahau/ekahau-ts1.jpg",
					connect:"",
					version:"Ver.1.0",
					createdate:"2020-7-20",
					creatuser:"张三",
					
				},
				{
					number:"3",
					name:"机器人角坐标计算",
					edgeid:"10002",
					type:"火焰喷铝机器人",
					station:"613分厂",
					device:"11009281",
					image:"https://s3.amazonaws.com/sitewhere-demo/construction/ekahau/ekahau-ts1.jpg",
					connect:"",
					version:"Ver.1.2",
					createdate:"2020-7-20",
					creatuser:"张三",
					
				},
				{
					number:"4",
					name:"辅材裁切比计算",
					edgeid:"10003",
					type:"自动下料机",
					station:"613分厂",
					device:"11009282,11009283",
					image:"https://s3.amazonaws.com/sitewhere-demo/construction/ekahau/ekahau-ts1.jpg",
					connect:"",
					version:"Ver.2.1",
					createdate:"2020-7-20",
					creatuser:"张三",
					
				},
				{
					number:"4",
					name:"辅材裁切比计算",
					edgeid:"10003",
					type:"自动下料机",
					station:"613分厂",
					device:"11009282,11009283",
					image:"https://s3.amazonaws.com/sitewhere-demo/construction/ekahau/ekahau-ts1.jpg",
					connect:"",
					version:"Ver.2.1",
					createdate:"2020-7-20",
					creatuser:"张三",
					
				},
				{
					number:"4",
					name:"辅材裁切比计算",
					edgeid:"10003",
					type:"自动下料机",
					station:"613分厂",
					device:"11009282,11009283",
					image:"https://s3.amazonaws.com/sitewhere-demo/construction/ekahau/ekahau-ts1.jpg",
					connect:"",
					version:"Ver.2.1",
					createdate:"2020-7-20",
					creatuser:"张三",
					
				},

			],//列表数据
			page:{ //页码区
				curPage: 0,
				size: 10,
				total: 0,
			},
			
			//对话框
			dialogTitle: '添加站点',
			editDialog: false,
			detileDialog:false,
			dialogData: {
				payTime1:null , // 收入日期1
				payTime2: null // 收入日期2
			},
			rules:{
				name: [{required: true, trigger: 'blur', message: '名称不能为空'}],
				station: [{required: true, trigger: 'blur', message: '站点不能为空'}],
				type: [{required: true, trigger: 'blur', message: '类型不能为空'}],
				device: [{required: true, trigger: 'blur', message: '设备不能为空'}],
			},
			basePath:'',
			payTime: [],
			pickerBeginDateBefore:{
				disabledDate(time) {
					return time.getTime() > Date.now();
				}
			},
			timeDefaultShow:'',
		}
	},

	methods:{
		//初始化下拉菜单
		waterNameInfo(){
			let _self = this;
			var url=_self.basePath+'/site-info/getSiteList';
			_self.dataOptions.unshift({value: '', label: '请选择'});
			waterNameInfo({url:url}).then(response => {
				response.data.forEach(item => {
					let arr = {
						value: item.waterName,
						label: item.waterName
					};
					_self.dataOptions.push(arr);
				});

				_self.query.waterName = _self.dataOptions[0].value;
				_self.loadList();//调用其他方法，需要写在异步请求中
			});
		},

		//改变当前页
		handleCurrentChange: function (currentPage) {
			let _self = this;
			_self.page.current = currentPage;
			_self.loadList()
		},

		//改变页面size
		handleSizeChange: function (size) {
			let _self = this;
			_self.page.size = size;
			_self.loadList()
		},

		//查询
		search() {
			let _self = this;
			//初始化页码，避免当数据为0时页码出现错误
			this.page={ //页码区
				curPage: 0,
				size: 10,
				total: 0
			};
			if(_self.query.name=="" || _self.query.type==null||_self.query.type=="" || _self.query.type==type){
					_self.dataList = [
						{
							number:"4",
							name:"辅材裁切比计算",
							edgeid:"10003",
							type:"自动下料机",
							station:"613分厂",
							device:"11009282,11009283",
							image:"https://s3.amazonaws.com/sitewhere-demo/construction/ekahau/ekahau-ts1.jpg",
							connect:"",
							version:"Ver.2.1",
							createdate:"2020-7-20",
							creatuser:"张三",
						},
					];	
			}else{
				_self.dataList = _self.searchdataList;
			}
			this.loadList();
		},
	
		//加载列表
		loadList: function () {
			let _self = this;
			var url=_self.basePath+'/site-info/getSiteList';
			_self.tableLoading = true;
			_self.dataList = [];
			getSiteList({
				url:url,
				curPage: _self.page.curPage,
				size: _self.page.size,
				name: _self.query.name,
				type: _self.query.type,
				waterName: _self.query.waterName
			}).then(function (rsp) {
				_self.tableLoading = false;
				if (rsp.success) {
					//_self.dataList.push(rsp.data.records);
					_self.dataList = rsp.data.records;
					_self.page.total = rsp.data.total
				} else {
					// _self.$message.error(rsp.message);
				}
			})
		},

		//添加
		addData: function () {
			routeTo(this, "/objectComputingCreate");
		},
		
		//保存
		saveData: function () {
			let _self = this;
			var url=_self.basePath+'/site-info/createCompute';
			_self.editDialog = false;
			this.$refs.dialogForm.validate(valid => {
				//通过验证,则调用后台方法
				if (valid) {
					addSiteInfo(_self.dialogData).then(function (response){
						if (response.success) {
							_self.$message({
								message: _self.dialogTitle + "成功",
								type: "success"
							});
						} else {
							_self.$message.error(_self.dialogTitle + "失败");
						}
						_self.loadList();
					})
				} else {
					return false
				}
			});
		},

		//编辑
		editData: function (row) {
			let _self = this;
			_self.editDialog = true;
			_self.dialogTitle = '编辑站点';
			//深复制，避免列表对象和弹窗对象的数据同步改动。
			var obj = {};
			obj = JSON.parse(JSON.stringify(row));
			_self.dialogData = obj;
		},
		attiveData:function(row){
			var url=_self.basePath+'/site-info/enableCompute';
			let _self = this;
			obj = JSON.parse(JSON.stringify(row));
			this.$refs.dialogForm.validate(valid => {
				//通过验证,则调用后台方法
				if (valid) {
					addSiteInfo(_self.dialogData).then(function (response){
						if (response.success) {
							_self.$message({
								message: _self.dialogTitle + "成功",
								type: "success"
							});
						} else {
							_self.$message.error(_self.dialogTitle + "失败");
						}
						_self.loadList();
					})
				} else {
					return false
				}
			});	
		},
		deleteData:function(row){
			let _self = this	


		},
		detil:function(row){
			let _self = this	
			_self.detileDialog= true;
			_self.dialogTitle = '详情';
			var obj = {};
			obj = JSON.parse(JSON.stringify(row));
			_self.dialogData = obj;
		},
		getMore(row) {
			if(row.computing==""){
				routeTo(this, "/ObjectComputeCreate");
			}else{
				alert("edit");

			}
        },
	},

	mounted() {
		this.timeDefaultShow = new Date();
		this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
		let get = this.$store.getters;
		this.basePath=get.protocol+'://'+get.server+':'+get.port;
		this.waterNameInfo();
		//  this.$nextTick(function () {
        //     this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 440;
            
        // })
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
