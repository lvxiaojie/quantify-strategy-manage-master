import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import {
	getStatic,
	getUserList,
	getClasss
} from '../../../Redux/Action/shareAction'
import HisStrategys from './HisStrategys'
import $ from 'jquery'
import Loading from '../../Loading.js'
class HisUserTree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
		}
	}
	componentWillMount() {
		getUserList().then((users) => {
			let staticData = getStatic();
			let trueStras = staticData.trueStras;
			let strategys = staticData.strategys;
			let predictStras = staticData.predictStras;
			for (let x of users) {
				x.trueStras = [];
				x.strategys = [];
				x.predictStras = [];
				for (let y of trueStras) {
					if (y.username == x.username && y.status == 4) {
						x.trueStras.push(y);
					}
				}
				for (let y of strategys) {
					if (y.username == x.username && y.status == 4) {
						x.strategys.push(y);
					}
				}
				for (let y of predictStras) {
					if (y.username == x.username && y.status == 4) {
						x.predictStras.push(y);
					}
				}
			}
			let has_scripts_user = []
			for (let x of users) {
				if (x.trueStras.length + x.strategys.length + x.predictStras.length > 0) {
					has_scripts_user.push(x)
				}
			}
			this.setState({
				users: has_scripts_user,
			})

		})
	}
	mouseOut(username) {
		$('#name_his_' + username).css('color', '#808080');
		$('#list_his_' + username).css('backgroundColor', '#3b3b3b');
	}
	mouseOver(username) {
		$('#name_his_' + username).css('color', '#fff');
		$('#list_his_' + username).css('backgroundColor', '#525252');
	}
	showList(e, username) {

		let oldClass = e.target.className;
		$('.userMenuHis').each(function(index, el) {
			if ('scripts_his_' + username != el.id) {
				$(this).removeClass('in');
			}
		});
		$('.userCircleHis').each(function(i) {
			$(this).attr("class", "userCircleHis fa fa-plus-circle collapsed");
			$(this).parent().removeClass('open');
		})
		if (oldClass == "userCircleHis fa fa-plus-circle collapsed") {
			$('#load_' + username).css("display", 'inline');
			e.target.className = 'userCircleHis fa fa-minus-circle';
			setTimeout(() => {
				this.setState({
					click_name: username
				})
				$('#load_' + username).css("display", 'none');
			})
		} else {
			e.target.className = "userCircleHis fa fa-plus-circle collapsed";
		}

	}
	render() {
		const ulStyle = {
			height: document.documentElement.clientHeight - 80,
		}
		let user_list = this.state.users.map((x, index) => {
			return (
				<div key={index}>
				<div className='listback' id={'list_his_' + x.username}
             onMouseOut={(e)=>this.mouseOut(x.username)}
             onMouseOver={(e)=>this.mouseOver(x.username)}
              >
		       <i className="userCircleHis fa fa-plus-circle collapsed"
		       data-toggle="collapse" data-target={'#scripts_his_' + x.username}
		       onClick={(e)=>this.showList(e, x.username)}></i>
		       <span className="user_name" id={'name_his_' + x.username}>{x.username}</span>
			    <span className="predict_real smallfont his_circle fa fa-circle " title="实盘预测">&nbsp;{x.predictStras.length}</span>
			    <span className="real smallfont his_circle fa fa-circle " title="实盘模拟">&nbsp;{x.strategys.length}</span>
			    <span className="true smallfont his_circle fa fa-circle " title="真实交易">&nbsp;{x.trueStras.length}</span>

			   	<div id={'load_' + x.username}  style={{display:'none',float:'right',marginRight:'10px',lineHeight:'45px'}}>
 				    <Loading size="9px"/>
                 </div>
		       </div>
		         <div  style={{width:'100%'}} id={'scripts_his_' + x.username} className="userMenuHis collapse">
		             <HisStrategys 
		               click = {this.state.click_name == x.username}
		               strategys = {x.strategys}
		               trueStras = {x.trueStras}
		               predictStras = {x.predictStras}/>
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

	};
}

export default connect(mapStateToProps)(HisUserTree); //,{ alertHide }