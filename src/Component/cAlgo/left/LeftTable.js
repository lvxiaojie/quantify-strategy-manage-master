import React, {Component} from 'react'
import {connect} from 'react-redux'
import ChooseTime from './ChooseTime'
import AddTrade from './AddTrade'
import AddStrategy from './AddStrategy'
import AddPredict from './AddPredict'
// import Modelshare from './Modelshare'
import PredictList from './PredictList'
import $ from 'jquery'
import {showStrategyList,ShowList} from '../../../Redux/Action/Action'
import TradeUserTree from './TradeUserTree'
import PredictUserTree from './PredictUserTree'
import AddModelFile from './AddModelFile'
import ChangeFee from './ChangeFee'
import HisUserTree from './HisUserTree'
class LeftTable extends Component {
	constructor(props) { //ES6初始化
		super(props);
		this.state = {
			classname: '未选择任何策略',
			_id: 'null',
			update: '',
			StrategyList: [],
			BtstrategyList: []
		};
	}
	componentWillReceiveProps(nextProps) {
		$('.staMenu').each(function(i) {
			$(this).removeClass('in');
		})
		$('.collapse').each(function(i) {
			$(this).removeClass('in');
		})
		$('.staCircle').each(function(i) {
			$(this).attr("class", "fa fa-plus-circle staCircle");
		})
		this.setState({
			update: nextProps.update,
			StrategyList: nextProps.StrategyList,
			BtstrategyList: nextProps.BtstrategyList,
		})
	}
	heandleClick = (event) => {
		$(".leftTable a").each(function() {
			$(this).css('backgroundColor', '#292929');
		});
		if (event.target.id == 'tabHead') {
			event.target.style.backgroundColor = '#525252';
		} else {
			// $('#' + event.target.id).parent().css('backgroundColor', '#525252');
			$(event.target).parent().css('backgroundColor', '#525252');
		}
		// event.stopPropagation();
	}
	tableMouseOut(e) {
		if (e.target.style.backgroundColor == 'rgb(50, 50, 50)') {
			e.target.style.backgroundColor = '#292929'
		}
	}
	tableMouseOver(e) {
		if (e.target.style.backgroundColor == 'rgb(41, 41, 41)') {
			e.target.style.backgroundColor = '#323232'
		}
	}
	componentDidMount() {
		$(".leftTable a").each(function(i) {
			if (i != 0) {
				$(this).css('backgroundColor', '#292929');
			}
		});
	}
	render() {
		const tab = {
			height: document.documentElement.clientHeight-70,
			color: "#fff",
			backgroundColor: '#525252',
			borderRadius:'4px',
			borderTopLeftRadius:'0px',
		}
		const divS ={			
			border:'0',
			borderRadius:'4px',
			marginTop:'0px',
		}
		return (
		<div style={divS}>
					<div className="tabs-example">
					      <ul className="nav nav-tabs tabDiv leftTable">
							<li className="active" >
								 <a href="#TradeList" onClick={(e)=>this.heandleClick(e)} 
								 onMouseOut={(e)=>this.tableMouseOut(e)} 
	                              onMouseOver={(e)=>this.tableMouseOver(e)}
	                              ref="aTab" data-toggle="tab" id='tabHead' style={{backgroundColor: '#525252'}} >
								 	量化交易 <i onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}} 
								 	style={{cursor: "pointer",color:'#fff'}} className="fa fa-plus"  id='add_trade'
								 	title="添加策略" data-toggle="modal" data-target="#myModal3"></i>
	
								 </a>
							</li>
		                    <li>
								 <a href="#PredictList"  onClick={(e)=>this.heandleClick(e)}
                                  onMouseOut={(e)=>this.tableMouseOut(e)} 
	                              onMouseOver={(e)=>this.tableMouseOver(e)}
								  ref="dTab" data-toggle="tab" id='tabHead'>
								 预测模型&nbsp;
								 <i ref="dTab2" id='add_pedict'   onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}} 
								 style={{cursor: "pointer",color:'#fff'}} className="fa fa-plus" 
								 title="添加模型" data-toggle="modal" data-target="#addPredict"></i>
								</a>
							</li>
							<li>
								 <a href="#ExchangeHistory" onClick={(e)=>this.heandleClick(e)}
								 onMouseOut={(e)=>this.tableMouseOut(e)} 
	                              onMouseOver={(e)=>this.tableMouseOver(e)} ref="eTab" data-toggle="tab" id='tabHead'>
								 历史记录
								</a>
							</li>
						</ul>
						<div className="tab-content">
							<div className="tab-pane left-tab active" id="TradeList" style={tab}>
					              <TradeUserTree />
					     	</div>
						    <div className="tab-pane left-tab" id="PredictList" style={tab}>
						        <PredictUserTree />
							</div>
							<div className="tab-pane left-tab" id="ExchangeHistory" style={tab}>
							         <HisUserTree />
							</div>
{/*							<div className="tab-pane left-tab" id="Modelshare" style={tab}>
							          <Modelshare/>
							</div>*/}
						</div>
				</div>
			                <AddTrade/>
				  		    <ChooseTime/>
					        <AddPredict/>
					        <AddStrategy/>
					        <AddModelFile/>
					        <ChangeFee />
			</div>

		)
	}
}
const mapStateToProps = (state) => {
	return {
         // update:state.reduUpdateClass,
         // StrategyList: state.reduToStrategyList.StrategyList,
		 // BtstrategyList: state.reduToBtstrategyList.BtstrategyList,
	};
}
export default connect(mapStateToProps)(LeftTable);