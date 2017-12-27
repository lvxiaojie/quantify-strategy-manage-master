import React, {
	Component
} from 'react'
import {
	alertMessage,
	saveToChooseDate,
	saveToChooseId,
	RefreshList,
	updateClass,
	showMyCode,
	ShowList
} from '../../../Redux/Action/Action'
import {
	connect
} from 'react-redux'
import AlertApp from '../../AlertApp'
import {
	addClass,
	getStatic
} from '../../../Redux/Action/shareAction'
import $ from 'jquery'
let Prop;
class ChildComponent extends Component {
	componentWillReceiveProps(nextProps) {}
	delFormat(e) {
		if ($('.predict_format_code').length > 1) {
			$('#predict_format_code' + this.props.number).remove();
		} else {
			Prop.dispatch(alertMessage('至少保留一组'));
		}
	}
	render() {
		return (
			<div style={{marginTop:'5px'}} className='predict_format_code' id={'predict_format_code' + this.props.number}>
                     	<input type='text' required="required" className = 'format_name' placeholder='预测变量 *'></input>
                     	<input type='text' required="required" className = 'format_type' placeholder='变量类型 *'></input>
                     	<input type='text' required="required" className = 'format_information' placeholder='预测内容 *'></input>
                     	<i className="fa fa-remove" onClick={(e)=>this.delFormat(e)}></i>
                     </div>
		)
	}
}
class AddPredict_Code extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numChildren: 1
		};
	}
	componentWillReceiveProps(nextProps) {
		// console.log(nextProps)
	}

	add(e) {

		e.preventDefault();
		// jQuery('#addPredict_code').modal({show: 'false'})

		let note_code = '# coding=utf-8\n';
		note_code += '""" \n';
		note_code += '@author: ' + localStorage.getItem("username") + '\n';
		note_code += '@predict format:\n[\n'

		// {'name': 'high', 'type': 'float', information: 'high value'},
		$('.predict_format_code').each(function(i) {
			let name = $(this).find('.format_name').val();
			let type = $(this).find('.format_type').val();
			let information = $(this).find('.format_information').val();

			note_code += '\t{';
			note_code += '\'name\': ' + '\'' + name + '\',';
			note_code += ' \'type\': ' + '\'' + type + '\',';
			note_code += ' information: ' + '\'' + information + '\'';
			note_code += '},\n';

		})

		note_code += ']\n"""\n';

		// let staticData = getStatic();
		// staticData.predict_demo = note_code + staticData.predict_demo_code;

		this.props.dispatch(showMyCode('predict'));
		this.props.dispatch(ShowList('myCode'));

		$('#addPredict_code').css('display', 'none');
		$('#addPredict_code').removeClass('in');
		$('.modal-backdrop').eq(0).remove();



	}
	addFormat(e) {
		this.setState({
			numChildren: this.state.numChildren + 1
		});
	}
	close() {
		$('#addPredict_code').css('display', 'none');
		$('#addPredict_code').removeClass('in');
	}
	render() {
		const modalStyle = {
			top: '10%',
			left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 200 : '0',
			right: 'auto',
			bottom: 'auto',
			width: document.body.clientWidth > 900 ? 400 : '100%'
		}
		Prop = this.props;
		const children = [];

		for (let i = 0; i < this.state.numChildren; i++) {
			children.push(<ChildComponent key={i} number={i}/>);
		};

		return (
			<form style={{color:'#fff'}} onSubmit={(e)=>this.add(e)}>
				<div style={modalStyle} className="modal fade" id="addPredict_code" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
					<div className="modal-dialog">
						<div className="col-md-8 col-xs-12 modal-content" ref="choose" style={{backgroundColor: "#333"}}>
							<div className="modal-body">
						

                         <div>
                         预测格式                      
                         <i className="fa fa-plus" style={{marginLeft:'2%',cursor:'pointer'}} 
                    onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}}
                    onClick={(e)=>this.addFormat(e)}></i>
                         {children}
                         </div>
                    



							</div>
							<div className="modal-footer" style={{borderTop:'0px solid #525252',paddingTop:'0px'}}>
								<button type="button" className="btn btn-default" data-dismiss="modal"
								onClick={(e)=>this.close()}
								>关闭
								</button>
								<button  type="button" type="submit" className="btn btn-primary" ref='btnStr' 
								// data-dismiss="modal" 
								>
									确认
								</button>
							</div>
						</div>
					</div>
				</div>
		</form>
		)
	}
}
const mapStateToProps = (state) => {
	return {

	};
}

export default connect(mapStateToProps)(AddPredict_Code); //,{ alertHide }