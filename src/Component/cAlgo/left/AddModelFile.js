import React,{Component} from 'react'
import {alertMessage,saveToChooseDate,saveToChooseId,RefreshList,updateClass} from '../../../Redux/Action/Action'
import {connect} from 'react-redux'
import {
addClass,
saveModelFile,
getDay
} from '../../../Redux/Action/shareAction'
import '../../../Style/SVG.css'
import $ from 'jquery'
import SVG from '../../SVG'
const input = {
  width: 'auto',
  width: "66%",
  backgroundColor: '#333',
  border: '2px solid #333',
  padding: '0'
}
const inputFile = {
  // width: 'auto',
  backgroundColor: '#333',
  border: '0px solid #b5b5b5',
  display:'inline',
  boxShadow:'none'
}
const input2 = {
	width:'49%',
	marginRight:'1%'
}
const input4 = {
	width:document.body.clientWidth<992?'49%':'24%',
	marginRight:'1%'
}
class AddModelFile extends Component{
	constructor(props) {
		super(props);
		this.state = {
			choose:'',
			file_size:'',
		};
	}
	componentWillReceiveProps(){
	}
	add(e){
		e.preventDefault();
		$('.modal-backdrop').eq(1).remove();
		$('#myModal2').addClass('in');
		$('#myModal2').css('display','block');
		$('#addModelFile').css('display', 'none');
		$('#addModelFile').removeClass('in');
	}
	close() {
		$(" #mode_file ").val('');
		$('#add_model_name').text('');
		$('#myModal2').addClass('in');
		$('#myModal2').css('display','block');
		this.setState({
			file_size: ''
		});
	}
	handleClick(e){
		this.showTitle(e.target.id)
	}
	showTitle(id) {
		let inputValue = $('#' + id).val();
		let father = $('#' + id).parent();
		if (inputValue != '') {
			father.addClass("input--filled");
		} else {
			father.removeClass("input--filled");
		}
	}
	componentDidMount() {
		this.showTitle('model_author');
		this.showTitle('model_date');

	}
	clean() {
		$(".input--chisato").each(function(i) {
			$(this).removeClass("input--filled");
		});
		$("#addModelFile")[0].reset()
		$("#model_author").parent().addClass('input--filled');
		$("#model_date").parent().addClass('input--filled');
		// $('#mode_file').css('border', '0px solid #b5b5b5');
		$('#add_model_name').text('');
		this.setState({
			file_size:''
		})
	}
	changeModelFile() {
		if ($(" #mode_file ")[0].files[0] != undefined) {
			$('#add_model_name').text($(" #mode_file ")[0].files[0].name);
			let size = $(" #mode_file ")[0].files[0].size;
			size = size < 1048576 ? Number(size / 1024).toFixed(2) + 'KB' : Number(size / 1024 / 1024).toFixed(2) + 'MB'
			this.setState({
					file_size: size
				})
				// $('#mode_file').css('border', '2px solid #da6484')
		} else {
			$('#add_model_name').text('');
			this.setState({
					file_size: ''
				})
				// $('#mode_file').css('border', '0px solid #b5b5b5')
		}

	}
	render(){
    let options = [
       {value:'经典时间序列自回归模型',type:'regress'},//
       {value:'机器学习分类模型',type:'machine_classify'},
       {value:'机器学习回归模型',type:'machine_regress'},
       {value:'金融技术指标回归模型',type:'finance_regress'}
];
		 const modalStyle = {
			top: '5%',
			left: document.body.clientWidth>900?document.body.clientWidth / 2 - 300:'0',
			right: 'auto',
			bottom: 'auto',
			width:document.body.clientWidth>900?600:'100%',
		}
		return (
			<div>
				<form onSubmit={(e)=>this.add(e)} 
				style={modalStyle} 
				className="modal fade" id="addModelFile" tabIndex="-1" role="dialog"
				 aria-labelledby="myModalLabel" aria-hidden="false">
					<div className="modal-dialog">
						<div className="col-md-8 col-xs-12  modal-content" ref="choose" style={{backgroundColor: "#333",width:'100%'}}>
							<div id='formBody' className="modal-body main_body" style={{color:'#fff',fontSize:'13px',overflow:'auto'}}>
										
                          <div className="form-group" >
                                <select id='model_type' style={{backgroundColor:'#525252',color:"#fff",width:'auto',display:"inline"}}  
                                className="" onChange={(e)=>{this.setState({choose:e.target.value})}} value={this.state.choose}>
                                {options.map((x,index)=>{
                                    return(
                                      <option key={index}>{x.value}</option>
                                    )
                                  })}
                                    </select>                  
                           </div>

				<span className="input input--chisato"  style={input4} >
					<input className="input__field input__field--chisato" type="text"  id='model_name' required="required" onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}/>
					<SVG title='模型名称 *'/>
				</span>
   
              	<span className="input input--chisato"  style={input4} >
					<input className="input__field input__field--chisato" type="text" id='model_version' required="required" onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}/>
					<SVG title='模型版本 *'/>
				</span>
       
              	<span className="input input--chisato"   style={input4} >
					<input className="input__field input__field--chisato" type="text" defaultValue={localStorage.getItem("username")}  id='model_author' required="required" onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}/>
					<SVG title='模型作者 *'/>
				</span>

				<span className="input input--chisato"   style={input4} >
					<input className="input__field input__field--chisato" type="text" defaultValue={getDay(0)}  id='model_date' required="required" onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}/>
					<SVG title='日期 *'/>
				</span><br/>

               	<span className="input input--chisato" style={{width:'99%'}}>
					<input className="input__field input__field--chisato" type="text" id='model_describe' required="required" onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='模型描述 *'/>
				</span><br/>

    {this.state.choose == '机器学习分类模型' ?
          <i>
              	<span className="input input--chisato" style={input2}>
					<input className="input__field input__field--chisato" type="number" id='feature_num' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='训练数据集特征数目'/>
				</span>

              	<span className="input input--chisato" style={input2}>
					<input className="input__field input__field--chisato" type="text" id='data_feature' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='训练数据集特征项'/>
				</span>
    
              	<span className="input input--chisato" style={input2}>
					<input className="input__field input__field--chisato" type="number" id='data_num' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='训练数据集数据数目'/>
				</span>
     
              	<span className="input input--chisato" style={input2}>
					<input className="input__field input__field--chisato" type="text" id='data_date' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='训练数据集最新日期'/>
				</span>
    
              	<span className="input input--chisato" style={input2}>
					<input className="input__field input__field--chisato" type="text" id='model_target' required="required" onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='模型预测目标 *'/>
				</span>
  
              	<span className="input input--chisato" style={input2}>
					<input className="input__field input__field--chisato" type="text" id='model_accuracy' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='模型训练预测准确率'/>
				</span>
  
              	<span className="input input--chisato" style={input4}>
					<input className="input__field input__field--chisato" type="text" id='model_hit_rate' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='模型预测命中率'/>
				</span>

              	<span className="input input--chisato" style={input4}>
					<input className="input__field input__field--chisato" type="number" id='type_num' required="required" onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='预测分类个数 *'/>
				</span>

              	<span className="input input--chisato" style={input4}>
					<input className="input__field input__field--chisato" type="text" id='quantity_difference' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='预测分类量差'/>
				</span>

              	<span className="input input--chisato" style={input4}>
					<input className="input__field input__field--chisato" type="number" id='model_interval' required="required" onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)} />
					<SVG title='预测分类间隔时长 *'/>
				</span>

	   </i>	:		

				<span className="input input--chisato" style={input2}>
					<input className="input__field input__field--chisato"  type="text" id='model_target' required="required" onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='模型预测目标 *'/>
				</span>

				}
  
                       <br/>

                     <div>
                          模型文件* 
                            <input type="file" style={inputFile} id='mode_file' required="required" 
                            onChange={(e)=>this.changeModelFile(e)}></input>
                            <i style={{marginLeft:'10px',color:"#da6484"}}>{this.state.file_size}</i>
                     </div>



							</div>
							<div className="modal-footer" style={{borderTop:'0px solid #525252',paddingTop:'0px'}}>
								<button type="button" className="btn btn-warning" onClick={(e)=>this.clean()}>
								    重置
								</button>
								<button type="button" className="btn btn-default" 
								 data-dismiss="modal" 
								 onClick={(e)=>this.close(e)}
								 // data-toggle="modal" data-target="#myModal2"
								 >关闭
								</button>
								<button  type="button" type="submit" className="btn btn-primary"
								// data-toggle="modal" data-target="#myModal2"
								>
									确定
								</button>
							</div>
						</div>
					</div>

					</form>
				{/*为了表格id显示中文的键值对*/}
					<div style={{display:'none'}}>
					              	<span className="input input--chisato" style={input2}>
					<input className="input__field input__field--chisato" type="number" id='feature_num' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='训练数据集特征数目'/>
				</span>

              	<span className="input input--chisato" style={input2}>
					<input className="input__field input__field--chisato" type="text" id='data_feature' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='训练数据集特征项'/>
				</span>
    
              	<span className="input input--chisato" style={input2}>
					<input className="input__field input__field--chisato" type="number" id='data_num' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='训练数据集数据数目'/>
				</span>
     
              	<span className="input input--chisato" style={input2}>
					<input className="input__field input__field--chisato" type="text" id='data_date' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='训练数据集最新日期'/>
				</span>
    
              	<span className="input input--chisato" style={input2}>
					<input className="input__field input__field--chisato" type="text" id='model_target' required="required" onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='模型预测目标 '/>
				</span>
  
              	<span className="input input--chisato" style={input2}>
					<input className="input__field input__field--chisato" type="text" id='model_accuracy' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='模型训练预测准确率'/>
				</span>
  
              	<span className="input input--chisato" style={input4}>
					<input className="input__field input__field--chisato" type="text" id='model_hit_rate' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='模型预测命中率'/>
				</span>

              	<span className="input input--chisato" style={input4}>
					<input className="input__field input__field--chisato" type="number" id='type_num' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='预测分类个数'/>
				</span>

              	<span className="input input--chisato" style={input4}>
					<input className="input__field input__field--chisato" type="text" id='quantity_difference' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)}  />
					<SVG title='预测分类量差'/>
				</span>

              	<span className="input input--chisato" style={input4}>
					<input className="input__field input__field--chisato" type="number" id='model_interval' onFocus={(e)=>this.handleClick(e)} onBlur={(e)=>this.handleClick(e)} />
					<SVG title='预测分类间隔时长'/>
				</span>
					</div>
					</div>
		)
	}
}
const mapStateToProps =(state)=>{
 return{
	
	};
}

export default connect(mapStateToProps)(AddModelFile);//,{ alertHide }