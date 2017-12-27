/*import React,{PropTypes,Component} from 'react'
import {alertMessage,ShowList} from '../../../Redux/Action/Action'
import {connect} from 'react-redux'
import $ from 'jquery'
import {
	getModel,
	downFile,
	editModel,
	uploadImage
} from '../../../Redux/Action/shareAction'
import ReactMarkdown from 'react-markdown';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/monokai';
const topStyle = {
	backgroundColor: '#525252',
	border: '0px solid #525252',
	marginTop: '5px',
	borderRadius:'4px',
	color:'#fff',
	width:'100%'
}
class ShareDetail extends Component{
	constructor(props) {
        super(props);
        this.state = {
         content:'',
         preview: false,
         title:'',
         data:[],
         code:'',
         src:'',
         status:'添加'
        };
    }    
    componentWillReceiveProps(getProp){
		let modelType;
		switch (getProp.api) {
			case 'model_quants':
				modelType = '量化入门';
				break;
			case 'model_objects':
				modelType = '金融数据';
				break;
			case 'model_methods':
				modelType = '量化策略';
				break;
			case 'model_examples':
				modelType = '量化模型';
				break;
			case 'model_mls':
				modelType = '机器学习';
				break;
			default:
				break;
		}
		let data  = getModel(getProp.api,getProp.id);
		this.setState({
			preview:false,
			content: data.content,
			title:data.title,
			data:data,
			code:data.code,
			modelType:modelType
		})
    }
	onMouseOut2(e) {
		e.target.style.backgroundColor = '#292929'
	}
	onMouseOver2(e) {
		e.target.style.backgroundColor = '#6b6b6b'
	}
	downCode() {

	}
	setCaretPosition(caretPos) {
		var textarea = this.refs.text;
		if (textarea !== null) {
			if (textarea.createTextRange) {
				var range = textarea.createTextRange();
				range.move('character', caretPos);
				range.select();
			} else {
				if (textarea.selectionStart) {
					textarea.focus();
					textarea.setSelectionRange(caretPos, caretPos);
				} else {
					textarea.focus();
				}
			}
		}
	}
	getSelection(value) {
		var cursorIndexStart = this.refs.text.selectionStart;
		var cursorIndexEnd = this.refs.text.selectionEnd;
		var selection = value.substring(cursorIndexStart, cursorIndexEnd);
		return {
			cursorIndexStart: cursorIndexStart,
			cursorIndexEnd: cursorIndexEnd,
			selection: selection
		};
	}
	insertAtCursor(e, markdownLeftOrLR, right, _selection, markdownRight, cursorPosOffset) {
		if (e) {
			e.preventDefault();
		}
		var value = this.state.content;
		var selectionProps = this.getSelection(value);
		var cursorIndexStart = selectionProps.cursorIndexStart;
		var cursorIndexEnd = selectionProps.cursorIndexEnd;
		var selection = _selection ? _selection : selectionProps.selection;
		value = value.substring(0, cursorIndexStart) + `${markdownLeftOrLR}${selection.length > 0 ? selection : ''}${right ? markdownRight ? markdownRight :  markdownLeftOrLR : ''}` + value.substring(cursorIndexEnd, value.length);
		this.setState({content:value});
		if (selection.length === 0) {
			setTimeout(() => {
				this.setCaretPosition(cursorIndexStart + markdownRight ? cursorIndexEnd + cursorPosOffset : markdownLeftOrLR.length);
			}, 0);
		}
	}
	handleList(e, ordered) {
		e.preventDefault();
		var list = this.getSelection(this.state.content).selection.split(/\r?\n/);
		var newList = [];
		for (var i = 0; i < list.length; i++) {
			if (list[i].length > 0) {
				newList.push(`${ordered ? i + 1 + '.' : '-'} ${list[i]}`);
			}
		}
		newList = newList.join('\n');
		this.insertAtCursor(null, '', false, newList);
	}
	handleTogglePreview(e) {
		e.preventDefault();
		this.setState({
			preview: !this.state.preview
		});
	}
	exit() {
		this.props.dispatch(ShowList('id'));
	}
	submit() {
		let formdata = new FormData();
		formdata.append('title',this.state.title);
		formdata.append('content',this.state.content);
		formdata.append('code',this.state.code);
		if (editModel(this.props.api, this.props.id,formdata)) {
			this.props.dispatch(alertMessage('提交成功'));
			setTimeout(() => {
				this.setState({
					preview: !this.state.preview
				});
			}, 500)
		} else {
			this.props.dispatch(alertMessage('提交失败'));
		}

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
	chooseImage(e){
		let image = e.target.files[0];
		this.setState({
			src:this.getObjectURL(image)
		})
	}
	insertImage(e) {
		let formdata = new FormData();
		formdata.append('smfile', $('#imageFile').get(0).files[0]);
		this.setState({
			status: '上传中'
		})
		setTimeout(() => {
			let getData = uploadImage(formdata);
			this.insertAtCursor('', '![](' + getData.data.url, true, null, ')', 4);
			this.setState({
				status: '添加'
			})
		}, 100)

	}

	render(){
		var p = this.props;
		var s = this.state;
		let shareHeight = (document.documentElement.clientHeight - 40);
		let aceHeight = shareHeight /2 -60 + 'px';

		const textAreaStyle = {
			width: '100%',
			outline: '0',
			border: '1px solid #767474',
			borderRadius:'4px',
			height: '500px',
			padding: '4px 8px',
			height: aceHeight,
			backgroundColor:'#2d2d2d',
			color:'#fff'
		};
		const buttonStyle = {
			outline: '0',
			border: '1px solid #cccccc',
			margin: '0px 2px',
			padding: '4px 8px',
			cursor: 'pointer',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#FFF',
			marginLeft: '4px',
			lineHeight: '1',
			color: '#000',
			backgroundColor: '#ccc'
		};

		const buttonContainerStyle = {
			marginLeft: '-4px',
			marginBottom: '4px'
		};

		const style = {
			fontSize: '14px !important',
			border: '1px solid lightgray'
		};
		const titleStyle ={
			marginLeft:'32%'
		}
		 const modalStyle = {
			top: '10%',
			left: document.body.clientWidth>900?document.body.clientWidth / 2 - 200:'0',
			right: 'auto',
			bottom: 'auto',
			width:document.body.clientWidth>900?400:'100%',
			color:'#fff'
		}
		return (
		<div  style={topStyle}>
		
	  		<div style={{height:shareHeight,padding:'10px',overflow:'auto',width:'100%'}}>



        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={this.handleTogglePreview.bind(this)}><i className={`fa fa-${s.preview ? 'eye' : 'pencil'}`} /><span style={{marginLeft: '6px'}}>{s.preview ? '预览' : '编辑'}</span></button>
          {s.preview?<button style={buttonStyle} onClick={this.submit.bind(this)}>提交</button> :null}
          <button style={buttonStyle} onClick={(e)=>this.exit()}>退出</button>    
          <i style={{marginLeft:'30%'}}>{this.state.modelType}</i>      
        </div>
        {!s.preview ?
         <h4 style={titleStyle}>{s.title}</h4>
         :
         <div>
         <input style={{marginBottom:'4px',backgroundColor:'#2d2d2d'}} value={s.title} onChange={(e)=>{this.setState({title:e.target.value})}}></input>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={(e)=>this.insertAtCursor(e, '**', true)}><i className="fa fa-bold" /></button>
          <button style={buttonStyle} onClick={(e)=>this.insertAtCursor(e, '_', true)}><i className="fa fa-italic" /></button>
          <button style={buttonStyle} onClick={(e)=>this.insertAtCursor(e, '### ', false)}><i className="fa fa-header" /></button>
          <button style={buttonStyle} onClick={(e)=>this.handleList(e, false)}><i className="fa fa-list" /></button>
          <button style={buttonStyle} onClick={(e)=>this.handleList(e, true)}><i className="fa fa-list-ol" /></button>
          <button style={buttonStyle} onClick={(e)=>this.insertAtCursor(e, '```', true, null, '```', 3)}><i className="fa fa-code" /></button>
          <button style={buttonStyle} onClick={(e)=>this.insertAtCursor(e, '[', true, null, ']()', 3)}><i className="fa fa-link" /></button>
          <button style={buttonStyle} data-toggle="modal" data-target="#insertImage"
           // onClick={(e)=>this.insertAtCursor(e, '![](', true, null, ')', 4)}
           ><i className="fa fa-file-image-o" /></button>
        </div>
        </div>
        }
        <div style={{marginBottom:'4px'}}>
          {!s.preview ?
          <ReactMarkdown
           source={s.content}
           escapeHtml={false}
           />
          :
          <textarea ref="text" style={textAreaStyle} value={s.content} onChange={(e)=>{this.setState({content:e.target.value})}}/>}
        </div>



                 <AceEditor
                    mode="python"	
                    theme="tomorrow_night_eighties"
                    width='100%'
                    height={aceHeight}
                    value = {s.code}
                    onChange={(value)=>{this.setState({code:value})}}
                    editorProps={{$blockScrolling: true}}
                  />


                  
				<div style={modalStyle} className="modal fade" id="insertImage" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
					<div className="modal-dialog">
						<div className="col-md-10 col-xs-12 modal-content" ref="choose" style={{backgroundColor: "#333"}}>
							<div className="modal-body">

							<i style={buttonStyle} className="file">选择图片
							<input style={{width:'100%',cursor:'pointer'}} id="imageFile" type="file" onChange={(e)=>this.chooseImage(e)} accept="image/gif,image/jpeg,image/jpg,image/png"/>
						    </i>&nbsp;
						    <i style={buttonStyle} onClick={(e)=>{this.setState({src:''})}}>清空
							</i>

							<img style={{width:'100%',marginTop:'8px'}}
							src={this.state.src}
							></img>			 

							</div>
							<div className="modal-footer" style={{borderTop:'0px solid #525252',paddingTop:'0px'}}>
								<button type="button" className="btn btn-default" data-dismiss="modal">关闭
								</button>
								<button  onClick={(e)=>this.insertImage(e)} type="button" className="btn btn-primary" ref='btnStr' data-dismiss="modal">
									{this.state.status}
								</button>
							</div>
						</div>
					</div>
				</div>
           
		</div>
</div>
		)
	}
}
const mapStateToProps =(state)=>{
return {
	id: state.reduToShowModel._id,
	api:state.reduToShowModel.api
};
}
const mapDispatchToProps =(dispatch)=>{
	return {
		
	};
}
export default connect(mapStateToProps)(ShareDetail);
*/