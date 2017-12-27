import React, {
	Component
} from 'react'
import {
	alertMessage,
	saveToChooseDate,
	saveToChooseId,
	RefreshList,
	updateClass
} from '../../../Redux/Action/Action'
import {
	connect
} from 'react-redux'
import AlertApp from '../../AlertApp'
import {
	addClass,
} from '../../../Redux/Action/shareAction'
import $ from 'jquery'
let Prop;
class ChildComponent extends Component {
	componentWillReceiveProps(nextProps) {}
	delFormat(e) {
		if ($('.predict_format').length > 1) {
			$('#predict_format' + this.props.number).remove();
		} else {
			Prop.dispatch(alertMessage('至少保留一组'));
		}
	}
	render() {
		return (
			<div style={{marginTop:'5px'}} className='predict_format' id={'predict_format' + this.props.number}>
                     	<input type='text' required="required" className = 'format_name' placeholder='预测变量 *'></input>
                     	<input type='text' required="required" className = 'format_type' placeholder='变量类型 *'></input>
                     	<input type='text' required="required" className = 'format_information' placeholder='预测内容 *'></input>
                     	<i className="fa fa-remove" onClick={(e)=>this.delFormat(e)}></i>
                     </div>
		)
	}
}
class AddPredict extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numChildren: 1
		};
	}
	componentWillReceiveProps() {}

	add(e) {
		e.preventDefault();
		let formatJson = [];
		$('.predict_format').each(function(i) {
			let name = $(this).find('.format_name').val();
			let type = $(this).find('.format_type').val();
			let information = $(this).find('.format_information').val();
			formatJson.push({
				name: name,
				type: type,
				information: information
			})
		})
		formatJson = JSON.stringify(formatJson);
		// return;
		let formdata = new FormData();
		formdata.append('mode', 'predict');
		formdata.append('name', $(" #predict_name ").val());
		if ($(" #predict_code ")[0].files[0] != undefined) {
			formdata.append('code', $(" #predict_code ")[0].files[0]);
		}
		formdata.append('predict_format', formatJson);


		addClass(formdata).then((data) => {
			this.props.dispatch(updateClass());
			this.props.dispatch(alertMessage('添加成功', 2000));
			$('#addPredict').hide();
			$('.modal-backdrop').eq(0).remove();
		}, (result) => {
			this.props.dispatch(alertMessage(result, 60000));
		})


	}
	addFormat(e) {
		this.setState({
			numChildren: this.state.numChildren + 1
		});
	}
	render() {
		Prop = this.props;
		const children = [];

		for (let i = 0; i < this.state.numChildren; i++) {
			children.push(<ChildComponent key={i} number={i}/>);
		};

		const input = {
			// width:'auto',
			boxShadow: 'none',
			backgroundColor: '#333',
			border: '2px solid #333',
		}
		const modalStyle = {
			top: '10%',
			left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 200 : '0',
			right: 'auto',
			bottom: 'auto',
			width: document.body.clientWidth > 900 ? 400 : '100%',
			color: '#fff'
		}
		return (
			<form onSubmit={(e)=>this.add(e)}>
				<div style={modalStyle} className="modal fade" id="addPredict" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
					<div className="modal-dialog">
						<div className="col-md-8 col-xs-12 modal-content" ref="choose" style={{backgroundColor: "#333"}}>
							<div className="modal-body">
						

                    <input type='text' required="required" style={{width:"91%",marginBottom:'5px',display:'inline'}} id="predict_name" placeholder='预测代码名 *'></input>


                         <div className='predict_format_list'>
                         预测格式                    
                         <i className="fa fa-plus" style={{marginLeft:'2%',cursor:'pointer'}} 
                    onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}}
                    onClick={(e)=>this.addFormat(e)}></i>
                         {children}
                         </div>
                    

                     <div style={{marginTop:'5px'}}>
                          预测代码*
                            <input required="required" type="file" style={input} id="predict_code"></input>
                     </div>

							</div>
							<div className="modal-footer" style={{borderTop:'0px solid #525252',paddingTop:'0px'}}>
								<button type="button" className="btn btn-default" data-dismiss="modal">关闭
								</button>
								<button  type="button" type="submit" className="btn btn-primary" ref='btnStr'
								 // data-dismiss="modal" onClick={this.add.bind(this)}
								 >
									添加
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

export default connect(mapStateToProps)(AddPredict); //,{ alertHide }