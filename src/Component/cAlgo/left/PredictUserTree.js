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
import {
    Icon,
} from 'antd';
import PredictList from './PredictList'
import $ from 'jquery'
class PredictUserTree extends Component {
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
				for (let i in users) {
					users[i].predict = [];
					for (let j in scripts) {
						if (users[i].username == scripts[j].username) {
							if (scripts[j].mode == 'predict') {
								users[i].predict.push(scripts[j]);
							}
						}
					}
					users[i].run_stra = [];
					for(let x of allstra){
						if (users[i].username === x.username && x.status === 2 && x.script_mode === 'predict') {
								users[i].run_stra.push(x);
						}
					}
				}
				let has_scripts_user = []
				for (let i in users) {
					if (users[i].predict.length != 0) {
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
        $('.userPredictCircle').each(function(i) {
            $(this).attr("class", "userPredictCircle fa fa-plus-circle collapsed");
            $(this).parent().removeClass('open');
        })
		this.beforeRender();
	}
	componentWillMount() {
		this.beforeRender();
	}
	mouseOut(username) {
		$('#name_predict_' + username).css('color', '#808080');
		$('#list_predict_' + username).css('backgroundColor', '#3b3b3b');
	}
	mouseOver(username) {
		$('#name_predict_' + username).css('color', '#fff');
		$('#list_predict_' + username).css('backgroundColor', '#525252');
	}
	showList(e,username){
		let oldClass = e.target.className;
        $('.userPredictMenu').each(function(index, el) {
            if('scripts_predict_' + username != el.id){
                $(this).removeClass('in');
            }
        });
        $('.userPredictCircle').each(function(i) {
            $(this).attr("class", "userPredictCircle fa fa-plus-circle collapsed");
            $(this).parent().removeClass('open');
        })
		if(oldClass == "userPredictCircle fa fa-plus-circle collapsed"){
		    e.target.className = 'userPredictCircle fa fa-minus-circle';
		}else{
			e.target.className = "userPredictCircle fa fa-plus-circle collapsed";
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
				<div className='listback' id={'list_predict_' + x.username}
             onMouseOut={(e)=>this.mouseOut(x.username)}
             onMouseOver={(e)=>this.mouseOver(x.username)}
              >
		       <i className="userPredictCircle fa fa-plus-circle collapsed"
		       data-toggle="collapse" data-target={'#scripts_predict_' + x.username}
		       onClick={(e)=>this.showList(e,x.username)}></i>
		       <span className="user_name" id={'name_predict_' + x.username}>{x.username}</span>
		      {x.run_stra.length>0? <span className="run_stra_div" title="运行实盘数量">
		          <Icon type="loading" className="text-2x text-info" 
		          style={{ fontSize: 16}}
		          />
		          <span className="run_stra_num">{x.run_stra.length}</span>
		       </span>:null}
		       <span className="user_circle fa fa-circle" title="创建策略数量">
		            &nbsp;
		         	{x.predict.length}
		       </span>
		       </div>:null}
		         <div  style={{width:'100%'}} id={'scripts_predict_' + x.username} 
		         className={localStorage.getItem("username") == 'admin'?"userPredictMenu collapse":"userPredictMenu collapse in"}
		         >
		             <PredictList predict={x.predict} username={x.username} />
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

export default connect(mapStateToProps)(PredictUserTree); //,{ alertHide }