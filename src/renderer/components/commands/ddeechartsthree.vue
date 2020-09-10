<template>
  <!-- 第三个带状图 -->
  <div>
    <div class="chart-three">
      <div id="myChart3" :style="{width: '1050px', height: '500px'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    threeobj: {
      type: Object,
    },
    devicetime: {
      type: String | Number,
      require: true,
    },
    devicestate: {
      type: String,
    },
  },
  data() {
    return {
      data: [],
      categories: ["设备状态"],
      xAxisdata: [],
    };
  },
  mounted() {
    this.drawLine();
  },
  watch: {
    devicestate: {
      handler(newData, oldData) {
        const that = this;
        // 生成模拟数据-----------
        if (parseInt(newData) <= 5000) {
          // 数据控制样式
          this.$echarts.util.each(this.categories, function (category, index) {
            var baseTime = that.gettime(that.devicetime);
            for (var i = 0; i < 2; i++) {
              var duration = Number(newData);
              // console.log(duration);
              that.data.push({
                name: "运行",
                value: [index, baseTime, (baseTime += duration), duration],
                itemStyle: {
                  normal: {
                    color: "#28FF28",
                  },
                },
              });
              baseTime += Math.round(Math.random() * 1000);
            }
            console.log(that.data);
          });
        } else if (parseInt(newData) >= 5000) {
          // 数据控制样式
          this.$echarts.util.each(this.categories, function (category, index) {
            var baseTime = that.gettime(that.devicetime);
            for (var i = 0; i < 2; i++) {
              var duration = Number(newData);
              that.data.push({
                name: "停机",
                value: [index, baseTime, (baseTime += duration), duration],
                itemStyle: {
                  normal: {
                    color: "#FF2D2D",
                  },
                },
              });
              baseTime += Math.round(Math.random() * 1000);
            } //
          });
        } else {
        }

        that.drawLine();
      },

      deep: true,
    },
    // 时间格式
    devicetime: {
      handler(newData, oldData) {
        console.log("获取的时间", newData);
        const that = this;
        var xAxisdata = that.xAxisdata;
        if (newData != "") {
          var d1 = that.formatDate(that.devicetime);
          xAxisdata.push(d1);
        }
        that.xAxisdata = xAxisdata;
      },
    },
  },
  methods: {
    formatDate: function (value) {
      var date = new Date(value);
      var Str =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds() +
        "." +
        date.getMilliseconds();
      return Str;
      //return moment(value).format('YYYY-MM-DD HH:mm:ss:SSS')
    },
    drawLine() {
      const that = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      // 绘制图表
      var option = {
        tooltip: {
          formatter: function (params) {
            return params.marker + params.name + ": " + params.value[3] + " ms";
          },
        },
        title: {
          text: "mqtt带状图",
        },
        dataZoom: [
          {
            type: "slider",
            filterMode: "weakFilter",
            showDataShadow: false,
            top: 400,
            height: 10,
            borderColor: "transparent",
            backgroundColor: "#e2e2e2",
            handleIcon:
              "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", // jshint ignore:line
            handleSize: 20,
            handleStyle: {
              shadowBlur: 6,
              shadowOffsetX: 1,
              shadowOffsetY: 2,
              shadowColor: "#aaa",
            },
            labelFormatter: "",
          },
          {
            type: "inside",
            filterMode: "weakFilter",
          },
        ],
        grid: {
          height: 300,
        },
        xAxis: {
          min: that.gettime(that.devicetime),
          scale: true,
          axisLabel: {
            formatter: function (val) {
              //return Math.max(0, val - that.gettime(that.devicetime)) + " ms";
              var date =that.getdevicedate(that.devicetime);  
              //alert(that.devicetime);
              return date;
              //return getzf(date.getHours()) + ':' + getzf(date.getMinutes()) +':'+getzf(date.getSeconds())+ '\n'+ date.getFullYear() + '/' + (date.getMonth() + 1) + '/'+ date.getDate()+' ';                            
			      	function getzf(num) {
					      if (parseInt(num) < 10) {
					        num = '0' + num;                                
						    }                                
					      return num;                            
				      } 
            },
          },
        },
        yAxis: {
          data: this.categories,
        },
        series: [
          {
            type: "custom",
            renderItem: this.renderItem,
            itemStyle: {
              opacity: 0.8,
            },
            encode: {
              x: [1, 2],
              y: 0,
            },
            data: this.data,
          },
        ],
      };
      myChart3.setOption(option);
    },
    renderItem(params, api) {
      var categoryIndex = api.value(0);
      var start = api.coord([api.value(1), categoryIndex]);
      var end = api.coord([api.value(2), categoryIndex]);
      var height = api.size([0, 1])[1] * 0.6;

      var rectShape = this.$echarts.graphic.clipRectByRect(
        {
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height,
        },
        {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height,
        }
      );
      return (
        rectShape && {
          type: "rect",
          shape: rectShape,
          style: api.style(),
        }
      );
    },
    gettime(ms) {
      //2020-06-01T04:24:43.230Z
      // 把时间的中的T和Z 替换成空字符串
      let date = ms.replace("T", " ");
      let data = date.replace("-", "/");
      // 声明一个变量赋值给：日期时间字符串，并返回 1970/1/1 午夜距离该日期时间的毫秒数
      let datime = Date.parse(data);
      //这里时返回str
      return datime;
    },
    getdevicedate(ms) {
      let time=ms.substring(11, ms.indexOf("."));
      let date=ms.substring(0, ms.indexOf("T"));
      let date1=date.replace("/", "-");
      //2020-06-01T04:24:43.230Z
      // 把时间的中的T和Z 替换成空字符串
      // let date = ms.replace("T", "\n");
      // let data = date.replace("-", "/");
      // let datime=data.substring(0, data.indexOf("."));
      //alert(data.substring(0, data.indexOf(".")));
      //这里时返回str
      return date1 +'\n'+ time;
    },
  },
};
</script>

<style scoped>
</style>