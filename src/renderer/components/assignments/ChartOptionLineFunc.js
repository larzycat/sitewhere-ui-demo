//折线图调用函数
//xData 采集时间
//Ydata 设备元数据：脉冲数:xxx，设备温度:0
//lend 图例 ：脉冲数，设备温度 ...
export const myChartOptionLineFunc = (xData,YData,lend) => {
    var option = {
        legend: {
            show:false,
            data: lend,
        },
        title: {
            text: "mqtt折线图",
        },
        // 鼠标悬停名称框
        tooltip: {
            trigger: "axis",
        },
        // 设置x轴
        xAxis: {
            type: "category",
            data: xData,
            // 设置两边不留空白
            boundaryGap: false,
        },
        // 设置Y轴
        yAxis: {
            type: "value",
            splitLine: {
                show: false,
            },
        },
        toolbox: {
            left: "center",
            feature: {
                dataZoom: {
                    yAxisIndex: "none",
                },
                restore: {},
                saveAsImage: {},
                dataView: {},
            },
        },
        //dataZoom 区域缩放
        dataZoom: [
            {
                type: "slider",
                show: true,
                start: 94,
                end: 100,
                handleSize: 8,
            },
            {
                type: "inside",
                start: 94,
                end: 100,
            },
            {
                type: "slider",
                show: true,
                yAxisIndex: 0,
                filterMode: "empty",
                width: 12,
                height: "70%",
                handleSize: 8,
                showDataShadow: false,
                left: "93%",
            },
        ],
        series: YData
    }
    return option
}
//
