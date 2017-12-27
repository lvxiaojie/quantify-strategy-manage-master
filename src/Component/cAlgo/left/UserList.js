import React, {
	Component
} from 'react'
import {
	alertMessage,
	saveToChooseDate,
	saveToChooseId,
	RefreshList,
	updateClass,

} from '../../../Redux/Action/Action'
import {
	connect
} from 'react-redux'
import AlertApp from '../../AlertApp'
import {
	getUserList,
	givePermission,
	takeBack,
	deletUser
} from '../../../Redux/Action/shareAction'
import $ from 'jquery'
var _this;
class UserList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			delName: ''

		};
	}
	componentWillReceiveProps() {}
	componentWillMount() {
		// let UserLists=getUserList();
		getUserList().then((data) => {
			for (let i in data) {
				if (data[i].username == 'admin') {
					data.splice(i, 1);
				}
			}
			this.setState({
				users: data
			})
		})
	}
	changetype(type) {
		this.setState({
			type: type
		})
	}
	changeExchange(exchange) {
		this.setState({
			exchange: exchange
		})
	}

	upData() {
		// let UserLists=getUserList();
		getUserList().then((data) => {
			for (let i in data) {
				if (data[i].username == 'admin') {
					data.splice(i, 1);
				}
			}
			this.setState({
				users: data
			})
		})
	}

	give(name, is_zijin, _this) {
		if (is_zijin) {
			_this.props.dispatch(alertMessage('该用户已经获得权限。', 1000));
			return;
		}
		if (givePermission(name, 1)) {
			_this.upData();
			_this.props.dispatch(alertMessage('操作成功！', 1000));
		} else {
			_this.props.dispatch(alertMessage('操作失败！', 1000));

		}
	}
	back(name, is_zijin, _this) {
		if (!is_zijin) {
			_this.props.dispatch(alertMessage('该用户权限已经被收回。', 1000));
			return;
		}
		if (givePermission(name, 0)) {
			_this.upData();
			_this.props.dispatch(alertMessage('操作成功！', 1000));
		} else {
			_this.props.dispatch(alertMessage('操作失败！', 1000));

		}
	}
	delete(_this) {
		if (deletUser(_this.state.delName)) {
			_this.upData();
			_this.props.dispatch(alertMessage('删除成功！', 1000));

		} else {
			_this.props.dispatch(alertMessage('删除失败！', 1000));
		}
	}
	componentDidMount() {}
	render() {
		_this = this;
		const modalStyle = {
			top: '5%',
			left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 300 : '0',
			right: 'auto',
			bottom: 'auto',
			width: document.body.clientWidth > 900 ? 600 : '100%',
		}
		const delmodalStyle = {
			top: '10%',
			left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 200 : '0',
			right: 'auto',
			bottom: 'auto',
			width: document.body.clientWidth > 900 ? 400 : '100%'
		}
		return (

			<div>
				<div style={modalStyle} className="modal fade" id="UserList" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
					<div className="modal-dialog" role="document">
						<div className="modal-content" style={{background:'rgb(51,51,51)',color:'#000'}}>
							<div className="modal-header" style={{borderBottom:"2px solid transparent",background: '#727373',color:'#fff',padding:'12px',borderTopRightRadius:'5px',borderTopLeftRadius: '5px'}}>
								<i type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true" className='closeBtn' style={{fontSize:'20px',cursor:'pointer'}}>&times;</span></i>
								<h5 className="modal-title" id="myModalLabel">用户管理</h5>
								</div>
							<div className="modal-body main_body" style={{color:'#cbcbcb',height:'460px',overflow:'auto'}}>
							    <table className='table table-responsive' id='table' style={{marginBottom:'0'}}>
							    	<thead>
							    		<tr>
								    		<th>用户名</th>
								    		{document.body.clientWidth>900?<th>邮箱</th>:null}
								    		<th>权限</th>
								    		<th>操作</th>
							    	    </tr>
							    	</thead>
							    	<tbody>
							    		{
							    	this.state.users.map(function(x,index){
							    		
							    		return(				    		
							    			<tr key={index}>							    			 
							    				<td>{x.username}</td>
							    				{document.body.clientWidth>900?<td>{x.email}</td>:null}
							    				<td>{x.is_zijin==true?'true':'false'}</td>
							    				<td>
							    					<div className="dropdown">
							    				    <button id="dLabel" className="btn dropdown-toggle userlist_toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							    				    操作<span className="caret"></span></button>
							    				    <ul className="dropdown-menu" aria-labelledby="dLabel" style={{minWidth:'80px',left:'0',backgroundColor:'#3b3b3b'}}>
							    				       <li style={{width:'100px'}} role="presentation" id="user_action">
							    				          <a role="menuitem" tabIndex="-1" onClick={_this.give.bind(null,x.username,x.is_zijin,_this)} onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}}>赋予权限</a>
							    				          <a role="menuitem" tabIndex="-1" onClick={_this.back.bind(null,x.username,x.is_zijin,_this)} onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}}>收回权限</a>
							    				          <a role="menuitem" tabIndex="-1" data-toggle="modal" data-target='#delUser' onClick={(e)=>{_this.setState({delName:x.username})}} onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}}>删除用户</a>
							    				       </li>
							    				    </ul>
							    				</div>
							    				</td>
							    			</tr>
							    			
							    			)
							    	})
							    	
							    }
							    </tbody>
							    </table>
							</div>
{/*							<div className="modal-footer" style={{borderTop:"2px solid transparent"}}>
								<button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
								<button type="button" className="btn btn-primary" data-dismiss="modal">保存</button>
							</div>*/}
						</div>
					</div>
				</div>
	       <div style={delmodalStyle} className="modal fade in" id='delUser'  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="col-md-8 col-sm-12 modal-content" ref="choose" style={{backgroundColor: "#333"}}>
                    <div className="modal-body modalBody">
                    您确定要删除<i style={{color:'#FF6666'}}> {this.state.delName} </i>吗?
                    </div>
                    <div className="modal-footer" style={{borderTop:'0px solid #525252'}}>
                      <button type="button" className="btn btn-default" data-dismiss="modal">关闭
                      </button>
                       <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={_this.delete.bind(null,_this)}>
                        确定
                       </button>
                    </div>
                 </div>
               </div>
           </div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	};
}

export default connect(mapStateToProps)(UserList); //,{ alertHide }