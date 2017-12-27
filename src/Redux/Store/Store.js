import {createStore,combineReducers,applyMiddleware} from 'redux'
import * as reducer from '../Reducer/Reducer'
import thunk from 'redux-thunk'
//����һ�� Redux store ���Դ��Ӧ�������е� state��Ӧ����Ӧ���ҽ���һ�� store��
var store = createStore(
	combineReducers(reducer),
	applyMiddleware(thunk)
)
export default store;
