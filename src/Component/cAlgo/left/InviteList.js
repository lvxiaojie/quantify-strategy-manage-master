import React, {
	Component
} from 'react'
import {
	alertMessage,
	saveToChooseDate,
	saveToChooseId,
	RefreshList,
	updateClass,
} from '../../../Redux/Action/Action'
import {
	connect
} from 'react-redux'
import AlertApp from '../../AlertApp'
import {
	// getInviteList,
	givePermission,
	takeBack,
	deletUser,
	getActive,
	addActive,
	delActive
} from '../../../Redux/Action/shareAction'
import $ from 'jquery'
import {
	Popconfirm
} from 'antd';
var _this;
class InviteList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inviteList: [],
			delCode: ""
		};
	}
	componentWillReceiveProps() {

	}
	beforeRender() {
		getActive().then((data) => {
			this.setState({
				inviteList: data
			})
		})
	}
	componentWillMount() {
		this.beforeRender();
	}
	addCode(){
		addActive().then(() => {
			this.beforeRender();
		})
	}
	del(code) {
		this.setState({
			delCode: code
		})
	}
	delete() {
		delActive(this.state.delCode).then(()=>{
			this.beforeRender();
		})
	}
	render() {
		const modalStyle = {
			top: '5%',
			left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 300 : '0',
			right: 'auto',
			bottom: 'auto',
			width: document.body.clientWidth > 900 ? 600 : '100%',
		}
		const delmodalStyle = {
			top: '10%',
			left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 200 : '0',
			right: 'auto',
			bottom: 'auto',
			width: document.body.clientWidth > 900 ? 400 : '100%'
		}
		const btnBg = {
			border: '0px',
			backgroundColor: '#525252',
			color: '#fff',
			marginTop: '0px',
			height: '24px',
			lineHeight: '12px',
			fontSize: '9px',
			float: 'right',
			marginRight: '10px',
			marginBottom: '10px'
		}
		return (

			<div>
				<div style={modalStyle} className="modal fade" id="invitationCode" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
					<div className="modal-dialog" role="document">
						<div className="modal-content" style={{background:'rgb(51,51,51)',color:'#000'}}>
							<div className="modal-header" style={{borderBottom:"2px solid transparent",background: '#727373',color:'#fff',padding:'12px',borderTopRightRadius:'5px',borderTopLeftRadius: '5px'}}>
								<i type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true" className='closeBtn' style={{fontSize:'20px',cursor:'pointer'}}>&times;</span></i>
								<h5 className="modal-title" style={{color:'#fff'}}>邀请码</h5>
								</div>
							<div className="modal-body main_body" style={{color:'#cbcbcb',height:'460px',overflow:'auto'}}>
							<span className='btn btn-default' style={btnBg}
							onMouseOut={(e)=>{e.target.style.backgroundColor = '#525252'}} 
                             onMouseOver={(e)=>{e.target.style.backgroundColor = '#888'}}
							 onClick={(e)=>this.addCode(e)}>随机生成邀请码</span>
							     <table style={{marginTop:'10px',width:'96%',marginLeft:'2%',backgroundColor:'#3b3b3b'}} 
                                   className="table table-bordered">
                                   <thead>

                                   </thead>
                                  <tbody className="model_info_tbody">
                          
                                    {
                                        this.state.inviteList.map((x,index)=>{
                                            return (
                                               <tr key={index}>
                                                <td>{x.active_code}</td>
                                                <td>
                                                
                                                <i className="fa fa-remove pointer" 
                                                data-toggle="modal" data-target="#delInvite"
                                                onMouseOut={(e)=>{e.target.style.color = '#fff'}} 
                                                onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}}
                                                onClick={()=>this.del(x.active_code)}
                                                >
                                                </i>
                                               
                                                </td>
                                               </tr>
                                                )
                                        })
                                    }
                      
                                     </tbody>
                                     </table>

							</div>
						</div>
					</div>
				</div>
	       <div style={delmodalStyle} className="modal fade in" id='delInvite'  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="col-md-8 col-sm-12 modal-content" ref="choose" style={{backgroundColor: "#333"}}>
                    <div className="modal-body modalBody">
                    您确定要删除<i style={{color:'#FF6666'}}> {this.state.delCode} </i>吗?
                    </div>
                    <div className="modal-footer" style={{borderTop:'0px solid #525252'}}>
                      <button type="button" className="btn btn-default" data-dismiss="modal">关闭
                      </button>
                       <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e)=>this.delete(e)}>
                        确定
                       </button>
                    </div>
                 </div>
               </div>
           </div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	};
}

export default connect(mapStateToProps)(InviteList); //,{ alertHide }