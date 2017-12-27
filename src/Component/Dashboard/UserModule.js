import React, {
  Component
} from 'react';
import {
  alertMessage,
} from '../../Redux/Action/Action'
import {
  getUserList,
  givePermission,
  deletUser,
} from '../../Redux/Action/shareAction'
import {
  connect
} from 'react-redux'
import {
  Modal,
  message
} from 'antd';
const confirm = Modal.confirm;
class UserModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      delName: ''

    };
  }
  show_notification = (type, mgs) => {
    switch (type) {
      case 'success':
        message.success(mgs);
        break;
      case 'error':
        message.error(mgs);
        break;
      default:
        message.warning(mgs);
        break;
    }
  }
  componentWillMount() {
    getUserList().then((data) => {
      for (let i in data) {
        if (data[i].username === 'admin') {
          data.splice(i, 1);
        }
      }
      this.setState({
        users: data
      })
    })
  }
  changetype(type) {
    this.setState({
      type: type
    })
  }
  changeExchange(exchange) {
    this.setState({
      exchange: exchange
    })
  }

  upData() {
    // let UserLists=getUserList();
    getUserList().then((data) => {
      for (let i in data) {
        if (data[i].username === 'admin') {
          data.splice(i, 1);
        }
      }
      this.setState({
        users: data
      })
    })
  }

  give = (name, is_zijin) => {
    if (is_zijin) {
      this.show_notification('error', '该用户已获得权限');
      return;
    }
    if (givePermission(name, 1)) {
      this.show_notification('success', '操作成功');
      this.upData();
    } else {
      this.show_notification('error', '操作失败');
    }
  }
  back = (name, is_zijin) => {
    if (!is_zijin) {
      this.show_notification('error', '该用户权限已被收回');
      return;
    }
    if (givePermission(name, 0)) {
      this.show_notification('success', '操作成功');
      this.upData();
    } else {
      this.show_notification('error', '操作失败');

    }
  }
  delete() {
    if (deletUser(this.state.delName)) {
      this.upData();
      this.show_notification('success', '删除成功');

    } else {
      this.show_notification('error', '删除失败');
    }
  }
  delUser(username) {
    this.setState({
      delName: username
    })
    confirm({
      title: '',
      content: '你确定要删除 ' + username + ' 吗',
      onOk() {
        this.delete();
      },
      onCancel() {
        // console.log('cancel')
      },
    });
  }
  render() {
    const delmodalStyle = {
      top: '10%',
      left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 200 : '0',
      right: 'auto',
      bottom: 'auto',
      width: document.body.clientWidth > 900 ? 400 : '100%'
    }
    return (
      <div style={{backgroundColor:'#ececec'}} className="user-table-div">

              <div>
                  <table className='table table-condensed' id='user_table'>
                    <thead>
                      <tr>
                        <th>用户名</th>
                        {document.body.clientWidth>900?<th>邮箱</th>:null}
                        <th>权限</th>
                        <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                      {
                    this.state.users.map((x,index)=>{
                      
                      return(               
                        <tr key={index}>                         
                          <td>{x.username}</td>
                          {document.body.clientWidth>900?<td>{x.email}</td>:null}
                          <td>{x.is_zijin===true?'true':'false'}</td>
                          <td>
                            <div className="dropdown">
                              <button id="dLabel" className="btn dropdown-toggle dash_toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              操作<span className="caret"></span></button>
                              <ul className="dropdown-menu" aria-labelledby="dLabel" style={{backgroundColor:'#666',minWidth:'80px',left:'0'}}>
                                 <li style={{width:'100px'}} role="presentation" id="user_action">
                                    <a style={{backgroundColor:'#666'}} role="menuitem" tabIndex="-1" onClick={this.give.bind(null,x.username,x.is_zijin)} onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}}>赋予权限</a>
                                    <a style={{backgroundColor:'#666'}} role="menuitem" tabIndex="-1" onClick={this.back.bind(null,x.username,x.is_zijin)} onMouseOut={(e)=>{e.target.style.color = '#fff'}} onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}}>收回权限</a>
                                   
                                    <a style={{backgroundColor:'#666'}} role="menuitem" tabIndex="-1" 
                                    // data-toggle="modal" data-target='#delUser_dash' 
                                    onClick={(e)=>this.delUser(x.username)} 
                                    onMouseOut={(e)=>{e.target.style.color = '#fff'}} 
                                    onMouseOver={(e)=>{e.target.style.color = '#88e7ff'}}>删除用户</a>
                                  
                                 </li>
                              </ul>
                          </div>
                          </td>
                        </tr>
                        
                        )
                    })
                    
                  }
                  </tbody>
                  </table>
              </div>

                       <div style={delmodalStyle} className="modal fade in" id='delUser_dash'  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="col-md-8 col-sm-12 modal-content" ref="choose" style={{backgroundColor: "#333"}}>
                    <div className="modal-body modalBody">
                    您确定要删除<i style={{color:'#FF6666'}}> {this.state.delName} </i>吗?
                    </div>
                    <div className="modal-footer" style={{borderTop:'0px solid #525252'}}>
                      <button type="button" className="btn btn-default" data-dismiss="modal">关闭
                      </button>
                       <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.delete.bind(null)}>
                        确定
                       </button>
                    </div>
                 </div>
               </div>
           </div>

          </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {

  };
}

export default connect(mapStateToProps)(UserModule);