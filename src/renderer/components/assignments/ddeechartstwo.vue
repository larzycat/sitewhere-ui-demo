<template>
    <div>
        <div id="myChart2" :style="{width: '1050px', height: '350px'}"></div>
    </div>
</template>

<script>
    var mqtt = require("mqtt");
    import Vue from "vue";
    import {myChart2OptionFun} from  './ChartOptionFunc'
import { count } from 'console';
    export default {
        props: {
            twoobj: {
                type: Object,
                require: true,
			},
			deviceToken:{type:String}
        },
        name: "",
        data() {
            return {
                lendData:[],
                seriesdata2: [],
				xAxisdata: [],
				count:0,
                xNum:0,
				tempData:[],
				avgSeries:[]
            };
        },
        watch: {
            twoobj: {
                handler(newData, oldData) {
                    const that = this;
                    var seriesdata2 = that.seriesdata2;
					var lendData=that.lendData;
					var tempData=that.tempData;
					var avgSeries=that.avgSeries;
					console.log('散点图 监听 newData：'+ JSON.stringify(newData));
					console.log('散点图 监听 deviceToken：'+ that.deviceToken);
					var xx1=that.xNum;
					console.log('散点图 累计开始：'+ this.count++);

                    Object.keys(newData).forEach((element, i) => {
                        if (seriesdata2.length > 0) {

                            for (let index = 0; index < seriesdata2.length; index++) {
                                if (seriesdata2[index].name && seriesdata2[index].name === element) {
									
									seriesdata2[index].data.splice(0,seriesdata2.length);
									if(this.count%10==0 && this.count !=0 ){
                                        if(i===0){
                                           that.xNum++;
                                        }
										console.info('----------累计 10个数  '+this.count+' X轴 '+that.xNum);
											var avgCount=this.arrAverageNum2(tempData[index].data);
											console.info(element+ ' 平均值：'+avgCount);

											if(typeof(avgSeries[index]) =='undefined'){
												avgSeries.push({
													name: element,
													type: "effectScatter",
													itemStyle: { normal: { opacity: 0.8 } },
													symbolSize: 14,
													data: [[that.xNum,avgCount]],
												});
											}else{
												//avgSeries[index].data.splice(0,avgSeries.length);
												avgSeries[index].data.push([that.xNum,avgCount]);
											}
									}else{
										tempData[index].data.push(newData[element]);
									}
                                    seriesdata2[index].data.push(newData[element]);
                                    break;
                                } else if ( seriesdata2[index].name != element && index === seriesdata2.length - 1 ) {
									tempData.push({name: element, data: [newData[element]]});
                                    lendData.push(element);
                                    seriesdata2.push({
                                        name: element,
                                        type: "effectScatter",
                                        itemStyle: { normal: { opacity: 0.8 } },
                                        symbolSize: 14,
                                        data: [newData[element]],
                                    });
                                }
                            }
                        } else {
							tempData.push({name: element, data: [newData[element]]});
                            lendData.push(element);
                            seriesdata2.push({
                                name: element,
                                type: "effectScatter",
                                itemStyle: { normal: { opacity: 0.8 } },
                                symbolSize: 14,
                                data: [newData[element]],
                            });
                        }
                    });
                    that.drawLine2();
                },
                deep: true,
            }
        },
        mounted() {
            this.drawLine2();
        },
        methods: {
			drawLine2() { // 绘制图表
			//var d1=this.seriesdata2;
			//var d2=this.avgSeries;
                let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
                let option2 = myChart2OptionFun('',this.avgSeries,this.lendData);
                myChart2.setOption(option2);
			},
			arrAverageNum2(arr) {
				var sum = eval(arr.join("+"));
				return ~~(sum / arr.length * 100) / 100;
			}
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