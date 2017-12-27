import React,{Component} from 'react'
import {connect} from 'react-redux'
import $ from 'jquery'
class Loading extends Component{
	constructor(props) { 
		super(props);
		this.state ={

		}
	
	}
	render(){
		const loadFont = {
			fontSize: this.props.size || '10px'
		}
		return (
			<div className="loader font1">
				      <span style={loadFont}>L</span>
                      <span style={loadFont} className="span2">O</span>
                      <span style={loadFont} className="span3">A</span>
                      <span style={loadFont} className="span4">D</span>
                      <span style={loadFont} className="span5">I</span>
                      <span style={loadFont} className="span6">N</span>
                      <span style={loadFont} className="span7">G</span>
			</div>
		)
	}
}
const mapStateToProps =(state)=>{
	return {

	};
}

export default connect(mapStateToProps)(Loading);