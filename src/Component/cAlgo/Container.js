import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import Left from './left/Left'
import Right from './right/Right'
import Head from './left/Head'
import {
	hashHistory
} from 'react-router'
import {
	alertMessage
} from '../../Redux/Action/Action'
import {
	gateways
} from '../../Redux/Action/shareAction'
import AlertApp from '../AlertApp'
import ScreenLoading from '../ScreenLoading'
import Log from '../Log'
import UserList from './left/UserList'
import $ from 'jquery'
import About from './left/About.js'
import MarketChart from './right/MarketChart'
import ProfitChart from './right/ProfitChart'
import RunChart from './right/RunChart'
import TradeDetail from './right/TradeDetail'
import TradeAnalysis from './right/TradeAnalysis'
import ProgressBar from '../ProgressBar'
import PredictRecord from '../PredictRecord'
import PredictChart from '../PredictChart'
import AddPredict_Code from './right/AddPredict_Code'
import ChangePassword from './left/ChangePassword'
import InviteList from './left/InviteList'

class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: true
		}
	}
	componentWillMount() {
		// this.checkDeveloperTools();
		let token = localStorage.getItem("token");
		if (token == "" || token == undefined) {
			this.setState({
				isLogin: false
			})
			hashHistory.push('/Login');
		} else {
			gateways('CSRPME');
			gateways('OKCoin');
			this.setState({
				isLogin: true
			})
		}
		document.body.style.backgroundColor = '#3a3a3a'
	}
	componentDidMount() {
		// console.warn(document.cookie)
		$('.main_body').each(function(index, el) {
			$(this).css('maxHeight', $(window).height() * 0.85);
			// console.log(el);
		});
		document.body.style.backgroundColor = '#3a3a3a';
		$('.rightDiv').css('width', $(window).width() > 880 ? $(window).width() - 385 : $(window).width() * 0.992);
		window.addEventListener('resize', this.onWindowResize.bind(this))
	}
	componentWillUnmount() {
		document.body.style.backgroundColor = ''
	}
	onWindowResize() {
		if ($(window).width() < 900) {
			$('.rightDiv').css('width', $(window).width());
			$('.modal').each(function(index, el) {
				$(this).css('left', 0);
				$(this).css('width', $(window).width());
			});
			return;
		}
		setTimeout(() => {
				$('.rightDiv').css('width', $(window).width() > 880 ? $(window).width() - 385 : $(window).width() * 0.992);
				$('.modal').each(function(index, el) {
					// console.log(el.id,el.style.width,parseInt(el.style.width, 10));
					$(this).css('left', document.body.clientWidth / 2 - parseInt(el.style.width, 10) / 2);
				});
			}, 100)
			// this.checkDeveloperTools();
	}
	checkDeveloperTools() {
		if (localStorage.getItem("username") == 'admin') {
			return;
		}
		if ((window.outerHeight - window.innerHeight) > 200 || (window.outerWidth - window.innerWidth) > 200) {
			window.close();
			window.location = "about:blank";
		}
	}
	render() {
		return (
			<div id="root_div">
				{this.state.isLogin?
					<div>
		   <div>
				     <div className='headDIv noPrintDiv'>
					    <Head/>
				     </div>
				    <div className='leftDiv noPrintDiv'>
						<Left/>
					</div>

					<div className='rightDiv' style={{width:$(window).width() > 880 ? $(window).width() - 400 : $(window).width()*0.992}}>
						<Right/>
					</div>
			</div>
			      <ChangePassword />
	              <AddPredict_Code />
                   <ScreenLoading />
				    <AlertApp/>	
					<Log/>
					{localStorage.getItem("username")=='admin'?<UserList />:null}
					{localStorage.getItem("username")=='admin'?<InviteList />:null}
					<About />
					<ProgressBar />
					 <PredictRecord />
					 <PredictChart />
				</div>
					:null}	
	</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {

	};
}
export default connect(mapStateToProps)(Container);

// col-md-offset-1