import React, {
  Component
} from 'react'
import {
  alertMessage,
  saveStrategy,
  saveAlldata2
} from '../Redux/Action/Action'
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
  getNianHua,
  getDatas,
  getStatic
} from '../Redux/Action/shareAction'
import exporting from 'highcharts/modules/exporting'
import $ from 'jquery'
const conStyle = {
  backgroundColor: '#292929',
  color: '#FFFFFF',
  border: '0px solid #525252'
}
var chart;
// let chartwidth = document.body.clientWidth < 992 ? document.body.clientWidth * 0.97 : document.body.clientWidth * 0.748;
// let chartheight = (document.documentElement.clientHeight - 120) / 2 + 170;
class Chart extends Component {


  constructor(props) {
    super(props);
    this.state = {
      chart_name: ''
    };
  }
  makeChart(chartData, name, market_info, type) {
    getDatas(market_info.exchange, market_info.symbol, market_info.date, 'bar').then((data) => {
      let market_data = [];
      for (let i = 0; i < data.length; i++) {
        market_data.push([
          data[i].datetime, // the date
          Number((data[i].open).toFixed(6)), // open
          Number((data[i].high).toFixed(6)), // high
          Number((data[i].low).toFixed(6)), // low
          Number((data[i].close).toFixed(6)) // close
        ]);
      }
      let flag_data = [];
      for (let i in chartData) {
        flag_data.push({
          "x": chartData[i][0],
          "title": chartData[i][1],
          "text": name + ':' + chartData[i][1],
        })
      }
      this.before(chartData, name, market_data, flag_data, type);
    })
  }
  before(chartData, name, market_data, flag_data, type) {
    let up_data = [];
    let down_data = [];
    for (let i in chartData) {
      if (chartData[i][1] == 'up') {
        up_data.push({
          "x": chartData[i][0],
          "title": chartData[i][1],
          "text": name + ':' + chartData[i][1],
        })
      } else {
        down_data.push({
          "x": chartData[i][0],
          "title": chartData[i][1],
          "text": name + ':' + chartData[i][1],
        })
      }
    }
    let config = type != 'string' ? {
      chart: {
        backgroundColor: '#3b3b3b',
        // panning: false
      },
      credits: {
        enabled: false
      },
      // exporting: {
      //   enabled: true
      // },
      tooltip: {
        xDateFormat: '%Y-%m-%d %H:%M:%S',
        backgroundColor: '#292929', // 背景颜色
        borderColor: '#fff', // 边框颜色
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
        }, {
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
        align: 'center',
        verticalAlign: 'bottom',
        x: 0,
        y: 10,
        itemStyle: {
          color: '#fff'
        },
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
      scrollbar: {
        height: 5,
        enabled: false,
        barBackgroundColor: 'gray',
        barBorderRadius: 7,
        barBorderWidth: 0,
        buttonBackgroundColor: 'gray',
        buttonBorderWidth: 0,
        buttonBorderRadius: 7,
        trackBackgroundColor: 'none',
        trackBorderWidth: 1,
        trackBorderRadius: 8,
        trackBorderColor: '#CCC',
        // showFull: false
      },
      navigator: {
        enabled: true,
        height: 20
      },
      plotOptions: {
        //修改蜡烛颜色
        candlestick: {
          color: '#33AA11',
          upColor: '#DD2200',
          lineColor: '#33AA11',
          upLineColor: '#DD2200',
          maker: {
            states: {
              hover: {
                enabled: false,
              }
            }
          }
        },
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
        height: '50%',
        opposite: false,
        tickPixelInterval: 50,
        gridLineWidth: '0.1px',
        tickWidth: 0,
      }, {
        labels: {
          align: 'left',
          x: -5,
        },
        top: '50%',
        height: '50%',
        opposite: false,
        tickPixelInterval: 50,
        gridLineWidth: '0.1px',
        tickWidth: 0,
      }],
      xAxis: {
        // type: 'datetime',
        opposite: false,
        tickPixelInterval: 100,
        gridLineWidth: '0.1px',
        tickWidth: 0,
      },
      series: [{
          name: '股价',
          data: market_data,
          lineWidth: 1,
          id: 'market',
          // type: 'candlestick',
        }, {
          yAxis: 1,
          type: 'spline',
          name: name,
          color: '#e9df21',
          data: chartData,
          lineWidth: 1,
          dataGrouping: {
            enabled: false
          },
          marker: {
            enabled: false,
          },
          shadow: true


        },
        // {
        //   name: name,
        //   type: 'flags',
        //   data: flag_data,
        //   onSeries: "market",
        //   shape: 'circlepin',
        //   width: 16,
        //   color: "#ff9912",
        //   fillColor: 'transparent',
        //   style: {
        //     color: '#fff'
        //   }
        // }
      ]
    } : {
      chart: {
        backgroundColor: '#3b3b3b',
        // panning: false
      },
      credits: {
        enabled: false
      },
      // exporting: {
      //   enabled: true
      // },
      tooltip: {
        xDateFormat: '%Y-%m-%d %H:%M:%S',
        backgroundColor: '#292929', // 背景颜色
        borderColor: '#fff', // 边框颜色
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
        }, {
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
        align: 'center',
        verticalAlign: 'bottom',
        x: 0,
        y: 10,
        itemStyle: {
          color: '#fff'
        },
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
      scrollbar: {
        height: 5,
        enabled: false,
        barBackgroundColor: 'gray',
        barBorderRadius: 7,
        barBorderWidth: 0,
        buttonBackgroundColor: 'gray',
        buttonBorderWidth: 0,
        buttonBorderRadius: 7,
        trackBackgroundColor: 'none',
        trackBorderWidth: 1,
        trackBorderRadius: 8,
        trackBorderColor: '#CCC',
        // showFull: false
      },
      navigator: {
        enabled: true,
        height: 20
      },
      plotOptions: {
        //修改蜡烛颜色
        candlestick: {
          color: '#33AA11',
          upColor: '#DD2200',
          lineColor: '#33AA11',
          upLineColor: '#DD2200',
          maker: {
            states: {
              hover: {
                enabled: false,
              }
            }
          }
        },
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
        height: '50%',
        opposite: false,
        tickPixelInterval: 50,
        gridLineWidth: '0.1px',
        tickWidth: 0,
      }, {
        labels: {
          align: 'left',
          x: -5,
        },
        top: '50%',
        height: '50%',
        opposite: false,
        tickPixelInterval: 50,
        gridLineWidth: '0.1px',
        tickWidth: 0,
      }],
      xAxis: {
        type: 'datetime',
        opposite: false,
        tickPixelInterval: 100,
        gridLineWidth: '0.1px',
        tickWidth: 0,
      },
      series: [{
          name: '股价',
          data: market_data,
          lineWidth: 1,
          id: 'market',
          type: 'spline',
        },
        // {
        //     yAxis: 1,
        //     type: 'spline',
        //     name: name,
        //     color: '#e9df21',
        //     data: chartData,
        //     lineWidth: 1,
        //     dataGrouping: {
        //       enabled: false
        //     },
        //     marker: {
        //       enabled: false,
        //     },
        //     shadow: true


        //   },
        {
          name: name,
          type: 'flags',
          data: up_data,
          onSeries: "market",
          shape: 'circlepin',
          width: 16,
          color: "#dd2200",
          fillColor: 'transparent',
          style: {
            color: '#fff'
          },
          y: -40
        }, {
          name: name,
          type: 'flags',
          data: down_data,
          onSeries: "market",
          shape: 'circlepin',
          width: 16,
          color: "#33AA11",
          fillColor: 'transparent',
          style: {
            color: '#fff'
          },
          y: 20
        }
      ],
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [{
              text: '导出JPEG',
              onclick: function() {
                this.exportChart({
                  type: 'image/jpeg'
                });
              }
            }, {
              text: '导出PNG',
              onclick: function() {
                this.exportChart();
              }
            }, {
              text: '导出PDF',
              onclick: function() {
                this.exportChart({
                  type: 'application/pdf'
                });
              }
            }]
          }
        },
      }
    };
    exporting(Highcharts);
    // unica(Highcharts);
      Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    var chart = Highcharts.StockChart('predict_Chart_' + name, config);
    getStatic().predictChart.push(chart);
  }
  componentWillMount() {
    this.setState({
      chart_name: this.props.name
    })
  }
  componentWillReceiveProps(getProp) {
    this.setState({
      chart_name: getProp.name
    })
  }
  checkString(data) {
    for (let i in data) {
      for (let j in data[i]) {
        if (typeof(data[i][j]) == 'string') {
          return false;
        }
      }
    }
    return true;
  }
  componentDidMount() {
    let data = this.props.data;
    if (this.props == undefined) {
      data = [];
    }
    // if (!this.checkString(this.props.data)) {
    //   data = [];
    // }

    this.makeChart(data, this.props.name, this.props.market_info, this.props.type);
  }
  componentDidUpdate(prevProps, prevState) {
    let data = this.props.data;
    // if (!this.checkString(data)) {
    //   data = [];
    // }
    this.makeChart(data, this.props.name, this.props.market_info, this.props.type);
  }
 

  render() {
    const chart = {
      height: '320px',
      width: '100%',
      borderRadius: '4px',
    }

    let _id = 'predict_Chart_' + this.state.chart_name;
    return (

      <div className='predict_chart' id={_id} style={chart}></div>
      
    )
  }
}
const mapStateToProps = (state) => {
  return {};
}
export default connect(mapStateToProps)(Chart);