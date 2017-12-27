import React, {
  Component
} from 'react'
import {
  alertMessage,
  saveStrategy,
  saveAlldata2
} from '../../../Redux/Action/Action'
import {
  connect
} from 'react-redux'
import Highcharts from 'highcharts/highstock'
import unica from 'highcharts/themes/dark-unica'
import {
  getStra,
  idGetStra,
  statusToChinese,
  getDateList,
  getTransaction,
  getNextDay,
  makeData,
  getSortFun,
  strategyAction,
  delStrategy,
  getStrategy,
  getStatic,
  getBrowser
} from '../../../Redux/Action/shareAction'
import $ from 'jquery'
let alldata2 = [];
const conStyle = {
  backgroundColor: '#292929',
  color: '#FFFFFF',
  border: '0px solid #525252'
}
const thstyle = {
  width: '  15%'
}
const tdstyle = {
  width: '  15.2%'
}

class ProfitChart extends Component {


  constructor(props) {
    super(props);
    this.state = {};
  }


  makeChart(alldata2) {
    let chartArr1 = [];
    let chartArr2 = [];
    let chartData = [];
    let countYeild = 0;
    for (let i = 0; i < alldata2.length; i++) {
      countYeild += alldata2[i].yeild;
      chartData.push([
        alldata2[i].closetime,
        Number((countYeild).toFixed(4))
      ]);

      if (alldata2[i].direction == '看多') {
        chartArr1.push({
          "text": '方向：看多<br>开仓价：￥' + alldata2[i].openprice + '<br>平仓价：￥' + alldata2[i].closeprice + '<br>手续费：' + alldata2[i].test + '<br/>收益率：' + countYeild + '%',
          "title": "看多",
          "x": alldata2[i].closetime,
        })
      } else {
        chartArr2.push({
          "text": '方向：看空<br>开仓价：￥' + alldata2[i].openprice + '<br>平仓价：￥' + alldata2[i].closeprice + '<br>手续费：' + alldata2[i].test + '<br/>收益率：' + countYeild + '%',
          "title": "看空",
          "x": alldata2[i].closetime,
        })
      }
    }


    let config = {
      chart: {
        backgroundColor: '#000',
        panning: false
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        xDateFormat: '%Y-%m-%d %H:%M:%S',
        backgroundColor: '#292929', // 背景颜色
        borderColor: 'black', // 边框颜色
        borderRadius: 10, // 边框圆角
        borderWidth: 0, // 边框宽度
        shadow: true, // 是否显示阴影
        animation: true, // 是否启用动画效果
        style: { // 文字内容相关样式
          color: "#fff",
          fontSize: "12px",
          fontWeight: "blod",
          fontFamily: "Courir new"
        },
        shared: true,
        crosshairs: true,
        crosshairs: [{
          width: 1,
          color: '#525252'
        }],
        plotOptions: {
          spline: {
            marker: {
              radius: 1,
              lineColor: '#666666',
              lineWidth: 1
            }
          }
        }
      },
      legend: {
        enabled: true,
        align: 'left',
        verticalAlign: 'top',
        x: 0,
        y: 0,
        itemStyle: {
          color: '#fff'
        },
      },
      rangeSelector: {
        enabled: false,
        buttons: [{
          type: 'minute',
          count: 10,
          text: '10m'
        }, {
          type: 'minute',
          count: 30,
          text: '30m'
        }, {
          type: 'hour',
          count: 1,
          text: '1h'
        }, {
          type: 'day',
          count: 1,
          text: '1d'
        }, {
          type: 'week',
          count: 1,
          text: '1w'
        }, {
          type: 'all',
          text: '所有'
        }],
        selected: 5,
        buttonSpacing: 2
      },
      scrollbar: {
        enabled: true,
        height: 0
      },
      navigator: {
        enabled: true,
        height: 20
      },
      yAxis: {
        labels: {
          align: 'left',
          x: -5,
        },
        title: {
          // text: '收益率'
        },
        plotLines: [{
          color: '#fff', //线的颜色
          dashStyle: 'solid', //默认值，这里定义为实线
          value: 0, //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
          width: 1 //标示线的宽度，2px
        }],
        opposite: false,
        tickPixelInterval: 10,
        gridLineWidth: '0.1px',
        tickWidth: 0,
      },
      title: {
        // text: '收益曲线图',
        style: {
          fontSize: '10px'
        }
      },
      xAxis: {
        type: 'datetime',
        tickWidth: 0,
      },
      rangeSelector: {
        enabled: false
          // selected: 3,
          // inputEnabled:false
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        },
      },
      //收益曲线
      series: [{
        name: '收益率',
        data: chartData,
        id: 'profit',
        color: '#ff0000',
        lineWidth: 1,
        dataGrouping: {
          enabled: false
        }
      }, {
        type: 'flags',
        data: chartArr1,
        onSeries: "profit",
        shape: 'squarepin',
        width: 36,
        color: '#ff9912',
        fillColor: 'transparent',
        style: {
          color: '#fff'
        },
        y: -40,
        name: '看多',
      }, {
        type: 'flags',
        data: chartArr2,
        onSeries: "profit",
        shape: 'squarepin',
        width: 36,
        color: '#4169e1',
        fillColor: 'transparent',
        style: {
          color: '#fff'
        },
        y: -40,
        name: '看空',
      }]
    };
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    $("#profit_chart").css('width', $("#rightCenter").width() - 10);
    $("#profit_chart").css('height', $("#rightCenter").height() - 40);
    Highcharts.StockChart('profit_chart', config);
  }
  componentWillReceiveProps(getProp) {
    if (getProp.type == 'id') {
        this.makeChart(alldata2);
        return;
    }
    if (getProp.choosedate == undefined) {
      if (getProp.type != 'id') {
        return;
      }
        this.makeChart(alldata2);
        return;
    }
    let sdate = getProp.choosedate;
    let edate = getNextDay(sdate);
    let chooseid = getProp._id;
    // let data = getTransaction(chooseid, sdate, edate);
    let data = getStatic().transitions.slice(0);
    let dataList = makeData(chooseid, data);

    let newData = dataList.newData;
    if (newData.length == 0) {
      $('#profit_chart').empty();
      return;
    }
    alldata2 = newData;

    this.makeChart(alldata2);

  }
  componentDidMount() {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.makeChart(alldata2);
      }, 300)
    })
  }
  render() {
    return (
      <div id="profit_chart_p" style={{border:'5px solid #525252',borderRadius:'4px',fontSize:'5px',height:'100%'}}>
            <div id="profit_chart" style={{height:'100%',width:'100%',backgroundColor:'#000'}}>
      </div>
    </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    choosedate: state.reduToChooseDate.choosedate,
    _id: state.reduToChooseId,
    // type:state.reduToShowList
  };
}
const mapDispatchToProps = (dispatch) => {
  return {

  };
}
export default connect(mapStateToProps)(ProfitChart);