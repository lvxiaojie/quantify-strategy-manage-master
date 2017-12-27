// import React,{Component} from 'react'
// import {connect} from 'react-redux'
// import {ShowList,addShare} from '../../../Redux/Action/Action'
// import $ from 'jquery'
// import Loading from '../../Loading.js'
// import Share from './Share'
// const ulStyle = {
// 	height: document.documentElement.clientHeight - 74,
// }
// let Prop;
// let _this;
// let data = [
// 	'量化入门', //model_quants
// 	'金融数据', //model_objects
// 	'量化策略', //model_methods
// 	'量化模型', //model_examples
// 	'机器学习', //model_mls
// ];
// let api = [
// 	'model_quants',
// 	'model_objects',
// 	'model_methods',
// 	'model_examples',
// 	'model_mls',
// ];
// let ok = false;
// class Modelshare extends Component {

// 	constructor(props){
// 		super(props);
// 		this.state = {
// 			models : [],
// 			click:'',
// 			update:false
// 		}
// 	}
// 	putScreen() {
// 		let models = [];
// 		for (let i = 0; i < data.length; i++) {
// 			models.push({
// 				model: data[i],
// 				api: api[i]
// 			})
// 		}

// 		this.setState({
// 			models: models,
// 			click: ''
// 		})
// 	}
// 	componentWillMount() {
// 			this.putScreen();
// 	}
// 	componentWillReceiveProps(nextProps) {
// 		this.setState({
// 			update: !this.state.update
// 		})
// 	}
// 	onMouseOut2(id){
// 		// e.target.style.backgroundColor='#3b3b3b';
// 		$('#model'+id).css('backgroundColor', '#3b3b3b');
// 	}
// 	onMouseOver2(id){
// 		// e.target.style.backgroundColor='#525252';
// 		$('#model'+id).css('backgroundColor', '#525252');

// 	}
// 	show(index, e) {
// 		for (let i = 0; i < _this.state.models.length; i++) {
// 			if (i != index) {
// 				$('#sharePlus' + i).prop("class", "fa fa-plus-circle");
// 				$('#shareList' + i).removeClass('in');
// 			}
// 		}
// 		ok = true;
// 		if (e.target.className == 'fa fa-plus-circle') {
// 			e.target.className = 'fa fa-minus-circle';
// 		} else {
// 			e.target.className = 'fa fa-plus-circle';
// 		}
// 	}
// 	addModel(api){
// 		_this.props.dispatch(addShare(api));
// 		_this.props.dispatch(ShowList('addShare'));
// 	}
// 	render(){

// 		 _this = this;
// 		Prop = this.props;
// 		const astyle = {
// 			color: "#fff",
// 			// cursor: "pointer",
// 			marginLeft: '35%',
// 			textDecoration: 'none',
// 		}
// 		let classs = this.state.models.map(function(x,index) {

// 			let _id = "shareList" + index;
// 			return (
// 			<li  key={index}>
// 			<div className='listback'
// 			onMouseOut={_this.onMouseOut2.bind(null,index)}
// 		    onMouseOver={_this.onMouseOver2.bind(null,index)}
// 		    id={'model'+index}
// 		    >
// 		       <i id={'sharePlus' + index} className="fa fa-plus-circle" onClick={_this.show.bind(null,index)} 
// 		       data-toggle="collapse" data-target={"#" + _id} style={{marginLeft:'5px',cursor: "pointer",color:'#ccc'}}></i>
// 				<a style={astyle}>
// 					{x.model}	
// 				</a>
// 				<i className='fa fa-plus' style={{float:'right',marginRight:'5px',lineHeight:"40px",cursor:'pointer'}} 
// 				title="添加" onClick={_this.addModel.bind(null,x.api)}
// 				onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}}></i>
// 			</div>	
//              <div id={_id} className="collapse" style={{marginLeft:'5%'}}>

// 			   <Share api={x.api} update={_this.state.update}/>
	
//              </div>
// 		   </li>
// 			);
// 		});
// 		return(
// 		<div>
// 		    <div className='konge'></div>
// 			<div className='ulStyle' style={ulStyle}>{classs}</div>	    
// 	    </div>
// 			)
// 	}

// }
// const mapStateToProps = (state) => {
// 	return {
// 		update:state.reduUpdateShare
// 	};
// }
// const mapDispatchToProps = (dispatch) => {
//  return{
	
// 	};
// }
// export default connect(mapStateToProps)(Modelshare);
