import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import PredictReal from '../left/PredictReal'
import PredictBack from '../left/PredictBack'
const topStyle = {
	backgroundColor: '#292929',
	height: 'auto',
	borderRadius: '2px',
	color: '#fff',
	height: 'auto',
	// overflow: 'auto',
}
class PredictStrategys extends Component {
	constructor(props) {
		super(props);
		this.state = {
			strategys: [],
			btstrategys: []
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.click) {
			this.setState({
				strategys: nextProps.strategys,
				btstrategys: nextProps.btstrategys
			})
		}
	}
	render() {
		// console.log(this.props.clickusername);//点击的交易所代码
		return (
			<div style={topStyle}>
   		   <PredictReal StrategyList={this.state.strategys} isHis={false}/>
 		   <PredictBack  BtstrategyList={this.state.btstrategys} isHis={false}/>
		</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {

	};
}
const mapDispatchToProps = (dispatch) => {
	return {

	};
}
export default connect(mapStateToProps)(PredictStrategys);