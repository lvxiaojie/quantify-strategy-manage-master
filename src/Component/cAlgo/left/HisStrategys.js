import React,{Component} from 'react'
import {connect} from 'react-redux'
import TradeTrue from '../left/TradeTrue'
import TradeReal from '../left/TradeReal'
import TradeBack from '../left/TradeBack'
import PredictReal from '../left/PredictReal'
const topStyle = {
	backgroundColor: '#292929',
	height:'auto',
	borderRadius:'2px',
	color:'#fff',
	overflow: 'auto',
	width:'100%'
}
class HisStrategys extends Component{
	constructor(props) {
        super(props);
        this.state = {
        	trueStras:[],
        	strategys:[],
        	predictStras:[]
        };
    }    
	componentWillMount() {

	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			trueStras: nextProps.trueStras,
			strategys: nextProps.strategys,
			predictStras: nextProps.predictStras
		})
	}
	render(){
		return (
		<div style={topStyle}>
   		   <TradeTrue  StrategyList={this.state.trueStras} isHis={true}/>
		   <TradeReal   StrategyList={this.state.strategys} isHis={true}/>
		   <PredictReal   StrategyList={this.state.predictStras} isHis={true}/>
		</div>
		)
	}
}
const mapStateToProps =(state)=>{
return {

};
}
export default connect(mapStateToProps)(HisStrategys);
