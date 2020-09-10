<template>
  <!-- 第一个折线图 -->
  <div>
    <!-- <span>时间:{{devicetime|formatDate}}</span> -->
    <div class="dropdwon">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          选择线条
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <template v-for="(key,value,index) in oneobj">
            <el-dropdown-item  :command="composeValue(value,key,index)" :key="index">{{value}}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div id="myChart" :style="{width: '1050px', height: '350px'}"></div>
  </div>
</template>

<script>
  var mqtt = require("mqtt");
  import Vue from "vue";
  import {myChartOptionLineFunc} from  './ChartOptionLineFunc'
  import moment from 'moment'
  export default {
    props: {
      oneobj: {
        type: Object,
        require: true,
      },
      valuedata: {
        type: String,
        require: true,
      },
      devicetime:{
        type: String,
        require: true,
      }
    },
    // methods:{
    //     formatDate: function (value) {
    //       return moment(value).format('YYYY-MM-DD HH:mm:ss:SSS')
    //     }
    // },
    filters: {
      formatDate: function (value) {
        return moment(value).format('YYYY-MM-DD HH:mm:ss:SSS')
      }
    },
    name: "",
    data() {
      return {
        seriesdata: [],
        xAxisdata: [],
        myChart:Object,
        option:{},
        lendData:[]
      };
    },
    watch: {
      // y轴折线数据
      oneobj: {
        handler(newData, oldData) {
          const that = this;
          var seriesdata = that.seriesdata;
          var lendData=that.lendData;
          Object.keys(newData).forEach((element, i) => {
            if (seriesdata.length > 0) {
              for (let index = 0; index < seriesdata.length; index++) {
                if ( seriesdata[index].name && seriesdata[index].name === element ) {
                  seriesdata[index].data.push(newData[element]);
                  break;
                } else if ( seriesdata[index].name != element && index === seriesdata.length - 1 ) {
                  lendData.push(element);
                  seriesdata.push({
                    name: element,
                    type: "line",
                    data: [newData[element]],
                  });
                }
              }
            } else {
              lendData.push(element);
              seriesdata.push({
                name: element,
                type: "line",
                data: [newData[element]],
              });
            }
          });
          that.seriesdata = JSON.parse(JSON.stringify(seriesdata));
          // console.log(that.seriesdata);
          that.drawLine();
        },
        deep: true,
      },
      devicetime: {
        handler(newData, oldData) {
          const that = this;
          var xAxisdata = that.xAxisdata;
          if(newData !='') {
            var d1=that.formatDate(that.devicetime);
            xAxisdata.push(d1);
          }
          that.xAxisdata =xAxisdata;//JSON.parse(JSON.stringify(xAxisdata));
        }
      },
      deep: true,
      immediate: true
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      handleCommand(command) {
        this.$message("当前选项:"+command.key);
        const selectArr = this.myChart.getOption().legend[0].data;//legend所有值
        const obj = {};
        for(var i=0; i<selectArr.length; i++){
          if(selectArr[i]===command.key){
            obj[command.key] = true;
          }else{
            obj[selectArr[i]] = false;
          }
        }
        this.option.legend.selected = obj;
        this.myChart.setOption(this.option);
      },
      composeValue(key,value, index) {
        var d={ 'key': key, 'value':value, 'index': index }
        return d;
      },
      formatDate: function (value) {
        var date = new Date(value)
        var Str=date.getFullYear() + '-' +
                (date.getMonth() + 1) + '-' +
                date.getDate() + ' ' +
                date.getHours() + ':' +
                date.getMinutes() + ':' +
                date.getSeconds()+'.'+date.getMilliseconds();
        return Str
        //return moment(value).format('YYYY-MM-DD HH:mm:ss:SSS')
      },
      drawLine() {
        this.myChart = this.$echarts.init(document.getElementById("myChart"));
        // 绘制图表
        this.option = myChartOptionLineFunc(this.xAxisdata,this.seriesdata,this.lendData);
        this.myChart.setOption(this.option); //---
      },
    },
  };
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .dropdwon {
    /* float: left; */
    padding-left: 820px;
    /* overflow: hidden; */
  }
</style>