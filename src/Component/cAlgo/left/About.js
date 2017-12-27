import React,{Component} from 'react'
import {
	connect
} from 'react-redux'
import $ from 'jquery'
const newHeader={

	borderBottom:"2px solid transparent",
	background: '#727373',
	color:'#fff',
	padding:'0 12px',
	borderTopRightRadius:'5px',
    borderTopLeftRadius: '5px'
}
class About extends Component{
	constructor(props) {
		super(props);
		this.state = {
			

		};
	}
	render(){
		const modalStyle = {
			top: '5%',
			left: document.body.clientWidth > 900 ? document.body.clientWidth / 2 - 300 : '0',
			right: 'auto',
			bottom: 'auto',
			width: document.body.clientWidth > 900 ? 600 : '100%',
		}
		
		return(

			<div>
				<div style={modalStyle} className="modal fade" id="About" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
					<div className="modal-dialog" role="document">
						<div className="modal-content" style={{background:'rgb(51,51,51)',color:'#000'}}>
							<div className="modal-header" style={newHeader}>
								<i type="button" className="close" data-dismiss="modal" aria-label="Close" style={{marginTop:'14px'}}>
								<span aria-hidden="true" style={{fontSize:'20px',cursor:'pointer'}}>&times;</span></i>
								<h5 className="modal-title" id="myModalLabel">
									TurcAlgo Beta 0.2
									<img src={require("../../../../src/images/beta2.png")}/>
								</h5>
								</div>
							<div className="modal-body main_body" style={{marginLeft:'-20px',color:'#cbcbcb',height:'460px',overflow:'auto'}}>
								{/*<h5>（前端最新更新）</h5>*/}
								{/*<div className="information">
									<div className="imgContainer"></div>
									<span>优化实例列表组件菜单栏与下面选择TAB的间距改大一点</span>
								</div>
								<div className="information"></div>
								<div className="information"></div>*/}
								{/*ul>li*5*/}
								<div className="date">2017-06-05</div>
								<ul>
									<li>行情图信息 最新成交价成交量 选择的实例信息放入曲线图中</li>
									<li>导出报告移至菜单栏中的交易系统</li>
									<li>整合交易策略、交易产品、预测服务、预测产品tab</li>
									<li>行情数据按照时间区间下载</li>
									<li>非管理员获取手续费</li>
									<li>行情图样式</li>
								</ul>
								<div className="date">2017-05-10</div>
								<ul>
									<li>交易产品中 交易合约分类之后加一层作者分类，实例列表按作者分类显示，点击用户分类 关闭其他用户展开，用户点击一次加载实例列表 第二次不加载 直接显示</li>
									<li>loading样式，获取交易数据全屏Loading样式</li>
									<li>添加实盘模拟、真实交易时 交易产品项用户选择,添加历史回测 交易产品由用户输入 添加输入框提示</li>
									<li>避免使用原始时间转换导致时间错误问题</li>
									<li>代码编辑样式</li>
									<li>预测曲线行情图改曲线形式显示</li>
									<li>实例时间列表每次获取的时候更新</li>
									<li>显示在线编程时隐藏上面信息和导出按钮</li>
									<li>获取交易数据如果选择同一天显示bug</li>
									<li>用户在线编程创建预测实例 先填写预测目标表单 自动生成代码头注释 用户编写代码 输入代码名 保存为预测代码</li>
									<li>帮助导航更新、样式</li>
								</ul>
								<div className="date">2017-05-05</div>
								<ul>
									<li>查看交易手续费率功能</li>
									<li>实时修改手续费率</li>
								</ul>
								<div className="date">2017-04-27</div>
								<ul>
									<li>添加实例表单 和 模型信息表单样式</li>
									<li>代码提示更新</li>
									<li>弹出框居中自适应 </li>
								</ul>
								<div className="date">2017-04-26</div>
								<ul>
									<li>优化预测曲线显示</li>
									<li>将平台函数写入代码提示中</li>
									<li>优化预测曲线 数字用曲线表示 字符在行情图中标出</li>
								</ul>
								<div className="date">2017-04-25</div>
								<ul>
								    <li>预测曲线样式，结合行情图显示</li>
									<li>预测实盘、回测预测准确率显示</li>
									<li>没有预测准确率的实例不现实预测准确率</li>
									<li>先按日期排序 再按预测准确率降序</li>
									<li>预测实盘、回测列表2分钟刷新一次 获取最新的准确率</li>
								</ul>
								<div className="date"></div>
								<ul>
								    <li>在线创建交易、预测策略</li>
									<li>在线编程功能、默认显示示例代码，代码提示、搜索关键字</li>
									<li>年化、收益率重新计算，实例策略代码不存在黄色标出</li>
									<li>预测实盘移至历史交易功能</li>
									<li>指标的重新计算，实例添加预测或交易数据API</li>
									<li>预测数据、日志刷新按钮</li>
								</ul>
								<div className="date"></div>
								<ul>
									<li>指标重新计算</li>
									<li>预测实例排序</li>
									<li>交易、预测实例显示模型信息</li>
									<li>添加策略、实例表单验证</li>
									<li>编辑代码创建交易、预测策略</li>
									<li>增加预测表格显示， 预测数据下载</li>
									<li>增加预测曲线（待完善）</li>
									<li>过滤预测数据NaN</li>
								</ul>
								<div className="date"></div>
								<ul>
									<li>添加模型页面响应式</li>
									<li>删除实例折叠刚刚展开的实例位置</li>
									<li>优化预测服务列表代码</li>
									<li>实例删除之后 交易、预测、历史实例数量没有变化</li>
									<li>优化创建实例 当创建回测时再获取时间列表</li>
									<li>策略代码报错 鼠标悬浮提示 并用红色字体标出</li>
								</ul>
								<div className="date"></div>
								<ul>
									<li>菜单栏 最新成交价成交量字体加大</li>
									<li>多次选择实例获取交易数据 走势图变小 行情图掉下去 </li>
									<li>成交量条形图的宽度，曲线图 表格样式</li>
									<li>交易走势图交易数据丢失的问题</li>
									<li>导出报告之后各个tab的位置</li>
									<li> 运行日志窗口改可拖动</li>
									<li>收益曲线改成收益率累加</li>
								</ul>
								<div className="date"></div>
								<ul>
								<li>曲线图宽度长度加大</li>
								<li>页面布局的响应式</li>
								<li>行情图数据，最新成交价，成交量每隔2分钟更新</li>
								<li>实例列表展开将折叠其他实例</li>
								<li>交易详情 收益风险分析按钮样式 当没有数据时不显示下载按钮</li>
                                <li>曲线图 表格样式</li>
                                <li>修改下载行情数据 指标数据按钮</li>
								</ul>
								<div className="date"></div>
								<ul>
								<li>将交易、预测、历史用不同颜色区分</li>
								<li>优化显示交易产品列表会同时向后端请求历史年华收益的情况</li>
								<li>优化时间列表api调用</li>
								<li>交易产品的排序，首先按照日期降序无日期的按照创建日期降序排序，日期相同的再按照年化收益率降序</li>
							    <li>完成导出报告 （行情图 、交易走势图 、收益曲线 、交易详情 、交易风险分析）导出报告时将展开表格所有数据</li>
								{/*	<li></li>*/}
								</ul>
								<div className="date"></div>
								<ul>
									<li>菜单栏与下面选择TAB的间距改大一点 ，菜单加上颜色与下面的部分区别开来，改成有立体感的显示效果。</li>
									<li>去除选择交易策略，右侧显示相关实例的效果。</li>
									<li>将“交易详情”，“收益风险分析”的输出放到右侧下面输出，用TAB组件组织，行情图，交易走势图，收益曲线，也改为3个TAB来显示内容。</li>
									<li>“预测产品”中去除“历史年化收益率”，去除“交易年化收益”显示，去除“交易胜率”显示。</li>
									<li>在“交易策略”和“预测服务”两项中各个策略下面都加上日志输出项，显示具体日志内容。</li>
									<li>在预测策略中显示“实时预测准确率”，及“历史预测准确率”图形显示。</li>
									<li>修改点击“交易产品”，“预测产品”标签后行情图的时间变成错误时间。</li>
								</ul>
	
							   
							</div>
							<div className="modal-footer" style={{borderTop:"2px solid transparent"}}>						
{/*								<button type="button" className="btn btn-primary" data-dismiss="modal">确认</button>
*/}							</div>
						</div>
					</div>
				</div>
			</div>
			)
	}
}

const mapStateToProps =(state)=>{
 return{
	
	};
}

export default connect(mapStateToProps)(About);//,{ alertHide }