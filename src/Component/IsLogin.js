import React, {Component} from 'react'
import AlertApp from './AlertApp'
import $ from 'jquery'
import {connect} from 'react-redux'
import {alertMessage,saveUsertoken} from '../Redux/Action/Action'
import {Login,gateways} from '../Redux/Action/shareAction'
import { browserHistory,hashHistory } from 'react-router'
class IsLogin extends Component {
	componentWillMount(){
		let token =  localStorage.getItem("token");
		if(token != "" && token !=undefined){
			this.props.dispatch(alertMessage('您已登录'));
			hashHistory.push('/TurcAlgo');
		}
		document.body.style.backgroundColor = '#525252'
	}
	componentDidMount() {
		document.body.style.backgroundColor = '#525252'
	}
	componentWillUnmount() {
		document.body.style.backgroundColor = ''
	}
	submitHandler(e) {
		e.preventDefault();
		let username = $("#username").val();
		let password = $("#password").val();

		Login(username, password).then((user) => {
			if (typeof(user) == 'string') {
				this.props.dispatch(alertMessage(user));
			} else {
				localStorage.setItem("token", user.token);
				localStorage.setItem("username", username);
				hashHistory.push('/TurcAlgo');
			}
		})

	}
	register(){
		hashHistory.push('/Register');
	}
	render() {
		return (
	    <div>

		 <div id="login">  
		      <img src={require("../../src/images/logo.png")} style={{width:'140px',height:'140px',margin:'20px 30px 0'}}/>
	          <h4 style={{marginBottom:'10px',color:'#fff'}}>紫金量化交易先锋版<img src={require("../../src/images/logo4.png")} style={{width:'43px',marginLeft:'8px'}}/></h4>
	          <form onSubmit={this.submitHandler.bind(this)}>
	            <div className='form-group'>
	            	<input type="text"  className='form-control' required="required" placeholder="用户名" id='username' style={{backgroundColor: '#666666',color:'#fff'}}></input>  
	            </div>
	            <div className='form-group'>
	            	<input type="password" className='form-control' required="required" placeholder="密码" id='password' style={{backgroundColor: '#666666',color:'#fff'}}></input>
	            </div>  
	            <div className='form-group'>
	                <button className='form-control loginbt'>登录</button>  
	            </div>
	          </form> 
	          <span className='title' onClick={this.register}>还没有账号？<a>立即注册</a></span>
         </div>
         <AlertApp/>
		</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {

	};
}

export default connect(mapStateToProps)(IsLogin);