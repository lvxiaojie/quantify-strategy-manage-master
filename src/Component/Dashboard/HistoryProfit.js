import React from 'react';
import {
	Spin,
	Icon,
	Pagination
} from 'antd';
import {
	connect
} from 'react-redux'
import {
	queryString,
	getStatic,
	getStrategys,
	getNianHua2,
	statusToChinese
} from '../../Redux/Action/shareAction'
import Highcharts from 'highcharts/highstock'
import sand from 'highcharts/themes/sand-signika'

class HistoryProfit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			strategys: [],
			showSpin: false,
			page: 0,
			current:1
		}
	}
	beforeRender() {
		this.setState({
			showSpin: true,
		})
		getStrategys().then(() => {
			let data = getStatic();
			let strategys = data.strategys.concat(data.trueStras);
			let user = queryString();
			statusToChinese(strategys);
			for (let i = 0; i < strategys.length; i++) {
				if (strategys[i].username !== user) {
					strategys.splice(i, 1);
					i = -1;
				}
			}

			let all_data = [];
			let k = 0;
			all_data[0] = [];
			for (let i = 0; i < strategys.length; i++) {
				all_data[k].push(strategys[i]);
				if ((i + 1) % 6 === 0 && i + 1 < strategys.length) {
					k++;
					all_data[k] = [];
				}
			}


			this.setState({
				user: user,
				strategys: all_data,
				// showSpin: true,
			})
			setTimeout(() => {
				this.Chart();
			}, 500)
		})
	}
	Chart() {
		let strategys = this.state.strategys[this.state.page];
		for (let x of strategys) {
			this.showChart(x.id);
		}
		this.setState({
			showSpin: false
		})
	}
	componentWillMount() {
		this.beforeRender();
	}
	componentWillReceiveProps(nextProps) {
		this.beforeRender();
	}
	showChart(id) {
		getNianHua2(id).then((data) => {
			this.makeChart(id, data);
		}, (reject) => {
			console.log('error')
		})
	}
	changePage = (page) => {
		this.setState({
			page: page - 1,
			current: page,
			showSpin: true,
		})
		setTimeout(() => {
			this.Chart();
		}, 500)
	}
	makeChart(id, data) {
		let nianHuaList = [];
		let dateList = [];
		let winrateList = [];
		for (var i in data) {
			dateList[i] = (data[i].trade_date).slice(5, 10);
			if (data[i].hasOwnProperty('statistics')) {
				
				nianHuaList[i] = Number((data[i].statistics.aror * 100).toFixed(4));
				winrateList[i] = Number((data[i].statistics.row * 100).toFixed(2));
			}
		}
	

		let config = {
			chart: {
				backgroundColor: '#fff',
				// borderRadius: '5px',
			},
			credits: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			tooltip: {
				// positioner: function() {
				// 	return {
				// 		x: 195,
				// 		y: 0
				// 	};
				// },
				backgroundColor: '#000', // 背景颜色
				borderColor: 'black', // 边框颜色
				borderRadius: 10, // 边框圆角
				borderWidth: 3, // 边框宽度
				shadow: true, // 是否显示阴影
				animation: true, // 是否启用动画效果
				style: { // 文字内容相关样式
					color: "#fff",
					fontSize: "12px",
					fontWeight: "blod",
					fontFamily: "Courir new"
				},
				shared: true,
				crosshairs: true,
				plotOptions: {
					spline: {
						marker: {
							radius: 1,
							lineColor: '#666666',
							lineWidth: 0.5
						}
					}
				}
			},
			legend: {
				enabled: true,
				align: 'left',
				verticalAlign: 'top',
				x: 0,
				y: 0,
				itemStyle: {
					color: '#000'
				}
			},
			yAxis: [{
				title: {
					// text: '年化收益'
					text: null
				},
				plotLines: [{
					color: '#000',
					dashStyle: 'dash',
					value: 0,
					width: 0.5
				}],
				// opposite: true,
				tickPixelInterval: 30,
				gridLineWidth: '0px',
				height: '80%',
				// min: -2
			}, {
				labels: {
					align: 'right',
					x: -3
				},
				title: {
					text: null
				},
				top: '85%',
				height: '15%',
				offset: 0,
				labels: {

					enabled: false

				}
			}],
			title: {
				text: null,
				style: {
					color: "#fff"
				}
			},
			xAxis: {
				title: {
					text: null
				},
				// type:'datetime',
				categories: dateList
			},
			//收益曲线
			series: [{
				data: nianHuaList,
				name: '年化收益',
				marker: {
					enabled: true,
					symbol: 'circle',
					fillColor: 'red',
					radius: 1
				},
				color: '#ff4848',
				turboThreshold: 0,
				tooltip: {
					valueSuffix: '%'
				}
			}, {
				color: '#aab061',
				yAxis: 1,
				data: winrateList,
				name: '胜率',
				type: 'column',
				tooltip: {
					valueSuffix: '%'
				}
			}]
		};
		sand(Highcharts);
		Highcharts.chart('history_profit_' + id, config);
	}
	componentDidMount() {

	}
	componentDidUpdate(prevProps, prevState) {

	}
	render() {
		return (
			<Spin tip="正在读取数据..." spinning={this.state.showSpin}>
			<div className="chart-div">
			<span className='tab-header'><span className='color-black'>历史收益</span> - {this.state.user}</span>
			{this.state.strategys.length==0?
				<span><Icon type="frown" />  暂无数据</span>
				:
				this.state.strategys[this.state.page].map((x,index)=>{
					let flag_class;
					switch(x.flag){
						case '运行中' : flag_class = 'chart-flag running';break;
						case '运行结束' : flag_class = 'chart-flag  run-over';break;
						case '错误' : flag_class = 'chart-flag run-error';break;
						case '加载结束' : flag_class = 'chart-flag load-over';break;
						default:flag_class = 'chart-flag run-error';break;
					}
					return(
						// col-sm-4 col-lg-4 col-md-4 col-xs-6
		            <div className='chart-body' key={index}>
		      	    	<figure className='chart_item'>
		      	    	<div className="chart-header">
		      	    	<span title='实例名' className='chart-name'>{x.name}</span>
		      	    	<span title='实例状态' className={flag_class}>{x.flag}</span>
		      	    	<div title='创建时间' className='chart-datetime'>
		      	    	<span className="float-right">{x.datetime}</span>
		      	    	</div>
		      	    	</div>
				        <div className='chart_chart' id={'history_profit_'+x.id}>
				        	
				        </div>
		               </figure>
		            </div>	
		            )
				})
			}
			</div>
			 <Pagination 
			   className="paginat"
			   pageSize= {6}
			   current={this.state.current}
			   total={(this.state.strategys.length) * 6} 
			   onChange={this.changePage}
			   />
		</Spin>
		)
	}
}
const mapStateToProps = (state) => {
	return {};
}
export default connect(mapStateToProps)(HistoryProfit);