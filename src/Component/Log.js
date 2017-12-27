import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import {
	alertMessage
} from '../Redux/Action/Action'
import {
	getLog
} from '../Redux/Action/shareAction'
import $ from 'jquery'
import Loading from './Loading.js'
import {
	downFile,
	formatDate,
	getDateList,
	getStrategy
} from '../Redux/Action/shareAction'
var params = {
	left: '430px',
	top: '150px',
	currentX: 0,
	currentY: 0,
	flag: false
};
var offsetLeft, offsetTop, log_timer, mouse_x, mouse_y, margin_left, margin_top;
var to_x, to_y;
class Log extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messageText: '',
			name: '',
			DateList: [],
			logDate: ''
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
	componentDidMount() {
		if (document.body.clientWidth < 900) {
			return;
		}
		this.startDrag(document.getElementById('Bar'), document.getElementById('Mylog'), this);
		this.drag("div_01", "x");
		this.drag("div_02", "y");
		this.drag("div_03");
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
				var endX = parseInt(params.left) + disX,
					endY = parseInt(params.top) + disY;
				// if (endX < 0) {
				// 	endX = 0;
				// 	params.left = 0;
				// }
				// if (endY < 0) {
				// 	endY = 0;
				// 	params.top = 0;
				// }
				document.getElementById('Mylog').style.left = endX + "px";
				document.getElementById('Mylog').style.top = endY + "px";
			}

			mouse_x = e.pageX; //记录鼠标位置 用来放大div 当点击边缘才会触发定时器放大
			mouse_y = e.pageY;
		}
		window.onmouseup = function(event) {
			params.flag = false;
			clearInterval(log_timer);
			log_timer = 0;
		}
	}
	drag(id, type) {
		var item = document.getElementById(id);
		item.onmousedown = function() {
			// offsetTop以及offsetTop必须要放在mousedown里面，每次都要计算
			offsetLeft = item.offsetLeft;
			offsetTop = item.offsetTop;
			margin_top = mouse_y - offsetTop;
			margin_left = mouse_x - offsetLeft;
			log_timer = setInterval(function() {
				if (log_timer) {
					var max_with = 800,
						max_height = 600,
						min_with = 370;
					to_x = mouse_x - margin_left;
					to_y = mouse_y - margin_top;
					to_x = Math.min(to_x, max_with);
					to_y = Math.min(to_y, max_height);
					to_x = Math.max(to_x, min_with);
					// 一定要记得加“px"
					if (type == "x") {
						item.style.left = to_x + "px";
						document.getElementById("Mylog").style.width = to_x + 10 + "px";
						document.getElementById("div_03").style.left = to_x + "px";
					} else if (type == "y") {
						item.style.top = to_y + "px";
						document.getElementById("div_03").style.top = to_y + "px";
						document.getElementById("Mylog").style.height = to_y + 10 + "px";
					}
					//默认为上下左右移动
					else {
						item.style.left = to_x + "px";
						item.style.top = to_y + "px";
						// Style刷新
						document.getElementById("div_01").style.left = to_x + "px";
						document.getElementById("div_02").style.top = to_y + "px";
						document.getElementById("Mylog").style.width = to_x + 10 + "px";
						document.getElementById("Mylog").style.height = to_y + 10 + "px";
					}
				}
			}, 5);
		};
	}
	beforeRender(id, name, date) {
		$('#Mylog').css("display", "inline");
		$("#messageText").html("");
		$('#loading').css("display", "inline");
		// this.setState({
		// 	name: '',
		// 	logNum: ''
		// })
		setTimeout(() => {
			let logs = getLog(id, date);
			let logs2 = '';
			if (logs.length == 0) {
				$("#messageText").append("No log")
			};
			for (var i in logs) {
				$("#messageText").append(formatDate(new Date(logs[i].datetime)) + ": " + logs[i].content + "<br>")
				logs2 += formatDate(new Date(logs[i].datetime)) + ": " + logs[i].content + '\r\n';
			}
			$('#loading').css("display", "none");
			this.setState({
				name: name,
				messageText: logs2,
				logNum: ' - ' + logs.length + '条记录',
				logDate: date
			})
		}, 100)

	}
	componentWillReceiveProps(getProp) {
		let DateList = getDateList(getProp.log.id);
		this.setState({
			DateList: DateList,
		})
		if (DateList.length == 0) {
			this.props.dispatch(alertMessage('没有日期数据',2000));
			return;
		}
		this.beforeRender(getProp.log.id, getProp.log.name, DateList[DateList.length - 1])
	}
	refresh() {
		let strategy = getStrategy(this.props.log.id);
		if (strategy.status == -1) {
			this.props.dispatch(alertMessage('------------该实例出现错误------------\n' + strategy.error));
			return;
		}
		let DateList = getDateList(this.props.log.id);
		if (DateList.length == 0) {
			this.props.dispatch(alertMessage('没有日期数据',2000));
			return;
		}
		this.setState({
			DateList: DateList,
		})
		this.beforeRender(this.props.log.id, this.props.log.name, DateList[DateList.length - 1])
	}
	changeDate(e) {
		this.beforeRender(this.props.log.id, this.props.log.name, e.target.value)
	}
	kill() {
		$('#Mylog').css("display", "none");
		// $("#messageText").html("");
		// $('#loading').css("display", "inline");
	}
	downLog() {
		let text = this.state.messageText;
		let name = this.state.name + '_' + this.state.logDate + '_log_' + Math.round(new Date().getTime());
		downFile(text, name + '.txt');
	}
	render() {
		const modalStyle = {
			top: document.body.clientWidth < 900 ? '5%' : params.top,
			left: document.body.clientWidth < 900 ? '0%' : params.left,
			width: document.body.clientWidth < 900 ? '100%' : '550px',
			height: document.body.clientWidth < 900 ? '60%' : '400px',
			backgroundColor: '#333',
			borderRadius: '6px',
			display: 'none',
			color: '#fff',
		}
		const modalBody = {
			padding: "0px 0px",
			height: '83%',
			width: '96%',
			overflow: 'auto',
			margin: '0px 10px'
		}
		const btnBg = {
			backgroundColor: '#292929',
			color: '#fff',
			border: '0px solid #525252',
			height: '25px',
			borderRadius: '2px',
			marginLeft: '5px'
		}
		return (
			<div>
				<div style={modalStyle} className='modal fade in' id="Mylog" tabIndex="-99999">
					{/*<div className="modal-dialog">
						<div id='LogBody' className="col-md-12 col-sm-12 modal-content" ref="choose" style={{backgroundColor: "#333",height:''}}>*/}
						  <div onMouseOver={(e)=>this.handleMove(e)} className="modal-header" id="Bar" 
						  style={{cursor:'move',height:'auto',border:'0px',height:'13%'}}>
			                	<i type="button" style={{backgroundColor:'#333'}} className="close" onClick={this.kill.bind(this)}>
			                		&times;
			                	</i>
			                	<h4 className="modal-title" id="myModalLabel">
			                		{this.state.name}
			                		{this.state.logNum}  
			              <select style={btnBg} onChange={(e)=>this.changeDate(e)} value={this.state.logDate}>
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
						  <div  className="modal-body" id='logs' style={modalBody}>
						           <div id='loading'>
                                         <Loading />
                                  </div>
                                  <div id='messageText'>
                                  </div>
						   </div>
		                   <div id="div_01"></div>
		                   <div id="div_02"></div>
		                   <div id="div_03"></div>
{/*						</div>
					</div>*/}
				</div>

				{/*<div  style={{display:this.state.display}} className='modal-backdrop fade in'></div>*/}
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		log: state.reduLog
	};
}

export default connect(mapStateToProps)(Log);