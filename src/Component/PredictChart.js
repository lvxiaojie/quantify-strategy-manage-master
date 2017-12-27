import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import {
  getPredict
} from '../Redux/Action/shareAction'
import $ from 'jquery'
import Loading from './Loading.js'
import {
  downFile,
  formatDate,
  getDateList,
  getClass,
  getAllStrategy,
  get_unix_timestamp,
  dateTodate,
  getStatic
} from '../Redux/Action/shareAction'
import Chart from './Chart'
var params = {
  left: '100px',
  top: '50px',
  currentX: 0,
  currentY: 0,
  flag: false
};
let move_flag = false;
var offsetLeft, offsetTop, chart_timer, mouse_x, mouse_y, margin_left, margin_top;
var to_x, to_y;
class PredictChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predict: [],
      name: '',
      DateList: [],
      predictDate: '',
      predict_format: []
    }

  }
  getCss(o, key) {
    return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
  }
  startDrag(bar, target, _this, callback) {
    //o是移动对象
    bar.onmousedown = function(event) {
      params.flag = true;
      if (!event) {
        event = window.event;
        //防止IE文字选中
        bar.onselectstart = function() {
          return false;
        }
      }
      var e = event;
      params.currentX = e.clientX;
      params.currentY = e.clientY;
    };
    bar.onmouseup = function() {
      params.flag = false;
      if (_this.getCss(target, "left") !== "auto") {
        params.left = _this.getCss(target, "left");
      }
      if (_this.getCss(target, "top") !== "auto") {
        params.top = _this.getCss(target, "top");
      }
    };
  }
  handleMove() {
    if (document.body.clientWidth < 900) {
      return;
    }
    window.onmousemove = function(event) {
      var e = event ? event : window.event;

      if (params.flag) {
        var nowX = e.clientX,
          nowY = e.clientY;
        var disX = nowX - params.currentX,
          disY = nowY - params.currentY;
        document.getElementById('predictChart').style.left = parseInt(params.left) + disX + "px";
        document.getElementById('predictChart').style.top = parseInt(params.top) + disY + "px";
      }

      mouse_x = e.pageX; //记录鼠标位置 用来放大div 当点击边缘才会触发定时器放大
      mouse_y = e.pageY;
    }
    window.onmouseup = () => {
      if (move_flag) {
        this.refresh();
        move_flag = false;
      }
      params.flag = false;
      clearInterval(chart_timer);
      chart_timer = 0;
    }
  }
  componentDidMount() {
    if (document.body.clientWidth > 900) {
      this.startDrag(document.getElementById('Bar_PredictChart'), document.getElementById('predictChart'), this);
      this.drag("div_0001", "x");
      this.drag("div_0002", "y");
      this.drag("div_0003");
    }
  }
  drag(id, type) {
    var item = document.getElementById(id);
    item.onmousedown = function() {
      move_flag = true;
      // offsetTop以及offsetTop必须要放在mousedown里面，每次都要计算
      offsetLeft = item.offsetLeft;
      offsetTop = item.offsetTop;
      margin_top = mouse_y - offsetTop;
      margin_left = mouse_x - offsetLeft;
      chart_timer = setInterval(function() {
        if (chart_timer) {
          var max_with = 1000,
            max_height = 775,
            min_height = 336,
            min_with = 370;

          to_x = mouse_x - margin_left;
          to_y = mouse_y - margin_top;
          to_x = Math.min(to_x, max_with);
          to_y = Math.min(to_y, max_height);
          to_x = Math.max(to_x, min_with);
          to_y = Math.max(to_y, min_height);
          // 一定要记得加“px"
          if (type == "x") {
            item.style.left = to_x + "px";
            document.getElementById("predictChart").style.width = to_x + 10 + "px";
            document.getElementById("div_0003").style.left = to_x + "px";
          } else if (type == "y") {
            item.style.top = to_y + "px";
            document.getElementById("div_0003").style.top = to_y + "px";
            document.getElementById("predictChart").style.height = to_y + 10 + "px";
          }
          //默认为上下左右移动
          else {
            item.style.left = to_x + "px";
            item.style.top = to_y + "px";
            // Style刷新
            document.getElementById("div_0001").style.left = to_x + "px";
            document.getElementById("div_0002").style.top = to_y + "px";
            document.getElementById("predictChart").style.width = to_x + 10 + "px";
            document.getElementById("predictChart").style.height = to_y + 10 + "px";
          }
        }
      }, 5);
    };
  }
  beforeRender(id, name, script_id, date) {
    getStatic().staticData = [];
    $('#predictChart').css("display", "inline");
    // $('#predict_charts').css('display', 'none');
    getClass(script_id).then((script) => {
      getPredict(id, date).then((data) => {
        this.setState({
            name: name,
            predictDate: date,
            predict: data,
            predict_format: script.predict_format
          })
          // $('#predict_charts').css('display', 'block');
      })
    }, (rejected) => {
      this.setState({
        predict_format: []
      })
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentWillReceiveProps(getProp) {
    let DateList = getDateList(getProp.predict.id);
    this.setState({
      DateList: DateList,
    })
    this.beforeRender(getProp.predict.id, getProp.predict.name, getProp.predict.script_id, DateList[DateList.length - 1])
  }
  refresh() {
    let DateList = getDateList(this.props.predict.id);
    this.setState({
      DateList: DateList,
    })
    this.beforeRender(this.props.predict.id, this.props.predict.name, this.props.predict.script_id, DateList[DateList.length - 1])
  }
  changeDate(e) {
    let chooseDate = e.target.value;
    getPredict(this.props.predict.id, e.target.value).then((data) => {
      this.setState({
        predict: data,
        predictDate: chooseDate
      })
    })
  }
  kill() {
    $('#predictChart').css("display", "none");
  }
  downLog() {

    $('#root').css('display', 'none')
    $('#need_print').css('display', 'block')

    document.title = this.state.name + '_' + this.state.predictDate + '_predict_chart';
    var printData = document.getElementById("predict_charts").innerHTML;
    document.getElementById("need_print").innerHTML = printData;

    window.print();
    document.title = 'TuringAlgo';
    $('#need_print').css('display', 'none')
    $('#root').css('display', 'block')

  }
  render() { //多执行一次？
    const modalStyle = {
      top: document.body.clientWidth < 900 ? '5%' : params.top,
      left: document.body.clientWidth < 900 ? '0%' : params.left,
      width: document.body.clientWidth < 900 ? '100%' : document.body.clientWidth * 0.8,
      height: document.body.clientWidth < 900 ? '60%' : '400px',
      backgroundColor: '#333',
      borderRadius: '6px',
      display: 'none',
      color: '#fff',
    }
    const modalBody = {
      padding: "0px 0px",
      height: '83%',
      width: '90%',
      overflowY: 'auto',
      overflowX: 'hidden',
      marginLeft: '6%'
        // margin:'0px 4%'
    }
    const btnBg = {
      backgroundColor: '#292929',
      color: '#fff',
      border: '0px solid #525252',
      height: '25px',
      borderRadius: '2px',
      marginLeft: '5px'
    }
    const boderStyle = {
      border: '1px solid #666'
    }
    let this_exhange, this_symbol;
    let allStrategy = getStatic().all_stra;
    for (let i in allStrategy) {
      if (this.props.predict.id == allStrategy[i].id) {
        this_exhange = allStrategy[i].exchange;
        this_symbol = allStrategy[i].symbol;
      }
    }
    let market_info = {
      exchange: this_exhange,
      symbol: this_symbol,
      date: this.state.predictDate
    }
    let predict_format = this.state.predict_format;
    let predict = this.state.predict;
    let data = [];
    for (let i in predict_format) {
      let name = predict_format[i].name;
      data[predict_format[i].name] = [];
      for (let j in predict) {
        let value = predict[j][name];
        // switch (predict[j][name]) {
        //   case 'down':
        //     value = 0;
        //     break;
        //   case 'up':
        //     value = 1;
        //   case 'High':
        //     value = 99;
        //     break;
        //   case 'Low':
        //     value = -99;
        //     break;
        //   default:
        //     value = predict[j][name];
        //     break;
        // }

        data[predict_format[i].name].push([
          get_unix_timestamp(dateTodate(predict[j]['datetime'])),
          value
        ]);
      }
    }
    return (
      <div>
        <div style={modalStyle} className='modal fade in' id="predictChart" tabIndex="-99999" >
          {/*<div className="modal-dialog">
            <div id='LogBody' className="col-md-12 col-sm-12 modal-content" ref="choose" style={{backgroundColor: "#333",height:''}}>*/}
              <div onMouseOver={(e)=>this.handleMove(e)} className="modal-header" id="Bar_PredictChart" 
              style={{cursor:'move',height:'auto',border:'0px',height:'13%'}}>
                        <i type="button" className="close" onClick={this.kill.bind(this)}>
                          &times;
                        </i>
                        <h4 className="modal-title">
                      {this.state.name} 
                    <select style={btnBg} onChange={(e)=>this.changeDate(e)} value={this.state.predictDate}>
                     {
                      this.state.DateList.map((x,index)=>{
                        return(
                            <option key={index}>{x}</option>
                          )
       
                      })
                     }
                          </select>  
                   <i className="fa fa-cloud-download" title='导出日志' onClick={this.downLog.bind(this)} style={{margin:'0px 20px',cursor: "pointer"}}></i>
                         <i className="fa fa-refresh" title='刷新' onClick={this.refresh.bind(this)} style={{margin:'0px 5px',cursor: "pointer"}}></i>
                   
                        </h4>
                   </div>
              <div  className="modal-body" id='predict_charts' style={modalBody}>

              {
                predict_format.map((x,index)=>{
                  return(
                          <div key={index}>
                                      <Chart 
                                      market_info={market_info}
                                      type={x.type} 
                                      name={x.name} 
                                      data={data[x.name]} 
                                      time={new Date()}/>
                          </div>
                    )
                })
              }

               </div>

                       <div id="div_0001"></div>
                       <div id="div_0002"></div>
                       <div id="div_0003"></div>
{/*           </div>
          </div>*/}
        </div>

        {/*<div  style={{display:this.state.display}} className='modal-backdrop fade in'></div>*/}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    predict: state.reduPredictChart
  };
}

export default connect(mapStateToProps)(PredictChart);