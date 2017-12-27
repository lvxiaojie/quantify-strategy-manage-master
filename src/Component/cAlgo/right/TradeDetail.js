import React ,{Component} from 'react'
import {alertMessage,saveStrategy} from '../../../Redux/Action/Action'
import {connect} from 'react-redux'
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
    downFile,
    getStatic
} from '../../../Redux/Action/shareAction'
import $ from 'jquery'
const conStyle = {
	backgroundColor:'#292929',
	color:'#FFFFFF',
	border:'0px solid #525252'
}
const thstyle={
		width:'	15%'
	}
	const tdstyle={
		width:'	15.2%'
	}
class TradeDetail extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
      totalpal:'',
      totaltest:'',
      totalnotestpal:'',
		};
	}
	componentWillReceiveProps(getProp){ 
    let sdate = getProp.choosedate;
    let edate = getNextDay(sdate);
    let chooseid = getProp._id;
    // let data = getTransaction(chooseid, sdate, edate);
    let data =  getStatic().transitions.concat();
    // console.log(data);
    let dataList = makeData(false, data);
    let newData = dataList.newData;
    let nianhua = dataList.nianhua;
    let average_winrate = dataList.average_winrate;
    let totalpal=0,totaltest=0,totalnotestpal=0;
    for(let i=0;i<newData.length;i++){
      totalpal+=newData[i].pal;
      totaltest+=newData[i].test;
      totalnotestpal+=newData[i].notestpal;
      newData[i].opentime = formatDate(newData[i].opentime);
      newData[i].closetime = formatDate(newData[i].closetime);
    }
    this.setState({
      data: newData,
      totalpal:Number((totalpal).toFixed(4)),
      totaltest:Number((totaltest).toFixed(4)),
      totalnotestpal:Number((totalnotestpal).toFixed(4)),
    })

	}
  downData() {
    let chartData = this.state.data;
    let text;
    text = "方向,开仓时间,开仓价,平仓时间,平仓价";
    for (let i = 0; i < chartData.length; i++) {
      text += '\r\n'
      text += chartData[i].direction + ',';
      text += (chartData[i].opentime) + ' ,';
      text += (chartData[i].openprice).toFixed(2) + ',';
      text += (chartData[i].closetime) + ',';
      text += (chartData[i].closeprice).toFixed(2) + ',';
    }
    text += '\r\总盈亏,' + this.state.totalpal + '\r\n';
    text += '总手续费,'+ this.state.totaltest + '\r\n';
    text += '无手续费总盈亏,'+ this.state.totalnotestpal + '\r\n';
    let name = this.props._id + '_' + this.props.choosedate + '_trade'+'_'+Math.round(new Date().getTime());
    downFile(text, name + '.csv');
  }
	render(){
    const th1 = {
      width: '15%',
      textAlign: 'center',
    }
    const bStyle = {
      marginLeft:'5px',
      // lineHeight:'24px'
    }
    const b2 = {
      color:'#f15923'
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
      marginRight: '5px'
    }
    const headTh = {
      border:'0px solid #666',
      borderLeft:'0px',
      borderRight:'0px',
      padding:'4px',
      textAlign:'center'
    }
    const bodyTd = {
      border:'1px solid #666',
      borderLeft:'0px',
      borderRight:'0px',
      padding:'4px',
      textAlign:'center'
    }

    		return (
    <div style={{height:'100%',border:'2px solid #525252',borderRadius:'4px',fontSize:'9px',display:this.state.data.length>0?'block':'none'}}>
        <div style={{height:'90%',width:'100%',overflow:'auto',backgroundColor:'#525252',overflow:'auto'}}>
            <table className="table table-hover tradeDetail">
              <thead>
              <tr style={{color:'#fff',fontWeight:'bold',textAlign:'center'}}>
        
                <th style={headTh}>交易方向</th>
                <th style={headTh}>开仓时间</th>
                <th style={headTh}>委托号</th>
                <th style={headTh}>开仓价</th>
                <th style={headTh}>平仓时间</th>
                <th style={headTh}>委托号</th>
                <th style={headTh}>平仓价</th>
            
              </tr>
            </thead>
            <tbody style={{backgroundColor:'#3a3a3a'}}>
              {this.state.data.map((x,index) => 
               <tr key={index} style={{color:'#fff',textAlign:'center'}}>
                <td style={bodyTd}><i style={{color:x.direction=='看多'?'#ff9912':'#4169e1'}}>{x.direction}</i></td>
                <td style={bodyTd}>{x.opentime}</td>
                <td style={bodyTd}>{x.openserialno}</td>
                <td style={bodyTd}>{x.openprice}</td>
                <td style={bodyTd}>{x.closetime}</td>
                <td style={bodyTd}>{x.closeserialno}</td>
                <td style={bodyTd}>{x.closeprice}</td>
                </tr>
             )}
              </tbody>
            </table>
                      {this.state.data.length>0?<button className='btn btn-default' style={btnBg} 
               onMouseOut={(e)=>{e.target.style.backgroundColor = '#292929'}} 
               onMouseOver={(e)=>{e.target.style.backgroundColor = '#323232'}}
               onClick ={(e)=>{this.downData(e)}}
               >导出交易数据</button>:null}

        </div>

        <div style={{height:'10%',color:'#fff',backgroundColor:'#525252'}}>
          <b style={bStyle}>总盈亏:  <b style={{color:this.state.totalpal>0?'#f15923':'#00ba16'}}>{this.state.totalpal}</b></b>&nbsp;
          <b style={bStyle}>总手续费： <b style={{color:this.state.totaltest>0?'#f15923':'#00ba16'}}>{this.state.totaltest}</b></b>&nbsp;
          <b style={bStyle}>无手续费总盈亏： <b style={{color:this.state.totalnotestpal>0?'#f15923':'#00ba16'}}>{this.state.totalnotestpal}</b></b>
        </div>
   
</div>


		)
	}
}
const mapStateToProps =(state)=>{
	return{
		choosedate:state.reduToChooseDate.choosedate,
		_id:state.reduToChooseId,
     alldata2:state.reduToAlldata2,
	};
}
const mapDispatchToProps =(dispatch)=>{
	return {
		
	};
}
export default connect(mapStateToProps)(TradeDetail);
