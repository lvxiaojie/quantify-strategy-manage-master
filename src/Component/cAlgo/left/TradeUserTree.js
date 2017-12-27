import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import {
	getUserList,
	getClasss,
	getStatic
} from '../../../Redux/Action/shareAction'
import TradeList from './TradeList'
import {
    Icon,
} from 'antd';
import $ from 'jquery'
class TradeUserTree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
		}
	}
	beforeRender() {
		getUserList().then((users) => {
			getClasss().then((scripts) => {
				
				let allstra = getStatic().all_stra;
				// console.log(allstra)
				// let noscript_stra = [];
				// for(let x of allstra){
				// 	let flag = true;
				// 	for(let y of scripts){
				// 		if(x.script_id == y.id){
				// 			flag = false;
				// 			break;
				// 		}
				// 	}
				// 	if(flag){
				// 		noscript_stra.push(x);
				// 	}
				// }
				// console.log(noscript_stra)

				for (let i in users) {
					users[i].trade = [];
					for (let j in scripts) {
						if (users[i].username === scripts[j].username && scripts[j].mode === 'trade') {
								users[i].trade.push(scripts[j]);
						}
					}
					users[i].run_stra = [];
					for(let x of allstra){
						if (users[i].username === x.username && x.status === 2 && x.script_mode === 'trade') {
								users[i].run_stra.push(x);
						}
					}
				}
				let has_scripts_user = []
				for (let i in users) {
					if (users[i].trade.length !== 0) {
						has_scripts_user.push(users[i])
					}
				}
				this.setState({
					users: has_scripts_user,
				})
			})
		})
	}
	componentWillReceiveProps(nextProps) {
		$('.userCircle').each(function(i) {
			$(this).attr("class", "userCircle fa fa-plus-circle collapsed");
			$(this).parent().removeClass('open');
		})
		this.beforeRender();
	}
	componentWillMount() {
		this.beforeRender();
	}
	mouseOut(username) {
		$('#name_' + username).css('color', '#808080');
		$('#list_' + username).css('backgroundColor', '#3b3b3b');
	}
	mouseOver(username) {
		$('#name_' + username).css('color', '#fff');
		$('#list_' + username).css('backgroundColor', '#525252');
	}
	showList(e, username) {
		let oldClass = e.target.className;
		$('.userMenu').each(function(index, el) {
			if ('scripts_' + username != el.id) {
				$(this).removeClass('in');
			}
		});
		$('.userCircle').each(function(i) {
			$(this).attr("class", "userCircle fa fa-plus-circle collapsed");
			$(this).parent().removeClass('open');
		})
		if (oldClass == "userCircle fa fa-plus-circle collapsed") {
			e.target.className = 'userCircle fa fa-minus-circle';
		} else {
			e.target.className = "userCircle fa fa-plus-circle collapsed";
		}
	}
	render() {
		const ulStyle = {
			height: document.documentElement.clientHeight - 80,
		}
		let user_list = this.state.users.map((x, index) => {
			return (
				<div key={index}>
				{localStorage.getItem("username") == 'admin'?
				<div className='listback' id={'list_' + x.username}
             onMouseOut={(e)=>this.mouseOut(x.username)}
             onMouseOver={(e)=>this.mouseOver(x.username)}
              >
		       <i className="userCircle fa fa-plus-circle collapsed"
		       data-toggle="collapse" data-target={'#scripts_' + x.username}
		       onClick={(e)=>this.showList(e,x.username)}></i>
		       <span className="user_name" id={'name_' + x.username}>{x.username}</span>

		       <span className="run_stra_div" title="运行实盘数量">
		          <Icon type="loading" className="text-2x text-info" 
		          style={{ fontSize: 16}}
		          />
		          <span className="run_stra_num">{x.run_stra.length}</span>
		       </span>

		       <span className="user_circle fa fa-circle" title="创建策略数量">
		            &nbsp;
		         	{x.trade.length}
		       </span>

		       </div>:null}
		         <div  style={{width:'100%'}} id={'scripts_' + x.username} 
		         className={localStorage.getItem("username") == 'admin'?"userMenu collapse":"userMenu collapse in"}
		         >
		             <TradeList trade={x.trade} username={x.username} />
                 </div>
             </div>
			);
		});
		return (
			<div>
			    <div className='ulStyle' style={ulStyle}>{user_list}</div>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		update: state.reduUpdateClass,
	};
}

export default connect(mapStateToProps)(TradeUserTree); //,{ alertHide }