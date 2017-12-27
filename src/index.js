import React from 'react';
import ReactDOM from 'react-dom';
import IsLogin from './Component/IsLogin';
import store from './Redux/Store/Store'
import {
	Router,
	Route,
	hashHistory,
	IndexRoute
} from 'react-router';
import ContainerCAlgo from './Component/cAlgo/Container'
import Help from './Component/Help'
import DashIndex from './Component/Dashboard/DashIndex'
import DashMain from './Component/Dashboard/DashMain'
import UserModule from './Component/Dashboard/UserModule'
import WorkEvent from './Component/Dashboard/WorkEvent'
import HistoryProfit from './Component/Dashboard/HistoryProfit'
import UserEvent from './Component/Dashboard/UserEvent'
import {
	Provider
} from 'react-redux'
import Register from './Component/Register'
import './Style/Index.css';
import './Style/List.css';
import './Style/isLogin/font-awesome.min.css'
import './Style/Log.css';
import './Style/Loading.css'
import './Style/Help.css'
//监听state的变化
// store.subscribe(() => {
// 		console.log(store.getState());
// 	})
ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' component={IsLogin}/>
			<Route path='/Login' component={IsLogin}/>
			<Route path='/TurcAlgo' component={ContainerCAlgo}/>
			<Route path='/Register' component={Register}/>
			<Router path='/Help' component={Help}>
{/*			    <Route path='/' component={Help}/>
			    <IndexRoute component={Help}/>*/}
			    			</Router>
			<Router path='/Dashboard' component={DashIndex}>

			   <IndexRoute component={DashMain}/>
			   <Route path='/UserModule' component={UserModule}/>
			   <Route path='/WorkEvent/:name' component={WorkEvent}/>
			   <Route path='/HistoryProfit/:name' component={HistoryProfit}/>
			   <Route path='/UserEvent/:name' component={UserEvent}/>
			   
			</Router>
		</Router>
	</Provider>,
	document.getElementById('root')
);

//<Route path='/stockWire' component={StockWireApp}/>