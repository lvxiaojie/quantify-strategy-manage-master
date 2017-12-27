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
  getNianHua
} from '../../../Redux/Action/shareAction'
import $ from 'jquery'
const conStyle = {
  backgroundColor: '#292929',
  color: '#FFFFFF',
  border: '0px solid #525252'
}

// let chartwidth = document.body.clientWidth < 992 ? document.body.clientWidth * 0.97 : document.body.clientWidth * 0.748;
// let chartheight = (document.documentElement.clientHeight - 120) / 2 + 170;
class HisProfit extends Component {


  constructor(props) {
    super(props);
    this.state = {
      _id: 'none'
    };
  }
  makeChart(id) {
    getNianHua(id).then((data) => {
      this.before(data);
    }, (reject) => {
      this.props.dispatch(alertMessage('没有历史数据',1000))
      console.log('error')
    })
  }
  before(data) {
    let nianHuaList = [];
    let dateList = [];
    let winrateList = [];
    for (var i in data) {
      dateList[i] = (data[i].date).slice(5, 10);
      nianHuaList[i] = Number((data[i].aror * 100).toFixed(4));
      winrateList[i] = Number((data[i].row * 100).toFixed(2));
    }

    let config = {
      chart: {
        backgroundColor: '#3b3b3b',
        borderRadius: '5px',
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        positioner: function() {
          return {
            x: 195,
            y: 0
          };
        },
        backgroundColor: '#000', // 背景颜色
        borderColor: 'black', // 边框颜色
        borderRadius: 10, // 边框圆角
        borderWidth: 3, // 边框宽度
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
        }
      },
      yAxis: [{
        title: {
          text: '年化收益'
        },
        plotLines: [{
          color: '#fff', //线的颜色
          dashStyle: 'solid', //默认值，这里定义为实线
          value: 0, //
          width: 2 //标示线的宽度，2px
        }],
        // opposite: true,
        tickPixelInterval: 10,
        gridLineWidth: '0px',
        height: '65%',
        // min: -2
      }, {
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: '胜率'
        },
        labels: {

          enabled: false

        },
        top: '70%',
        height: '30%',
        offset: 0,
        lineWidth: 2
      }],
      title: {
        text: null,
        style: {
          color: "#fff"
        }
      },
      xAxis: {
        title: {
          text: '日期'
        },
        // type:'datetime',
        categories: dateList
      },
      //收益曲线
      series: [{
        data: nianHuaList,
        name: '年化收益',
        marker: {
          enabled: true,
          symbol: 'circle',
          fillColor: 'red',
          radius: 1
        },
        color: '#f15a24',
        turboThreshold: 0,
        tooltip: {
          valueSuffix: '%'
        }
      }, {
        yAxis: 1,
        data: winrateList,
        name: '胜率',
        type: 'column',
        tooltip: {
          valueSuffix: '%'
        }
      }]
    };
    // unica(Highcharts);
    let _id = 'HisProfitChart_' + this.props.id;
    Highcharts.chart(_id, config);
  }
  componentWillReceiveProps(getProp) {
    this.setState({
      _id: getProp.id
    })
  }
  componentDidMount() {

  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.id == this.props.clickId) {
      $('#HisProfitChart_' + this.props.id).css('width', '325px');
      this.makeChart(this.props.id);
    }
  }

  render() {
    const hisProfit = {
      height: '250px',
      width: '100%',
      borderRadius: '4px',
      // boxShadow: '5px 10px 5px #000 '
    }

    let _id = 'HisProfitChart_' + this.state._id;
    return (
      <div id={_id} style={hisProfit}></div>
    )
  }
}
const mapStateToProps = (state) => {
  return {};
}
const mapDispatchToProps = (dispatch) => {
  return {

  };
}
export default connect(mapStateToProps)(HisProfit);