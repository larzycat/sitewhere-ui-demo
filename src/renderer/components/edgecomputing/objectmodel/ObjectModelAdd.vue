<template>
  <div>
    <!-- 创建物模型标题 -->
    <section class="title">
      <v-toolbar class="v-toolbar__content" style="height: 48px;" dense>
        <v-icon class="v-icon material-icons theme--light">devices_other</v-icon>
        <v-toolbar-title>创建物模型</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </section>

    <!-- 面包屑导航 / 跳转-->
    <div class="allbreadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">边缘计算</el-breadcrumb-item>
        <el-breadcrumb-item>物模型</el-breadcrumb-item>
        <el-breadcrumb-item @click="returnObjectModelList">创建物模型</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="manage">
      <!-- 左侧三维模型模块 -->
      <div class="card3d ">
        <el-card class="frontcard">
          <span>三维模型导入 :&nbsp&nbsp</span>
          <!-- <el-button type="primary" plain size="mini">
          选择
          <i class="el-icon-upload el-icon--right"></i>
          </el-button>-->
          <!-- el-img三维图 -->
          <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <div class="block">
            <el-image :src="src"></el-image>
          </div>
        </el-card>
      </div>
      <!-- 右侧选项与表单 -->
      <div class="found">
        <el-card class="frontcard">
          <!-- 选择站点下拉框 -->
          <div class="sites">
            <span>选择站点 :&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
            <el-select
                    size="small"
                    v-model="value"
                    placeholder="请选择站点"
                    filterable
                    :filter-method="dataFilter"
            >
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
              />
            </el-select>
          </div>
          <!-- 选择设备类型下拉框 -->
          <div class="type">
            <span>选择设备类型 :&nbsp&nbsp</span>
            <el-select
                    size="small"
                    v-model="value"
                    placeholder="请选择站点"
                    filterable
                    :filter-method="dataFilter"
            >
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
              />
            </el-select>
          </div>
          <!-- 物模型名称 -->
          <div class="model">
            <!-- <span>物模型名称 :&nbsp&nbsp</span> -->
            <!-- <el-input placeholder="请输物模型名称" size="small" v-model="input" clearable></el-input> -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="物模型名称 : " prop="name" style="color:black; font-weight:bold;">
                <el-input v-model="ruleForm.name" size="small"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <!-- 设备类型元数据表单 -->
          <div class="typemetadata">
            <span>设备类型元数据 :</span>
            <!-- :header-cell-style="{'text-align':'center'}" <= 表头居中 -->
            <el-table :data="tableData" height="250" border style="width: 100%" :height="380" fit="true">
              <el-table-column prop="index" label="序号" width="70" align="center"></el-table-column>
              <el-table-column prop="name" label="点名称" width="180"></el-table-column>
              <el-table-column prop="describe" label="点描述"></el-table-column>
            </el-table>
            <div class="infobtn">
              <el-button type="info" plain @click="returnObjectModelList">返回</el-button>
              <el-button type="info" plain>保存</el-button>
              <!-- <el-button type="info" plain>保存并创建物计算</el-button> -->
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
  import { routeTo } from "../../common/Utils";
  export default {
    components: {
      routeTo,
    },
    data() {
      return {
        fileList: [
          {
            name: "",
            url: "",
          },
          // {
          //   name: "food2.jpeg",
          //   url:
          //     "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3946587994,1341680162&fm=26&gp=0.jpg",
          // },
        ],
        ruleForm: {
          name: "",
        },
        rules: {
          name: [
            { required: true, message: "请输入物模型名称", trigger: "blur" },
          ],
        },
        src:
                "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3946587994,1341680162&fm=26&gp=0.jpg",
        optionsCopy: [
          {
            value: "1",
            label: "631",
          },
          {
            value: "2",
            label: "648",
          },
          {
            value: "3",
            label: "606",
          },
        ],
        options: [
          {
            value: "1",
            label: "631",
          },
          {
            value: "2",
            label: "648",
          },
          {
            value: "3",
            label: "606",
          },
        ],
        value: "",
        tableData: [
          {
            index: "1",
            name: "controller ID",
            describe: "控制器ID",
          },
          {
            index: "2",
            name: "System ID",
            describe: "系统ID",
          },
          {
            index: "3",
            name: "IP Address",
            describe: "IP地址",
          },
          {
            index: "4",
            name: "Speed",
            describe: "运行速度",
          },
          {
            index: "5",
            name: "Connect State",
            describe: "连接状态",
          },
          {
            index: "6",
            name: "Connect State",
            describe: "连接状态",
          },
          {
            index: "7",
            name: "Connect State",
            describe: "连接状态",
          },
          {
            index: "8",
            name: "Connect State",
            describe: "连接状态",
          },
          {
            index: "9",
            name: "Speed",
            describe: "运行速度",
          },
          {
            index: "10",
            name: "Speed",
            describe: "运行速度",
          },
          {
            index: "11",
            name: "Speed",
            describe: "运行速度",
          },
        ],
      };
    },
    methods: {
      dataFilter(val) {
        this.val = val;
        if (val) {
          this.options = this.optionsCopy.filter((item) => {
            if (
                    !!~item.label.indexOf(val) ||
                    !!~item.label.toUpperCase().indexOf(val.toUpperCase())
            ) {
              return true;
            }
          });
        } else {
          this.options = this.optionsCopy;
        }
      },
      returnObjectModelList() {
        routeTo(this, "/objectModel");
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
                files.length + fileList.length
                        } 个文件`
        );
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
    },
  };
</script>
<style lang="less" scoped>
  .title {
    position: fixed;
    width: 100%;
    z-index: 3;
  }
  // 面包屑导航栏
  .breadcrumb {
    padding-top: 50px;
    background: rgb(130, 193, 235);
    font-size: 20px;
    line-height: 32px;
    position: fixed;
    width: 100%;
    z-index: 2;
  }

  .manage {
    padding-top: 70px;
    position: relative;
    width: 100%;
    // 左侧3D图
    .card3d {
      display: inline-block;
      width: 40%;
      height: 100%;
      .frontcard {
        min-height: 85vh;
        display: flex;
        span {
          color: black;
          font-weight: bold;
        }
        .el-image {
          margin-top: 10px;
          width: 410px;
        }
      }
    }
    // 右侧表单
    .found {
      position: absolute;
      display: inline-block;
      width: 60%;
      .formscard {
        min-height: 85vh;
        display: flex;
      }
      .sites {
        clear: both;
        float: left;
        span {
          color: black;
          font-weight: bold;
        }
      }
      .type {
        clear: both;
        float: left;
        padding-top: 5px;
        span {
          color: black;
          font-weight: bold;
        }
      }
    }

    .model {
      clear: both;
      padding-top: 5px;
      .el-input {
        width: 202px;
        margin-left: 6px;
      }
      span {
        color: black;
        font-weight: bold;
      }
    }

    .typemetadata {
      margin-top: 15px;
      width: 100%;
      span {
        color: black;
        font-weight: bold;
      }
      .infobtn {
        float: right;
        padding-top: 20px;
      }
    }
  }
</style>
