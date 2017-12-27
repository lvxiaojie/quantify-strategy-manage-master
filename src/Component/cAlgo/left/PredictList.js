import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import $ from 'jquery'
import {
	saveStrategyList,
	saveBtstrategyList,
	ShowList,
	showCode,
	alertMessage,
	updateClass,
	showLog,
	runBackTest
} from '../../../Redux/Action/Action'
import {
	delClass,
	getAllStrategy,
	getClasss,
	getSortFun,
	getStatic,
	getStrategys
} from '../../../Redux/Action/shareAction'
import PredictStrategys from './PredictStrategys'
const astyle = {
	color: "#fff",
	cursor: "pointer",
	marginLeft: '10px',
	textDecoration: 'none',
}
const istyle = {
	cursor: "pointer",
	color: '#fff',
	float: 'right',
	lineHeight: '40px',
	marginRight: '5px',
}
const istyle2 = {
	cursor: "pointer",
	color: '#fff',
	float: 'right',
	lineHeight: '40px',
	marginRight: '5px',
	marginTop: '0px',
	fontSize: '14px'
}
const circle = {
	float: 'right',
	lineHeight: '16px',
	marginRight: '5px',
	marginTop: '10px',
	borderRadius: '500px',
	border: '1px #fff solid',
	height: '20px',
	width: '20px',
	textAlign: 'center',
	cursor: 'default'
}
const istyle3 = {
	cursor: "pointer",
	color: '#fff',
	float: 'right',
	lineHeight: '40px',
	marginRight: '5px',
	marginTop: '0px',
}
const back2 = {
	borderRadius: '4px',
	backgroundColor: '#525252',
	marginLeft: '10px',
	width: '100%',
	marginBottom: '-4px',
}
const modalBody = {
	color: '#fff',
	paddingLeft: '20%',
	paddingTop: '15%',
	fontSize: '15px'
}
let Prop;
let StrategyList = [];
let BtstrategyList = [];
var ListTodo = React.createClass({
	getInitialState: function() {
		return {
			listStyle: 'listback',
			delname: '',
			delId: '',
			clickPredict_id:''
		};
	},
	componentDidMount: function() {
		// $('.ulStyle').css('height', $('#TradeList').height() - 10);
		// $('.ulStyle').css('height',document.documentElement.clientHeight - 74);
	},
	getClassId: function(id, name) {
		$(' #class_id ').val(id);
		$(' #class_type ').text('预测名');
		$(' #add_script_name ').html(name);
		$(' #choose_strategy_div ').css('display','block');
		$('#choose_strategy_type').attr("disabled",false);
		Prop.dispatch(runBackTest(false));
	},
	show: function(id, event) {
		if ($('#' + id).css('display') == 'none') {
			$('#' + id).css('display', 'block');
		} else {
			$('#' + id).css('display', 'none');
		}
	},
	show2: function(id) {
		Prop.dispatch(showCode(id));
		Prop.dispatch(ShowList('code'));
	},
	delClass: function(id, name, username) {
		// console.log(id, name)
		$("#delClass_predict_" + username).find("i").html(name);
		this.setState({
			// delName: name,
			delId: id
		})
	},
	delOk: function() {
		if (delClass(this.state.delId)) {
			Prop.dispatch(updateClass());
			// this.Del(this.state.delId);
		} else {
			Prop.dispatch(alertMessage('删除失败', 1000));
		}
	},
	onMouseOut: function(id) {
		$('#' + id + '2').css('backgroundColor', '#3b3b3b');
	},
	onMouseOver: function(id) {
		$('#' + id + '2').css('backgroundColor', '#525252');
	},
	showLogs: function(id, name) {
		Prop.dispatch(showLog(id, name));
	},
	showBack: function(index) {
		for (let i in this.props.todo) {
			if (i != index) {
				$('#predict_detail' + i).removeClass('in');
			}
		}
	},
	showList: function(e, id) {
		let oldClass = e.target.className;
		$('.predictMenu').each(function(index, el) {
			if ('collapse_' + id != el.id) {
				$(this).removeClass('in');
			}
		});
		$('.predictCircle').each(function(i) {
			$(this).attr("class", "predictCircle fa fa-plus-circle collapsed");
			$(this).parent().removeClass('open');
		})
		if (oldClass == "predictCircle fa fa-plus-circle collapsed") {
			e.target.className = 'predictCircle fa fa-minus-circle';
		} else {
			e.target.className = "predictCircle fa fa-plus-circle collapsed";
		}
		this.setState({
			clickPredict_id: id
		})
	},
	hideOther:function(id){
		let data = this.props.todo;
		for(let i in data){
			if(data[i].id!=id){
				$('#collapse_detail_' + data[i].id).removeClass('in');
			}
		}
	},
	render: function() {
		const back_son = {
			marginLeft: '5px',
			height:'30px'
		}
		const boderStyle = {
			border: '1px solid #666'
		}
		let o = this;
		let classs = this.props.todo.map((x, index) => {
			let astyle = {
				color: "#f18255",
				marginLeft: '10px',
				textDecoration: 'none',
				cursor: 'default',
				fontSize: '11px'
			}
			if (x.strategys.length + x.btstrategys.length == 0) {
				astyle.color = "#fff"
			}
			return (
				<div  key={index}>
		    <div className='dropdown smallfont2' id={x.id+'2'} 
		    className={localStorage.getItem("username") == 'admin'?"listback":"listback2"}
		    onMouseOut={o.onMouseOut.bind(null,x.id)}
		    onMouseOver={o.onMouseOver.bind(null,x.id)} title={x.error}>
		    <i className="predictCircle fa fa-plus-circle collapsed"
		       data-toggle="collapse" data-target={'#collapse_' + x.id}
		       onClick={(e)=>this.showList(e,x.id)}></i>
				<span className="scripts_name" style={astyle} key={index} title={x.name +' '+x.datetime}>{x.shortname}</span>
				&nbsp;
				{localStorage.getItem("username") === 'admin' && localStorage.getItem("username")!=x.username?null:
				<span>
				<i onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}} style={istyle}  className="fa fa-plus" title="添加实例" 
				data-toggle="modal" data-target="#myModal2" onClick={o.getClassId.bind(null,x.id,x.name)}></i></span>}
				<i onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}} style={istyle3} className="fa fa-remove" data-toggle="modal" 
				data-target={"#delClass_predict_" + Prop.username} title="删除" onClick={o.delClass.bind(null,x.id,x.name,Prop.username)}></i>
				
				<i onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}} style={istyle3} className="fa fa-pencil" title="代码" 
				onClick={o.show2.bind(null,x.id)}></i>
				<i onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}} style={istyle2} className="glyphicon glyphicon-chevron-down" 
				 data-toggle="collapse" data-target={'#collapse_detail_' + x.id}
				 onClick={o.hideOther.bind(null,x.id)}></i>
			    <span style={circle} className="predict_his smallfont " title="历史回测">{x.btstrategys.length}</span>
			    <span style={circle} className="predict_real smallfont " title="实盘预测">{x.strategys.length}</span>

       
		    <div className='smallfont collapse' id={'collapse_detail_' + x.id}>
					     {/*<div style={back_son}>
					    	{x.name}
					    	&nbsp;({x.username})
				        </div>*/}	
					    <div style={back_son}>
					    	{x.datetime}				
					    </div>

                       <table style={{marginTop:'10px',marginBottom:'0px',width:'96%',marginLeft:'2%',backgroundColor:'#3b3b3b'}} 
                       className="table table-bordered table-hover">
                       <thead>
                         <tr>
                           <th style={boderStyle}>预测变量</th>
                           <th style={boderStyle}>变量类型</th>
                           <th style={boderStyle}>预测内容</th>
                         </tr>
                         </thead>
                        <tbody>
                          
					    {
					    	x.predict_format.map(function(x, index) {
					    		return (
					    			<tr key={index}>
					    			<td style={boderStyle}>{x.name}</td>
					    			<td style={boderStyle}>{x.type}</td>
					    			<td style={boderStyle}>{x.information}</td>
					    			  </tr>
					    			)
					    	})
					    }
					  
					 </tbody>
					     </table>
					     <div style={{height:'5px'}}>&nbsp;</div>
			</div>
	

			</div>

		<div className='collapse predictMenu' id={'collapse_' + x.id}>
		     <PredictStrategys 
		     click = {this.state.clickPredict_id == x.id}
		     strategys = {x.strategys}
		     btstrategys = {x.btstrategys}
		     />
		</div>
    </div>
			);
		});
		const modalStyle = {
			top: '10%',
			left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 200 : '0',
			right: 'auto',
			bottom: 'auto',
			width: document.body.clientWidth > 900 ? 400 : '100%'
		}
		return (
			<div>
			<div className='trade_div'>{classs}</div>
		     <div style={modalStyle} className="modal fade" id={"delClass_predict_" + Prop.username}  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="col-md-8 col-sm-12 modal-content" ref="choose" style={{backgroundColor: "#333",height:''}}>
                    <div className="modal-body" style={modalBody}>
                    您确定要删除 <i style={{color:'#FF6666'}}> {this.state.delName} </i> 吗?
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
class PredictList extends Component {
	constructor(props) { //ES6初始化
		super(props);
		this.state = {
			todolist: [],
		};
	}
	putScreen() {
		let data = Prop.predict;
		data.sort(getSortFun('desc', 'name')); //按classname升序存放
		let staticData = getStatic();
		let strategys = staticData.predictStras;
		let btstrategys = staticData.predictBtras;
		for (let x of data) {
			x.strategys = [];
			x.btstrategys = [];
			for (let y of strategys) {
				if (y.script_id == x.id && y.status != 4) {
					x.strategys.push(y);
				}
			}
			for (let y of btstrategys) {
				if (y.script_id == x.id) {
					x.btstrategys.push(y);
				}
			}
		}
		this.setState({
			todolist: data,
		});
	}

	componentWillReceiveProps(nextProps) {
		Prop = nextProps;
		this.putScreen();
	}
	componentWillMount() {
		Prop = this.props;
		this.putScreen();
	}
	componentDidMount() {

	}
	render() {
		return (
			<ListTodo todo={this.state.todolist}/>

		)
	}
}
const mapStateToProps = (state) => {
	return {

	};
}
export default connect(mapStateToProps)(PredictList);