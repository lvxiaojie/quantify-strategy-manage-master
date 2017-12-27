import React, {
  Component
} from 'react';
import { Layout } from 'antd';
const { Content, Footer } = Layout;
import DashMenu from './DashMenu'
import DashHeader from './DashHeader'
import './style/index.less'
import AlertApp from '../AlertApp'
class DashIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
            <Layout className="ant-layout-has-sider">
               <DashMenu />
              <Layout>
                <DashHeader />
                <Content className="index-content">
                   {this.props.children}
                </Content>
                <Footer className="index-foot">
                  Dashboard ©2017 Created by 2323176669@qq.com
                </Footer>
              </Layout>
            </Layout>
            <AlertApp/> 
            </div>

    );
  }
}


export default DashIndex;