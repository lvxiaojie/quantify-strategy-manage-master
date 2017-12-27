	export function alertMessage(messageText, hideTime) {
		return {
			type: 'ALERT_SHOW',
			messageText,
			hideTime
		};
	}

	//显示进度条
	export const showProgress = (flag) => {
		return {
			type: 'SHOW_PROGRESS',
			flag,
		};
	}

	//存储选择时间
	export const saveToChooseDate = (choosedate) => {
			return {
				type: 'SAVE_DATE',
				choosedate
			}
		}
		//保存获取数据时选择的实例信息
	export const saveToChoose = (chooseStrategy) => {
		return {
			type: 'SAVE_CHOOSE',
			chooseStrategy
		}
	}
	export const saveToChoose2 = (chooseStrategy) => {
			return {
				type: 'SAVE_CHOOSE2',
				chooseStrategy
			}
		}
		//给行情图传选择的信息
	export const saveToChoose3 = (chooseStrategy) => {
			return {
				type: 'SAVE_CHOOSE3',
				chooseStrategy
			}
		}
		//保存获取数据时选择的实例id
	export const saveToChooseId = (_id) => {
			return {
				type: 'SAVE_ID',
				_id
			}
		}
		//保存当前选择的策略信息
	export const saveStrategy = (data) => {
			return {
				type: 'SAVE_Strategy',
				data
			}
		}
		//切换table
	export const changeTable = (num) => {
		return {
			type: 'CHANGE_TABLE',
			num
		}
	}
	export const changeTable2 = (num) => {
			return {
				type: 'CHANGE_TABLE2',
				num
			}
		}
		//保存数据用来计算指标
	export const saveAlldata2 = (alldata2) => {
		return {
			type: 'SAVE_ALLDATA2',
			alldata2
		}
	}

	//保存登录用户token
	export const saveUsertoken = (token) => {
		return {
			type: 'SAVE_TOKEN',
			token
		}
	}



	// //显示相应策略交易列表
	// export const showStrategyList = (_id) => {
	// 	return {
	// 		type: 'ShowStrategy',
	// 		_id
	// 	}
	// }

	//保存真实交易实盘模拟列表
	export const saveStrategyList = (StrategyList, flag) => {
			return {
				type: 'SAVESTRATEGYLIST',
				StrategyList,
				flag
			}
		}
		//保存历史回测列表
	export const saveBtstrategyList = (BtstrategyList, flag) => {
		return {
			type: 'SAVEBTSTRATEGYLIST',
			BtstrategyList,
			flag
		}
	}

	//根据交易所代码显示相应策略交易列表
	export const showStrategyList2 = (exchange) => {
		return {
			type: 'ShowStrategy2',
			exchange
		}
	}

	//根据选择的类型显示页面
	export const ShowList = (flag) => {
		return {
			type: 'ShowList',
			flag
		}
	}

	//显示策略代码
	export const showCode = (id) => {
			return {
				type: 'ShowCode',
				id
			}
		}
		//显示运行日志
	export const showLog = (id, name) => {
			return {
				type: 'ShowLog',
				id,
				name
			}
		}
		//显示预测记录
	export const showPredictRecord = (id, name, script_id) => {
			return {
				type: 'showPredictRecord',
				id,
				name,
				script_id
			}
		}
		//预测曲线
	export const showPredictChart = (id, name, script_id) => {
			return {
				type: 'showPredictChart',
				id,
				name,
				script_id
			}
		}
		//更新策略列表
	export const updateClass = () => {
			return {
				type: 'UPDATECLASS',
			}
		}
		//更新模型智库列表
	export const updateShare = () => {
		return {
			type: 'UPDATESHARE',
		}
	}

	//交易数据标题

	export const showDataTitle = (title) => {
		return {
			type: 'ShowDataTitle',
			title
		}
	}

	//显示行情信息 最新价格成交量
	export const showMarketDetail = (marketDetail) => {
		return {
			type: 'showMarketDetail',
			marketDetail
		}
	}

	//显示模型
	export const showModel = (api, id) => {
			return {
				type: 'ShowModel',
				api,
				id
			}
		}
		//添加模型智库
	export const addShare = (api, id) => {
			return {
				type: 'AddShare',
				api
			}
		}
		//显示我的代码页面
	export const showMyCode = (codeType) => {
		return {
			type: 'showMyCode',
			codeType
		}
	}
	export function showLoading(flag) {
		return {
			type: 'SHOW_LOADING',
			flag
		};
	}
	export function runBackTest(flag) {
		return {
			type: 'RUN_BACK',
			flag
		};
	}