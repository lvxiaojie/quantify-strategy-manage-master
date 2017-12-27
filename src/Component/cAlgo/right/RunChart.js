import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import Highcharts from 'highcharts/highstock'
import $ from 'jquery'
import {
  getTransaction,
  getNextDay,
  makeData,
  getStatic,
} from '../../../Redux/Action/shareAction'

let sdate = '';
let edate = '';
let alldata2 = [];
let MA5Array = [],
  MA10Array = [],
  MA30Array = [],
  MA60Array = [];
class RunChart extends Component {


  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chartData: [],
      Dates: [],
      shortYArr: [],
      buyYArr: [],
      name: '',
      date: ''
    };
  }


  makeChart(alldata2) {
    let chartData = [];
    let buyYArr = [];
    let shortYArr = [];
    let data = getStatic().datas;
    // let data = [];
    for (let i = 0; i < data.length; i++) {
      chartData.push([
        data[i].datetime, // the date
        Number((data[i].open).toFixed(6)), // open
        Number((data[i].high).toFixed(6)), // high
        Number((data[i].low).toFixed(6)), // low
        Number((data[i].close).toFixed(6)) // close
      ]);
    }
    let qualification = getStatic().measure_datas;
    MA5Array = qualification.EMA5;
    MA10Array = qualification.EMA10;
    MA30Array = qualification.EMA30;
    MA60Array = qualification.EMA60;

    let num = 1;
    for (let i = 0; i < alldata2.length; i++) {
      if (alldata2[i].direction == '看空') {
        shortYArr.push({

          "x": alldata2[i].opentime,
          "title": 'short' + num,
          "text": '成交价：￥' + alldata2[i].openprice + '<br>成交量：' + alldata2[i].volume,
        })
        shortYArr.push({

          "x": alldata2[i].closetime,
          "title": 'cover' + num,
          "text": '成交价：￥' + alldata2[i].closeprice + '<br>成交量：' + alldata2[i].volume,
        })
      } else {
        buyYArr.push({

          "x": alldata2[i].opentime,
          "title": 'buy' + num,
          "text": '成交价：￥' + alldata2[i].openprice + '<br>成交量：' + alldata2[i].volume,

        })
        buyYArr.push({

          "x": alldata2[i].closetime,
          "title": 'sell' + num,
          "text": '成交价：￥' + alldata2[i].closeprice + '<br>成交量：' + alldata2[i].volume,
        })
      }
      num++;
    }

    // console.log(buyYArr,shortYArr)

    let config = {
      chart: {
        backgroundColor: '#000',
        borderRadius: '4px',
        panning: false
      },
      rangeSelector: {
        enabled: true,
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
          type: 'hour',
          count: 2,
          text: '2h'
        }, {
          type: 'all',
          text: '所有'
        }],
        selected: 4,
        inputEnabled: false,
        inputBoxWidth: 40,
        inputBoxHeight: 18,
        buttonPosition: {
          x: 10,
          y: 8,
        },
      },
      exporting: {
        enabled: false,
      },
      credits: {
        enabled: false
      },
      title: {
        align: 'center',
        // margin: 10,
        text: this.state.name + '  ' + this.state.date,
        style: {
          // fontWeight: 'bold',
          fontSize: '20px'
        },
      },
      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        y: 10,
        margin: 0,
        itemStyle: {
          "fontSize": "13px",
          "fontWeight": "bold"
        },
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
      xAxis: {
        type: 'datetime',
        tickWidth: 0,
      },
      yAxis: [{
        labels: {
          align: 'left',
          x: -5,
        },
        title: {
          // text: '价格'
        },
        top: '0%',
        height: '100%',
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
      }],
      scrollbar: {
        enabled: true,
        height: 0
      },
      navigator: {
        enabled: true,
        height: 20
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        },
      },
      series: [{
        // type: 'candlestick',
        name: '价格',
        data: chartData,
        id: 'runMarket',
        lineWidth: 1,
        // color:'#f15a24',
        dataGrouping: {
          enabled: false
        }
      }, {
        type: 'flags',
        data: shortYArr,
        onSeries: "runMarket",
        shape: 'squarepin',
        width: 36,
        color: '#4169e1',
        fillColor: 'transparent',
        style: {
          color: '#fff'
        },
        y: -40,
        name: '看多',
      }, {
        type: 'flags',
        data: buyYArr,
        onSeries: "runMarket",
        shape: 'squarepin',
        width: 36,
        color: "#ff9912",
        fillColor: 'transparent',
        style: {
          color: '#fff'
        },
        y: 20,
        name: '看空',
      }, {
        type: 'spline',
        name: 'MA5',
        color: '#fff',
        data: MA5Array,
        visible: false,
        lineWidth: 2,
        dataGrouping: {
          enabled: false
        },
        marker: {
          enabled: false,
        },
        shadow: true
      }, {
        type: 'spline',
        name: 'MA10',
        color: '#e9df21',
        data: MA10Array,
        lineWidth: 2,
        visible: false,
        dataGrouping: {
          enabled: false
        },
        marker: {
          enabled: false,
        },
        shadow: true
      }, {
        type: 'spline',
        name: 'MA30',
        color: '#910000',
        data: MA30Array,
        lineWidth: 2,
        visible: false,
        dataGrouping: {
          enabled: false
        },
        marker: {
          enabled: false,
        },
        shadow: true
      }, {
        type: 'spline',
        name: 'MA60',
        color: '#1aadce',
        border: 0,
        data: MA60Array,
        visible: false,
        lineWidth: 2,
        dataGrouping: {
          enabled: false
        },
        marker: {
          enabled: false,
        },
        shadow: true
      }]
    };
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    $("#run_chart").css('width', $("#rightCenter").width() - 10);
    $("#run_chart").css('height', $("#rightCenter").height() - 40);
    Highcharts.StockChart('run_chart', config);


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
    this.setState({
      name: getProp.title.Strategy.name,
      date: getProp.title.date,
    })
    clearInterval(this.run_chart);
    if (getProp.choosedate == undefined) {
      this.makeChart([]);
      return;
    }
    sdate = getProp.choosedate;
    edate = getNextDay(sdate);
    let chooseid = getProp._id;
    let data = getTransaction(chooseid, sdate, edate);
    let dataList = makeData(chooseid, data);
    let newData = dataList.newData;
    let nianhua = dataList.nianhua;
    let average_winrate = dataList.average_winrate;
    if (newData.length == 0) {
      $('#run_chart').empty();
      return;
    }
    alldata2 = newData;

    setTimeout(() => { //延迟获取行情数据
      this.makeChart(alldata2);
    }, 1000)
  }
  componentDidMount() {
    clearInterval(this.run_chart);
    this.run_chart = setInterval(() => {
      let data = getStatic().datas;
      if (data != undefined) {
        clearInterval(this.run_chart);
        this.makeChart(alldata2);
      }
    }, 1000);
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.makeChart(alldata2);
      }, 300)
    })
  }
  componentWillUnmount() {
    this.run_chart && clearTimeout(this.run_chart);
    clearInterval(this.run_chart);
  }
  render() {
    return (
      <div id="run_chart_p"  style={{border:'5px solid #525252',borderRadius:'4px',fontSize:'5px',width:'100%',height:'100%'}}>
      <div id="run_chart" style={{height:'100%',width:'100%',backgroundColor:'#000',borderRadius: '4px',}}>
      </div>
    </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    choosedate: state.reduToChooseDate.choosedate,
    _id: state.reduToChooseId,
    // marketDetail: state.reduShowMarketDetail,
    title: state.reduShowDataTitle,
    type: state.reduToShowList
  };
}
const mapDispatchToProps = (dispatch) => {
  return {

  };
}
export default connect(mapStateToProps)(RunChart);