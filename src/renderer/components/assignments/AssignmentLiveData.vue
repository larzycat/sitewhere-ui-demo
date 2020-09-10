<template>
  <v-card>
    <template>
      <div>
        <el-row type="flex">
          <el-col :span="5" v-for="(value,key,index) in obj" :key="index">
            <div v-for="(value1,key1 ) in assignment.device.metadata" :key="key1">
              <el-card shadow="hover" v-if="key===key1">{{value1}}：{{value}}</el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- echarts图表 -->
      <div class="chart" shadow="always">
        <ddeecharts :oneobj="obj" :devicetime="devicetime"></ddeecharts>
      </div>
      <div class="charttwo" shadow="always">
        <ddeechartstwo :twoobj="obj" :deviceToken="deviceToken"></ddeechartstwo>
      </div>
      <div class="chartthree" shadow="always">
        <ddeechartsthree
          :threeobj="obj"
          :deviceToken="deviceToken"
          :devicestate="devicestate"
          :devicetime="devicetime"
        ></ddeechartsthree>
      </div>
    </template>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";
// 引入echarts图表
import ddeecharts from "./ddeecharts.vue";
import ddeechartstwo from "./ddeechartstwo.vue";
import ddeechartsthree from "./ddeechartsthree.vue";

// 引入mqtt
var mqtt = require("mqtt");

@Component({
  components: {
    ddeecharts,
    ddeechartstwo,
    ddeechartsthree,
  },
})
export default class AssignmentLiveData extends Vue {
  @Prop() readonly assignment!: any;
  obj: any = {};
  value: String = "";
  deviceToken: String = "";
  tenantToken!: string;
  tenantTopic!: string;
  devicetime: string = "";
  devicestate: string = "";
  created() {
    //SiteWhere/AVIC/input/json
    // SiteWhere/Yinh/input/json
    // SiteWhere/lany/input/json
    var tenantToken = this.$route.params.tenantToken;
    this.tenantToken = tenantToken;
    this.tenantTopic = "SiteWhere/" + this.tenantToken + "/input/json";
    // console.info("当前登录租户:" + tenantToken);
    // console.log("当前Mqtt主题:" + this.tenantTopic);
  }

  mounted() {
    this.mqttMSG();
  }
  mqttMSG() {
    const that = this;
    // ws://118.113.164.51:25708 阿里  ws://39.100.14.20:30008
    var client = mqtt.connect("ws://118.113.164.51:25708/mqtt");
    client.on("connect", function () {
      client.subscribe(that.tenantTopic, function (err: any) {
        if (!err) {
          console.log("------ 订阅连接成功! ------");
        }
      });
    });
    var count = 0;
    client.on("message", function (topic: string, message: any) {
      console.log("\n");
      console.log("------ 订阅接收信息开始 ------");
      that.deviceToken = that.assignment.device.token;
      console.log("当前设备deviceToken:" + that.deviceToken);
      var deviceData = that.assignment.device.metadata;
      console.log("当前设备元数据:", JSON.stringify(deviceData));
      var oneobj = JSON.parse(message.toString());
      // console.log("返回采集信息:", JSON.stringify(oneobj));

      var returnDeviceToken = oneobj.deviceToken;
      // console.log("返回采集deviceToken: " + returnDeviceToken);
      var returnDeviceType = oneobj.type;
      console.log("返回采集deviceType: " + returnDeviceType);
      if (returnDeviceType === "DeviceMeasurement") {
        // console.log("------过滤：测量-----------");
        if (returnDeviceToken == that.deviceToken) {
          console.log(
            "当前设备deviceToken:" + that.deviceToken + " 实时回传次数:",
            count++
          );
          // console.log("------图表展示------");
          that.obj = oneobj.request.metadata;
          that.value = oneobj.request.value;
          that.devicetime = oneobj.request.eventDate;
          that.devicestate = oneobj.request.metadata.Device_FX3U_Status;
          //that.devicetime ='2020-08-12T11:26:07.238+08:00';//oneobj.request.eventDate;
        }
      } else {
        // console.log("----其他类型不传到实时数据图表中----");
      }
      // console.log("------ 订阅接收信息结束 ------");
      ///client.end();
    });
  }
}
</script>

<style scoped>
span {
  font-weight: 600;
  padding-left: 0px;
}
.chart {
  width: 1050px;
  height: 400px;
}
.charttwo {
  width: 1050px;
  height: 450px;
}
.chartthree {
  width: 1050px;
  height: 550px;
}
</style>
