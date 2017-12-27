import React, {
	Component
} from 'react'
import $ from 'jquery'
import {
	connect
} from 'react-redux'
import {
	hashHistory
} from 'react-router';
import {
	alertMessage,
} from '../Redux/Action/Action'

import {
	register
} from '../Redux/Action/shareAction'
import AlertApp from './AlertApp'
var Register = React.createClass({
	getInitialState() {
		return {
			display: 'none',
			display1: 'none',
			display2: 'none',
			display3: 'none',
			display4: 'none',
			content: '两次输入密码不相同',
			contentEmail: '邮箱不能为空！'

		};
	},
	login() {
		hashHistory.push('/Login');
	},
	regist: function(e) {
		e.preventDefault();
		let userName = $('#userName').val();
		let userEmail = $('#userEmail').val();
		let userPassword = $('#userPassword').val();
		let confirmPassword = $('#confirmPassword').val()

		if (userPassword != confirmPassword) {
			this.props.dispatch(alertMessage('两次输入密码不相同'));
			return;
		}
		var reg = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i;
		if (!reg.test(userEmail)){
			this.props.dispatch(alertMessage('请输入合法邮箱!'));
			return;
		}
		register(userName, userEmail, userPassword, $('#inviteCode').val()).then((data) => {
			this.props.dispatch(alertMessage('注册成功!'));
			setTimeout(() => {
				hashHistory.push('/Login');
			}, 1000)
		}, (rejected) => {
			this.props.dispatch(alertMessage('注册失败!' + rejected.responseText));
		})
	},
	confirm(e) {
		// console.log(e.target.value)
		if (e.target.value == '') {
			this.setState({
				display: 'block'
			})
		} else {
			this.setState({
				display: 'none'
			})
		}

	},
	confirm1(e) {
		var reg = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i;

		if (e.target.value == '') {
			this.setState({
				display1: 'block'
			})
		} else if (!reg.test(e.target.value)) {
			this.setState({
				display1: 'block',
				contentEmail: '请输入合法邮箱！'
			})
		} else {
			this.setState({
				display1: 'none'
			})
		}

	},
	confirm2(e) {

		let userPassword = $('#userPassword').val();

		if (userPassword.length < 6 || userPassword.length > 15 || e.target.value == '') {
			this.setState({
				display2: 'block'

			})
		} else {
			this.setState({
				display2: 'none'
			})
		}
	},
	confirm3(e) {
		let userPassword = $('#userPassword').val();
		let confirmPassword = $('#confirmPassword').val();
		if (e.target.value == '') {
			this.setState({
				display3: 'block',
				content: '请输入确认密码！'
			})
		} else if (userPassword != confirmPassword) {
			this.setState({
				display3: 'block',
				content: '两次输入密码不相同！'
			})
		} else {
			this.setState({
				display3: 'none'
			})
		}

	},
	confirm4: function(e) {
		if (e.target.value == '') {
			this.setState({
				display4: 'block',
			})
		} else {
			this.setState({
				display4: 'none',
			})
		}
	},
	componentWillMount: function() {
		document.body.style.backgroundColor = '#525252'
	},
	render: function() {
		// body...
		return (
			<div>
			<form id='register' onSubmit={this.regist} className='form-horizontal'>
		
				<div className='form-group'>
					<div className="col-sm-8">
						<input type="text" className="form-control" placeholder="请输入用户账号" id='userName' required="required" style={{backgroundColor: '#666666',color:'#fff'}} onBlur={this.confirm}/>
					</div>
					<lable className="col-sm-4 control-label" style={{textAlign:'left',display:this.state.display,color:'#d06161'}} id="userNameTitle">用户名不能为空</lable>
				</div>
				<div className='form-group'>
				    <div className="col-sm-8">
				        <input type='email' className="form-control" placeholder='请输入邮箱' id='userEmail' required="required" style={{backgroundColor: '#666666',color:'#fff'}} onBlur={this.confirm1}/>
				    </div>
					<lable className="col-sm-4 control-label" style={{textAlign:'left',display:this.state.display1,color:'#d06161'}}>{this.state.contentEmail}</lable>
				</div>
				<div className='form-group'>
					<div className="col-sm-8">
						<input type='password' className="form-control" placeholder='请输入密码（6-15位)' id='userPassword' maxLength='15' required="required" style={{backgroundColor: '#666666',color:'#fff'}} onBlur={this.confirm2}/>
					</div>
					
					<lable className="col-sm-4 control-label" style={{textAlign:'left',display:this.state.display2,color:'#d06161'}}>密码长度6-15位</lable>
					
				</div>
				<div className='form-group'>
				    <div className="col-sm-8">
				    	<input type='password' className="form-control" placeholder='确认密码' required="required" id='confirmPassword' style={{backgroundColor: '#666666',color:'#fff'}} onBlur={this.confirm3}/>
				    </div>
				    <lable className="col-sm-4 control-label" style={{textAlign:'left',display:this.state.display3,color:'#d06161'}} id="confirmPass">{this.state.content}</lable>					
				</div>
				<div className='form-group'>
				    <div className="col-sm-8">
				    	<input type='text' className="form-control" placeholder='邀请码' required="required" id='inviteCode' style={{backgroundColor: '#666666',color:'#fff'}} onBlur={this.confirm4}/>
				    </div>
				    <lable className="col-sm-4 control-label" style={{textAlign:'left',display:this.state.display4,color:'#d06161'}} id="confirmPass">请联系管理员获取邀请码</lable>					
				</div>
				<div className="form-group">
					<div className=" col-sm-8"><button type="submit" className="form-control loginbt">注册</button></div>
					<div className="col-sm-4"></div>
				</div>	
				<div className="col-sm-8">
					<span className='title'>已有账号？<a onClick={this.login}>立即登录</a></span>
				</div>			
						
			</form>
				<AlertApp/>	
			</div>
		)
	}
})

const mapStateToProps = (state) => {
	return {

	};
}

export default connect(mapStateToProps)(Register); //,{ alertHide }