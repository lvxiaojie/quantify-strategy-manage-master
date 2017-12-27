import React, {
    Component
} from 'react'
import {
    connect
} from 'react-redux'
import $ from 'jquery'
class ScreenLoading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none'
        }

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            display: nextProps.flag ? 'block' : 'none'
        })
    }
    render() {
        return (
            <div id="busyIcon" style={{display:this.state.display}}>
               <div className="container">
                   <div className="top"></div>
                   <div className="spinner">
                       <div className="bar1"></div>
                       <div className="bar2"></div>
                       <div className="bar3"></div>
                       <div className="bar4"></div>
                       <div className="bar5"></div>
                       <div className="bar6"></div>
                       <div className="bar7"></div>
                       <div className="bar8"></div>
                       <div className="bar9"></div>
                       <div className="bar10"></div>
                       <div className="bar11"></div>
                       <div className="bar12"></div>
                   </div>
                   <div className="base"></div>
               </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        flag: state.reduToLoading.flag,
    };
}

export default connect(mapStateToProps)(ScreenLoading);