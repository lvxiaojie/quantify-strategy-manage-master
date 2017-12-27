import React, {
    Component
} from 'react';
import {
    queryString
} from '../../Redux/Action/shareAction'
import { Tabs } from 'antd';

import HistoryProfit from './HistoryProfit'
const TabPane = Tabs.TabPane;
class UserEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }
    componentWillMount() {

    }
    componentWillReceiveProps(next, ops) {
        this.setState({
            user: queryString()
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    render() {
        return (
            <div className="event-div">
                <span className='tab-header'>历史收益 - {this.state.user}</span>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="历史收益" key="1"><HistoryProfit user={this.state.user}/></TabPane>
                    <TabPane tab="代码统计" key="2"></TabPane>
                  </Tabs>
            </div>
        );
    }
}


export default UserEvent;