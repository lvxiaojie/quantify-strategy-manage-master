import React, {
	PropTypes,
	Component
} from 'react'
import {
	ShowList,
	updateClass,
	alertMessage
} from '../../../Redux/Action/Action'
import {
	connect
} from 'react-redux'
import $ from 'jquery'
import {
	getScripts,
	downFile,
	addClass,
	getStatic,
	pathCode
} from '../../../Redux/Action/shareAction'
import brace from 'brace';
import AceEditor from 'react-ace';
import AddPredict_Code from './AddPredict_Code'
import 'brace/mode/python';

const topStyle = {
	backgroundColor: '#525252',
	border: '0px solid #525252',
	marginTop: '-30px',
	borderRadius: '4px',
	color: '#fff',
	width: '100%'
}


class Code extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: '',
			name: '',
			theme: 'tomorrow_night_eighties',
			mdoe: '',
			id:''
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.id != '') {
			getScripts(nextProps.id).then((data) => {
				this.setState({
					name: data.name,
					code: data.code,
					mode: data.mode,
					id:   data.id
				})
			},(reject)=>{
				this.props.dispatch(alertMessage('获取失败', 1000));
			})
		} else {}
	}
	componentDidUpdate() {

	}
	downCode() {
		let text = this.state.code;
		let name = this.state.name;
		downFile(text, name + '.py');
	}
	exit() {
		this.props.dispatch(ShowList('id'));
	}
	handleChange(newValue) {
		this.setState({
			code: newValue
		});
	}
	changeTheme(e) {
		let theme = e.target.value;
		if (theme == 'night') {
			theme = 'tomorrow_night_eighties';
		}
		this.setState({
			theme: theme
		});
	}
	getObjectURL(file) {
		var url = null;
		if (window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(file);
		} else if (window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if (window.webkitURL != undefined) { // webkit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	}
	pathCode() {
		let file = new Blob([this.state.code])
		let formdata = new FormData();
		formdata.append('mode', this.state.mode);
		formdata.append('name', this.state.name);
		formdata.append('code', file);
		pathCode(formdata,this.state.id).then((data) => {
			this.props.dispatch(updateClass());
			this.props.dispatch(alertMessage('更新成功', 1000));
		}, (reject) => {
			this.props.dispatch(alertMessage(reject.responseText, 10000));
		})
	}

	render() {
		const btnBg = {
			backgroundColor: '#292929',
			color: '#fff',
			border: '0px solid #525252',
			float: 'right',
			height: '30px',
			marginBottom: '5px',
			borderRadius: '2px',
		}
		const code_name = {
			width: 'auto',
			marginLeft: '10%',
			display: 'inline',
			marginBottom: '5px',
			height: '30px',
			backgroundColor: '#292929'
		}
		let CodeHeight = (document.documentElement.clientHeight - 45 + 35) + 'px';
		let aceHeight = (document.documentElement.clientHeight - 95 + 35) + 'px';
		const style = {
			fontSize: '14px !important',
			border: '1px solid lightgray'
		};
		return (
			<div style={topStyle}>
		
	  		<div style={{height:CodeHeight,overflow: 'hidden',padding:'10px',color:'#fff'}}>

                    <div style={{width:'100%'}}>

                     <div style={{float:'left',marginLeft:'0%'}}>
                     <b style={{lineHeight:'30px'}}></b>
                    Theme<select style={btnBg}  onChange={this.changeTheme.bind(this)}>
                     <option>night</option>
	                 <option>monokai</option>
	                 <option>github</option>
	                 <option>xcode</option>
	                 <option>textmate</option>
	                 <option>terminal</option>
                    </select>
                    </div>

                    <b style={{marginLeft:'25%',lineHeight:'30px'}}>{this.state.name}</b>
{/*                    <input type='text' value={this.state.name} id="code_name" placeholder='输入代码名'
                     style={code_name} onChange={(e)=>this.setState({name:e.target.value})}></input>*/}
                    <button 
                    onMouseOut={(e)=>{e.target.style.backgroundColor = '#292929'}} 
                    onMouseOver={(e)=>{e.target.style.backgroundColor = '#6b6b6b'}}
                    className='btn btn-default smallfont' 
                    onClick={this.exit.bind(this)} style={btnBg} >退出
                    </button>


                    <button 
                    onMouseOut={(e)=>{e.target.style.backgroundColor = '#292929'}}
                    onMouseOver={(e)=>{e.target.style.backgroundColor = '#6b6b6b'}} 
                    className='btn btn-default smallfont' 
                    onClick={this.downCode.bind(this)} style={btnBg} >导出代码
                    </button>

                    <button 
                    onMouseOut={(e)=>{e.target.style.backgroundColor = '#292929'}}
                    onMouseOver={(e)=>{e.target.style.backgroundColor = '#6b6b6b'}} 
                    className='btn btn-default smallfont' 
                    onClick={this.pathCode.bind(this)} style={btnBg} >更新代码
                    </button>

                    </div>
            
               		<AceEditor
               		width='100%'
                    mode="python"	
                    theme={this.state.theme}
                    height={aceHeight}
                    value = {this.state.code}
                    onChange={this.handleChange.bind(this)}
                    name={this.state.name}
                    editorProps={{$blockScrolling: true}}
                    enableLiveAutocompletion={true}
                    enableBasicAutocompletion={true}
                  />
                   
			    </div>

		</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		id: state.reduToShowCode
	};
}
const mapDispatchToProps = (dispatch) => {
	return {

	};
}
export default connect(mapStateToProps)(Code);