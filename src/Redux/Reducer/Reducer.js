export const reduAlert = (state = '', action) => {
	switch (action.type) {
		case 'ALERT_SHOW':
			return {
				time: new Date(),
				messageText: action.messageText,
				hideTime: action.hideTime
			}
		default:
			return state;
	}
}

export const reduProgress = (state = '', action) => {
	switch (action.type) {
		case 'SHOW_PROGRESS':
			return {
				time: new Date(),
				flag: action.flag
			}
		default:
			return state;
	}
}

export const reduToChooseDate = (state = '', action) => {
	switch (action.type) {
		case 'SAVE_DATE':
			return {
				choosedate: action.choosedate,
				time: new Date()
			}
		default:
			return state;
	}
}
export const reduToChooseStrategy = (state = '', action) => {
	switch (action.type) {
		case 'SAVE_CHOOSE':
			return {
				chooseStrategy: action.chooseStrategy,
				time: new Date()
			}
		default:
			return state;
	}
}
export const reduToChooseStrategy2 = (state = '', action) => {
	switch (action.type) {
		case 'SAVE_CHOOSE2':
			return action.chooseStrategy
		default:
			return state;
	}
}
export const reduToChooseStrategy3 = (state = '', action) => {
	switch (action.type) {
		case 'SAVE_CHOOSE3':
			return action.chooseStrategy
		default:
			return state;
	}
}
export const reduToChooseId = (state = '', action) => {
	switch (action.type) {
		case 'SAVE_ID':
			return action._id
		default:
			return state;
	}
}

export const reduToStrategy = (state = [], action) => {
	switch (action.type) {
		case 'SAVE_Strategy':
			return action.data;
		default:
			return state;
	}
}

export const reduToTable = (state = '', action) => {
	switch (action.type) {
		case 'CHANGE_TABLE':
			return action.num;
		default:
			return state;
	}
}
export const reduToTable2 = (state = '', action) => {
	switch (action.type) {
		case 'CHANGE_TABLE2':
			return action.num;
		default:
			return state;
	}
}

export const reduToAlldata2 = (state = [], action) => {
	switch (action.type) {
		case 'SAVE_ALLDATA2':
			return action.alldata2;
		default:
			return state;
	}
}
export const reduToToken = (state = '', action) => {
	switch (action.type) {
		case 'SAVE_TOKEN':
			return action.token;
		default:
			return state;
	}
}
export const reduToShowStrategys = (state = '', action) => {
	switch (action.type) {
		case 'ShowStrategy':
			return {
				time: new Date(),
				_id: action._id
			}
		default:
			return state;
	}
}
export const reduToStrategyList = (state = [], action) => {
	switch (action.type) {
		case 'SAVESTRATEGYLIST':
			return {
				StrategyList: action.StrategyList,
				flag: action.flag
			}
		default:
			return state;
	}
}
export const reduToBtstrategyList = (state = [], action) => {
	switch (action.type) {
		case 'SAVEBTSTRATEGYLIST':
			return {
				BtstrategyList: action.BtstrategyList,
				flag: action.flag
			}
		default:
			return state;
	}
}
export const reduToShowStrategys2 = (state = '', action) => {
	switch (action.type) {
		case 'ShowStrategy2':
			return action.exchange;
		default:
			return state;
	}
}
export const reduToShowList = (state = '', action) => {
	switch (action.type) {
		case 'ShowList':
			return action.flag;
		default:
			return state;
	}
}
export const reduToShowCode = (state = '', action) => {
	switch (action.type) {
		case 'ShowCode':
			return action.id;
		default:
			return state;
	}
}

export const reduLog = (state = '', action) => {
	switch (action.type) {
		case 'ShowLog':
			return {
				time: new Date(),
				id: action.id,
				name: action.name
			}
			// return action.log;
		default:
			return state;
	}
}
export const reduPredict = (state = '', action) => {
	switch (action.type) {
		case 'showPredictRecord':
			return {
				time: new Date(),
				id: action.id,
				name: action.name,
				script_id: action.script_id
			}
		default:
			return state;
	}
}
export const reduPredictChart = (state = '', action) => {
	switch (action.type) {
		case 'showPredictChart':
			return {
				time: new Date(),
				id: action.id,
				name: action.name,
				script_id: action.script_id
			}
		default:
			return state;
	}
}


export const reduUpdateClass = (state = '', action) => {
	switch (action.type) {
		case 'UPDATECLASS':
			return new Date();
		default:
			return state;
	}
}

export const reduShowDataTitle = (state = '', action) => {
	switch (action.type) {
		case 'ShowDataTitle':
			return action.title;
		default:
			return state;
	}
}
export const reduShowMarketDetail = (state = '', action) => {
	switch (action.type) {
		case 'showMarketDetail':
			return action.marketDetail;
		default:
			return state;
	}
}

export const reduToShowModel = (state = '', action) => {
	switch (action.type) {
		case 'ShowModel':
			return {
				api: action.api,
				_id: action.id
			};
		default:
			return state;
	}
}

export const reduToAddShare = (state = '', action) => {
	switch (action.type) {
		case 'AddShare':
			return {
				api: action.api
			};
		default:
			return state;
	}
}

export const reduUpdateShare = (state = '', action) => {
	switch (action.type) {
		case 'UPDATESHARE':
			return new Date();
		default:
			return state;
	}
}
export const reduShowMyCode = (state = '', action) => {
	switch (action.type) {
		case 'showMyCode':
			return {
				time: new Date(),
				codeType: action.codeType
			}
		default:
			return state;
	}
}
export const reduToLoading = (state = '', action) => {
	switch (action.type) {
		case 'SHOW_LOADING':
			return {
				flag: action.flag,
				time: new Date()
			}
		default:
			return state;
	}
}
export const reduToRunBack = (state = '', action) => {
	switch (action.type) {
		case 'RUN_BACK':
			return {
				flag: action.flag,
				time: new Date()
			}
		default:
			return state;
	}
}