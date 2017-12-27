import React, {
	Component
} from 'react'
import {
	alertMessage,
	saveToChooseDate,
	saveToChoose,
	saveToChooseId,
	showDataTitle,
	saveToChoose3,
	showLoading
} from '../../../Redux/Action/Action'
import {
	connect
} from 'react-redux'
import $ from 'jquery'
import {
	getStra,
	idGetStra,
	statusToChinese,
	getDateList,
	getTransaction,
	getNextDay,
	makeData,
	getSortFun,
	strategyAction,
	delStrategy,
	getStrategy,
	getData
} from '../../../Redux/Action/shareAction'

const astyle = {
	color: "#fff",
	// textDecoration: 'none',
	cursor: "pointer",
	display: 'inline-block'
}
const dropdown = {
	position: 'relative',
	display: 'inline-block',
}
const dropdownContent = {
	position: 'absolute',
	backgroundColor: '#f9f9f9',
	// minWidth: '160px',
	boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
	padding: '5px 16px',
	backgroundColor: '#525252',
	height: "240px",
	overflow: "auto",
}
const choose = {
	color: "#fff",
}
const choosedate = {
	border: '2px solid #525252',
	borderRadius: '2px',
	cursor: "pointer",
}
class ChooseTime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			datelist: [],
			date: '',
		};
	}
	componentWillReceiveProps(getProp) {
		let id = getProp.chooseStrategy.id;
		let DateList = getDateList(id);
		if (DateList.length == 0) {
			// this.props.dispatch(alertMessage('没有日期数据', 'danger'));
			this.setState({
				datelist: [],
				date: ''
			});
		} else {
			this.setState({
				datelist: DateList,
				date: DateList[0]
			});
		}
	}
	getTrue(e) {
		this.props.dispatch(showLoading(true));
		if (this.state.datelist.length == 0) {
			return;
		}
		let chooseDate = this.state.date;
		this.props.dispatch(saveToChooseDate(chooseDate));
		this.props.dispatch(saveToChooseId(this.props.chooseStrategy.id));
		this.props.dispatch(saveToChoose3(this.props.chooseStrategy));
		let title = [];
		title = {
			Strategy: this.props.chooseStrategy,
			date: chooseDate
		};
		this.props.dispatch(showDataTitle(title));
		$('#MarketChart').removeClass('active');
		$('#RunChart').addClass('active');
		$(".rightTable a").each(function(index, el) {
			if (index == 1) {
				$(this).css('backgroundColor', '#525252');
			} else {
				$(this).css('backgroundColor', '#292929');
			}

		});
		// setTimeout(() => {

		// }, 1000);
	}
	handleGenderChange(event) {
		let value = event.target.value;
		let value2 = this.refs.choosedate.value;
		// value == value2
		this.setState({
			date: value2
		});
	}
	componentDidMount() {

	}
	render() {
		const modalStyle = {
			top: '10%',
			left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 200 : '0',
			right: 'auto',
			bottom: 'auto',
			// width: document.body.clientWidth > 900 ? 400 : '100%'
		}
		return (
			<div>
				<div style={modalStyle} className="modal fade" id="ChooseDate"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
					<div className="modal-dialog">
						<div className="col-md-8 col-sm-12 modal-content" ref="choose" style={{backgroundColor: "#333"}}>
							<div className="modal-body" style={choose}>
							选择时间：

        <select style={{backgroundColor: "#525252"}} ref='choosedate' value={this.state.date} onChange={this.handleGenderChange.bind(this)}>
		  {this.state.datelist.map((date,index) => 
		    <option key={index} value={date}>{date}</option>
		 )}
       </select>



							</div>
							<div className="modal-footer" style={{borderTop:'0px solid #525252',paddingTop:'0px'}}>
								<button type="button" className="btn btn-default" data-dismiss="modal">关闭
								</button>
								<button data-loading-text="Loading..." type="button" className="btn btn-primary" ref='btnStr' data-dismiss="modal" onClick={this.getTrue.bind(this)}>
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
		chooseStrategy: state.reduToChooseStrategy.chooseStrategy,
		chooseDate: state.reduToChooseStrategy.time
	};
}

export default connect(mapStateToProps)(ChooseTime); //,{ alertHide }