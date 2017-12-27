import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getPredict} from '../Redux/Action/shareAction'
import $ from 'jquery'
import Loading from './Loading.js'
import {
	downFile,
	formatDate,
	getDateList,
	getClass
} from '../Redux/Action/shareAction'
var params = {
	left: '430px',
	top: '150px',
	currentX: 0,
	currentY: 0,
	flag: false
};
var offsetLeft,offsetTop,timer,mouse_x,mouse_y,margin_left,margin_top;
var to_x,to_y;
class PredictRecord extends Component{
	constructor(props) {
		super(props);
		this.state = {
			predict: [],
			name: '',
			DateList:[],
			predictDate:'',
			predict_format:[]
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
		// document.onmousemove = function(event) {

		// }
	}
	componentDidMount() {
		if (document.body.clientWidth < 900) {
			return;
		}
		this.startDrag(document.getElementById('Bar_Predict'), document.getElementById('MyPredict'), this);
		this.drag("div_001", "x");
		this.drag("div_002", "y");
		this.drag("div_003");
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
				document.getElementById('MyPredict').style.left = parseInt(params.left) + disX + "px";
				document.getElementById('MyPredict').style.top = parseInt(params.top) + disY + "px";
			}

			mouse_x = e.pageX; //记录鼠标位置 用来放大div 当点击边缘才会触发定时器放大
			mouse_y = e.pageY;
		}

		window.onmouseup = function(event) {
			params.flag = false;
			clearInterval(timer);
			timer = 0;
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
			timer = setInterval(function() {
				if (timer) {
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
						document.getElementById("MyPredict").style.width = to_x + 10 + "px";
						document.getElementById("div_03").style.left = to_x + "px";
					} else if (type == "y") {
						item.style.top = to_y + "px";
						document.getElementById("div_03").style.top = to_y + "px";
						document.getElementById("MyPredict").style.height = to_y + 10 + "px";
					}
					//默认为上下左右移动
					else {
						item.style.left = to_x + "px";
						item.style.top = to_y + "px";
						// Style刷新
						document.getElementById("div_01").style.left = to_x + "px";
						document.getElementById("div_02").style.top = to_y + "px";
						document.getElementById("MyPredict").style.width = to_x + 10 + "px";
						document.getElementById("MyPredict").style.height = to_y + 10 + "px";
					}
				}
			}, 5);
		};
	}
	beforeRender(id, name, script_id, date) {
		$('#MyPredict').css("display", "inline");
		// $('#predict_table').css('display', 'none');
		getClass(script_id).then((script) => {
			getPredict(id, date).then((data) => {
				this.setState({
					name: name,
					predictDate: date,
					predict: data,
					predict_format: script.predict_format
				})
				$('#predict_table').css('display', 'block');
			})
		}, (rejected) => {
			this.setState({
				predict_format: []
			})
		})
	}
	componentWillReceiveProps(getProp) {
		let DateList = getDateList(getProp.predict.id);
		this.setState({
			DateList: DateList,
		})
		this.beforeRender(getProp.predict.id, getProp.predict.name, getProp.predict.script_id,DateList[DateList.length - 1])
	}
	refresh() {
		let DateList = getDateList(this.props.predict.id);
		this.setState({
			DateList: DateList,
		})
		this.beforeRender(this.props.predict.id, this.props.predict.name, this.props.predict.script_id,DateList[DateList.length - 1])
	}
	changeDate(e) {
		this.beforeRender(this.props.predict.id, this.props.predict.name, this.props.predict.script_id,e.target.value)
	}
	kill() {
		$('#MyPredict').css("display", "none");
	}
	downLog() {
		let predict = this.state.predict;
		let predict_format = this.state.predict_format;
		let text;
		text = 'datetime,'
		for (let i in predict_format) {
			text += predict_format[i].name + ',';
		}
		for (let i in predict) {
			text += '\r\n';
			text += predict[i].datetime.slice(0, 19)+',';
			for (let j in predict_format) {
				text += predict[i][predict_format[j].name] + ',';
			}
		}
		let name = this.state.name + '_' + this.state.predictDate + '_' + Math.round(new Date().getTime());
		downFile(text, name + '.csv');
	}
	render(){
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
			margin:'0px 10px'
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
		let predict_format = this.state.predict_format;
		return (
			<div>
				<div style={modalStyle} className='modal fade in' id="MyPredict" tabIndex="-99999" >
					{/*<div className="modal-dialog">
						<div id='LogBody' className="col-md-12 col-sm-12 modal-content" ref="choose" style={{backgroundColor: "#333",height:''}}>*/}
						  <div onMouseOver={(e)=>this.handleMove(e)} className="modal-header" id="Bar_Predict" 
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
						  <div  className="modal-body" id='records' style={modalBody}>

                                  <div id='predict_table'>
                             <table style={{marginTop:'10px',marginBottom:'0px',width:'96%',marginLeft:'2%',backgroundColor:'#3b3b3b'}} 
                             className="table table-bordered table-hover">
                                <thead>
                                	<tr style={{textAlign:'center'}}>
                                	<th style={boderStyle}>datetime</th>
                                {

                                	this.state.predict_format.map(function(x,index){
                                	return(
                                 

                                       <th key={index} style={boderStyle}>{x.name}</th>
                                  
                                		)
                                })
                                 }
                                 </tr>
                                 </thead>
                                   <tbody>
                          

					 {this.state.predict.map(function(z,index3){
					 	return (
					    <tr key={index3} style={{textAlign:'center'}}>
					       <td style={boderStyle}>{z.datetime.slice(0, 19)}</td>
					    	{
					    	predict_format.map(function(y, index2) {
					    		return (
					    	
					    			<td key={index2} style={boderStyle}>{z[y.name]}</td>
					    			 
					    			)
					    	})
					      }
					     </tr>
					     )
					 })}
					  
					           </tbody>
                    </table>
                                  </div>

						   </div>
		                   <div id="div_001"></div>
		                   <div id="div_002"></div>
		                   <div id="div_003"></div>
{/*						</div>
					</div>*/}
				</div>

				{/*<div  style={{display:this.state.display}} className='modal-backdrop fade in'></div>*/}
			</div>
		)
	}
}
const mapStateToProps =(state)=>{
	return {predict:state.reduPredict};
}

export default connect(mapStateToProps)(PredictRecord);


