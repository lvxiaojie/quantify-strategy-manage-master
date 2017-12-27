
import React, {
  Component
} from 'react';
import {
  Menu,
  Icon,
  Tooltip
} from 'antd';
const SubMenu = Menu.SubMenu;
import {
  getUserList,
    getClasss,
    getStatic
} from '../../Redux/Action/shareAction'
import {
  Link
} from 'react-router';
import $ from 'jquery'
class DashMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '1',
      openKeys: [],
      users: [],
      users2:[],
    }
  }
  beforeRender() {
    getUserList().then((users) => {
      getClasss().then((scripts) => {
        for (let x of users) {
          x.script = [];
          for (let y of scripts) {
            if (x.username === y.username) {
              x.script.push(y);
            }
          }
        }
        let have_script_users = []
        for (let x of users) {
          if (x.script.length > 0 || x.is_admin) {
            have_script_users.push(x);
          }
        } 

        let users2 =[];
        let data = getStatic();
        let strategys = data.strategys.concat(data.trueStras);
        for(let i=0;i<have_script_users.length;i++){
          for(let j=0;j<strategys.length;j++){
            if(strategys[j].username == have_script_users[i].username){
              users2.push(have_script_users[i]);
              break;
            }
          }
        }

        this.setState({
          users: have_script_users,
          users2:users2
        })
      })
    })
  }
  componentWillMount() {
    this.beforeRender();
  }
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
      openKeys: e.keyPath.slice(1),
    });
  }
  onToggle(info) {
    this.setState({
      openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
    });
  }
  componentDidMount() {
    $('#menu_div').css('height', document.documentElement.clientHeight);
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  onWindowResize() {
    $('#menu_div').css('height', document.documentElement.clientHeight);
  }
  handleClick = (e) => {
    console.log('Clicked: ', e);
    this.setState({ current: e.key });
  }
  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
  render() {

    return (
      <div id='menu_div' style={{ width: 200 ,backgroundColor:'#404040'}}>
      <Tooltip title="返回TurcAlgo" placement="right" >
       <Link to={'/TurcAlgo'}>
      <img alt="logo" src={require("../../../src/images/logo.png")} style={{width:'70px',margin: "-5px 0 0 1.5em"}}/> 
      </Link>
      </Tooltip>
      <Menu 
        openKeys={this.state.openKeys}
        // selectedKeys={[this.state.current]}
        onOpenChange={this.onOpenChange}
        onClick={(e)=>this.handleClick}
        style={{ width: 200}}
        mode="inline"
        theme="dark"
      >
        <Menu.Item>
            <Link to={'/Dashboard'}><Icon type="mobile" /><span className="nav-text">首页</span></Link>
        </Menu.Item>
        <Menu.Item>
           <Link to={'/UserModule'}><Icon type="team" /><span className="nav-text">用户模块</span></Link>
        </Menu.Item>
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>工作事件</span></span>}>
        {this.state.users.map((x,index)=>{
          return(
             <Menu.Item key={index}>
             <Link to={'/WorkEvent/' + x.username}>
             {x.username}
             </Link>
             </Menu.Item>
            )
        })}
        </SubMenu>
        
        <SubMenu key="sub4" title={<span><Icon type="area-chart" /><span>历史收益</span></span>}>
        {this.state.users2.map((x,index)=>{
          return(
             <Menu.Item key={index}>
             <Link to={'/HistoryProfit/' + x.username}>
             {x.username}
             </Link>
             </Menu.Item>
            )
        })}
        </SubMenu>



{/*        <SubMenu key="sub3" title={<span><Icon type="edit" /><span>历史收益</span></span>}>
        {this.state.users.map((x,index)=>{
          return(
             <Menu.Item key={index}>
             <Link to={'/UserEvent/' + x.username}>
             {x.username}
             </Link>
             </Menu.Item>
            )
        })}
          <Menu.Item key="5">选项5</Menu.Item>
          <Menu.Item key="6">选项6</Menu.Item>
          <SubMenu key="sub4" title="三级导航">
            <Menu.Item key="7">选项7</Menu.Item>
            <Menu.Item key="8">选项8</Menu.Item>
          </SubMenu>
        </SubMenu>*/}

      </Menu>
 
          

          </div>
    );
  }
}


export default DashMenu;