
// import React,{Component} from 'react'
// import {alertMessage,changeTable2,ShowList,showModel} from '../../../Redux/Action/Action'
// import {connect} from 'react-redux'
// import $ from 'jquery'
// import '../../../Style/LeftList.css'
// import {getModels,delModel} from '../../../Redux/Action/shareAction'
// const divS = {
// 	backgroundColor: '#292929',
// 	border: '1px solid #292929',
// 	marginTop: '5px',
// 	height:'auto',
// 	borderRadius:'2px',
// 	color:'#fff',
// }
// let ok = true;
// let _this;
// class Share extends Component{
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			models: [],
// 			delId: '',
// 			delName: '',
// 		};
// 	}
// 	componentWillMount() {
// 		getModels(this.props.api).then((data) => {
// 			this.setState({
// 				models: data
// 			})
// 		})
// 	}
// 	onMouseOverBox(boxId, e) {
// 		$('#' + boxId).attr('class', 'ModelStyle boxShadow');
// 		// e.target.className = "ModelStyle boxShadow"
// 	}
// 	onMouseOutBox(boxId, e) {
// 		$('#' + boxId).attr('class', 'ModelStyle smallfont');
// 		// e.target.className = "ModelStyle smallfont"
// 	}

// 	componentWillReceiveProps(getProp) {
// 		getModels(this.props.api).then((data) => {
// 			this.setState({
// 				models: data
// 			})
// 		})
// 	}
// 	delModel(id, title, event) {
// 		this.setState({
// 			delId: id,
// 			delName: title
// 		})
// 		event.stopPropagation();
// 	}
// 	delModelOk() {
// 		if (delModel(_this.props.api, _this.state.delId)) {
// 			_this.props.dispatch(alertMessage('删除成功'));
// 			let models = this.state.models;
// 			for(let i = 0;i< models.length;i++){
// 				if(models[i]._id == _this.state.delId){
// 					models.splice(i,1);
// 					break;
// 				}
// 			}
// 			_this.props.dispatch(ShowList('id'));
// 			this.setState({
// 				models: models
// 			});
// 		} else {
// 			_this.props.dispatch(alertMessage('删除失败'));
// 		}
// 	}
// 	showModelDetail(api, id) {
// 		_this.props.dispatch(showModel(api, id));
// 		_this.props.dispatch(ShowList('model'));
// 	}
// 	render(){
// 		 const modalStyle = {
// 			top: '10%',
// 			left: document.body.clientWidth>900?document.body.clientWidth / 2 - 200:'0',
// 			right: 'auto',
// 			bottom: 'auto',
// 			width:document.body.clientWidth>900?400:'100%',
// 			color:'#fff'
// 		}
// 		 _this = this;
// 		 let modelId = _this.props.api + '_delShare';
// 		return (
// 		<div style={divS}>
// 	  		<ul style={{overflow:'hidden',padding:0}}>
// 	  		  {
// 			    this.state.models.map(function(x, index) {
// 			    	let boxId = _this.props.api + index;
// 			    	return (
// 			    		<li className='ModelStyle smallfont' id={boxId} key={index} 
// 			    		onMouseOut={_this.onMouseOutBox.bind(null,boxId)}
// 		              onMouseOver={_this.onMouseOverBox.bind(null,boxId)}
// 		              onClick={_this.showModelDetail.bind(null,_this.props.api,x._id)}>
// 	                      <i className="fa fa-remove delModel" onClick={_this.delModel.bind(_this,x._id,x.title)}
// 	                       data-toggle="modal" data-target={"#" + modelId} 
// 	                       title="删除" onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#FF6666'}}></i><br/><br/>
// 			                  {x.title}<br/>
// 			                  {x.author}
// 			                  <i style={{color:'#fff'}}>发布于&nbsp;{x.date}</i><br/><br/>
// 		              </li>
// 			    	)
// 			    })
// 	  		  }
// 		     </ul>
// 		<div style={{top:'20%',left:document.body.clientWidth<992?'0':'30%'}} className="modal fade" id={modelId}  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                   <div className="col-md-8 col-sm-12 modal-content" ref="choose" style={{backgroundColor: "#333",height:''}}>
//                     <div className="modal-body modalBody">
//                     您确定要删除<i style={{color:'#FF6666'}}> {this.state.delName} </i>吗?
//                     </div>
//                     <div className="modal-footer" style={{borderTop:'0px solid #525252'}}>
//                       <button type="button" className="btn btn-default" data-dismiss="modal">关闭
//                       </button>
//                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.delModelOk.bind(this)}>
//                         确定
//                        </button>
//                     </div>
//                  </div>
//                </div>
//            </div>
// 		</div>
// 		)
// 	}
// }
// const mapStateToProps =(state)=>{
// return {

// };
// }
// const mapDispatchToProps =(dispatch)=>{
// 	return {
		
// 	};
// }
// export default connect(mapStateToProps)(Share);
