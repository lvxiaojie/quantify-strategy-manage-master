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
	runBackTest,
} from '../../../Redux/Action/Action'
import {
	delClass,
	getAllStrategy,
	getClasss,
	getSortFun,
	getStatic,
	getStrategys,
	getNianHua3
} from '../../../Redux/Action/shareAction'
import TradeStrategys from './TradeStrategys'
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
			clickTrade_id:'',
			nianhua_data:[]
		};
	},
	componentDidMount: function() {
		// $('.ulStyle').css('height', $('#TradeList').height() - 10);
		// $('.ulStyle').css('height',document.documentElement.clientHeight - 74);
	},
	getClassId: function(id, name) {
		$(' #class_id ').val(id);
		$(' #class_type ').text('交易名');
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
		$("#delClass_" + username).find("i").html(name);
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
				$('#trade_detail' + i).removeClass('in');
			}
		}
	},
	showList: function(e, id) {
		let oldClass = e.target.className;
		$('.tradeMenu').each(function(index, el) {
			if ('collapse_' + id != el.id) {
				$(this).removeClass('in');
			}
		});
		$('.tradeCircle').each(function(i) {
			$(this).attr("class", "tradeCircle fa fa-plus-circle collapsed");
			$(this).parent().removeClass('open');
		})
		if (oldClass == "tradeCircle fa fa-plus-circle collapsed") {
			e.target.className = 'tradeCircle fa fa-minus-circle';
		} else {
			e.target.className = "tradeCircle fa fa-plus-circle collapsed";
		}
		getNianHua3(id).then((nianhua_data) => {
			this.setState({
				clickTrade_id: id,
				nianhua_data: nianhua_data
			})
		},(rejected)=>{
						this.setState({
				clickTrade_id: id,
			})
			Prop.dispatch(alertMessage('获取历史数据失败', 1000));
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
		let o = this;
		let classs = this.props.todo.map((x, index) => {
			let astyle = {
				color: "#FFC266",
				marginLeft: '10px',
				textDecoration: 'none',
				cursor: 'default',
				fontSize: '11px'
			}
			if (x.strategys.length + x.btstrategys.length == 0) {
				astyle.color = "#fff"
			}
			let _id = "trade_detail" + index;
			return (
				<div  key={index}>
		    <div  id={x.id+'2'} 
		    // className='dropdown smallfont2'
		    className={localStorage.getItem("username") === 'admin'?"listback":"listback2"}
		    onMouseOut={o.onMouseOut.bind(null,x.id)}
		    onMouseOver={o.onMouseOver.bind(null,x.id)} title={x.error}>
		    <i className="tradeCircle fa fa-plus-circle collapsed"
		       data-toggle="collapse" data-target={'#collapse_' + x.id}
		       onClick={(e)=>this.showList(e,x.id)}></i>
				<span className="scripts_name" style={astyle} key={index} title={x.name +' '+x.datetime}>{x.shortname}</span>
				&nbsp;
				{localStorage.getItem("username") === 'admin' && localStorage.getItem("username")!=x.username?null:
				<span>
				<i onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}} style={istyle}  className="fa fa-plus" title="添加实例" 
				data-toggle="modal" data-target="#myModal2" onClick={o.getClassId.bind(null,x.id,x.name)}></i></span>}
				<i onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}} style={istyle3} className="fa fa-remove" data-toggle="modal" 
				data-target={"#delClass_" + Prop.username} title="删除" onClick={o.delClass.bind(null,x.id,x.name,Prop.username)}></i>
				
				<i onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}} style={istyle3} className="fa fa-pencil" title="代码" 
				onClick={o.show2.bind(null,x.id)}></i>

				<i onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}} style={istyle2} className="glyphicon glyphicon-chevron-down" 
				 data-toggle="collapse" data-target={'#collapse_detail_' + x.id}
				 onClick={o.hideOther.bind(null,x.id)}></i>
			    <span style={circle} className="his smallfont " title="历史回测">{x.btstrategys.length}</span>
			    <span style={circle} className="real smallfont " title="实盘模拟">{x.strategys.length}</span>
			    <span style={circle} className="true smallfont " title="真实交易">{x.trueStra.length}</span>
			   
			   <div className='smallfont collapse' id={'collapse_detail_' + x.id}>
					    {/* <div style={back_son}>
					    	{x.name}
					    	&nbsp;({x.username})
				        </div>*/}
					    <div style={back_son}>
					    	{x.datetime}				
					    </div>

					     <div style={{height:'5px'}}>&nbsp;</div>
			   
			   </div>

			</div>

		<div className='collapse tradeMenu' id={'collapse_' + x.id}>
		     <TradeStrategys 
		     click = {this.state.clickTrade_id == x.id}
		     trueStra = {x.trueStra}
		     strategys = {x.strategys}
		     btstrategys = {x.btstrategys}
		     nianhua_data = {this.state.nianhua_data}
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
		     <div style={modalStyle} className="modal fade" id={"delClass_" + Prop.username}  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
class TradeList extends Component {
	constructor(props) { //ES6初始化
		super(props);
		this.state = {
			todolist: [],
		};
	}
	putScreen() {
		let data = Prop.trade;
		data.sort(getSortFun('desc', 'name')); //按classname升序存放
		let staticData = getStatic();
		let trueStra = staticData.trueStras;
		let strategys = staticData.strategys;
		let btstrategys = staticData.btstrategys;
		for (let x of data) {
			x.trueStra = [];
			x.strategys = [];
			x.btstrategys = [];
			for (let y of trueStra) {
				if (y.script_id == x.id && y.status != 4) {
					x.trueStra.push(y);
				}
			}
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
		$('.tradeCircle').each(function(i) {
			$(this).attr("class", "tradeCircle fa fa-plus-circle collapsed");
			$(this).parent().removeClass('open');
		})
		Prop = nextProps;
		this.putScreen();
	}
	componentWillMount() {
		Prop = this.props;
		this.putScreen();
	}
	componentDidMount() {}
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
export default connect(mapStateToProps)(TradeList);