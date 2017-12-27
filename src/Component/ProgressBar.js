import React,{Component} from 'react'
import {connect} from 'react-redux'
import $ from 'jquery'
import LaserBeam from 'react-laser-beam';
class ProgressBar extends Component{
	constructor(props) { 
		super(props);
		this.state ={
			showProgress:false
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			showProgress:nextProps.flag
		})
	}
	render(){
		return (
              <LaserBeam show={this.state.showProgress} />
		)
	}
}
const mapStateToProps =(state)=>{
	return {
          flag:state.reduProgress.flag
	};
}

export default connect(mapStateToProps)(ProgressBar);