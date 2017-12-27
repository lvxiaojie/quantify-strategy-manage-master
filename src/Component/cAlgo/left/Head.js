import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import $ from 'jquery'
import {
	hashHistory
} from 'react-router'
import {
	ShowList,
	showMyCode
} from '../../../Redux/Action/Action'
import '../../../Style/Menu.css'
import {
	introJs
} from 'intro.js';
class Head extends Component {
	constructor(props) { //ES6初始化
		super(props);
		this.state = {
			username: '',
			name: '',
			date: '',
			titleColor: '#fff',
			marketDetail: [],
			type: 'id'
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.title == '') {
			this.setState({
				marketDetail: nextProps.marketDetail,
				type: nextProps.type
			})
		} else {
			this.setState({
				name: nextProps.title.Strategy.name,
				date: nextProps.title.date,
				titleColor: nextProps.title.Strategy.mode == 'realtime' ? '#46b8da' : '#5cb85c',
				marketDetail: nextProps.marketDetail,
				type: nextProps.type
			})
		}
	}

	componentWillMount() {
		this.setState({
			username: localStorage.getItem("username"),
		})
	}
	clearCookie() {
		let expireAt = new Date;
		expireAt.setMonth(expireAt.getMonth() - 1);
		if (document.cookie != "") {
			let crumbs = document.cookie.split(";");
			for (let i = 0; i < crumbs.length; i++) {
				let crumbName = crumbs[i].split("=")[0];
				document.cookie = crumbName + "=;expires=" + expireAt.toGMTString();
			}
		}
		document.cookie = "";
	}
	exit() {
		// this.clearCookie();
		localStorage.clear();
		clearInterval(this.timer);
		hashHistory.push('/Login');
		window.location.reload();
	}
	showModelShare() {
		this.props.dispatch(ShowList('none'));
		$(".leftTable a").each(function() {
			$(this).css('backgroundColor', '#292929');
		});
		$(".leftTable li").each(function() {
			$(this).removeClass('active');
		});
	}

	print() {

		document.title = this.state.name == '' ? this.state.marketDetail.symbol : this.state.name;
		document.title += '_' + this.state.marketDetail.date;

		$('#root').css('display', 'none');
		$('#need_print').css('display', 'block');

		// var printData = document.getElementById("right_div").innerHTML;
		var markert_chart = document.getElementById("markert_chart").innerHTML;
		var run_chart = document.getElementById("run_chart").innerHTML;
		var profit_chart = document.getElementById("profit_chart").innerHTML;
		var TradeDetail = document.getElementById("TradeDetail").innerHTML;
		var TradeAnalysis = document.getElementById("TradeAnalysis").innerHTML;
		document.getElementById("need_print").innerHTML = markert_chart + run_chart + profit_chart + TradeDetail + TradeAnalysis;

		window.print();

		$('#need_print').css('display', 'none');
		$('#root').css('display', 'block');

		document.title = 'TuringAlgo';


	}
	showCode(codeType) {
		$('#myModal2').addClass('in');
		$('#myModal2').css('display', 'block');
		this.props.dispatch(showMyCode(codeType));
		this.props.dispatch(ShowList('myCode'));
	}
	componentDidMount() {
		$('.mainMenu').find('.dropdown-toggle').each(function(index, el) {
			$(this).hover(() => {
				// $(this).css('backgroundColor','#292929')
				// $(this).css('fontSize','16px')
			}, () => {
				// $(this).css('backgroundColor','#525252')
				// $(this).css('fontSize','14px')
			})
		});
		
		$('#zijin_manage li').css('width', '120px')
		if (parseInt($('#hello_user').css('height'), 10) > 30) {
			$('#hello_user').css('width', '140px')
		}
		$('#exit_button').css('width', $('#hello_user').css('width'))
		$('#change_button').css('width', $('#hello_user').css('width'))
	}
	showPredict() {
		$('#addPredict_code').css('display', 'block');
		$('#addPredict_code').addClass('in');
		$('#myModal2').addClass('in');
		$('#myModal2').css('display', 'block');
		this.props.dispatch(showMyCode('predict'));
		this.props.dispatch(ShowList('myPredict'));
		setTimeout(() => {
			var intro = introJs();
			intro.setOptions({
				steps: [{
					element: document.querySelectorAll('#addPredict_code')[0],
					intro: "填写预测目标、变量",
					position: 'left'
				}, {
					element: document.querySelector('#mycode_editor'),
					intro: "使用Python语言编写策略",
					position: 'left'
				}, {
					element: document.querySelector('#run_back_btn'),
					intro: "使用策略代码运行回测",
					position: 'left'
				}, {
					element: document.querySelectorAll('#myModal2')[0],
					// element: document.querySelector('#add_strategy_dialog'),
					intro: "填写实例信息",
					position: 'left'
				}]
			});
			intro.onchange(function(targetElement) {
				let step = this._currentStep;
				// console.log(step)
				if (step == 1) {
					$('#addPredict_code').css('display', 'none');
					$('#addPredict_code').removeClass('in');
				}
			});
			intro.onexit(() => {
				$('#myModal2').removeClass('in');
				$('#myModal2').css('display', 'none');
				$('.modal-backdrop').eq(0).remove();
				$('#addPredict_code').css('display', 'none');
				$('#addPredict_code').removeClass('in');
				// this.props.dispatch(ShowList('id'));
				// $('#addPredict_code').css('display', 'block');
				// $('#addPredict_code').addClass('in');

			}).start()
		}, 200)

	}
	render() {
		let o = this;
		const title2 = {
			color: this.state.titleColor,
			height: '50px',
			borderRadius: '4px',
			cursor: 'default',
			// lineHeight:'10px',
			height: '100%',
			fontSize: '20px',
		}
		const title = {
			color: this.state.titleColor,
			// marginLeft: '2%',
			marginBottom: '5px',
			backgroundColor: '#007730',
			borderRadius: '4px',
			border: '0px solid #007730',
			cursor: 'default',
			// lineHeight:'10px',
			fontSize: '20px'
		}
		const btnBg = {
			backgroundColor: '#292929',
			color: '#fff',
			border: '0px solid #292929',
			marginTop: '0px',
			height: '25px',
			lineHeight: '10px',
			fontSize: '9px',
			float: 'right',
			// marginRight: '5px'
		}
		const select = {
			cursor: "pointer",
			marginLeft: '15px',
			float: 'left',
		}
		return (
			<div>
			
	<div className="container_test">
		<ul className="menu_test">
			<li className="menu_li" style={{borderRadius: '4px 0px 0px 4px'}}><a>用户管理</a>
				<ul className="submenu">
					<li id='hello_user'><a> <i className="fa fa-user"></i> {this.state.username}</a></li>
                    {localStorage.getItem("username")=='admin'?<li><a data-toggle="modal" data-target="#UserList"><i className="fa fa-users"></i> 用户中心</a></li>:null}
                    {localStorage.getItem("username")=='admin'?<li id='change_button'><a data-toggle="modal" data-target="#invitationCode"><i className="fa fa-female"></i> 邀请码管理</a></li>:null}
                    <li id='change_button'><a data-toggle="modal" data-target="#changePassword"><i className="fa fa-wrench"></i> 修改密码</a></li>
					<li id='exit_button'><a onClick={this.exit.bind(this)}><i className="fa fa-sign-out"></i> 退出登录</a></li>
				</ul>
			</li>
			{localStorage.getItem("username")=='admin'?
			<li className="menu_li"><a>平台管理</a>
				<ul className="submenu" id='zijin_manage'>
					<li><a href='http://120.27.140.211:19999/' target="_blank"><i className="fa fa-bell"></i> 性能监控</a></li>
				    <li><a href="/#/Dashboard" target="_self"><i className="fa fa-pie-chart"></i> Dashboard</a></li>
				</ul>
			</li>:null}
			
			<li className="menu_li"><a>交易系统</a>
				<ul className="submenu">
				   <li><a data-toggle="modal" data-target="#changeFee"><i className="fa fa-yen"></i> 手续费率</a></li>
				   <li><a onClick ={(e)=>{this.print(e)}}><i className="fa fa-file-text"></i> 导出报告</a></li>
				</ul>
			</li>
			
			<li className="menu_li"><a>新建代码</a>
				<ul className="submenu">
					<li><a 
					// data-toggle="modal" data-target="#myModal2"
					onClick={(e)=>this.showCode('trade')}><i className="fa fa-pencil-square-o"></i> 交易代码</a></li>
					<li><a 
					// data-toggle="modal" data-target="#addPredict_code"
					onClick={(e)=>this.showPredict()}
					><i className="fa fa-pencil-square-o"></i> 预测代码</a></li>
				</ul>
			</li>
			<li className="menu_li" style={{width:'48px',borderRadius: '0px 4px 4px 0px'}}><a>帮助</a>
				<ul className="submenu">
					<li style={{width:'120px'}}><a target="_blank" href="/#/Help"><i className="fa fa-question-circle"></i> 帮助导航</a></li>
					{localStorage.getItem("username")=='admin'?<li style={{width:'120px'}}><a target="_blank" href="http://120.27.140.211/api/doc/"><i className="fa fa-link"></i> API说明</a></li>:null}
					<li style={{width:'120px'}}><a data-toggle="modal" data-target="#About">关于TurcAlgo</a></li>
				</ul>
			</li>
		</ul>


{/*			{document.documentElement.clientWidth<800||this.state.type =='code'||this.state.type =='myCode'?null:
		     <div style={{lineHeight:'28px',fontSize:'16px',marginLeft:'375px',height:'30px',backgroundColor:'#3a3a3a',width:document.documentElement.clientWidth-385}}>

	            <button className='btn btn-default export-btn' style={btnBg} 
	             onMouseOut={(e)=>{e.target.style.backgroundColor = '#292929'}} 
	             onMouseOver={(e)=>{e.target.style.backgroundColor = '#323232'}}
	             onClick ={(e)=>{this.print(e)}}
	             >导出报告</button>

	         </div>
          }*/}
	</div>


          </div>


		)
	}
}
const mapStateToProps = (state) => {
	return {
		title: state.reduShowDataTitle,
		marketDetail: state.reduShowMarketDetail,
		type: state.reduToShowList
	};
}
export default connect(mapStateToProps)(Head);