import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import RightCenter from './RightCenter'
import RightBottom from './RightBottom'
import Code from './Code'
import MyCode from './MyCode'
import ShareDetail from './ShareDetail'
import AddShare from './AddShare'
let displayChart, displayStra, displayRightBottom, displayCode, displayModel, displayAddShare, displayMyCode;
class Right extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'id'
		};
	}
	componentWillReceiveProps(getProp) {
		this.setState({
			type: getProp.type
		})
	}
	render() {
		displayChart = 'none';
		displayCode = 'none';
		displayModel = 'none';
		displayAddShare = 'none';
		displayMyCode = 'none';
		displayRightBottom = 'inline';
		switch (this.state.type) {
			case 'id':
				displayChart = 'inline';
				break;
			case 'code':
				displayCode = 'inline'
				break;
			case 'model':
				displayModel = 'inline'
				break;
			case 'addShare':
				displayAddShare = 'inline';
			case 'myCode':
				displayMyCode = 'inline';
				break;
			case 'myPredict':
				displayMyCode = 'inline';
				displayRightBottom = 'none'
				break;
			default:
				displayChart = 'inline'
				break;
		}
		return (
			<div id='right_div'>
			    <div style={{display:displayChart}}>
				    <RightCenter/>
				   
				</div>
				<div style={{display:displayMyCode}}><MyCode/></div>
				{/*displayChart=='inline'||displayMyCode=='inline'?<div><RightBottom/></div>:null*/}
				<div style={{display:displayCode}}><Code/></div>
				 <div style={{display:displayRightBottom}}><RightBottom/></div>
{/*				<div style={{display:displayModel}}><ShareDetail/></div>
				<div style={{display:displayAddShare}}><AddShare/></div>*/}
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		type: state.reduToShowList
	};
}
const mapDispatchToProps = (dispatch) => {
	return {

	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Right);