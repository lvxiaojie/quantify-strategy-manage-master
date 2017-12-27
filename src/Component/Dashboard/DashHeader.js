import React, {
  Component
} from 'react';
import {
  Menu,
  Icon,
  Layout,
  Badge
} from 'antd';
const {
  Header
} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import screenfull from 'screenfull';
import {
  // queryString,
} from '../../Redux/Action/shareAction'
import avater from './imgs/logo.png';
import {
  hashHistory
} from 'react-router'
class DashHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
  }
  componentDidMount() {
    this.setState({
      user: localStorage.getItem("username")
    });
  };
  screenFull = () => {
    if (screenfull.enabled) {
      screenfull.request();
    }

  };
  exit = () => {
    localStorage.clear();
    clearInterval(this.timer);
    hashHistory.push('/Login');
    window.location.reload();
  }
  render() {
    return (
      <Header style={{ background: '#fff', padding: 0, height: 65 }} className="custom-theme" >
                <span className="trigger custom-trigger">TuringAlgo Dashboard</span>
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right'}}
                >
                    <Menu.Item key="full">
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
{/*                    <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item>*/}
                    <SubMenu 
                    title={<span className="avatar">
                    <img src={avater} alt="头像" />
                    <i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.state.user}</Menu.Item>
                            <Menu.Item>
                            <span onClick={this.exit}>
                            退出登录
                            </span>
                            </Menu.Item>
                        </MenuItemGroup>
{/*                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>*/}
                    </SubMenu>
                </Menu>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -42px;
                    }
                `}</style>
            </Header>
    );
  }
}


export default DashHeader;