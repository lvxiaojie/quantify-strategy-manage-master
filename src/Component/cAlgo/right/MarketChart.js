import React, {
  Component
} from 'react'
import {
  alertMessage,
  saveStrategy,
  saveAlldata2,
  showMarketDetail,
  showLoading
} from '../../../Redux/Action/Action'
import {
  connect
} from 'react-redux'
import Highcharts from 'highcharts/highstock'
import unica from 'highcharts/themes/dark-unica'
import exporting from 'highcharts/modules/exporting'
import Loading from '../../Loading'
import $ from 'jquery'
import light from 'highcharts/themes/grid-light'
import Switch, {
  Case,
  Default
} from 'react-switch-case';
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
  getDatas,
  formatDate,
  downFile,
  tradeMA,
  getMeasure,
  makeMeasure,
  getDay,
  getBrowser,
  getStatic,
  downMarket,
  strDateTime
} from '../../../Redux/Action/shareAction'
let _THIS;
const conStyle = {
  backgroundColor: '#292929',
  color: '#FFFFFF',
  border: '0px solid #525252'
}
const title = {
  color: 'e10601'
}
const thstyle = {
  width: ' 15%'
}
const tdstyle = {
  width: ' 15.2%'
}
let ohlc = [],
  volume = [];
let qualification = [];
let data = [];
let measure_datas = [];
// let exchange = 'CSRPME';
// let symbol = 'D1_AG';
let exchange = 'CTP';
let symbol = 'IF';
let start;
let end;
class MarketChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: '',
      chartData: [],
      choose: 'MACD',
      exchange: 'CTP'
    };
  }
  downData(e) {
    e.preventDefault();
    let start_date = $('#start_date').val();
    let end_date = $('#end_date').val();
    if (strDateTime(start_date) || strDateTime(end_date)) {
      this.props.dispatch(alertMessage('日期格式错误', 2000));
      return;
    }
    let exchange = this.state.exchange;
    let symbol = $('#market_symbol').val();
    downMarket(exchange, symbol, start_date, end_date).then((data) => {
        if (data.length == 0) {
          this.props.dispatch(alertMessage('该日期区间没有行情数据', 2000));
          return;
        }
        let text;
        text = "datetime,open,high,low,close,volume";
        for (let i = 0; i < data.length; i++) {
          text += '\r\n'
          text += formatDate(data[i].datetime) + ',';
          text += (data[i].open).toFixed(1) + ',';
          text += (data[i].high).toFixed(1) + ',';
          text += (data[i].low).toFixed(1) + ',';
          text += (data[i].close).toFixed(1) + ',';
          text += data[i].volume;
        }
        let name = exchange + '_' + symbol + '_' + start_date + '_' + end_date + '_' + Math.round(new Date().getTime());
        downFile(text, name + '.csv');
      }, (message) => {
        this.props.dispatch(alertMessage(message));
      })
      // return;
  }
  downQua(index, num) {
    let Data = [];
    let text;
    text = 'datetime';
    for (let i = 0; i < num; i++) {
      let name = i == 0 ? index : index + (i + 1);
      Data.push({
        name: name,
        downData: qualification[name]
      })
      text += ',' + name;
    }
    for (let i = 0; i < Data[0].downData.length; i++) {
      text += '\r\n';
      text += formatDate(Data[0].downData[i][0]) + ',';
      for (let j = 0; j < Data.length; j++) {
        text += Data[j].downData[i][1] + ',';
      }

    }
    let name = exchange + '_' + symbol + '_' + start + '_' + index + '_' + Math.round(new Date().getTime());
    downFile(text, name + '.csv');
  }
  downIndex() {
    if (this.state.choose == '') {
      this.props.dispatch(alertMessage('未选择指标'));
      return;
    }
    switch (this.state.choose) {
      case 'MACD':
      case 'BBANDS':
        this.downQua(this.state.choose, 3);
        break;
      case 'KDJ':
      case 'STOCHRSI':
        this.downQua(this.state.choose, 2);
        break;
      default:
        this.downQua(this.state.choose, 1);
        break;
    }
    this.closeDown();
  }
  makeChart(flag) {
    if (flag != false) {
      getDatas(exchange, symbol, start, 'bar').then((result_data) => {
        getDatas(exchange, symbol, start, 'indicator').then((result_measure) => {
          data = result_data;
          measure_datas = result_measure;
          this.Chart(result_data, result_measure);
          this.props.dispatch(showLoading(false));

        })
      })
    } else {
      this.Chart(data, measure_datas);
      // this.props.dispatch(showLoading(false));
    }
  }
  Chart(data, measure_datas) {
    ohlc = [], volume = [];
    let columColor = [];
    // '#33AA11', '#DD2200'
    for (let i = 0; i < data.length; i++) {
      ohlc.push([
        data[i].datetime, // the date
        Number((data[i].open).toFixed(6)), // open
        Number((data[i].high).toFixed(6)), // high
        Number((data[i].low).toFixed(6)), // low
        Number((data[i].close).toFixed(6)), // close
        data[i].volume
      ]);
      // if (i<30) {
      //   columColor.push('#DD2200');
      // } else {
      //   columColor.push('#33AA11');
      // }
      volume.push([
        data[i].datetime, // the date
        data[i].volume, // the volume
      ]);
    }


    qualification = makeMeasure(measure_datas);
    // console.log(qualification)


    let newClose = data.length > 0 ? data[data.length - 1].close : 0;
    let newVolume = data.length > 0 ? data[data.length - 1].volume : 0;
    let newDatetime = data.length > 0 ? formatDate(data[data.length - 1].datetime).slice(11,19) : 0;
    let marketDetail = {
      exchange: exchange,
      symbol: symbol,
      date: start,
      newClose: newClose,
      newVolume: newVolume
    }
    this.props.dispatch(showMarketDetail(marketDetail));
    let config = {
      chart: {
        backgroundColor: '#000',
        // panning: false,
        borderRadius: '4px',
        // margin: [0, 0, 0, 0]
      },
      rangeSelector: {
        enabled: true,
        buttons: [{
          type: 'minute',
          count: 10,
          text: '10m'
        }, {
          type: 'hour',
          count: 1,
          text: '1h'
        }, {
          type: 'all',
          text: '所有'
        }],
        selected: 2,
        inputEnabled: false,
        inputBoxWidth: 40,
        inputBoxHeight: 18,
        buttonPosition: {
          x: 10,
          y: 8,
        },
      },
      loading: {
        labelStyle: {
          position: 'relative',
          top: '10em',
          zindex: 1000
        }
      },
      credits: {
        enabled: false
      },
      title: {
        align: 'center',
        useHTML: true,
        text: document.body.clientWidth > 900 ?  exchange + ' ' + symbol + ' ' + start + "<span class='chart_title_date'>"+ newDatetime +"</span>"+ "<span id='new_close' class='chart_title'>" + newClose + ',' + newVolume +"</span>" : null,
        style: {
          fontWeight: 'bold',
          fontSize: '20px'
        },
        y: 15,
      },
      // title: {
      //   align: 'center',
      //   text: ' (' + exchange + ' ' + symbol + ' ' + start + ')' +'   ' +"实时价格：" + newClose + '   实时成交量：' + newVolume,
      //   style: {
      //     color: "#FF9999",
      //     fontWeight: "bold",
      //     fontSize: '12px'
      //   },
      //   y: 12,
      // },
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
        itemDistance: 5
      },
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
      xAxis: {
        // type: 'datetime',
        opposite: false,
        tickPixelInterval: 100,
        gridLineWidth: '0.1px',
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
        top: '-15%',
        height: '70%',
        opposite: false,
        tickPixelInterval: 50,
        gridLineWidth: '0.1px',
        tickWidth: 0,
      }, {
        labels: {
          enabled: false,
          align: 'left',
          x: -5
        },
        tickPixelInterval: 50,
        top: '45%',
        height: '15%',
        gridLineWidth: '0px',
        tickWidth: 0,
      }, {
        lineWidth: 0,
        labels: {
          align: 'left',
          x: -5
        },
        title: {
          text: null
        },
        top: '60%',
        height: '40%',
        offset: 0,
        opposite: false,
        tickPixelInterval: 50,
        gridLineWidth: '0.1px',
        tickWidth: 0,
      }],
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
        //去掉曲线和蜡烛上的hover事件
        series: {
          states: {
            hover: {
              enabled: false
            }
          },
          line: {
            marker: {
              enabled: false
            }
          },

          events: {
            legendItemClick: function(e) {

              var index = this.index;
              if (index < 6) {
                return;
              }
              var series = this.chart.series;
              if (!series[index].visible) {
                for (var i = 6; i < series.length - 1; i++) {
                  if (series[i].visible) {
                    series[i].hide();
                  }
                }
                switch (index) {
                  case 6:
                  case 7:
                  case 8:
                    series[6].show();
                    series[7].show();
                    series[8].show();
                    break;
                  case 9:
                  case 10:
                  case 11:
                    series[9].show();
                    series[10].show();
                    series[11].show();
                    break;
                  case 12:
                    series[12].show();
                    series[13].show();
                    break;
                  case 14:
                    series[14].show();
                    series[15].show();
                    break;
                  default:
                    series[index].show();
                    break;
                }

              } else {
                switch (index) {
                  case 6:
                  case 7:
                  case 8:
                    series[6].hide();
                    series[7].hide();
                    series[8].hide();
                    break;
                  case 9:
                  case 10:
                  case 11:
                    series[9].hide();
                    series[10].hide();
                    series[11].hide();
                    break;
                  case 12:
                    series[12].hide();
                    series[13].hide();
                    break;
                  case 14:
                    series[14].hide();
                    series[15].hide();
                    break;
                  default:
                    series[index].hide();
                    break;
                }
              }
              return false;
            }
          }

        }
      },
      series: [{
          type: 'candlestick',
          name: '价格',
          data: ohlc,
          showInLegend: false,
          shadow: true
        }, {
          type: 'column',
          name: '成交量',
          colorByPoint: true,
          data: volume,
          showInLegend: false,
          yAxis: 1,
          pointWidth: 2
        }, {
          type: 'spline',
          name: 'MA5',
          color: '#fff',
          data: qualification.EMA5,
          visible: true,
          lineWidth: 1,
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
          data: qualification.EMA10,
          lineWidth: 1,
          visible: true,
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
          data: qualification.EMA30,
          lineWidth: 1,
          visible: true,
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
          data: qualification.EMA60,
          visible: true,
          lineWidth: 1,
          dataGrouping: {
            enabled: false
          },
          marker: {
            enabled: false,
          },
          shadow: true
        }, {
          name: 'MACD',
          tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> macd: <b>{point.y}</b><br/>'
          },
          data: qualification.MACD,
          color: '#fff',
          visible: false,
          lineWidth: 1,
          yAxis: 2,
          marker: {
            enabled: false,
          },
        }, {
          name: 'signal',
          data: qualification.MACD2,
          color: '#e9df21',
          visible: false,
          lineWidth: 1,
          yAxis: 2,
          marker: {
            enabled: false,
          },
          showInLegend: false
        }, {
          name: 'hist',
          data: qualification.MACD3,
          enabled: false,
          color: '#ad03b4',
          visible: false,
          lineWidth: 1,
          yAxis: 2,
          marker: {
            enabled: false,
          },
          showInLegend: false
        }, {
          name: 'BBANDS',
          tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> upperband: <b>{point.y}</b><br/>'
          },
          data: qualification.BBANDS,
          color: '#fff',
          // visible: false,
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          yAxis: 2,
        }, {
          name: 'middleband',
          data: qualification.BBANDS2,
          // visible: false,
          color: '#e9df21',
          lineWidth: 1,
          yAxis: 2,
          marker: {
            enabled: false,
          },
          showInLegend: false
        }, {
          name: 'lowerband',
          data: qualification.BBANDS3,
          // enabled: false,
          // visible: false,
          color: '#ad03b4',
          lineWidth: 1,
          yAxis: 2,
          marker: {
            enabled: false,
          },
          showInLegend: false
        }, {
          name: 'KDJ',
          tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> k: <b>{point.y}</b><br/>'
          },
          data: qualification.KDJ,
          color: '#fff',
          visible: false,
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          yAxis: 2,
        }, {
          name: 'D',
          data: qualification.KDJ2,
          visible: false,
          color: '#e9df21',
          lineWidth: 1,
          yAxis: 2,
          marker: {
            enabled: false,
          },
          showInLegend: false
        }, {
          name: 'STOCHRSI',
          tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> fastk: <b>{point.y}</b><br/>'
          },
          data: qualification.STOCHRSI,
          color: '#fff',
          visible: false,
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          yAxis: 2,
        }, {
          name: 'fastd',
          data: qualification.STOCHRSI2,
          visible: false,
          color: '#e9df21',
          lineWidth: 1,
          yAxis: 2,
          marker: {
            enabled: false,
          },
          showInLegend: false
        }, {
          name: 'RSI',
          data: qualification.RSI,
          visible: false,
          color: '#ff0000',
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          yAxis: 2,
        }, {
          name: 'OBV',
          data: qualification.OBV,
          color: '#e9df21',
          visible: false,
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          yAxis: 2,
        }, {
          name: 'SAR',
          data: qualification.SAR,
          color: '#fff',
          visible: false,
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          yAxis: 2,
        }, {
          name: 'ATR',
          data: qualification.ATR,
          color: '#e9df21',
          visible: false,
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          yAxis: 2,
        }, {
          name: 'MOM',
          data: qualification.MOM,
          color: '#ff0000',
          visible: false,
          marker: {
            enabled: false,
          },
          lineWidth: 1,
          yAxis: 2,
        }, {
          name: 'WILLR',
          data: qualification.WILLR,
          color: '#e9df21',
          visible: false,
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          yAxis: 2,
        }, {
          name: 'DEMA',
          data: qualification.DEMA,
          color: '#ad03b4',
          visible: false,
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          yAxis: 2,
        }

      ],
      exporting: {
        allowHTML: true,
        buttons: {
          contextButton: {
            menuItems: [{
              text: '导出行情数据',
              onclick: function() {
                // _THIS.downData();
                $('#downMarket').css('display', 'block');
              }
            }, {
              text: '导出指标数据',
              onclick: function() {
                $('#downData').css('display', 'block');
              },
              separator: false
            }]
          }
        }
      },
    };


    //修改colum条的颜色（重写了源码方法）  
    var originalDrawPoints = Highcharts.seriesTypes.column.prototype.drawPoints;
    Highcharts.seriesTypes.column.prototype.drawPoints = function() {
      var merge = Highcharts.merge,
        series = this,
        chart = this.chart,
        points = series.points,
        i = points.length;
      while (i--) {
        var candlePoint = chart.series[0].points[i];
        var columPoint = chart.series[1].points[i];
        // console.log(columPoint)
        if (candlePoint.open != undefined && candlePoint.close != undefined) { //如果是K线图 改变矩形条颜色，否则不变  
          // var color = (candlePoint.open < candlePoint.close) ? '#DD2200' : '#33AA11';
          var color = (candlePoint.open < candlePoint.close) ? '#aab061' : '#3db8b8';
          columPoint.color = color;
        } else {}
      }
      originalDrawPoints.call(this);
    }
    exporting(Highcharts);
    unica(Highcharts);
    Highcharts.setOptions({
      // colors: columColor,
      global: {
        useUTC: false,
        // timezoneOffset: new Date().getTimezoneOffset()  // +8 时区修正方法
      },
      lang: {
        contextButtonTitle: "图表导出菜单",
        loading: "加载中",
        noData: "没有数据",
      }
    });
    $("#markert_chart").css('width', $("#rightCenter").width() - 10);
    $("#markert_chart").css('height', $("#rightCenter").height() - 40);
    localStorage.setItem("chart_width", $("#rightCenter").width() - 10);
    localStorage.setItem("chart_height", $("#rightCenter").height() - 40);



  Highcharts.StockChart('markert_chart', config);


  }

  // clearInterval(this.timer);
  componentWillReceiveProps(getProp) {
    if (getProp.type == 'id') {
      this.makeChart(false);
      return;
    }
    if (getProp.choosedate == undefined) {
      if (getProp.type != 'id') {
        return;
      }
      this.makeChart(false);
      return;
    }
    start = getProp.choosedate;
    exchange = getProp.Strategy.exchange;
    symbol = getProp.Strategy.symbol;
    this.makeChart(false);
    $('#markert_chart').empty();
    clearInterval(this.timer);
    setTimeout(() => {
      this.makeChart();
    }, 100)
    this.timer = setInterval(() => {
      this.makeChart();
    }, 120000);
  }
  componentDidMount() {
    start = getDay(0);
    let week = new Date().getDay();
    if (week > 5) {
      start = getDay(5 - week)
    }
    this.makeChart(false);
    $('#markert_chart').empty();
    clearInterval(this.timer);
    setTimeout(() => {
      this.makeChart();
    }, 300)
    if (week <= 5) {
      this.timer = setInterval(() => {
        this.makeChart();
      }, 120000);
    }
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.makeChart(false);
      }, 300)
    })
    $('#start_date').val(start);
    $('#end_date').val(start);

  }
  componentDidUpdate() {
    $('#start_date').val(start);
    $('#end_date').val(start);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    clearInterval(this.timer);
  }
  closeDown() {
    $('#downData').css('display', 'none');
  }
  closeDownMarket() {
    $('#downMarket').css('display', 'none');
  }
  changeExchange(e) {
    this.setState({
      exchange: e.target.value
    })
  }
  checkDate(e) {
    if (strDateTime(e.target.value)) {
      $(e.target).css('border', '1px solid #ff0000');
    } else {
      $(e.target).css('border', '0px solid');
    }
  }
  render() {
    const modalBody = {
      color: '#fff',
      paddingLeft: '20%',
      padding: '5px 20px',
      fontSize: '15px',
      height: '70%'
    }

    let options = [{
        label: 'MACD',
        value: 'MACD'
      }, //
      {
        label: 'RSI',
        value: 'RSI'
      }, {
        label: 'OBV',
        value: 'OBV'
      }, {
        label: 'EMA5',
        value: 'EMA5'
      }, {
        label: 'EMA10',
        value: 'EMA10'
      }, {
        label: 'EMA30',
        value: 'EMA30'
      }, {
        label: 'EMA60',
        value: 'EMA60'
      }, {
        label: 'ATR',
        value: 'ATR'
      }, {
        label: 'BBANDS',
        value: 'BBANDS'
      }, {
        label: 'DEMA',
        value: 'DEMA'
      }, {
        label: 'KDJ',
        value: 'KDJ'
      }, {
        label: 'MOM',
        value: 'MOM'
      }, {
        label: 'SAR',
        value: 'SAR'
      }, {
        label: 'STOCHRSI',
        value: 'STOCHRSI'
      }, {
        label: 'WILLR',
        value: 'WILLR'
      }
    ];
    const modalStyle = {
      top: '10%',
      left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 200 : '0',
      right: 'auto',
      bottom: 'auto',
      width: document.body.clientWidth > 900 ? 400 : '100%',
      // height: '150px'
    }
    const modalStyle2 = {
      top: '10%',
      left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 150 : '0',
      right: 'auto',
      bottom: 'auto',
      width: document.body.clientWidth > 900 ? 300 : '100%',
      // height: '150px'
    }
    const input_style = {
      width: "100%",
      marginBottom: '5px',
      display: 'inline',
      // marginLeft:'10%',
      marginTop: '5px'
    }
    const backColor = {
      backgroundColor: '#525252',
      color: "#fff",
      width: '100%',
      height: '34px',
      border: '0px',
      marginTop: '10px'
    }
    _THIS = this;
    return (
      <div id='markert_chart_p' style={{border:'5px solid #525252',borderRadius:'4px',width:'100%',height:'100%'}}>
        <div id="markert_chart"  style={{height:'100%',width:'100%',backgroundColor:'#000',borderRadius: '4px',}}>
        </div>
        <div style={modalStyle2} 
        className="modal fade in" id="downData"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" style={{width:'100%'}}>
            <div className="modal-content" ref="choose" style={{width:'93.5%',backgroundColor: "#333",height:'100%'}}>
              <div className="modal-body" style={modalBody}>
                    <div className="form-group">
                          <select style={backColor}  
                          className="" onChange={(e)=>{this.setState({choose:e.target.value})}} value={this.state.choose}>
                          {options.map((x,index)=>{
                              return(
                                <option key={index}>{x.value}</option>
                              )
                            })}
                              </select>                  
                      </div>
              </div>
              <div className="modal-footer" style={{borderTop:'0px solid #525252',marginTop:'-10px'}}>
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closeDown.bind(this)}>关闭
                </button>
                 <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.downIndex.bind(this)}>
                  下载
                 </button>
              </div>
           </div>
         </div>
      </div>
    <form style={modalStyle2} onSubmit={(e)=>this.downData(e)} 
        className="modal fade in" id="downMarket"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" style={{width:'100%'}}>
            <div className="modal-content" ref="choose" style={{width:'93.5%',backgroundColor: "#333",height:'100%'}}>
              <div className="modal-body" style={modalBody}>
              <div className="form-group">
                      <select style={backColor} required="required"  id='exchange' value={this.state.exchange}  onChange={(e)=>this.changeExchange(e)}>
                        <option>CTP</option>
                        <option>CSRPME</option>
                        <option>OKCoin</option>
                        </select>
                        </div>
                        <div className="form-group">
              <Switch condition={this.state.exchange}>

              <Case value='CTP'>
              <select style={backColor} required="required" id="market_symbol">
                        <option>IF</option>
                        <option>IC</option>
                        <option>IH</option>  
         </select>       
            </Case>

              <Case value='CSRPME'>
                        <select style={backColor} required="required" id="market_symbol">

                                       <option>D1_AG</option>
                        <option>D6_SB</option>
                         </select> 
              </Case>

             <Case value='OKCoin'>
                       <select style={backColor} required="required" id="market_symbol">

                        <option>btc</option>
                        <option>ltc</option>
                         </select> 
         </Case>

            </Switch>
                     </div>
                    <div className="form-group">
                       <input type='text'  required="required" style={input_style} id="start_date" placeholder='开始时间(YYYY-MM-DD)'
                       onChange={(e)=>this.checkDate(e)}></input>
                    </div>
                    <div className="form-group">
                       <input type='text'  required="required" style={input_style} id="end_date" placeholder='结束时间(YYYY-MM-DD)'
                       onChange={(e)=>this.checkDate(e)}></input>
                   </div>
              </div>
              <div className="modal-footer" style={{borderTop:'0px solid #525252',marginTop:'-10px'}}>
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closeDownMarket.bind(this)}>关闭
                </button>
                 <button type="submit" className="btn btn-primary" data-dismiss="modal" 
                 // onClick={this.downData.bind(this)}
                 >
                  下载
                 </button>
              </div>
           </div>
         </div>
      </form>

    </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    choosedate: state.reduToChooseDate.choosedate,
    Strategy: state.reduToChooseStrategy3,
    type: state.reduToShowList,
    time: state.reduToChooseDate.time
  };
}
const mapDispatchToProps = (dispatch) => {
  return {

  };
}
export default connect(mapStateToProps)(MarketChart);