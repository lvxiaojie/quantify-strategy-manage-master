import React, {
  Component
} from 'react';
import {
  Table,
  DatePicker,
  Button,
  Tooltip,
  Row,
  Col
} from 'antd';
import moment from 'moment';
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import {
  queryString,
  getWorkLog,
  dateTodate,
  getDay,
  formatNewDate
} from '../../Redux/Action/shareAction'
import {
  Tabs,
  notification,
  message
} from 'antd';
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;
notification.config({
  placement: 'topRight',
  top: 110,
  duration: 1,
});
import Highcharts from 'highcharts'
import Drilldown from 'highcharts/modules/drilldown'
class WorkEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      trade: [],
      predict: [],
      trade_stra: [],
      predict_stra: [],
      startValue: moment(getDay(0), 'YYYY-MM-DD'),
      endValue: moment(getDay(0), 'YYYY-MM-DD'),
      event_num: []
    }
  }
  show_notification = (type, mgs) => {
    notification[type]({
      message: ' 提示',
      description: mgs,
      duration: 1,
    });
  }
  beforeRender() {
    let start = formatNewDate(this.state.startValue._d);
    let end = formatNewDate(this.state.endValue._d);
    let user = queryString();
    let body = '';
    body += 'username=' + user;
    body += '&start=' + start;
    body += '&end=' + end;
    let trade = [];
    let trade_stra = [];
    let predict = [];
    let predict_stra = [];
    let event_num = [];
    event_num.add_trade = 0;
    event_num.del_trade = 0;
    event_num.path_trade = 0;
    event_num.add_predict = 0;
    event_num.del_predict = 0;
    event_num.path_predict = 0;
    event_num.add_trade_stra = 0;
    event_num.del_trade_stra = 0;
    event_num.start_trade_stra = 0;
    event_num.pause_trade_stra = 0;
    event_num.history_trade_stra = 0;
    event_num.model_trade_stra = 0;
    event_num.add_predict_stra = 0;
    event_num.del_predict_stra = 0;
    event_num.start_predict_stra = 0;
    event_num.pause_predict_stra = 0;
    event_num.history_predict_stra = 0;
    event_num.model_predict_stra = 0;
    const hide = message.loading('加载中..', 0);
    getWorkLog(body).then((data) => {
      setTimeout(hide, 100);
      if (data.length === 0) {
        // this.show_notification('error', '该用户在 ' + start + '~' + end + ' 之间没有工作事件');
      }

      let logs = [];
      for (let x of data) {
        logs = logs.concat(x.logs)
      }


      for (let x of logs) {
        if (x.type === 1) {
          trade.push({
            key: x.datetime,
            datetime: dateTodate(x.datetime),
            event: x.event
          });
          if (x.event.indexOf('创建') !== -1) {
            event_num.add_trade++;
          }
          if (x.event.indexOf('删除') !== -1) {
            event_num.del_trade++;
          }
          if (x.event.indexOf('修改') !== -1) {
            event_num.path_trade++;
          }
        }
        if (x.type === 2) {
          trade_stra.push({
            key: x.datetime,
            datetime: dateTodate(x.datetime),
            event: x.event
          });
          if (x.event.indexOf('新建') !== -1) {
            event_num.add_trade_stra++;
          }
          if (x.event.indexOf('删除') !== -1) {
            event_num.del_trade_stra++;
          }
          if (x.event.indexOf('启动') !== -1) {
            event_num.start_trade_stra++;
          }
          if (x.event.indexOf('暂停') !== -1) {
            event_num.pause_trade_stra++;
          }
          if (x.event.indexOf('历史记录') !== -1) {
            event_num.history_trade_stra++;
          }
          if (x.event.indexOf('模型文件') !== -1) {
            event_num.model_trade_stra++;
          }
        }
        if (x.type === 3) {
          predict.push({
            key: x.datetime,
            datetime: dateTodate(x.datetime),
            event: x.event
          });
          if (x.event.indexOf('创建') !== -1) {
            event_num.add_predict++;
          }
          if (x.event.indexOf('删除') !== -1) {
            event_num.del_predict++;
          }
          if (x.event.indexOf('修改') !== -1) {
            event_num.path_predict++;
          }
        }
        if (x.type === 4) {
          predict_stra.push({
            key: x.datetime,
            datetime: dateTodate(x.datetime),
            event: x.event
          });
          if (x.event.indexOf('新建') !== -1) {
            event_num.add_predict_stra++;
          }
          if (x.event.indexOf('删除') !== -1) {
            event_num.del_predict_stra++;
          }
          if (x.event.indexOf('启动') !== -1) {
            event_num.start_predict_stra++;
          }
          if (x.event.indexOf('暂停') !== -1) {
            event_num.pause_predict_stra++;
          }
          if (x.event.indexOf('历史记录') !== -1) {
            event_num.history_predict_stra++;
          }
          if (x.event.indexOf('模型文件') !== -1) {
            event_num.model_predict_stra++;
          }
        }
      }
      this.setState({
        event_num: event_num,
        user: user,
        trade: trade,
        trade_stra: trade_stra,
        predict: predict,
        predict_stra: predict_stra
      })
    })
  }
  makeChart() {
    let total = this.state.trade.length + this.state.trade_stra.length + this.state.predict.length + this.state.predict_stra.length;
    let trade = this.state.trade.length / total * 100;
    let trade_stra = this.state.trade_stra.length / total * 100;
    let predict = this.state.predict.length / total * 100;
    let predict_stra = this.state.predict_stra.length / total * 100;
    let type_list = ['量化交易','预测模型','交易实例','预测实例'];
    let id_list = ['trade','predict','trade_stra','predict_stra'];
    let num_list = [trade,predict,trade_stra,predict_stra];
    let data_list = [this.state.trade,this.state.predict,this.state.trade_stra,this.state.predict_stra]
    let chartData = [];
    let drilldownSeries = [];
    for (let i in type_list) {
      chartData.push({
        drilldown: id_list[i],
        name: type_list[i],
        y: num_list[i]
      })
      let data = []

      if (id_list[i] == 'trade' || id_list[i] == 'predict') {
        let add = 0;
        let path = 0;
        let del = 0;
        for (let x of data_list[i]) {
          if (x.event.indexOf('创建') !== -1) {
            add++;
          }
          if (x.event.indexOf('修改') !== -1) {
            path++;
          }
          if (x.event.indexOf('删除') !== -1) {
            del++;
          }
        }
        let total = add + path + del;
        data.push(['创建',add/total*100]);
        data.push(['修改',path/total*100]);
        data.push(['删除',del/total*100]);
      }
      if (id_list[i] == 'trade_stra' || id_list[i] == 'predict_stra') {
        let add = 0;
        let start = 0;
        let stop = 0;
        let model = 0;
        let history = 0;
        let del = 0;
        for (let x of data_list[i]) {
          if (x.event.indexOf('新建') !== -1) {
            add++;
          }
          if (x.event.indexOf('启动') !== -1) {
            start++;
          }
          if (x.event.indexOf('暂停') !== -1) {
            stop++;
          }
          if (x.event.indexOf('模型文件') !== -1) {
            model++;
          }
          if (x.event.indexOf('历史记录') !== -1) {
            history++;
          }
          if (x.event.indexOf('删除') !== -1) {
            del++;
          }
        }
        let total = add + start + stop + model + history + del;
        data.push(['新建',add/total*100]);
        data.push(['启动',start/total*100]);
        data.push(['暂停',stop/total*100]);
        data.push(['上传模型文件',model/total*100]);
        data.push(['移至历史记录',history/total*100]);
        data.push(['删除',del/total*100]);
      }
      drilldownSeries.push({
        id: id_list[i],
        name: type_list[i],
        data: data
      })
    }
   
    let config = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      title: {
        text: '工作事件分布'
      },
      tooltip: {
        headerFormat: '{series.name}<br>',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        // type: 'pie',
        name: '事件分类',
        data: chartData
      }],
      drilldown: {
        series: drilldownSeries
      }
    };
    if (!Highcharts.Chart.prototype.addSeriesAsDrilldown) {
      Drilldown(Highcharts);
    }
    Highcharts.chart('event_chart', config);
  }
  componentWillMount() {
    if (queryString() === this.state.user) {
      return;
    }
    this.setState({
      user: queryString()
    })
    this.beforeRender();
    // console.log('cwm')
  }
  componentDidUpdate(prevProps, prevState) {
    this.makeChart();
  }
  componentDidMount() {
    this.makeChart();
  }
  componentWillReceiveProps(next, ops) {
    if (queryString() === this.state.user) {
      return;
    }
    this.setState({
        user: queryString()
      })
      // console.log('cwp')
    this.beforeRender();
  }
  onChangeTable(pagination, filters, sorter) {
    // 点击分页、筛选、排序时触发
    // console.log('各类参数是', pagination, filters, sorter);
  }

  onStartChange = (value) => {
    this.setState({
      startValue: value
    })
  }
  onEndChange = (value) => {
    this.setState({
      endValue: value
    })
  }
  onDateChange = (dates, dateStrings) => {
    // console.log('From: ', dates[0], ', to: ', dates[1]);
    // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    this.setState({
      startValue: dates[0],
      endValue: dates[1]
    })
  }
  render() {
    const columns = [{
      title: '时间',
      dataIndex: 'datetime',
      width: '20%',
      sorter: (a, b) => {
        return Date.parse(new Date(b.datetime)) - Date.parse(new Date(a.datetime));
      }

    }, {
      title: '操作',
      dataIndex: 'event',
      // className: 'table-font',
      filters: [{
        text: '创建',
        value: '创建',
      }, {
        text: '修改',
        value: '修改',
      }, {
        text: '删除',
        value: '删除',
      }],
      onFilter: (value, record) => record.event.indexOf(value) !== -1,
    }];

    const columns_stra = [{
      title: '时间',
      dataIndex: 'datetime',
      width: '20%',
      sorter: (a, b) => {
        return Date.parse(new Date(b.datetime)) - Date.parse(new Date(a.datetime));
      }

    }, {
      title: '操作',
      dataIndex: 'event',
      // className: 'table-font',
      filters: [{
        text: '新建',
        value: '新建',
      }, {
        text: '删除',
        value: '删除',
      }, {
        text: '启动',
        value: '启动',
      }, {
        text: '暂停',
        value: '暂停',
      }, {
        text: '历史记录',
        value: '历史记录',
      }, {
        text: '模型文件',
        value: '模型文件',
      }],
      onFilter: (value, record) => {
        return record.event.indexOf(value) !== -1;
      }
    }];


    const pagination1 = {
      total: this.state.trade.length,
      showSizeChanger: true,
      onShowSizeChange(current, pageSize) {
        // console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange(current) {
        // console.log('Current: ', current);
      },
    };
    const pagination2 = {
      total: this.state.predict.length,
      showSizeChanger: true,
      onShowSizeChange(current, pageSize) {
        // console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange(current) {
        // console.log('Current: ', current);
      },
    };
    const pagination3 = {
      total: this.state.trade_stra.length,
      showSizeChanger: true,
      onShowSizeChange(current, pageSize) {
        // console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange(current) {
        // console.log('Current: ', current);
      },
    };
    const pagination4 = {
      total: this.state.predict_stra.length,
      showSizeChanger: true,
      onShowSizeChange(current, pageSize) {
        // console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange(current) {
        // console.log('Current: ', current);
      },
    };
    return (
      <div className="event-div">
               <span className=''><span className='color-black'>工作事件</span> - {this.state.user}</span>
                  <Tooltip title="开始时间 ～ 结束时间" placement="top" >
                   <div className="div-right">
{/*                      <DatePicker
                      value={this.state.startValue}
                      placeholder="开始日期"
                      onChange={this.onStartChange}
                    />
                    <DatePicker
                      value={this.state.endValue}
                      placeholder="结束日期"
                      onChange={this.onEndChange}
                    />*/}
                    
                    <RangePicker
                     ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                     onChange={this.onDateChange}
                     value={[this.state.startValue,this.state.endValue]}
                   />
                   
                    <Button className="work-event-btn" onClick={()=>this.beforeRender()}>确定</Button>
                   </div>
                   </Tooltip>
                   <br/>
           <div className="card-container">

                 <Tabs defaultActiveKey="1" type="card" className="table-div">

                   <TabPane tab='事件分布' key='1'>

                   <div className="event-table">
                   <div id='event_chart'></div>
                   </div>

                   </TabPane>
                  
                    <TabPane tab={<span>量化交易<span  className="true smallfont event-circle" title="真实交易">{this.state.trade.length}</span></span>} key="0">
                

                    <Row gutter={48}>
                     <Col span={8}>
                    <lable className="event-lable public">创建交易策略</lable>
                  <lable className="event-lable event-num num-public">{this.state.event_num.add_trade}次</lable>
                  <span className="event-back"></span>
                     </Col>
                     <Col span={8}>
                  <lable className="event-lable public">删除交易策略</lable>
                  <lable className="event-lable event-num num-public">{this.state.event_num.del_trade}次</lable>
                  <span className="event-back"></span>
                     </Col>
                     <Col span={8}>
                  <lable className="event-lable public">修改交易策略</lable>
                  <lable className="event-lable event-num num-public">{this.state.event_num.path_trade}次</lable>
                  <span className="event-back"></span>
                     </Col>
                     </Row>


                     <Table 
                      onChange={()=>this.onChangeTable}
                      className="event-table" 
                      columns={columns} 
                      dataSource={this.state.trade}
                      pagination={pagination1} 
                      scroll={{ y: 580 }} />

                    </TabPane>
                   

                    <TabPane tab={<span>预测模型<span  className="true smallfont event-circle" title="真实交易">{this.state.predict.length}</span></span>} key="2">

                    <Row gutter={48}>
                     <Col span={8}>
                    <lable className="event-lable public">创建预测策略</lable>
                  <lable className="event-lable event-num num-public">{this.state.event_num.add_predict}次</lable>
                  <span className="event-back"></span>
                     </Col>
                     <Col span={8}>
                  <lable className="event-lable public">删除预测策略</lable>
                  <lable className="event-lable event-num num-public">{this.state.event_num.del_predict}次</lable>
                  <span className="event-back"></span>
                     </Col>
                     <Col span={8}>
                  <lable className="event-lable public">修改预测策略</lable>
                  <lable className="event-lable event-num num-public">{this.state.event_num.path_predict}次</lable>
                  <span className="event-back"></span>
                     </Col>
                     </Row>
                  
                     <Table 
                      onChange={()=>this.onChangeTable}
                      className="event-table" 
                      columns={columns} 
                      dataSource={this.state.predict}
                      pagination={pagination2} 
                      scroll={{ y: 580 }} />

                    </TabPane>
                    <TabPane tab={<span>交易实例<span  className="true smallfont event-circle" title="真实交易">{this.state.trade_stra.length}</span></span>} key="3">

                <Row gutter={48}>
                       <Col span={8}>
                                  <lable className="event-lable public">新建</lable>
                                   <lable className="event-lable event-num num-public">{this.state.event_num.add_trade_stra}次</lable>
                                   <span className="event-back"></span>
                       </Col>
                       <Col span={8}>
                                   <lable className="event-lable public">删除</lable>
                                   <lable className="event-lable event-num num-public">{this.state.event_num.del_trade_stra}次</lable>
                                   <span className="event-back"></span>
                       </Col>
                       <Col span={8}>
                                   <lable className="event-lable public">启动</lable>
                                   <lable className="event-lable event-num num-public">{this.state.event_num.start_trade_stra}次</lable>
                                   <span className="event-back"></span>
                       </Col>
                     </Row>
                 
                <Row gutter={48} style={{marginTop:'10px'}}>
                       <Col span={8}>
                                   <lable className="event-lable public">暂停</lable>
                                   <lable className="event-lable event-num num-public">{this.state.event_num.pause_trade_stra}次</lable>
                                   <span className="event-back"></span>
                       </Col>
                       <Col span={8}>
                                   <lable className="event-lable public">移至历史记录</lable>
                                   <lable className="event-lable event-num num-public">{this.state.event_num.history_trade_stra}次</lable>
                                   <span className="event-back"></span>
                       </Col>
                       <Col span={8}>
                                   <lable className="event-lable public">添加模型文件</lable>
                                   <lable className="event-lable event-num num-public">{this.state.event_num.model_trade_stra}次</lable>
                                   <span className="event-back"></span>
                       </Col>
                </Row>
                     <Table 
                      onChange={()=>this.onChangeTable}
                      className="event-table" 
                      columns={columns_stra} 
                      dataSource={this.state.trade_stra}
                      pagination={pagination3} 
                      scroll={{ y: 580 }}/>

                    </TabPane>
                    <TabPane tab={<span>预测实例<span  className="true smallfont event-circle" title="真实交易">{this.state.predict_stra.length}</span></span>} key="4">
                <Row gutter={48}>
                       <Col span={8}>
                                  <lable className="event-lable public">新建</lable>
                                   <lable className="event-lable event-num num-public">{this.state.event_num.add_predict_stra}次</lable>
                                   <span className="event-back"></span>
                       </Col>
                       <Col span={8}>
                                   <lable className="event-lable public">删除</lable>
                                   <lable className="event-lable event-num num-public">{this.state.event_num.del_predict_stra}次</lable>
                                   <span className="event-back"></span>
                       </Col>
                       <Col span={8}>
                                   <lable className="event-lable public">启动</lable>
                                   <lable className="event-lable event-num num-public">{this.state.event_num.start_predict_stra}次</lable>
                                   <span className="event-back"></span>
                       </Col>
                     </Row>
                 
                <Row gutter={48} style={{marginTop:'10px'}}>
                       <Col span={8}>
                                   <lable className="event-lable public">暂停</lable>
                                   <lable className="event-lable event-num num-public">{this.state.event_num.pause_predict_stra}次</lable>
                                   <span className="event-back"></span>
                       </Col>
                       <Col span={8}>
                                   <lable className="event-lable public">移至历史记录</lable>
                                   <lable className="event-lable event-num num-public">{this.state.event_num.history_predict_stra}次</lable>
                                   <span className="event-back"></span>
                       </Col>
                       <Col span={8}>
                                   <lable className="event-lable public">添加模型文件</lable>
                                   <lable className="event-lable event-num num-public">{this.state.event_num.model_predict_stra}次</lable>
                                   <span className="event-back"></span>
                       </Col>
                </Row>

                       <Table 
                      onChange={()=>this.onChangeTable}
                      className="event-table" 
                      columns={columns_stra} 
                      dataSource={this.state.predict_stra}
                      pagination={pagination4} 
                      scroll={{ y: 580 }} />

                    </TabPane>
                  </Tabs>
                     </div>

                     <style>
                         {`.card-container > .ant-tabs-card > .ant-tabs-content {
                            height: 120px;
                            margin-top: -16px;
                          }
                          
                          .card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
                            background: #fff;
                            padding: 16px;
                          }
                          
                          .card-container > .ant-tabs-card > .ant-tabs-bar {
                            border-color: #fff;
                          }
                          
                          .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
                            border-color: transparent;
                            background: transparent;
                          }
                          
                          .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
                            border-color: #fff;
                            background: #fff;
                          }`}
                     </style>
            </div>
    );
  }
}


export default WorkEvent;