import React, {
	Component
} from 'react'
import {
	alertMessage
} from '../../../Redux/Action/Action'
import {
	connect
} from 'react-redux'
import $ from 'jquery'
import {
	getStatic,
	gateways,
	changeFee,
} from '../../../Redux/Action/shareAction'
import Loading from '../../Loading.js'
const choose = {
	color: "#fff",
}
const choosedate = {
	border: '2px solid #525252',
	borderRadius: '2px',
	cursor: "pointer",
}
let exchange_list = ['CTP', 'CSRPME', 'OKCoin'];
let old = [];
class ChangeFee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			exchange: 'CTP',
			open_commission_rate: '',
			close_commission_rate: '',
			showFlag: true
		};
	}
	componentWillMount() {
			// this.getFee('CTP');
			let exchange = 'CTP'
			gateways(exchange).then((data) => {
				old.open_commission_rate = data.open_commission_rate;
				old.close_commission_rate = data.close_commission_rate;
				this.setState({
					showFlag: true,
					exchange: exchange,
					open_commission_rate: data.open_commission_rate,
					close_commission_rate: data.close_commission_rate
				})
			}, (err) => {
				// console.log(err)
				this.setState({
					showFlag: true,
					exchange: exchange,
					open_commission_rate: '',
					close_commission_rate: ''
				})
			})
	}
	getFee(exchange) {
		// this.setState({
		// 	showFlag: false
		// })
		let data = getStatic().fee[exchange];
		this.setState({
			// showFlag: true,
			exchange: exchange,
			open_commission_rate: data.open_commission_rate,
			close_commission_rate: data.close_commission_rate
		})

	}
	componentWillReceiveProps(getProp) {

	}
	changeExchange(e) {
		this.getFee(e.target.value);
	}
	change() {
		changeFee(this.state.exchange, this.state.open_commission_rate, this.state.close_commission_rate).then((data) => {
			old.open_commission_rate = this.state.open_commission_rate;
			old.close_commission_rate = this.state.close_commission_rate;
			this.props.dispatch(alertMessage(data, 2000));
		}, (rejected) => {
			this.props.dispatch(alertMessage('网络错误', 2000));
		})
	}
	close() {
		this.setState({
			open_commission_rate: old.open_commission_rate,
			close_commission_rate: old.close_commission_rate
		})
	}
	componentDidMount() {

	}
	render() {
		const modalStyle = {
			top: '10%',
			left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 200 : '0',
			right: 'auto',
			bottom: 'auto',
			width: document.body.clientWidth > 900 ? 400 : '100%'
		}
		const backColor = {
			backgroundColor: '#525252',
			color: "#fff",
			width: '100px',
		}
		return (
			<div>
				<div style={modalStyle} className="modal fade" id="changeFee"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
					<div className="modal-dialog" style={{width:'100%'}}>
						<div className="modal-content" ref="choose" style={{backgroundColor: "#333"}}>
							<div id='fee_body' className="modal-body" style={{color:'#fff'}}>

                                <select disabled={!this.state.showFlag} style={backColor}  id='fee_exchange'  onChange={(e)=>this.changeExchange(e)}>
					              <option>CTP</option>
					              <option>CSRPME</option>
					              <option>OKCoin</option>
				                </select>

                            {this.state.showFlag?

							    <div>
                                  <span><i>开仓手续费率</i><input type="number" value={this.state.open_commission_rate} onChange={(e)=>{this.setState({open_commission_rate:e.target.value})}}></input></span><br/>
                                  <span><i>平仓手续费率</i><input type="number" value={this.state.close_commission_rate} onChange={(e)=>{this.setState({close_commission_rate:e.target.value})}}></input></span>
                                </div>
                                :
                               <div style={{marginLeft:'120px',marginTop:'10px'}}>
                                         <Loading />
                               </div>

                              }

							</div>
							<div className="modal-footer" style={{borderTop:'0px solid #525252',paddingTop:'0px'}}>
								<button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.close.bind(this)}>关闭
								</button>
								{localStorage.getItem("username")=='admin'?
								<button disabled={!this.state.showFlag} type="button" className="btn btn-primary" ref='btnStr' onClick={this.change.bind(this)}>
									修改
								</button>
								:null}
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

export default connect(mapStateToProps)(ChangeFee); //,{ alertHide }