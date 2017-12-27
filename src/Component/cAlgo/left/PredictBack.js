import React, {
    Component
} from 'react'
import {
    connect
} from 'react-redux'
import {
    alertMessage,
    showPredictChart,
    saveToChoose,
    showLog,
    showCode,
    ShowList,
    saveBtstrategyList,
    showPredictRecord,
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
    getStrategy,
    getClassName,
    getPre,
    getHis,
    getStrategys,
    getAllStrategy,
    sortPredict,
    model_type,
    getPredict
} from '../../../Redux/Action/shareAction'
import $ from 'jquery'
let _dispatch;
let Prop;
let flag = false;
var TodoList = React.createClass({
    getInitialState: function() {
        return {
            todolist: [],
            _id: ''
        };
    },
    beforeRender: function(strategyList) {
        strategyList = statusToChinese(strategyList);
        for (let i = 0; i < strategyList.length; i++) {
            strategyList[i].makeData = [];
            // strategyList[i].endTime = strategyList[i].end;
            let DateList = getDateList(strategyList[i].id);
            strategyList[i].endTime = DateList.length > 0 ? DateList[DateList.length - 1] : '';
            strategyList[i].script_name = getClassName(strategyList[i].script_id).name;
            strategyList[i].accuracy = null;
            strategyList[i].nameNumber = strategyList[i].name[0].charCodeAt();
            if (typeof(strategyList[i].file_info) != 'object') {
                strategyList[i].file_info = JSON.parse(strategyList[i].file_info);
            }
            strategyList[i].model_info = Object.assign(strategyList[i].file_info.string_data, strategyList[i].file_info.int_data);
            strategyList[i].model_type = model_type(strategyList[i].file_info.model_type);

        }
        this.setState({
            todolist: sortPredict(strategyList),
        })
    },
    componentDidUpdate: function() {
        if (!flag) {
            return;
        }

        this.getData().then((data) => {
            flag = false;
            this.setState({
                todolist: sortPredict(data),
            })
        })
    },
    componentWillMount: function() {
        this.beforeRender(this.props.BtstrategyList)
    },
    componentWillReceiveProps: function(getProp) {
        // setTimeout(()=>{
        this.beforeRender(getProp.BtstrategyList);
        // },0)
        clearInterval(this.predictTimer);
        this.predictTimer = setInterval(() => {
            this.beforeRender(getProp.BtstrategyList);
        }, 120000)
    },
    componentWillUnmount: function() {
        this.predictTimer && clearTimeout(this.predictTimer);
        clearInterval(this.predictTimer);
    },
    getData: function(i) {
        return new Promise((resolve, reject) => {
            let todolist = this.state.todolist
            for (let i in todolist) {
                getPredict(todolist[i].id, todolist[i].endTime).then((data) => {
                    for (let j in data[data.length - 1]) {
                        if (j == 'accuracy') {
                            todolist[i].accuracy = Number(data[data.length - 1][j] * 100).toFixed(2);
                        }

                    }
                    if (i == todolist.length - 1) {
                        resolve(todolist);
                    }
                })

            }
        });
    },
    undatelist: function(strategyList) {
        strategyList = statusToChinese(strategyList);
        this.setState({
            todolist: strategyList,
        })
    },
    render: function() {
        return (
            <ListTodo todo={this.state.todolist}  Refresh={this.undatelist}/>
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
        if (delStrategy(false, this.state.delId)) {
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
    showPredictRecord: function(id, name, script_id) {
        _dispatch(showPredictRecord(id, name, script_id));
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
    showChart: function(id, name, script_id) {
        _dispatch(showPredictChart(id, name, script_id));
    },
    render: function() {
        const back2 = {
            borderRadius: '4px',
            backgroundColor: '#525252',
        }
        const boderStyle1 = {
            border: '1px solid #666',
            width: '35%%'
        }
        const boderStyle2 = {
            border: '1px solid #666',
            width: '65%'
        }
        const modalStyle = {
            top: '10%',
            left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 200 : '0',
            right: 'auto',
            bottom: 'auto',
            width: document.body.clientWidth > 900 ? 400 : '100%'
        }
        var o = this;
        let modalId = this.props.todo.length > 0 ? this.props.todo[0].id : '';
        return (
            <div style={{marginTop:'-5px'}}>
            {this.props.todo.length>0?<i className='his smallfont' style={{marginLeft:'15px'}}>历史预测</i>:null}
            <ul style={{overflow:'hidden',padding:0}}> 
            {
                this.props.todo.map(function (x,index) {
                let menu_id = 'HisProfit_' + x.id;
                let astyle = {
                     color: x.status==-1?"#ff0000":"#5cb85c",
                     cursor: "default",
                     marginLeft: '10px',
                     position: 'relative',
                 };
                 if(x.script_name == undefined){astyle.color = '#ffff00'}
                let dataArray = $.map(x.model_info, function(value, index) {
                    return [index];
                });
                    return (
                        <li className='liStyle2 smallfont' key={index}>
                            <i className="fa fa-plus-circle collapsed staCircle" onClick={o.show.bind(null,menu_id)}
                             style={{float:'left',marginLeft:'1%',cursor: "pointer",color:'#ccc',marginTop:'10px'}} data-toggle="collapse" data-target={"#" + menu_id}></i>
                              <i title={x.status==-1?x.error:""} style={astyle} ><span style={{fontSize:'15px'}}>{x.name}</span></i>
                                                          <span style={{fontSize:'14px',float:'right',marginRight:'3%',cursor: "pointer",color:'#c1c1c1',marginTop:'10px'}} 
                            className="fa fa-bar-chart dropdown-toggle" data-toggle='dropdown'  title="预测曲线"
                            onClick={o.showChart.bind(null,x.id,x.name,x.script_id)}
                            > </span>

                            <span style={{fontSize:'14px',float:'right',marginRight:'3%',cursor: "pointer",color:'#c1c1c1',marginTop:'10px'}} 
                            className="fa fa-table"  title="查看预测记录"
                            onClick={o.showPredictRecord.bind(null,x.id,x.name,x.script_id)}
                            > </span>

                              <br/>
                              <span title="预测准确率" className="smallfont"
                              style={{marginLeft:'20px'}}>
                              {  x.accuracy!=undefined?<span>
                              <i style={{color:x.accuracy > 50 ? '#f15923' : '#00ba16'}} id={x.id+'_accuracy'}>{x.accuracy}%
                              <i className={x.accuracy > 50 ? 'glyphicon glyphicon-arrow-up' : 'glyphicon glyphicon-arrow-down'}>
                              </i>
                              </i>
                              </span>:null}
                              </span>   
                              <i className="smallfont" style={{marginLeft:"5px",color:x.status==-1?"#ff0000":"#fff",cursor:'pointer'}} title={x.error} onClick={(e)=>o.showError(x.error)}>{x.flag}</i>                          
                               <i  className="smallfont" style={{float:'right',marginRight:'10px'}}><span style={{color:'#fff'}}>{x.endTime}</span></i>
{/*                             <a style={{float:'right',marginRight:'3%',cursor: "pointer",color:'#FF8F44'}} 
                            className="smallfont0"  title="预测API"
                            href={"http://120.27.140.211/api/strategy_datas/?type=predict&strategy_id=" + x.id + "&trade_date=" + x.endTime}
                            target="_blank"
                            >{x.id}</a>}*/}
                             <div style={back2} className='collapse staMenu' id={menu_id}>
                                  <i className="smallfont" style={{marginLeft:"5%",color:x.status==-1?"#ff0000":"#fff",cursor:'pointer'}} title={x.error} onClick={(e)=>o.showError(x.error)}>{x.flag}</i>
                                  <i className="fa fa-desktop icon2 iconA" onClick={o.showLogs.bind(null,x.id,x.name)} title="日志输出"></i>
                                  <i className="fa fa-remove icon2 iconB" data-toggle="modal" data-target={"#"+modalId} onClick={o.del.bind(null,x.id,x.name)} title="删除"></i>
                                  <i className="fa fa-pause icon2 iconC" onClick={o.stop.bind(null,x.id)} title="停止"></i>
                                  <i className="fa fa-play icon2 iconD" onClick={o.start.bind(null,x.id)} title="启动"></i>
                                  <i className="iblock smallfont" style={{color:'#f1825f',cursor:'pointer'}} onClick={o.showCode.bind(null,x.script_id)}>{x.script_name}</i>
{/*                                  <i className="smallfont" style={{marginLeft:'5%'}}>{x.username}</i>
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
                                                     <td style={boderStyle1}>预测代码</td>
                                                     <td style={{border: '1px solid #666',width: '65%',color:x.script_name != undefined?'#f1825f':'#ffff00',cursor:'pointer'}} 
                                                     onClick={o.showCode.bind(null,x.script_id)}>
                                                     {x.script_name != undefined?x.script_name:'代码不存在'}</td>
                                                </tr>
                                                <tr>
                                                     <td style={boderStyle1}> 预测数据</td>
                                                     <td style={{textDecoration: 'underline',border: '1px solid #666',width: '65%',color:'#f1825f',cursor:'pointer'}} 
                                                     onClick={(e)=>{window.open("http://120.27.140.211/api/strategy_datas/?type=predict&strategy_id=" + x.id + "&trade_date=" + x.endTime)}}>{x.id}</td>
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



class PredictBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BtstrategyList: [],
        };
    }
    render() {
        Prop = this.props;
        _dispatch = this.props.dispatch;
        return (
            <TodoList BtstrategyList={this.props.BtstrategyList}/>
        )
    }
}
const mapStateToProps = (state) => {
    return {

    };
}
const mapDispatchToProps = (dispatch) => {
    return {

    };
}
export default connect(mapStateToProps)(PredictBack);