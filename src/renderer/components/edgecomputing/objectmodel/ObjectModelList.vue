<template>
	<div style="background-color: #F5F5F5">
		<section>
			<v-toolbar  class="v-toolbar__content" style="height: 48px;" dense>
				<v-icon class="v-icon material-icons theme--light" >devices_other</v-icon>
				<v-toolbar-title>物模型</v-toolbar-title>
				<v-spacer/>
				<sw-navigation-action-button icon="plus" tooltip="创建物模型" style="padding-left: 885px;"  />
 			</v-toolbar>
		</section>
		<section class="monitoringpoint">
			<section style="margin: 15px 20px 0 10px;">
				<div style="margin-top:10px;background-color: #FFFFFF">
					<el-form :inline="true" :model="query" size="large" style="padding-top: 20px;padding-left: 15px;">

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
						<el-form-item label="创建时间" label-width="120">
							<div class="block">
								<el-date-picker
										v-model="payTime"
										type="daterange"
										:picker-options="pickerBeginDateBefore"
										:default-value="timeDefaultShow"
										value-format="yyyy-MM-dd"
										format="yyyy-MM-dd"
										range-separator="至"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
										align="right"
								/>
							</div>
						</el-form-item>
						<el-form-item>
							<el-button type="info" @click="search" icon="el-icon-search">查询</el-button>
							<el-button type="info" @click="onOpenObjectModelAdd">创建物模型</el-button>
						</el-form-item>
					</el-form>
				</div>

				<div style="padding-top: 5px;">
					<el-table :data="dataList" stripe fit v-loading="tableLoading" :row-class-name="rowClassName">
						<el-table-column fixed label="序号" prop="desc" width="50" align="center"></el-table-column>
						<el-table-column prop="name" label="设备类型名称" align="center" ></el-table-column>
						<el-table-column prop="id" label="模型ID" align="center"></el-table-column>
						<el-table-column label="图片">
							<template slot-scope="scope">
								<img :src="scope.row.img" width="40" height="40" class="head_pic"/>
							</template>
						</el-table-column>
						<el-table-column prop="computing" label="物计算" align="center">
							<template slot-scope="scope">
								 <div  v-if= "scope.row.computing == ''">
									 <div style="text-decoration:underline;cursor:pointer;" @click="getMore(scope.row)">待创建</div>
								</div>
								<div v-else>
								 	<div style="text-decoration:underline;cursor:pointer;" @click="getMore(scope.row)">{{scope.row.computing}}</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="createdate" label="创建时间" align="center"></el-table-column>
						<el-table-column prop="creatuser" label="创建人" align="center" :show-overflow-tooltip="true"></el-table-column>
						<!-- 操作区 -->
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="editData(scope.row)">编辑</el-button>
								<el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
								<el-button type="text" size="small" @click="detailData(scope.row)">详情</el-button>
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
						<el-form-item  label="物模型名称" prop="siteName">
							<el-col :span="24">
								<el-input v-model="dialogData.siteName" placeholder="请输入物模型名称"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="站点编号" prop="serial" >
							<el-col :span="24">
								<el-input v-model="dialogData.serial" placeholder="请输入站点编号"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item  label="负责人" prop="headName">
							<el-col :span="24">
								<el-input v-model="dialogData.headName" placeholder="请输入负责人"></el-input>
							</el-col>
						</el-form-item>
					</el-form>
				</el-card>
				<span slot="footer" class="dialog-footer">
					<el-button @click="editDialog = false">取 消</el-button>
					<el-button type="primary" @click="saveData">确 定</el-button>
				</span>
			</el-dialog>
		</section>
	</div>
</template>

<script>

import {getModuleList,getDeviceTypeList,createModule} from '../api/api.js';
import { routeTo } from "../../common/Utils";
export default {
	name: "monitoringpoint",
	data() {
		return {
			query: {//用于查询
				deviceType: '',//必须要定义下拉菜单，否则下拉菜单会不能进行选择
			},
			dataOptions: [{label:'类型1',value:'1'},{label:'类型2',value:'2'},{label:'类型3',value:'3'}],//下拉菜单
			tableLoading: false,//加载中
			searchdataList:[
				{
					id:"0010",
                    name:"五米热压罐",
					img:"https://s3.amazonaws.com/sitewhere-demo/construction/ekahau/ekahau-ts1.jpg",
					computing:"",
					createdate:"2020-7-20",
					creatuser:"张三",
                    desc:''
				}

			],
			dataList: [
				{
                    id:"0011",
					name:"五米热压罐",
					img:"https://s3.amazonaws.com/sitewhere-demo/construction/ekahau/ekahau-ts1.jpg",
					computing:"",
					createdate:"2020-7-20",
					creatuser:"张三",
                    desc:''
				},
				{
                    id:"0012",
					name:"十米热压罐",
					image:"",
					computing:"",
					createdate:"2020-7-20",
					creatuser:"张三",
                    desc:''
				},
				{
                    id:"0013",
					name:"火焰喷铝机器人",
					image:"",
					computing:"机器人运动轨迹计算",
					createdate:"2020-7-20",
					creatuser:"张三",
                    desc:''
				},
				{
                    id:"0014",
					name:"下料机",
					image:"",
					computing:"",
					createdate:"2020-7-20",
					creatuser:"张三",
                    desc:''
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
			dialogData: {},
			rules:{
				siteName: [{required: true, trigger: 'blur', message: '站点名称不能为空'}],
				serial: [{required: true, trigger: 'blur', message: '站点编号不能为空'}],
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
			if(this.payTime=="" || this.payTime==null){
					_self.dataList = [{
							name:"五米热压罐",
							id:"0010",
							img:"https://s3.amazonaws.com/sitewhere-demo/construction/ekahau/ekahau-ts1.jpg",
							computing:"",
							createdate:"2020-7-20",
							creatuser:"张三",
                            desc:''
						},
						{
							name:"十米热压罐",
							id:"0011",
							image:"",
							computing:"",
							createdate:"2020-7-20",
							creatuser:"张三",
                            desc:''
						},
						{
							name:"火焰喷铝机器人",
							id:"0012",
							image:"",
							computing:"机器人运动轨迹计算",
							createdate:"2020-7-20",
							creatuser:"张三",
                            desc:''
						},
						{
							name:"下料机",
							id:"0013",
							image:"",
							computing:"",
							createdate:"2020-7-20",
							creatuser:"张三",
                            desc:''
						},	];	
			}else{
				_self.dataList = _self.searchdataList;
			}
			//this.loadList();
		},

		//加载列表
		loadList: function () {
			let _self = this;
			var url=_self.basePath+'/edgecompute/module/getModuleList';
			_self.tableLoading = true;
			_self.dataList = [];
			getModuleList({
				url:url,
				curPage: _self.page.curPage,
				size: _self.page.size,
				deviceType: _self.query.deviceType
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
			let _self = this;
			_self.editDialog = true;
			//初始化,因为如果是修改后新增，会残留字段
			_self.dialogData = {};
			_self.selectedOptions = [];
			_self.dialogTitle = '添加站点';
		},

		//保存
		saveData: function () {
			let _self = this;
			var url=_self.basePath+'/edgecompute/module/createModule';
			_self.editDialog = false;
			this.$refs.dialogForm.validate(valid => {
				//通过验证,则调用后台方法
				if (valid) {
					createModule(_self.dialogData).then(function (response){
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
		//删除
		deleteData: function (row) {
			let _self = this;
			//深复制，避免列表对象和弹窗对象的数据同步改动。
			var obj = {};
			obj = JSON.parse(JSON.stringify(row));
			_self.dialogData = obj;
		},
		//详情
		detailData: function (row) {
			 routeTo(this, "/objectModel/"+row.id);
		},
		getMore(row) {
			if(row.computing==""){
				var arrobj=JSON.stringify(row);

				routeTo(this, "/objectComputeCreate/"+encodeURIComponent(arrobj));
			}else{
				alert("edit");
			}
		},
        onOpenObjectModelDetail(row) {
            routeTo(this, "/objectModel/" + row.id);
        },
        onOpenObjectModelAdd() {
            routeTo(this, "/toObjectModelAdd");
        },
        rowClassName({row, rowIndex}) {
            //把每一行的索引放进row.id
            row.desc = rowIndex+1;
        }
	},

	mounted() {
		this.timeDefaultShow = new Date();
		this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
		let get = this.$store.getters;
		this.basePath=get.protocol+'://'+get.server+':'+get.port;
		this.deviceTypeSelect();
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
