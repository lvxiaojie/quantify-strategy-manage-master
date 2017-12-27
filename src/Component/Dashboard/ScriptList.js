import React, {
    Component
} from 'react';
import {
    Table
} from 'antd';
import {
    formatDate,
    queryString,
    randomNum
} from '../../Redux/Action/shareAction'
class ScriptList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }
    componentWillMount() {
        this.setState({
            user: queryString()
        })
    }
    componentWillReceiveProps(next,ops) {
        this.setState({
            user: queryString()
        })
    }

    render() {
        return (
            <div className="event-div">
                {/*<h3>{this.state.user}</h3>*/}
            </div>
        );
    }
}


export default ScriptList;