import React,{Component} from 'react'
import {connect} from 'react-redux'
import TradeDetail from './TradeDetail'
import TradeAnalysis from './TradeAnalysis'
import $ from "jquery";
class RightBottom extends Component{
	constructor(props) {
        super(props);
        this.state = {
        };
    }    
	heandleClick = (event) => {
		$(".bottomTable a").each(function() {
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
		$(".bottomTable a").each(function(i) {
			if (i != 0) {
				$(this).css('backgroundColor', '#292929');
			}
		});
	}
	render(){
		let bottomHeight = (document.documentElement.clientHeight-64-25)/2-5-106;
		if (document.documentElement.clientWidth <= 880) {
			 bottomHeight = document.documentElement.clientHeight/3
		}
		const tab = {
			height: bottomHeight,
			color: "#fff",
			backgroundColor: '#525252',
			borderRadius: '4px',
			borderTopLeftRadius: '0px',
		}
		return (
		<div>
					      <ul className="nav nav-tabs tabDiv bottomTable noPrintDiv">
		                    <li className="active">
								 <a href="#TradeDetail"  onClick={(e)=>this.heandleClick(e)}
								 onMouseOut={(e)=>this.tableMouseOut(e)} 
	                              onMouseOver={(e)=>this.tableMouseOver(e)}
	                               ref="fTab" data-toggle="tab" id="tabHeadRight" style={{backgroundColor:'#525252'}}>
								 交易详情</a>
							</li>
							<li>
								 <a href="#TradeAnalysis" onClick={(e)=>this.heandleClick(e)}
								 onMouseOut={(e)=>this.tableMouseOut(e)} 
	                              onMouseOver={(e)=>this.tableMouseOver(e)}
	                               ref="eTab" data-toggle="tab" id="tabHeadRight">
								 收益风险分析
								</a>
							</li>
{/*							<li>
								 <a href="#LogDetail" onClick={(e)=>this.heandleClick(e)}
								 onMouseOut={(e)=>this.tableMouseOut(e)} 
	                              onMouseOver={(e)=>this.tableMouseOver(e)}
	                               ref="eTab" data-toggle="tab" id="tabHeadRight">
								 日志
								</a>
							</li>*/}
						</ul>
						<div className="tab-content" 
						id='right_bottom_detail'
						// data-step="4" data-intro='回测产生的交易数据' data-position="left"
						>
							<div className="tab-pane active needPrint" id="TradeDetail" style={tab}>
							         <TradeDetail/>
							</div>
							<div className="tab-pane needPrint" id="TradeAnalysis" style={tab}>
							          <TradeAnalysis/>
							</div>
{/*						   <div className="tab-pane" id="LogDetail" style={tab}>
							         log
							</div>*/}
						</div>
		</div>
		)
	}
}
const mapStateToProps =(state)=>{
return {

};
}
export default connect(mapStateToProps)(RightBottom);
