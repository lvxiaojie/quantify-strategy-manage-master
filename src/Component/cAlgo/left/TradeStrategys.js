import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import TradeTrue from '../left/TradeTrue'
import TradeReal from '../left/TradeReal'
import TradeBack from '../left/TradeBack'
const topStyle = {
	backgroundColor: '#292929',
	height: 'auto',
	borderRadius: '2px',
	color: '#fff',
	// overflow: 'auto',
}
class TradeStrategys extends Component {
	constructor(props) {
		super(props);
		this.state = {
			trueStra: [],
			strategys: [],
			btstrategys: [],
			nianhua_data:[]
		};
	}
	componentWillMount() {

	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.click) {
			this.setState({
				nianhua_data:nextProps.nianhua_data,
				trueStra: nextProps.trueStra,
				strategys: nextProps.strategys,
				btstrategys: nextProps.btstrategys
			})
		}
	}
	render() {
		return (
			<div style={topStyle}>
   		   <TradeTrue nianhua_data={this.state.nianhua_data} StrategyList={this.state.trueStra} isHis={false}/>
		   <TradeReal nianhua_data={this.state.nianhua_data}  StrategyList={this.state.strategys} isHis={false}/>
		   	<TradeBack nianhua_data={this.state.nianhua_data}  BtstrategyList={this.state.btstrategys}/>
		</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {

	};
}
export default connect(mapStateToProps)(TradeStrategys);