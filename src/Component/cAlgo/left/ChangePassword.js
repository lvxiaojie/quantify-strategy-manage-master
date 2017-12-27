import React,{Component} from 'react'
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
changePass
} from '../../../Redux/Action/shareAction'
import $ from 'jquery'
var _this;
class ChangePassword extends Component{
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentDidMount() {
	}
	change(e){
		e.preventDefault();
		let old_pass = $('#old_password').val();
		let new_pass = $('#new_password').val();
		let cfm_pass = $('#cfm_password').val();
		if(new_pass != cfm_pass){
			this.props.dispatch(alertMessage('两次输入密码不相同',1000));
			return;
		}else{
			changePass(localStorage.getItem("username"),old_pass,new_pass).then((status)=>{
				if(status == 201){
					this.props.dispatch(alertMessage('修改成功',1000));
				}else{
					this.props.dispatch(alertMessage('修改失败',1000));
				}
			})
		}
	}
	render(){
		 _this = this;
		 const modalStyle = {
			top: '5%',
			left: document.body.clientWidth>900?document.body.clientWidth / 2 - 150:'0',
			right: 'auto',
			bottom: 'auto',
			width:document.body.clientWidth>900?300:'100%',
		}
		const input_style = {
			width: "80%",
			marginBottom: '5px',
			display: 'inline',
			marginLeft:'10%',
			marginTop:'5px'
		}
		return(
			<form onSubmit={(e)=>this.change(e)}>
				<div style={modalStyle} className="modal fade" id="changePassword" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
					<div className="modal-dialog" style={{width:'100%'}} role="document">
						<div className="modal-content" style={{background:'rgb(51,51,51)',color:'#000'}}>
							<div className="modal-header" style={{borderBottom:"2px solid transparent",background: '#727373',color:'#fff',padding:'12px',borderTopRightRadius:'5px',borderTopLeftRadius: '5px'}}>
								<i type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span className='closeBtn' aria-hidden="true" style={{fontSize:'20px',cursor:'pointer'}}>&times;</span></i>
								<h5 className="modal-title" id="myModalLabel">修改密码</h5>
								</div>
							<div className="modal-body main_body" style={{color:'#cbcbcb',height:'auto',overflow:'auto',paddingBottom:'0px'}}>
							    <input type='password' required="required" style={input_style} id="old_password" placeholder='请输入旧密码'></input>
							    <input type='password' required="required" style={input_style} id="new_password" placeholder='请输入新密码'></input>
							    <input type='password' required="required" style={input_style} id="cfm_password" placeholder='请确认新密码'></input>
							</div>
							<div className="modal-footer" style={{borderTop:"2px solid transparent"}}>
								<button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
								<button type="button" type="submit" className="btn btn-primary" 
								// data-dismiss="modal"
								>修改</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			)
	}
}

const mapStateToProps =(state)=>{
 return{
	
	};
}

export default connect(mapStateToProps)(ChangePassword);//,{ alertHide }