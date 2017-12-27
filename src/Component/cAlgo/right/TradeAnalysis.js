import React, {
	Component
} from 'react'
import {
	alertMessage,
	saveStrategy,
	saveAlldata2
} from '../../../Redux/Action/Action'
import {
	connect
} from 'react-redux'
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
	formatDate,
	newTotalTime,
	downFile,
	getStatic
} from '../../../Redux/Action/shareAction'
import $ from 'jquery'
const conStyle = {
	backgroundColor: '#292929',
	color: '#FFFFFF',
	border: '0px solid #525252'
}
const thstyle = {
	width: '	15%'
}
const tdstyle = {
	width: '	15.2%'
}
let Strategy = [];
let alldata = [];
let alldata2 = [];
let stime;
let etime;
class RightSecond extends Component {


	constructor(props) {
		super(props);
		this.state = {
			data: [],
			average_yeild: '',
			total_yeild: '',
			nianhua: '',
			winrate: '',
			average_winrate: '',
			profit: '',
			maxDrawdown: '',
			ratio: '',
			volatility: '',
			average_time: '',
			sharpe: ''
		};
	}

	componentWillReceiveProps(getProp) {
		let sdate = getProp.choosedate;
		let edate = getNextDay(sdate);
		let chooseid = getProp._id;
		// let data = getTransaction(chooseid, sdate, edate);
		let data = getStatic().transitions.concat();
		// console.log(data);
		let dataList = makeData(chooseid, data);
		let newData = dataList.newData;
		let nianhua = dataList.nianhua;
		let average_winrate = dataList.average_winrate;
		let total_yeild = dataList.total_yeild;
		let zhengPal = 0;
		let fuPal = 0;
		let totaltime = 0;
		let maxDown = [];
		let zhengNum = 0;
		let fuNum = 0;
		let notestZheng = 0;
		let notestFu = 0;
		for (let i = 0; i < newData.length; i++) {
			// total_yeild += newData[i].yeild;
			let holdTime = newData[i].closetime - newData[i].opentime;
			newData[i].opentime = formatDate(newData[i].opentime);
			newData[i].closetime = formatDate(newData[i].closetime);
			if (newData[i].exchange == 'CTP') {
				let openH = parseInt(newData[i].opentime[11] + newData[i].opentime[12]);
				let closeH = parseInt(newData[i].closetime[11] + newData[i].closetime[12]);
				if (openH <= 11 && closeH >= 13) {
					holdTime -= 90 * 60 * 1000;
				}
			}
			totaltime += holdTime;
			newData[i].totaltime = newTotalTime(holdTime);
			if (newData[i].notestpal > 0) {
				notestZheng++;
			} else {
				notestFu++;
			}
			// console.log(newData[i].volume)
			if (newData[i].pal > 0) {
				zhengPal += newData[i].pal / 300 / newData[i].volume;
				zhengNum++;
			} else {
				fuPal += newData[i].pal / 300 / newData[i].volume;
				fuNum++;
			}
			if (i > 0) {
				let nowPal = newData[i].pal;
				let beforePal = [];
				for (let j = 0; j < i; j++) {
					beforePal[j] = newData[j].pal;
				}
				maxDown[i - 1] = (nowPal / Math.max.apply(Math, beforePal) - 1);
			}
		}
		let num = newData.length;
		let mean = (zhengPal + fuPal) / num; //收益均值
		let total = 0;
		for (let i = 0; i < newData.length; i++) {
			total += Math.pow(newData[i].pal / 300 / newData[i].volume - mean, 2);
		}

		// total_yeild = Number(total_yeild).toFixed(4);

		// let average_yeild = Number(total_yeild / num).toFixed(4);

		let profit = Math.abs((zhengNum / fuNum).toFixed(2));

		let volatility = Number(Math.sqrt(total / num) * Math.sqrt(250));

		// let ratio = Number(((total_yeild - 0.0035) * 3 / 4) / volatility).toFixed(6);

		// let maxDrawdown = Number(Math.min.apply(Math, maxDown)).toFixed(6);

		// let sharpe = Number((nianhua - 0.0035) / volatility).toFixed(6);

		// let winrate = Number(notestZheng / num).toFixed(2);



		this.setState({
			data: newData,
			total_yeild: Number(total_yeild * 100).toFixed(4),
			average_yeild: Number(total_yeild / num * 100).toFixed(4),
			nianhua: nianhua,
			average_winrate: average_winrate,
			winrate: Number(notestZheng / num * 100).toFixed(2),
			profit: profit,
			maxDrawdown: Number(Math.min.apply(Math, maxDown) * 100).toFixed(6),
			ratio: Number(((total_yeild - 0.0035) * 3 / 4) / volatility * 100).toFixed(6),
			sharpe: Number((nianhua / 100 - 0.0035) / volatility * 100).toFixed(6),
			volatility: Number(volatility * 100).toFixed(6),
			average_time: newTotalTime(totaltime / newData.length),
		})
	}
	downData() {
		let chartData = this.state.data;
		let text;
		text = "方向,开仓时间,开仓价,平仓时间,平仓价,手续费,无手续费盈亏,盈亏,收益率,持仓时间";
		for (let i = 0; i < chartData.length; i++) {
			text += '\r\n'
			text += chartData[i].direction + ',';
			text += (chartData[i].opentime) + ' ,';
			text += (chartData[i].openprice).toFixed(2) + ',';
			text += (chartData[i].closetime) + ',';
			text += (chartData[i].closeprice).toFixed(2) + ',';
			text += chartData[i].test + ',';
			text += chartData[i].notestpal + ',';
			text += chartData[i].pal + ',';
			text += chartData[i].yeild + '%,';
			text += chartData[i].totaltime + ',';
		}
		text += '\r\n总收益率,' + this.state.total_yeild + '%\r\n';
		text += '平均收益率,' + this.state.average_yeild + '%\r\n';
		text += '年化收益率,' + this.state.nianhua + '%\r\n';
		text += '交易方向胜率,' + this.state.winrate + '%\r\n';
		text += '交易胜率,' + this.state.average_winrate + '%\r\n';
		text += '盈亏比,' + this.state.profit + '%\r\n';
		text += '最大回撤,' + this.state.maxDrawdown + '%\r\n';
		text += '信息比率,' + this.state.ratio + '%\r\n';
		text += '夏普比率,' + this.state.sharpe + '%\r\n';
		text += '策略收益波动率,' + this.state.volatility + '%\r\n';
		text += '平均持仓时间,' + this.state.average_time + '\r\n';
		let name = this.props._id + '_' + this.props.choosedate + '_analysis' + '_' + Math.round(new Date().getTime());
		downFile(text, name + '.csv');
	}
	render() {
		const th1 = {
			width: '8%',
			textAlign: 'center',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
		}
		const th2 = {
			height: '10px',
			width: '6%',
			textAlign: 'center',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
		}
		const th3 = {
			width: '2.5%',
			textAlign: 'center',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
		}
		const bStyle = {
			marginLeft: '5px',
		}
		const b2 = {
			color: '#f15923'
		}
		const btnBg = {
			backgroundColor: '#292929',
			color: '#fff',
			border: '0px solid #292929',
			marginBottom: '10px',
			height: '20px',
			lineHeight: '10px',
			fontSize: '9px',
			float: 'right',
			marginRight: '15px'
		}
		const headTh = {
			border: '0px solid #666',
			borderLeft: '0px',
			borderRight: '0px',
			padding: '4px',
			textAlign: 'center'
		}
		const bodyTd = {
			border: '1px solid #666',
			borderLeft: '0px',
			borderRight: '0px',
			padding: '4px',
			textAlign: 'center'
		}
		return (
			<div style={{height:'100%',width:'100%',border:'2px solid #525252',borderRadius:'4px',fontSize:'9px',display:this.state.data.length>0?'block':'none'}}>
             <div style={{height:document.documentElement.clientWidth>930?(document.documentElement.clientWidth>1460?'90%':'80%'):'70%',width:'100%',overflow:'auto'}}>
                <table className="table table-hover tradeDetail">
              <thead>
              <tr style={{color:'#fff',fontWeight:'bold',textAlign:'center'}}>
        
                                <th style={headTh}>序号</th>
                  				<th style={headTh}>方向</th>
                  				<th style={headTh}>开仓时间</th>
                  				<th style={headTh}>开仓价</th>
                  				<th style={headTh}>平仓时间</th>
                  				<th style={headTh}>平仓价</th>
                                <th style={headTh}>手续费</th>
                                <th style={headTh}>无手续费盈亏</th>
                                <th style={headTh}>盈亏</th>
                                <th style={headTh}>收益率</th>
                                <th style={headTh}>持仓时间</th>
            
              </tr>
            </thead>
            <tbody style={{backgroundColor:'#3a3a3a'}}>
                  	 		{this.state.data.map((x,index) => 
                  		<tr key={index} style={{color:'#fff',textAlign:'center'}}>
                  		    <td style={bodyTd}>{index+1}</td>
                  	        <td style={bodyTd}><i style={{color:x.direction=='看多'?'#ff9912':'#4169e1'}}>{x.direction}</i></td>
                  		    <td style={bodyTd}>{x.opentime}</td>
                  		    <td style={bodyTd}>{x.openprice}</td>
                  		    <td style={bodyTd}>{x.closetime}</td>
                  		    <td style={bodyTd}>{x.closeprice}</td>
                  		    <td style={bodyTd}>{x.test}</td>
                            <td style={bodyTd}><i style={{color:x.notestpal>0?'#f15923':'#00ba16'}}>{x.notestpal}</i></td>
                            <td style={bodyTd}><i style={{color:x.pal>0?'#f15923':'#00ba16'}}>{x.pal}</i></td>
                            <td style={bodyTd}><i style={{color:x.yeild>0?'#f15923':'#00ba16'}}>{x.yeild}%</i></td>
                            <td style={bodyTd}>{x.totaltime}</td>
                  	    </tr>
                  		 )}
              </tbody>
            </table>
                   {this.state.data.length>0?<button className='btn btn-default' style={btnBg} 
               onMouseOut={(e)=>{e.target.style.backgroundColor = '#292929'}} 
               onMouseOver={(e)=>{e.target.style.backgroundColor = '#323232'}}
               onClick ={(e)=>{this.downData(e)}}
               >导出策略风险分析</button>:null}
            </div>
                  
               <div id='analysisBottom' style={{height:document.documentElement.clientWidth>930?(document.documentElement.clientWidth>1460?'10%':'20%'):'30%',color:'#fff',backgroundColor:'#525252',marginBottom:'0px'}}>
                    <b style={bStyle}>总收益率:  <b style={{color:this.state.total_yeild>0?'#f15923':'#00ba16'}}>{this.state.total_yeild}%</b></b>
                    <b style={bStyle}>平均收益率：<b style={{color:this.state.average_yeild>0?'#f15923':'#00ba16'}}>{this.state.average_yeild}%</b></b>
                    <b style={bStyle}>年化收益率:<b style={{color:this.state.nianhua>0?'#f15923':'#00ba16'}}> {this.state.nianhua}%</b></b>
                    <b style={bStyle}>交易方向胜率:<b style={{color:this.state.winrate>0?'#f15923':'#00ba16'}}> {this.state.winrate}%</b></b>
                    <b style={bStyle}>交易胜率:<b style={{color:this.state.average_winrate>0?'#f15923':'#00ba16'}}> {this.state.average_winrate}%</b></b>
                    <b style={bStyle}>盈亏比:<b style={{color:this.state.profit>0?'#f15923':'#00ba16'}}> {this.state.profit}</b></b>
                    <b style={bStyle}>最大回撤:<b style={{color:this.state.maxDrawdown>0?'#f15923':'#00ba16'}}> {this.state.maxDrawdown}%</b></b>
                    <b style={bStyle}>信息比率:<b style={{color:this.state.ratio>0?'#f15923':'#00ba16'}}> {this.state.ratio}%</b></b>
                    <b style={bStyle}>夏普比率:<b style={{color:this.state.sharpe>0?'#f15923':'#00ba16'}}> {this.state.sharpe}%</b></b>
                    <b style={bStyle}>策略收益波动率:<b style={{color:this.state.volatility>0?'#f15923':'#00ba16'}}> {this.state.volatility}%</b></b>
                    <b style={bStyle}>平均持仓时间：<b style={{color:'#f15923'}}> {this.state.average_time}</b></b> 
             	</div>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		choosedate: state.reduToChooseDate.choosedate,
		_id: state.reduToChooseId,
	};
}
const mapDispatchToProps = (dispatch) => {
	return {

	};
}
export default connect(mapStateToProps)(RightSecond);