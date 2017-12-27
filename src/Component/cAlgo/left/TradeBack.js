import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import {
  alertMessage,
  saveToChoose,
  showLog,
  showCode,
  ShowList,
  saveBtstrategyList,
  updateClass
} from '../../../Redux/Action/Action'
import {
  getStra,
  exchangeGetStra,
  statusToChinese,
  getDateList,
  getTransaction,
  getNextDay,
  makeData,
  strategyAction,
  delStrategy,
  getClassName,
  getPre,
  sortNianhua,
  getStrategys,
  getAllStrategy,
  model_type
} from '../../../Redux/Action/shareAction'
import $ from 'jquery'
let _dispatch;
var TodoList = React.createClass({
  getInitialState: function() {
    return {
      todolist: [],
      _id: ''
    };
  },
  beforeRender: function(btstrategyList,nianhua_data) {
    let strategyList = btstrategyList;
    if(strategyList.length == 0){return;}
    strategyList = statusToChinese(strategyList);
    for (let i = 0; i < strategyList.length; i++) {
            for (let x of nianhua_data) {
                if (x.strategy_id === strategyList[i].id) {
                    if(x.status){
                    strategyList[i].endTime = x.trade_date.slice(0, 10);
                    strategyList[i].average_winrate = Number((x.statistics.row * 100).toFixed(2));
                    strategyList[i].nianhua = Number((x.statistics.aror * 100).toFixed(4));
                    break;
                    }
                    else{
                    strategyList[i].endTime = '未有交易日期';
                    strategyList[i].average_winrate = '0.00';
                    strategyList[i].nianhua = '0.0000';
                }
                }
            }

      // let DateList = getDateList(strategyList[i].id);
      // strategyList[i].endTime = DateList.length > 0 ? DateList[DateList.length - 1] : '';
      // strategyList[i].endData = [];
      // if (strategyList[i].endTime != '') {
      //   let nextDay = getNextDay(strategyList[i].endTime);
      //   strategyList[i].endData = getTransaction(strategyList[i].id, strategyList[i].endTime, nextDay);
      // } else {
      //   strategyList[i].endData = [];
      // }
      // if (strategyList[i].endData.length > 1) {
      //   let dataList = makeData(false, strategyList[i].endData);
      //   strategyList[i].makeData = dataList.newData;
      //   strategyList[i].average_winrate = dataList.average_winrate;
      //   strategyList[i].nianhua = dataList.nianhua;
      // } else {
      //   strategyList[i].makeData = [];
      //   strategyList[i].average_winrate = '0.00';
      //   strategyList[i].nianhua = '0.0000';
      // }
      strategyList[i].script_name = getClassName(strategyList[i].script_id).name;
      strategyList[i].color1 = strategyList[i].average_winrate > 50 ? '#f15923' : '#00ba16';
      strategyList[i].color2 = strategyList[i].nianhua > 0 ? '#f15923' : '#00ba16';
      strategyList[i].icon1 = strategyList[i].average_winrate > 50 ? 'glyphicon glyphicon-arrow-up' : 'glyphicon glyphicon-arrow-down';
      strategyList[i].icon2 = strategyList[i].nianhua > 0 ? 'glyphicon glyphicon-arrow-up' : 'glyphicon glyphicon-arrow-down';
      if (typeof(strategyList[i].file_info) != 'object') {
        strategyList[i].file_info = JSON.parse(strategyList[i].file_info);
      }
      strategyList[i].model_info = Object.assign(strategyList[i].file_info.string_data, strategyList[i].file_info.int_data);
      strategyList[i].model_type = model_type(strategyList[i].file_info.model_type);
    }

    // console.log(strategyList)
    this.setState({
      todolist: sortNianhua(strategyList),
    })
  },
  componentWillReceiveProps: function(getProp) {
    // setTimeout(()=>{
    this.beforeRender(getProp.BtstrategyList,getProp.nianhua_data);
    // },1000)
    clearInterval(this.tradeTimer);
    this.tradeTimer = setInterval(() => {
      this.beforeRender(getProp.BtstrategyList,getProp.nianhua_data);
    }, 120000)
  },
  componentWillMount: function() {
    this.beforeRender(this.props.BtstrategyList);
  },
  componentWillUnmount: function() {
    this.tradeTimer && clearTimeout(this.tradeTimer);
    clearInterval(this.tradeTimer);
  },
  undatelist: function(strategyList) {
    strategyList = statusToChinese(strategyList);
    this.setState({
      todolist: strategyList,
    })
  },
  render: function() {
    return (
      <ListTodo todo={this.state.todolist} exchange={this.props.exchange} Refresh={this.undatelist}/>
    );
  }
});

var ListTodo = React.createClass({
  getInitialState: function() {
    return {
      delName: '',
      delId: ''
    };
  },
  onClick: function(chooseStrategy) {
    _dispatch(saveToChoose(chooseStrategy));
  },
  Del: function(id) {
    let data = this.props.todo;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data.splice(i, 1);
        break;
      }
    }
    this.props.Refresh(data);
  },
  delOk: function() {
    // console.log(this.state.delId,this.state.delName);
    if (delStrategy(false, this.state.delId)) {
      // this.Del(this.state.delId);
      // getStrategys();
      getStrategys().then((data) => {
        _dispatch(updateClass());
        $('.staMenu').each(function(i) {
          $(this).removeClass('in');
        })
        $('.staCircle').each(function(i) {
          $(this).attr("class", "fa fa-plus-circle collapsed staCircle");
        })
      })
    } else {
      _dispatch(alertMessage('删除失败', 1000));
    }
  },
  refresh: function(id, flag) {
    let data = this.props.todo;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data[i].status = flag;
        break;
      }
    }
    this.props.Refresh(data);
  },
  del: function(id, name) {
    this.setState({
      delName: name,
      delId: id
    })
  },
  start: function(id) {
    if (strategyAction(false, id, 2)) {
      // _dispatch(alertMessage('启动成功', 1000));
      this.refresh(id, 2);
    } else {
      _dispatch(alertMessage('启动失败', 1000));
    }
  },
  stop: function(id) {
    if (strategyAction(false, id, 3)) {
      // _dispatch(alertMessage('暂停成功', 1000));
      this.refresh(id, 3);
    } else {
      _dispatch(alertMessage('暂停失败', 1000));
    }
  },
  componentDidMount: function() {

  },
  showLogs: function(id, name) {
    _dispatch(showLog(id, name));
  },
  show: function(id, e) {
    let oldClass = e.target.className;
    $('.staMenu').each(function(index, el) {
      if (id !== el.id) {
        $(this).removeClass('in');
      }
    });
    $('.staCircle').each(function(i) {
      $(this).attr("class", "fa fa-plus-circle collapsed staCircle");
    })
    if (oldClass == 'fa fa-plus-circle collapsed staCircle') {
      e.target.className = 'fa fa-minus-circle staCircle';
    } else {
      e.target.className = 'fa fa-plus-circle collapsed staCircle';
    }
  },
  showCode: function(id) {
    _dispatch(showCode(id));
    _dispatch(ShowList('code'));
  },
  showError: function(error) {
        if (error != '' && error != null) {
            _dispatch(alertMessage(error));
        } else {
            _dispatch(alertMessage('没有错误信息',2000));
        }
  },
  render: function() {
    const boderStyle1 = {
      border: '1px solid #666',
      width: '35%%'
    }
    const boderStyle2 = {
      border: '1px solid #666',
      width: '65%'
    }

    const back2 = {
      borderRadius: '4px',
      backgroundColor: '#525252',
    }
    const modalStyle = {
      top: '10%',
      left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 200 : '0',
      right: 'auto',
      bottom: 'auto',
      width: document.body.clientWidth > 900 ? 400 : '100%'
    }
    var o = this;
    // let modalId = o.props.exchange + 'del_exchange_his';
    let modalId = this.props.todo.length > 0 ? this.props.todo[0].id : '';
    return (
      <div style={{marginTop:'-5px'}}>
            {this.props.todo.length>0?<i className='his smallfont' style={{marginLeft:'15px'}}>历史回测</i>:null}
            <ul style={{overflow:'hidden',padding:0}}> 
            {
                this.props.todo.map(function (x,index) {
                  let astyle = {
                     color: x.status==-1?"#ff0000":"#5cb85c",
                     cursor: "pointer",
                     marginLeft: '10px',
                     position: 'relative',
                 }
                 if(x.script_name == undefined){astyle.color = '#ffff00'}
                         let dataArray = $.map(x.model_info, function(value, index) {
            return [index];
        });
                let menu_id = 'HisProfit_' + x.id;
                    return (
                        <li className='liStyle2 smallfont' key={index}>
                            <i className="fa fa-plus-circle collapsed staCircle" onClick={o.show.bind(null,menu_id)}
                             style={{float:'left',marginLeft:'1%',cursor: "pointer",color:'#ccc',marginTop:'10px'}} data-toggle="collapse" data-target={"#" + menu_id}></i>
                              <a title={x.status==-1?x.error:"查看历史回测"} style={astyle} 
                              onClick={o.onClick.bind(null,x)} data-toggle="modal" data-target="#ChooseDate"
                              ><i style={{fontSize:'15px'}}>{x.name}</i>  
                              </a>
                              <br/>
                              <i title="年化收益率" className="smallfont" style={{marginLeft:'20px'}}><i style={{color:x.color2}}>{x.nianhua}%<i className={x.icon2}></i></i></i>                             
                              <i title="交易胜率" className="smallfont" style={{marginLeft:'20px'}}><i style={{color:x.color1}}>{x.average_winrate}%<i className={x.icon1}></i></i></i>
                              <i className="smallfont" style={{marginLeft:"40px",color:x.status==-1?"#ff0000":"#fff",cursor:'pointer'}} title={x.error} onClick={(e)=>o.showError(x.error)}>{x.flag}</i>
                              <i  className="smallfont" style={{float:'right',marginRight:'10px'}}><i style={{color:'#fff'}}>{x.endTime}</i></i>
                             <div style={back2} className='collapse staMenu' id={menu_id}>
                                  <i className="smallfont" style={{marginLeft:"5%",color:x.status==-1?"#ff0000":"#fff",cursor:'pointer'}} title={x.error} onClick={(e)=>o.showError(x.error)}>{x.flag}</i>
                                  <i className="fa fa-desktop icon2 iconA" onClick={o.showLogs.bind(null,x.id,x.name)} title="日志输出"></i>
                                  <i className="fa fa-remove icon2 iconB" data-toggle="modal" data-target={"#" + modalId } onClick={o.del.bind(null,x.id,x.name)} title="删除"></i>
                                  <i className="fa fa-pause icon2 iconC" onClick={o.stop.bind(null,x.id)} title="停止"></i>
                                  <i className="fa fa-play icon2 iconD" onClick={o.start.bind(null,x.id)} title="启动"></i>
{/*                                                               <a style={{float:'right',marginRight:'3%',cursor: "pointer",color:'#FF8F44'}} 
                            className="smallfont0"  title="交易API"
                            href={"http://120.27.140.211/api/strategy_datas/?type=order&strategy_id=" + x.id + "&trade_date=" + x.endTime}
                            target="_blank"
                            >{x.id}</a>
                                  <i className="iblock smallfont" style={{color:'#f1825f',cursor:'pointer'}} onClick={o.showCode.bind(null,x.script_id)}>{x.script_name}</i>

                                  <i className="smallfont" style={{marginLeft:'5%'}}>{x.username}</i>
                                  <i className="smallfont" style={{marginLeft:'5%'}}>{x.datetime}</i>
                                  <i className="smallfont" style={{marginLeft:'5%'}}>交易合约：{x.symbol}</i>*/}

                                <table style={{marginBottom:'0px',width:'96%',marginLeft:'2%',backgroundColor:'#3b3b3b'}} 
                                   className="table table-bordered table-hover">
                                   <thead></thead>
                                  <tbody className="model_info_tbody">
                

                                                <tr>
                                                     <td style={boderStyle1}>作者</td>
                                                     <td style={boderStyle2}>{x.username}</td>
                                                </tr>
                                                <tr>
                                                     <td style={boderStyle1}>创建时间</td>
                                                     <td style={boderStyle2}>{x.datetime}</td>
                                                </tr>
                                                <tr>
                                                     <td style={boderStyle1}>策略代码</td>
                                                     <td style={{border: '1px solid #666',width: '65%',color:x.script_name != undefined?'#f1825f':'#ffff00',cursor:'pointer'}} 
                                                     onClick={o.showCode.bind(null,x.script_id)}>
                                                     {x.script_name != undefined?x.script_name:'代码不存在'}</td>
                                                </tr>
                                                <tr>
                                                     <td style={boderStyle1}>交易数据</td>
                                                     <td style={{textDecoration: 'underline',border: '1px solid #666',width: '65%',color:'#f1825f',cursor:'pointer'}} 
                                                     onClick={(e)=>{window.open("http://120.27.140.211/api/strategy_datas/?type=order&strategy_id=" + x.id + "&trade_date=" + x.endTime)}}>{x.id}</td>
                                                </tr>
                                                <tr>
                                                     <td style={boderStyle1}>交易合约</td>
                                                     <td style={boderStyle2}>{x.symbol}</td>
                                                </tr>
                                                  <tr>
                                                     <td style={boderStyle1}>开始时间</td>
                                                     <td style={boderStyle2}>{x.start}</td>
                                                </tr>
                                                  <tr>
                                                     <td style={boderStyle1}>结束时间</td>
                                                     <td style={boderStyle2}>{x.end}</td>
                                                </tr>

                         
                      
                                          </tbody>
                                     </table>

                                  <span className="iblock" style={{color:'#FF6666',marginLeft:'5%',fontSize:'11px'}}>{x.model_type}</span>
                                 {dataArray.length>0?
                                 <table style={{marginBottom:'0px',width:'96%',marginLeft:'2%',backgroundColor:'#3b3b3b'}} 
                                   className="table table-bordered table-hover">
                                   <thead>

                                   </thead>
                                  <tbody className="model_info_tbody">
                          
                                    {
                                        dataArray.map(function(y,index){
                                            return (
                                                <tr key={index}>
                                                <td style={boderStyle1}>{y}</td>
                                                <td style={boderStyle2}>{x.model_info[y]}</td>
                                                  </tr>
                                                )
                                        })
                                    }
                      
                                          </tbody>
                                     </table>
                                              :null}
                                 <div style={{height:'5px'}}></div>

                             </div>
                        </li>
                    );
                })
            }
            </ul>
            <div style={modalStyle} className="modal fade" id={modalId}  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="col-md-8 col-sm-12 modal-content" ref="choose" style={{backgroundColor: "#333",height:''}}>
                    <div className="modal-body modalBody">
                    您确定要永久删除 <i style={{color:'#FF6666'}}> {this.state.delName} </i> 吗?
                    </div>
                    <div className="modal-footer" style={{borderTop:'0px solid #525252'}}>
                      <button type="button" className="btn btn-default" data-dismiss="modal">关闭
                      </button>
                       <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.delOk}>
                        确定
                       </button>
                    </div>
                 </div>
               </div>
           </div>
</div>
    );
  }
});



class TradeBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BtstrategyList: [],
    };
  }
  componentWillReceiveProps(getProp) {

  }
  render() {
    _dispatch = this.props.dispatch;
    return (
      <TodoList nianhua_data={this.props.nianhua_data} BtstrategyList={this.props.BtstrategyList}/>
    )
  }
}
const mapStateToProps = (state) => {
  return {

  };
}
export default connect(mapStateToProps)(TradeBack);