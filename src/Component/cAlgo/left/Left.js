import React, {Component} from 'react'
import {connect} from 'react-redux'
import LeftTable from './LeftTable'
import Head from './Head'
class Left extends Component {
	render() {
		return (
			 <LeftTable/>
		)
	}
}
const mapStateToProps = (state) => {
	return {

	};
}
const mapDispatchToProps = (dispatch) => {
	return {

	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Left);