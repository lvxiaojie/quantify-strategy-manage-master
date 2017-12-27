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
class AddTrade extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPredict: false
		};
	}
	componentWillReceiveProps() {}

	add(e) {
		e.preventDefault();
		let formdata = new FormData();
		formdata.append('mode', 'trade');
		formdata.append('name', $(" #script_name ").val());
		formdata.append('code', $(" #script_code ")[0].files[0]);
		addClass(formdata).then((data) => {
			this.props.dispatch(updateClass());
			this.props.dispatch(alertMessage('添加成功', 2000));
			$('#myModal3').hide();
			$('.modal-backdrop').remove();
		}, (result) => {
			this.props.dispatch(alertMessage(result, 60000));
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
	render() {

		const input = {
			// width:'auto',
			backgroundColor: '#333',
			border: '2px solid #333',
			boxShadow: 'none'
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
			<div >
				<form onSubmit={(e)=>this.add(e)} style={modalStyle} 
				className="modal fade"
				id="myModal3" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
					<div className="modal-dialog">
						<div className="col-md-8 col-xs-12 modal-content" ref="choose" style={{backgroundColor: "#333"}}>
							<div className="modal-body">
						

                    <input type="text" required="required" style={{width:"90%"}} id="script_name" placeholder='交易策略名 *'></input>
                     <br/>
                     <div>
                          策略代码*
                            <input required="required" type="file" style={input} id="script_code"></input>
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
				</form>
		</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {

	};
}

export default connect(mapStateToProps)(AddTrade); //,{ alertHide }