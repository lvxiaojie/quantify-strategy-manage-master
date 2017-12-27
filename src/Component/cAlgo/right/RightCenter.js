import React ,{Component} from 'react'
import {connect} from 'react-redux'
import MarketChart from './MarketChart'
import ProfitChart from './ProfitChart'
import RunChart from './RunChart'
import $ from "jquery";
class RightCenter extends Component{
	constructor(props) {
		super(props);
		this.state = {

		};
	}
	heandleClick = (event) => {
		$(".rightTable a").each(function() {
			$(this).css('backgroundColor', '#292929');
		});
		event.target.style.backgroundColor = '#525252';
		event.stopPropagation();
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
		$(".rightTable a").each(function(i) {
			if (i != 0) {
				$(this).css('backgroundColor', '#292929');
			}
		});
	}
	render(){
		const tab = {
			height: (document.documentElement.clientHeight-64-25)/2+100+35,
			width:'100%',
			color: "#fff",
			backgroundColor: '#525252',
			borderRadius:'4px',
			borderTopLeftRadius:'0px',
		}

		return (
					<div id='rightCenter'>


					     <ul className="nav nav-tabs tabDiv rightTable noPrintDiv">

							<li className="active">
								 <a href="#MarketChart" onClick={(e)=>this.heandleClick(e)} 
								 onMouseOut={(e)=>this.tableMouseOut(e)} 
	                              onMouseOver={(e)=>this.tableMouseOver(e)}
								 ref="aTab" data-toggle="tab" id="tabHeadRight" style={{backgroundColor:'#525252'}}>
								 	行情图
								 </a>
							</li>
							<li>
								 <a href="#RunChart" onClick={(e)=>this.heandleClick(e)} 
								 onMouseOut={(e)=>this.tableMouseOut(e)} 
	                              onMouseOver={(e)=>this.tableMouseOver(e)}
	                              ref="bTab" data-toggle="tab" id="tabHeadRight">
								 交易走势图
								</a>
							</li>
		                    <li>
								 <a href="#ProfitChart"  onClick={(e)=>this.heandleClick(e)} 
								 onMouseOut={(e)=>this.tableMouseOut(e)} 
	                              onMouseOver={(e)=>this.tableMouseOver(e)}
	                              ref="dTab" data-toggle="tab" id="tabHeadRight">
								 收益曲线图
								</a>
							</li>

						</ul>


						<div className="tab-content">
							<div className="tab-pane active needPrint" id="MarketChart" style={tab}>
							          <MarketChart/>
							</div>
							<div className="tab-pane needPrint" id="RunChart" style={tab}>
							          <RunChart/>
							</div>
						    <div className="tab-pane needPrint" id="ProfitChart" style={tab}>
						              <ProfitChart/>
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
export default connect(mapStateToProps)(RightCenter);