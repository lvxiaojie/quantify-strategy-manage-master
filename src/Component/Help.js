import React, {
	Component
} from 'react'
import $ from 'jquery'
import '../Style/Help.css'

class Help extends Component {


	top() {
		var timer = null;
		cancelAnimationFrame(timer);
		timer = requestAnimationFrame(function fn() {
			var oTop = $('.help_right').scrollTop();
			if (oTop > 0) {
				$('.help_right').scrollTop(oTop - 250);
				timer = requestAnimationFrame(fn);
			} else {
				cancelAnimationFrame(timer);
			}
		});

	}
	goTip = (event) => {
		return false;
		// event.stopPropagation();
	}
	render() {
		return (
			<div>
		    <div style={{width:"100%",height:'62px',backgroundColor:'black'}}>			   
			    <img src={require("../../src/images/logo.png")} style={{width:'70px',margin: "-5px 0 0 1.5em"}}/>			    
		    </div>
	        <div id="help">
	        	<div className="help_left">
	        		<div id='navbarExample' className='navbar navbar-static'>
	        	    <div className="navbar-inner">
			        	<ul className='nav'>
			        		<li className='active indent1'><a onClick={(e)=>this.goTip(e)} href='#zijin'>紫金量化</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#productSupport'>紫金量化支持哪些交易品种？</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#server'>紫金量化提供哪些服务？</a></li>
			        		<li className='indent1'><a onClick={(e)=>this.goTip(e)} href='#tradeStrategy'>交易策略</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#exitTradeStrategy'>如何编写“交易策略”？</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#addTradeStrategy'>如何添加“交易策略”？</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#histroy'>如何由交易策略代码创建历史回测？</a></li>
			        		<li className='indent1'><a onClick={(e)=>this.goTip(e)} href='#product'>交易产品</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#createProduct'>如何创建“交易产品”？</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#read'>如何查看“交易产品”的交易情形？</a></li>
			        		<li className='indent1'><a onClick={(e)=>this.goTip(e)} href='#predictCode'>预测代码</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#addPredictCode'>如何添加“预测代码”？</a></li>
			        		<li className='indent1'><a onClick={(e)=>this.goTip(e)} href='#PredictService'>预测服务</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#createPredict'>如何创建“预测服务”？</a></li>
			        		<li className='indent1'><a onClick={(e)=>this.goTip(e)} href='#codeHelp'>策略编写帮助</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#code_head'>策略开头</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#code_method'>导入策略代码中需要的库函数</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#code_detail'>具体策略代码编写说明</a></li>
			        		<li className='indent1'><a onClick={(e)=>this.goTip(e)} href='#other'>其他辅助功能</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#onLine'>在线编写“交易代码”和“预测代码”</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#codeTitel'>代码补全与提示</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#export'>导出交易报告</a></li>
			        		<li className='indent2'><a onClick={(e)=>this.goTip(e)} href='#changePassword'>修改密码</a></li>
			        	</ul>     	
	                </div>
	        		
	        	    </div>
	        	</div>
	        	<div className="help_right scrollspy-example" data-spy='scroll' style={{height:document.documentElement.clientHeight-100}} data-target='#navbarExample' data-offset='70'>
		        	
		        	    <h2 id='zijin' className='helpTitle'>紫金量化</h2>
		        	    <span>紫金量化 — 高效实用的量化策略平台</span>
		        	   
		        	    <h4 id='productSupport' className='helpSubtitle'>紫金量化支持哪些交易品种？</h4>
		        	    <span>目前平台开放的交易产品分为三类：CTP,CSRPME,OKCOIN</span>
		        	    <h4 id='server' className='helpSubtitle'>紫金量化提供哪些服务？</h4>
		        	    <span> 
		        	    	<img src={require('../../src/images/menu.png')}/>
		        	    	{/*<span>紫金量化平台目前分成了五个模块。</span>*/}
		        	    	<ol className='indent3'>
		        	    	    <li>紫金量化平台目前分成了三个模块。</li>
		        	    		<li>量化交易：在这里您可以上传自己编写好的交易策略代码（也可点击“新建代码”进行在线编写），并提供在线阅读代码的功能。</li>
		        	    		<li>在这里您可以看到自己创建的实例和实例信息（包括实例状态，创建时间等），启动策略交易后，您可以看到每个时刻的交易数据以及实时的年化收益率和交易胜率。通过选择交易的时间，可以查看实例的具体表现。</li>
		        	    		<li>预测模型：在这里您可以上传自己编写好的预测代码（也可点击“新建代码”进行在线编写），并提供在线阅读代码的功能。您可以自定义预测算法的输出，且无上限。</li>
		        	    		<li>基于您的“预测代码”以及自定义预测算法的输出，您可以查看创建的预测服务和信息，启动策略交易后，可通过选择时间来查看预测算法结果的实时输出。</li>
		        	    		<li>历史交易：在这里您可以查看到移至历史交易所有策略的详细信息。</li>
		        	    	</ol>
		        	    </span>
		        	    <hr className='dirves'/>
		        	    <h2 id='tradeStrategy' className='helpTitle'>交易策略</h2>
		        	    <span>基于您上传的交易策略代码，可以创建策略的实例（包含“实盘模拟”，“历史回测”，“真实交易”）。
			        	    <div>
			        	    	<img src={require('../../src/images/createExample.png')} className='img_br'/>
			        	    </div>
		        	    </span>
		        	    <h4 id='exitTradeStrategy' className='helpSubtitle'>如何编写“交易策略”？</h4>
		        	    <span>
		        	    	<ol>
		        	    		<li>策略开头
			        	    		<pre>
			        	    			<code>
			        	    				<div>#coding: UTF-8</div>
			        	    				<div># 结合KDJ贴标签，五分类</div>
			        	    			</code>
			        	    		</pre>
			        	    		<blockquote>
			        	    			<span>#coding: UTF-8 方便在代码中加入中文汉字。</span>
                                        <span>#注释说明代码方法及名称</span>
			        	    		</blockquote>
		        	    		</li>
		        	    		<li>导入策略代码中需要的库函数
			        	    		<pre>
			        	    			<code>
			        	    				<div><span className='keyword'>from</span> __future__ <span className='keyword'>import</span> division</div>
			        	    				<div><span className='keyword'>import</span> time</div>
			        	    				<div><span className='keyword'>import</span> numpy <span className='keyword'>as</span> np</div>
			        	    				<div><span className='keyword'>import</span> pandas <span className='keyword'>as</span> pd</div>
			        	    				<div><span className='keyword'>from</span> numpy <span className='keyword'>import</span> *</div>
			        	    				<div><span className='keyword'>from</span> pandas <span className='keyword'>import</span> Series,DataFrame</div>
			        	    				<div><span className='keyword'>from</span> sklearn.externals <span className='keyword'>import</span> joblib</div>
			        	    				<div><span className='keyword'>from</span> sklearn <span className='keyword'>import</span> preprocessing         <span className='zhushi'>#数据预处理工具</span></div>
			        	    				<div><span className='keyword'>import</span> tarfile</div>
			        	    				<div><span className='keyword'>import</span> talib</div>
			        	    				<div><span className='keyword'>from</span> sklearn.externals <span className='keyword'>import</span> joblib</div>
			        	    				<div><span className='keyword'>import</span> datetime</div>
			        	    			</code>
			        	    		</pre>
			        	    		<blockquote>
			        	    			<span>(导入的基础库主要包括numpy,pandas等,技术指标库包括talib等,若需要用到预测模型文件则需要导入tarfile，joblib等用于解压缩文件，另外基于预测模型可能需要加载数据预处理库，例如：sklearn的preprocessing 等)。</span>
                                        <span>注意: 此处库函数，应尽量使用os,sys等库防止系统出错。</span>
			        	    		</blockquote>
		        	    		</li>
		        	    		<li>具体策略代码编写说明
		        	    			<span>3.1策略中会使用的回调函数。</span>
		        	    			<blockquote>
                                        <span>这些函数可以只实现部分，不需要的使用的pass略过。</span>
			        	    		</blockquote>
			        	    		<span><code>on_init</code>,  定义变量,并初始化,需要在函数外部使用的变量都要用context.var.XXX来定义。</span>
			        	    		<pre>
			        	    			<code>
			        	    				<div>context.var.barList <span className='equal'>=</span> []</div>
			        	    				<div>context.var.high <span className='equal'>=</span> []</div>
			        	    				<div>context.var.low <span className='equal'>=</span> []</div>
			        	    				<div>context.var.open <span className='equal'>=</span> []</div>
			        	    				<div>context.var.volume <span className='equal'>=</span> []</div>
			        	    				<div>context.var.num_die <span className='equal'>=</span> context.var.num_zhang <span className='equal'>=</span> context.var.num_ping </div>
			        	    				<div>context.var.num_Rdie <span className='equal'>=</span> context.var.num_Rzhang <span className='equal'>=</span> context.var.num_Rping </div>
			        	    				<div>context.var.num_Mdie <span className='equal'>=</span> context.var.num_Mzhang <span className='equal'>=</span> context.var.num_Mping </div>
			        	    				<div>context.var.num_ying <span className='equal'>=</span> []           <span className='zhushi'>#止盈差价</span></div>
			        	    				<div>context.var.num_sun <span className='equal'>=</span> []           <span className='zhushi'>#止损差价</span></div>
			        	    				<div>context.var.num_predict <span className='equal'>=</span> []           <span className='zhushi'>#预测平仓差价</span></div>
			        	    				<div>context.var.x_test1 <span className='equal'>=</span> []           <span className='zhushi'>#用来存储测试数据</span></div>
			        	    				<div>context.var.real_label1 <span className='equal'>=</span> []           <span className='zhushi'>#用来存储真实标签</span></div>
			        	    				<div>context.var.lab_answers <span className='equal'>=</span> []           <span className='zhushi'>#存储预测标签</span></div>
			        	    				<div>context.var.num_all <span className='equal'>=</span> <span className='zero'>0</span> </div>
			        	    				<div>context.var.testPos <span className='equal'>=</span> <span className='zero'>0</span>                 <span className='zhushi'>#记录持仓</span></div>
			        	    			</code>
			        	    		</pre>
			        	    		<span><code>on_start</code>, 策略启动时调用，一般除写日志，外不做别的操作。</span>
			        	    		<pre>
			        	    			<code>
			        	    				<div>context.function.log(<span className='log'>u'nAdaboost_KDJ策略启动</span>)</div>
			        	    			</code>
			        	    		</pre>
			        	    		<span><code>on_stop</code>, 策略停止时调用，一般除写日志，外不做别的操作。</span>
			        	    		<pre>
			        	    			<code>
			        	    				<div>context.function.log(<span className='log'>u'nAdaboost_KDJ策略停止</span>)</div>
			        	    			</code>
			        	    		</pre>
			        	    		<span><code>on_tick</code>,  使用TICK数据（高频数据）时在此函数中使用，tick是由平台维护。</span>
			        	    		<span>若需使用，首先获取 tick   <code>tick = context.var.tick</code> ,再调用  <span><code>context.function.buy(tick.price) </code> <code> context.function.sell(tick.price)</code></span> 获取tick时刻的价格。</span>
			        	    		<span><code>on_bar</code>,  使用分钟数据，该函数使用中，bar由平台维护。</span>
			        	    		<blockquote>
			        	    			<span>本平台推荐使用bar数据预测，平台上绝大部分逻辑代码都在此函数中实现。</span>
			        	    		</blockquote>
			        	    		<span>首先获取bar <code>bar = context.var.bar</code> 。</span>
			        	    		<span>存分钟数据的CHLOV（bar.close,bar.high,bar.low,bar.open,bar.volume）</span>
			        	    		<pre>
			        	    			<code>
			        	    				<div>context.var.barList.append(bar.close)      <span className='zhushi'>#存分钟价格</span></div>
			        	    				<div>context.var.high.append(bar.high)      <span className='zhushi'>#一分钟内价格最高价</span></div>
			        	    				<div>context.var.low.append(bar.low)      <span className='zhushi'>#一分钟内价格最低价</span></div>
			        	    				<div>context.var.open.append(bar.open)      <span className='zhushi'>#每分钟的开盘价</span></div>
			        	    				<div>context.var.volume.append(bar.volume) </div>
			        	    			</code>
			        	    		</pre>
			        	    		<span>若需要调用，使用金融技术分析指标（调用talib）则需要存数据列表，并转换为numpy.array格式。</span>
			        	    		<pre>
			        	    			<code>
			        	    				<div>arrClose  <span className='equal'>=</span> np.array(context.var.barList,dtype <span className='equal'>=</span> np.float)</div>
			        	    				<div>arrHigh  <span className='equal'>=</span> np.array(context.var.high,dtype <span className='equal'>=</span> np.float)</div>
			        	    				<div>arrLow  <span className='equal'>=</span> np.array(context.var.low,dtype <span className='equal'>=</span> np.float)</div>
			        	    				<div>arrOpen  <span className='equal'>=</span> np.array(context.var.open,dtype <span className='equal'>=</span> np.float)</div>
			        	    				<div>arrVolume  <span className='equal'>=</span> np.array(context.var.volume,dtype <span className='equal'>=</span> np.float)</div>
			        	    			</code>
			        	    		</pre>
			        	    		<span>例如使用talib计算KDJ。</span>
			        	    		<pre>
			        	    			<code>
			        	    				<div>context.var.raw_data <span className='equal'>=</span> DataFrame()</div>
			        	    				<div>context.var.real_data[<span className='log'>'KDJ_k'</span>] <span className='equal'>=</span> talib.STOCH(arrHigh,arrLow,arrClose)[<span className='zero'>0</span>] </div>
			        	    				<div>context.var.real_data[<span className='log'>'KDJ_D'</span>] <span className='equal'>=</span> talib.STOCH(arrHigh,arrLow,arrClose)[<span className='zero'>1</span>] </div>
			        	    			</code>
			        	    		</pre>
			        	    		<span>使用talib计算并将计算数据存到Pandas dataFrame中。</span>
			        	    		<span>若需要用预测模型，还需要加载模型文件。</span>
			        	    		<pre>
			        	    			<code>
			        	    				<div>clf <span className='equal'>=</span> joblib.load('Adaboost_IF_M3_KDJ.pkl')</div>
			        	    			</code>
			        	    		</pre>
			        	    		<span>调用模型预测之前还需要将数据规整化处理。</span>
			        	    		<pre>
			        	    			<code>
			        	    				<div>context.var.min_max_scaler <span className='equal'>=</span> preprocessing.MinMAXScaler</div>
			        	    				<div>context.var.x_test1 <span className='equal'>=</span> context.var.min_max_scaler.fit_transform(context.var.raw_data[<span className='zero'>40:</span>])</div>
			        	    			</code>
			        	    		</pre>
			        	    		<span>开始进行预测。</span>
			        	    		<pre>
			        	    			<code>
			        	    				<div>context.var.answer <span className='equal'>=</span> clf.predict(context.var.x_test1)   <span className='zhushi'>#进行预测</span></div>
			        	    			
			        	    			</code>
			        	    		</pre>
			        	    		<span>根据预测，止盈止损条件等等逻辑判断，进行相应买卖操作。一般伴随买卖操作也会写相应的log日志。</span>
			        	    		<pre>
			        	    			<code>
			        	    				<div>context.function.cover(context.var.barList[-1])</div>
			        	    				<div>context.function.log(<span>u'平仓价：' +</span>str(context.var.barList[-1])+''+str(bar.datetime))</div>
			        	    			
			        	    			</code>
			        	    		</pre>
			        	    		<span><code>on_order</code>, 用于实盘模拟及真实交易的订单预定，由平台维护。</span>
			        	    		<span><code>on_newday</code>， 每天的24点后平台会调用此函数,系统平台内部使用。</span>
			        	    		<blockquote>
			        	    			<span><code>on_order</code> <code>on_newday</code> 一般不在其中定义实现，只简单的pass。</span>
			        	    		</blockquote>
			        	    		<span>3.2 函数的输入项均为context。</span>
			        	    		<span>context是一个封装类，包含定义变量使用的对象context.var，调用函数使用的对象context.function。</span>
			        	    		<blockquote>
                                        <span>其中context.function对象可调用的方法函数有：</span>
                                        <span>context.function.buy(float price)（以price价格买多）</span>
                                        <span>context.function.sell(float price)（以price价格卖多）</span>
                                        <span>context.function.short(float price)（以price价格卖空）</span>
                                        <span>context.function.cover(float price)（以price价格买空）</span>
                                        <span>context.function.log(String loginfo) （向策略日志中写入内容）</span>

			        	    		</blockquote>

		        	    		</li>
		        	    	</ol>
		        	    </span>
		        	    <h4 id='addTradeStrategy' className='helpSubtitle'>如何添加“交易策略”？</h4>
		        	    <span>
		        	    	<ol>
		        	            <li>点击“量化交易”后的“+”按钮。
			        	            <div>
			        	            	<img src={require("../../src/images/tradeStrategy.png")} className="img_br img-responsive"/> 
			        	            </div>
		        	            </li>
			        			<li>弹出“交易策略”的对话框，输入策略名（你自己定义的任意策略名字,以下以创建RSV策略为例），点击“选择文件”上传编写好的策略代码文件，并点击添加。
				        			<div>		        					
				        				<img src={require("../../src/images/tradeStrategyDailog.png")} className="img_br img-responsive"/>
				        			</div>
			        			</li>
			        			<li>添加成功后会在“交易策略”栏中显示，若字体是白色，表示还未以此策略创建过实例。
			        				<div>
			        				 <img src={require("../../src/images/tradeCode.png")} className="img_br img-responsive"/>
			        				</div>
			        			</li>			        				
			        	    </ol>
		        	    </span>
		        	    <h4 id='histroy' className='helpSubtitle'>如何由交易策略代码创建历史回测？</h4>
		        	    <span>
		        	    	<ol>
		        	    	    <li>
				        			以“RSV”为例，点击策略后的“+”按钮。
				        			<div>
				        			    <img src={require("../../src/images/tradeCode1.png")} className="img_br img-responsive"/>
				        			</div>
				        		</li>
				        		<li>
				        		    弹出创建实例对话框。
				        				<span>实例类型选择“历史回测”;</span>
				        				<span>填写实例的“交易名”，选择“交易所代码”（目前包含CTP,CSRPME,OKCOIN）其中一项;</span>
				        				<span>填写“交易合约”名称（正式合法，产品可订阅）;</span>
				        				<span>选择回测时间“开始时间”和“结束时间”;</span>
				        				<span>点击“添加模型”（若交易策略不依赖预测模型可无需添加，直接点击“添加”按钮即可）。</span>
				        				<div>
				        					<img src={require("../../src/images/histroyList.png")} className="img_br img-responsive"/>
				        				</div>
				        				
				        		</li>
				        		<li>弹出“模型信息输入框”。
		                            	<span>选择“模型类型”（包含“经典时间序列自回归模型”，“机器学习分类模型”，“机器学习回归模型”，“金融技术指标回归模型”）;</span>
		                            	<span>填写模型相关内容信息;</span>
		                            	<span>点击“上传模型文件”按钮，上传使用的模型文件;</span>
		                            	
		                            	<span>最后，点击“确定”来完成创建策略实例-“策略产品”。</span>
		                            	<div>
		                               	   <img src={require("../../src/images/addModel.png")} className="img_br img-responsive"/>
		                               </div>
		                            </li>
				        		<li>
				        			添加成功后，可看到其中第3个圆圈中显示1，表示已创建了一个回测。
				        			<div>
				        				<img src={require("../../src/images/rsvHistroy.png")} className='img_br img-responsive'/> 
				        			</div>
				        		</li>
				        		<li>
				        			选择“交易产品”Tab。
				        			<span>点击启动按钮来启动实例运行，直到状态显示“运行结束”。</span>
				        			<span>点击图中的连接可以查看最近一次交易的数据。</span>
				        			<div>
				        				<img src={require("../../src/images/rsv_his.png")} className="img_br img-responsive"/>
				        			</div>
				        		</li>
				        		<li>
				        			点击策略，选择交易时间，查看交易详情。
				        			<div>
				        				<img src={require("../../src/images/rsv_hisDetil.png")} className="img_br img-responsive"/>
				        			</div>
				        		</li>
				        		 						    
				        	</ol>
		        	    </span>
		        	    <hr className='dirves'/>
		        	    <h2 id='product' className='helpTitle'>交易产品</h2>
		        	    <span>您可以看到自己提交过的所有策略的实时交易情况，包括在模拟交易环境中的持仓、年化收益率、平均收益率、交易胜率等各项风险分析指标，了解策略的真实表现。</span>
		        	    <h4 id='createProduct' className='helpSubtitle'>如何创建“交易产品”？</h4>
		        	    <span>
		        	    	<ol>
			        	    	<li>点击添加成功后的“RSV交易策略”后面的添加实例按钮。
				        			    <div>
			        				    	<img src={require("../../src/images/tradeCode1.png")} className="img_br img-responsive"/>
			        				    </div>
				        			</li>
				        			<li>弹出添加实例的对话框。
				        			   <span>选择“实例类型”（包含“实盘模拟”，“历史回测”，“真实交易”）;</span>
				        			   <span>填写实例的“交易名”;</span>
				        			   <span>选择“交易所代码”（目前包含CTP,CSRPME,OKCOIN）其中一项</span>
				        			   <span>填写“交易合约”名称（正式合法，产品可订阅）;</span>
				        			   <span>填写“交易手数”（即一次交易买卖的数目）;</span>
				        			   <span>点击“添加模型”（若交易策略不依赖预测模型可无需添加，直接点击“添加”按钮即可）；</span>                              
		                               <div>
		                               	  <img src={require("../../src/images/createExample.png")} className="img_br img-responsive"/>
		                               </div>
		                                                                                          
		                            </li>
		                            <li>弹出“模型信息输入框”。
		                            	<span>选择“模型类型”（包含“经典时间序列自回归模型”，“机器学习分类模型”，“机器学习回归模型”，“金融技术指标回归模型”）;</span>
		                            	<span>填写模型相关内容信息;</span>
		                            	<span>点击“上传模型文件”按钮上传模型文件;</span>
		                            	
		                            	<span>最后，点击“确定”来完成创建策略实例-“策略产品”。</span>
		                            	<div>
		                               	   <img src={require("../../src/images/addModel.png")} className="img_br img-responsive"/>
		                               </div>
		                            </li>
		                            <li>查看“交易策略”一栏里创建的策略，字体颜色会由白色变为橙黄色，并且下面文字显示加载状态以及加载完成日期,<br/>且策略后第二个圆圈有0变为1，表示当前有一个“实盘模拟”实例。
		                               <div>
		                               	 <img src={require("../../src/images/tradeInformtion.png")} className="img_br img-responsive"/>
		                               </div>
		                            </li>
		                            <li>选择“交易产品”Tab。
		                               <span>点击 <img src={require("../../src/images/ctp.png")}/> 中左侧的按钮，并展开“CTP”下的所有运行实例，找到创建的实例RSV，显示实例的信息。</span>
		                               <span>点击图中的连接可以查看最近一次交易的数据。</span>
		                               <div>
		                               	 <img src={require("../../src/images/rsvDetail.png")} className="img_br img-responsive"/>
		                               </div>    
		                               
		                            </li>
		                            <li> 点击 <img src={require("../../src/images/start.png")}/> 按钮来启动实例运行（状态由“加载结束”变成“运行中”）。</li>
		                            <li>点击 <img src={require("../../src/images/log.png")}/> 按钮可查看运行日志，通过选择时间，可以查看每天的日志输出。点击下载按钮，可进行本地下载日志。
		                               <div>
		                               	  <img src={require("../../src/images/logDetail.png")} className="img_br img-responsive"/>
		                               </div>
		                            </li>
		                            
				        			
				        	</ol>
		        	    </span>
		        	    <h4 id='read' className='helpSubtitle'>如何查看“交易产品”的交易情形？</h4>
		        	    <span>
		        	    	<ol>
				        			<li>
				        				例如“BBI_RSV”策略。
				        				<div>
				        					<img src={require("../../src/images/RSV_BBI_IF1704.png")} className="img_br img-responsive"/>
				        				</div>
				        			</li>
				        			<li>
				        				点击 <img src={require("../../src/images/nianhua.png")}/> 按钮，可查看该策略历史交易的年化收益率情况，可将鼠标放到每天的时刻显示其“年化收益率”及“胜率”。
				        				<div>
				        					<img src={require("../../src/images/nianhuaChart.png")} className="img_br img-responsive"/>
				        				</div>
				        			</li>
				        			<li>面板上百分比数字显示的是实时的年化收益及交易胜率。
				        			    <div>
				        			    	<img src={require('../../src/images/success.png')} className='img_br img-responsive'/>
				        			    </div>
				        			</li>
				        			<li>查看具体策略详情，点击策略名 <img src={require("../../src/images/name.png")}/> ,并选择需要查看的策略交易时间。
				        			    <div>
				        			    	<img src={require("../../src/images/chooseTime.png")} className="img_br img-responsive"/>
				        			    </div>
				        			</li>
				        			<li>
				        				例如选择交易时间2017-05-8，并可以查看策略的行情图。
				        				<div>
				        					<img src={require("../../src/images/market.png")} className="img_br img-responsive"/>
				        				</div>
				        			</li>
				        			<li>
				        				选择“交易走势图”Tab，查看交易情形。
				        				<div>
				        					<img src={require("../../src/images/moveChart.png")} className="img_br img-responsive"/>
				        				</div>
				        			</li>
				        			<li>
				        				选择“收益曲线图”Tab，查看每笔交易盈亏的情况。
				        				<div>
				        					<img src={require("../../src/images/earnChart.png")} className="img_br img-responsive"/>
				        				</div>
				        			</li>
				        			<li>
				        				选择“交易详情”Tab，查看每笔交易的详情（包括开仓/平仓时间，开仓/平仓价格等)。
				        				<div>
				        					<img src={require("../../src/images/tradeMore.png")} className="img_br img-responsive"/>
				        				</div>
				        			</li>
				        			<li>
				        				选择“收益风险分析”Tab，查看每笔交易的各项指标（包括盈亏，无手续费盈亏，收益率等）。
				        				<div>
				        					<img src={require("../../src/images/tradeAnalysis.png")} className="img_br img-responsive"/>
				        				</div>
				        			</li>
				        			{/*<li>
				        				点击“收益风险分析”Tab中右下角 <img src={require("../../src/images/import.png")}/>按钮，可下载策略交易的详情以及各项指标。
				        			</li>
				        			*/}
				        	</ol>
		        	    </span>
		        	    <hr className='dirves'/>
		        	    <h2 id='predictCode' className='helpTitle'>预测代码</h2>
		        	    <span></span>
		        	    <h4 id='addPredictCode' className='helpSubtitle'>如何添加“预测代码”？</h4>
		        	    <span>
		        	    	<ol>
			        	    	<li>点击“预测模型”后的“+”按钮。
			        	    	    <div>
			        	    	    	<img src={require('../../src/images/predict.png')} className='img_br img-responsive'/>
			        	    	    </div>
			        	    	</li>
			        				<li>弹出“预测代码”的对话框。
				        				<span>输入策略名（你自己定义的任意策略名字, 以下以 predict_lSTM_test 为例）；</span>
				        				<span>输入策略的预测输出，包括预测变量、变量类型（int,string,float等）、预测内容，通过点击“+”和“-”按钮来自定义预测的输出个数，且无上限；</span>
				        				<span>最后点击“选择文件”，上传编写好的“策略代码文件”，并点击添加。</span>	        				
				        				<div>
				        					<img src={require("../../src/images/predictDialog.png")} className="img_br img-responsive"/>
				        				</div>
			        				</li>
			        				<li>添加成功后会在“预测代码”栏中显示，若字体是白色，表示还未为此“预测代码”创建过实例。
				        				<div>
				        					<img src={require("../../src/images/RFDemo328Vpred_max_new1.png")} className="img_br img-responsive"/>
				        				</div>
			        			</li>
			        		</ol>
		        	    </span>
		        	    <hr className='dirves'/>
		        	    <h2 id='PredictService' className='helpTitle'>预测服务</h2>
		        	    <span></span>
		        	    <h4 id='createPredict' className='helpSubtitle'>如何创建“预测服务”？</h4>
		        	    <span>
		        	    	<ol>
				        		<li>点击添加成功后的预测代码后面的"+"按钮。
				        			<div>
			        				   <img src={require("../../src/images/RFDemo328Vpred_max_new.png")} className="img_br img-responsive"/>
			        				</div>
				        		</li>
				        		<li>弹出添加实例的对话框。
				        			<span>选择“实例类型”（包含“实盘模拟”，“历史回测”）;</span>
				        			<span>填写实例的“交易名” （以下以 predict_LSTM_test 为例）；</span>
				        			<span>选择“交易所代码”（目前包含CTP,CSRPME,OKCOIN）其中一项;</span>
				        			<span>填写“交易合约”名称（正式合法，产品可订阅）;</span>
				        			<span>填写“交易手数”（即一次交易买卖的数目）;</span>
				        			<span>点击“添加模型”（若交易策略不依赖预测模型可无需添加，直接点击“添加”按钮即可）；</span>                              
		                            <div>
		                               <img src={require("../../src/images/histroyList.png")} className="img_br img-responsive"/>
		                            </div>		                                                                                          
		                        </li>
		                        <li>弹出“模型信息输入框”。
		                            <span>选择“模型类型”（包含“经典时间序列自回归模型”，“机器学习分类模型”，“机器学习回归模型”，“金融技术指标回归模型”）;</span>
		                            <span>填写模型相关内容信息;</span>
		                            <span>点击“上传模型文件”按钮，上传预测使用的模型文件;</span>
		                           
		                            <span>最后，点击“确定”来完成创建预测服务。</span>
		                            <div>
		                               	<img src={require("../../src/images/addModel1.png")} className="img_br img-responsive"/>
		                            </div>
		                        </li>
		                        <li>查看“预测代码”一栏里创建的策略，字体颜色会由白色变为橙黄色，并且下面文字显示加载状态，加载完成日期以及预测输入项,且第1个圆圈有0变为1，表示当前有一个“实盘模拟”实例。
		                            <div>
		                               	<img src={require("../../src/images/RFDemo328Vpred_max_new_inform.png")} className="img_br img-responsive"/>
		                            </div>
		                        </li>
		                        <li>选择“预测服务”Tab。
		                            <span>点击 CTP左侧的"+"按钮，并展开“CTP”下的所有运行实例。
			                            <div>
			                            	<img src={require("../../src/images/predictCtp.png")} className='img_br img-responsive'/>
			                            </div>
		                            </span>
		                            <span>找到创建的实例 predict_LSTM_test ，显示实例的信息。</span>
		                            <div>
		                               	<img src={require("../../src/images/shipan.png")} className="img_br img-responsive"/>
		                            </div>   		                               
		                        </li>
		                        <li> 点击 <img src={require("../../src/images/start.png")}/> 按钮来启动实例运行（状态由“加载结束”变成“运行中”）。</li>
		                        <li>点击 <img src={require("../../src/images/log.png")}/> 按钮可查看运行日志,通过选择时间查看每天的输出日志。右上方点击下载按钮，可以本地下载日志 。
		                            <div>
		                               	<img src={require("../../src/images/predictLog.png")} className="img_br img-responsive"/>
		                            </div>
		                        </li>
		                       			        			
				        	</ol>
		        	    </span> 



		        	    
		        	    <h2 id='codeHelp' className='helpTitle'>策略代码编写帮助</h2>
		        	    <h4 id='code_head' className='helpSubtitle'>策略开头</h4>
		        	    <span>#coding: UTF-8 方便在代码中加入中文汉字。#注释说明代码方法及名称
			                 <div>
			                 	<img src={require("../../src/images/code_head.png")} className='img_br img-responsive'/>
			                 </div>
		                 </span> 
		        	    <h4 id='code_method' className='helpSubtitle'>导入策略代码中需要的库函数</h4>
		        	    <span>
		        	    (导入的基础库主要包括numpy,pandas等,技术指标库包括talib等,若需要用到预测模型文件则需要导入tarfile，joblib等用于解压缩文件，另外基于预测模型可能需要加载数据预处理库，例如：sklearn的preprocessing 等)。
                        注意: 此处库函数，应尽量使用os,sys等库防止系统出错。
			                 <div>
			                 	<img src={require("../../src/images/code_method.png")} className='img_br img-responsive'/>
			                 </div>
		        	    </span> 
		        	    <h4 id='code_detail' className='helpSubtitle'>具体策略代码编写说明</h4>
		        	    <span>
		        	    <ol>
		        	       <h4>策略中会使用哪些回调函数。</h4>
		        	    	<li>
		        	    	<span style={{color:'#ff0000'}}>这些函数可以只实现部分，不需要的使⽤的pass略过。</span>
		        	    	</li>
		        	    	<li>
		        	    		<span>
		        	    			on_init,  定义变量,并初始化。需要在函数外部使用的变量都要用context.var.XXX来定义。
		        	    		<div>
			                 	<img src={require("../../src/images/code_detail.png")} className='img_br img-responsive'/>
			                    </div>
			                    </span>
			                    <span>
			                    	on_start, 策略启动时调用，一般除写日志，外不做别的操作。
		        	    		<div>
			                 	<img src={require("../../src/images/code_detail_start.png")} className='img_br img-responsive'/>
			                    </div>
			                    </span>
			                    <span>
			                    	on_stop, 策略停止时调用，一般除写日志，外不做别的操作。
		        	    		<div>
			                 	<img src={require("../../src/images/code_detail_stop.png")} className='img_br img-responsive'/>
			                    </div>
			                    </span>
			                    			                    <span>
			                    	on_tick,  使用TICK数据（高频数据）时在此函数中使用，tick是由平台维护。若需使用，首先获取 tick
		        	    		<div>
			                 	<img src={require("../../src/images/use_tick.png")} className='img_br img-responsive'/>
			                    </div>
			                    </span>
			                    			                    <span>
			                    	再调用buy、sell获取tick时刻的价格。
		        	    		<div>
			                 	<img src={require("../../src/images/use_buy_sell.png")} className='img_br img-responsive'/>
			                    </div>
			                    </span>
			                    			                    <span>
			                    	 on_bar,  使用分钟数据，该函数使用中，bar由平台维护。（本平台推荐使用bar数据预测，平台上绝大部分逻辑代码都在此函数中实现。）
		        	    		<div>
			                 	<img src={require("../../src/images/code_detail_stop.png")} className='img_br img-responsive'/>
			                    </div>
			                    </span>
		        	    	</li>
		        	    	<li>
		        	    	<span>首先获取bar
		        	    	<img src={require("../../src/images/get_bar.png")} className='img_br img-responsive'/>
		        	    	存分钟数据的CHLOV（bar.close,bar.high,bar.low,bar.open,bar.volume）
		        	    	<img src={require("../../src/images/use_bar.png")} className='img_br img-responsive'/>
		        	    	若需要调用，使用金融技术分析指标（调用talib）则需要存数据列表，并转换为numpy.array格式。
		        	    	<img src={require("../../src/images/numpy_array.png")} className='img_br img-responsive'/>
                             例如使用talib计算KDJ
		        	    	<img src={require("../../src/images/example_KDJ1.png")} className='img_br img-responsive'/>
		        	    	<img src={require("../../src/images/example_KDJ2.png")} className='img_br img-responsive'/>
		        	    	 使用talib计算并将计算数据存到Pandas dataFrame中。若需要用预测模型，还需要加载模型文件
		        	    	<img src={require("../../src/images/example_KDJ3.png")} className='img_br img-responsive'/>
		        	    	调用模型预测之前还需要将数据规整化处理
		        	    	<img src={require("../../src/images/example_KDJ4.png")} className='img_br img-responsive'/>
		        	    	 开始进行预测
		        	    	<img src={require("../../src/images/example_KDJ5.png")} className='img_br img-responsive'/>
		        	    	根据预测，止盈止损条件等等逻辑判断，进行相应买卖操作。一般伴随买卖操作也会写相应的log日志。
		        	    	<img src={require("../../src/images/example_KDJ6.png")} className='img_br img-responsive'/>
		        	    	on_order, 用于实盘模拟及真实交易的订单预定，由平台维护。一般不在其中定义实现，只简单的pass。<br/>
                            on_newday 每天的24点后平台会调用此函数。系统平台内部使用，一般不在其中定义实现，只简单的pass。
		        	    	</span>
		        	    	</li>
		        	    </ol>

		        	    <h4>函数的输入项均为context</h4>
		        	    <ol>
		        	    	<li>context是一个封装类，包含定义变量使用的对象context.var，调用函数使用的对象context.function。</li>
		        	    	<li>其中context.function对象可调用的方法函数有：</li>
		        	    	<li>context.function.buy(float price)（以price价格买多)</li>
		        	    	<li>context.function.sell(float price)（以price价格卖多)</li>
		        	    	<li>context.function.short(float price)（以price价格卖空)</li>
		        	    	<li>context.function.cover(float price)（以price价格买空)</li>
		        	    	<li>Context.function.log(String loginfo) （向策略日志中写入内容)</li>
		        	    </ol>

		        	    </span> 




		        	    <h2 id='other' className='helpTitle'>其他辅助功能</h2>	   
		        	    <span>紫金量化平台还为您准备了丰富的辅助功能，帮助您更有效的进行代码的编写与数据的研究。</span>
		        	    <h4 id='onLine' className='helpSubtitle'>在线编写“交易代码”和“预测代码”</h4>
		        	    <span>
		        	    	<ol>
		        	    		<li>
			        	    		点击左上角“新建代码”,会有“交易代码”和“预测代码”两个选项。可根据自己的需求选择功能。
				        	    	<div>
				        	    		<img src={require('../../src/images/newCode.png')} className='img_br img-responsive'/>
				        	    	</div>
		        	    	    </li>
		        	    	    <li>
			        	    	    <span>首先您可以自定义策略代码的名字，编写好代码，确认无误之后，点击“保存为交易策略”或“保存为预测代码”按钮。成功操作之后，可以在页面中“策略代码”或“预测代码”tab中查看。</span>
			        	    	    <span>可以根据自己的需求，点击下载代码按钮。</span>

		        	    	    	<div>
		        	    	    		<img src={require('../../src/images/createCode.png')} className='img_br img-responsive'/>
		        	    	    	</div>
		        	    	    </li>
		        	    	</ol>
		        	    </span>
		        	    <h4 className='helpSubtitle' id='codeTitel'>代码补全与提示</h4>
		        	    <span>
		        	    	您可以选择Theme来进行代码主题的选择，当输入部分变量或函数，按 Tab 键后，会进行代码自动补全，若有多个选项时，显示补全列表。
		        	    	<div>
		        	    		<img src={require('../../src/images/prompt.png')} className='img_br img-responsive'/>
		        	    	</div>
		        	    </span>
		        	    <h4 className='helpSubtitle' id='export'>导出交易报告</h4>
		        	    <span>
		        	       点击左上角"交易系统"-"导出报告"，可将查看的某一天策略交易详情，生成PDF格式的报告，便于分析研究。
		        	       <div>
		        	       	   <img src={require('../../src/images/export.png')} className='img_br img-responsive'/>
		        	       </div>
		        	    </span>
		        	    
		        	   <h4 className='helpSubtitle' id='changePassword'>修改密码</h4>
		        	    <span>
		        	       点击左上角"用户管理"-"修改密码"，填写原密码、新密码、确认密码后进行修改密码。
		        	       <div>
		        	           <img src={require('../../src/images/change_password_menu.png')} className='img_br img-responsive'/>
		        	       	   <img src={require('../../src/images/change_password.png')} className='img_br img-responsive'/>
		        	       </div>
		        	       <a className="backTop" onClick={this.top}><i className="fa fa-arrow-up"></i></a>	
		        	       <br/><br/><br/>		        	    	
		        	    </span>

			        				        		
			        		
			        		{/*<div role="tabpanel" className="tab-pane" id="Report">
			        			<h4>如何导出交易报告？</h4>
			        			<ol>
			        				<li>点击屏幕右上角 <img src={require("../../src/images/import_report.png")}/> 按钮，可将查看的某一天策略交易详情，生成PDF格式的报告，便于分析研究。
			        				<div>
			        					<img src={require("../../src/images/report.png")} className="img_br img-responsive"/>
			        				</div>
			        				</li>
			        			</ol>
			        		</div>
			        		*/}
			        		
			        	
			        		
	        	        
		        	
	        	</div>
	        
	        </div>
		</div>
		);
	}
}


export default Help;