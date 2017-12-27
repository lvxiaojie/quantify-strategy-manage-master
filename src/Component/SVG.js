import React,{Component} from 'react'
import '../Style/SVG.css'
import {connect} from 'react-redux'
import $ from 'jquery'
class SVG extends Component{
	constructor(props) { 
		super(props);
		this.state ={

		}
	
	}
	render(){
		return (
			        
					<label className="input__label input__label--chisato" htmlFor="input-13">
						<span className="input__label-content input__label-content--chisato"
						 data-content={this.props.title}
						 >{this.props.title}</span>
					</label>
			
		)
	}
}
const mapStateToProps =(state)=>{
	return {

	};
}

export default connect(mapStateToProps)(SVG);