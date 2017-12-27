import React, {
    Component
} from 'react';
import {
    Row,
    Col,
    Card,
    Timeline,
    Icon,
    Badge
} from 'antd';
import {
    getCpu,
    getUserList,
    getClasss,
    getStatic,
    getMemory,
    getDiskRead,
    getDiskWrite
} from '../../Redux/Action/shareAction'
import { Progress } from 'antd';
class DashMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cpu: 0,
            memory:0,
            disk_read:0,
            disk_write:0,
            users: [],
            scripts: [],
            strategys: [],
            run_trade:[],
            run_predict:[]
        }
    }
    componentDidMount() {
        getUserList().then((users) => {
            getClasss().then((scripts) => {
                let all_stra = getStatic().all_stra;
                let run_trade = [];
                let run_predict = [];
                for(let x of all_stra){
                    if(x.script_mode === 'trade' && x.status === 2){
                        run_trade.push(x)
                    }
                    if(x.script_mode === 'predict' && x.status === 2){
                        run_predict.push(x)
                    }
                }
                this.setState({
                    users: users,
                    scripts: scripts,
                    strategys: getStatic().all_stra,
                    run_trade:run_trade,
                    run_predict:run_predict
                })
            })
        })
        this.getCpu();
        this.getMemory();
        this.getDiskRead();
        this.getDiskWrite();
    }
    getCpu() {
        getCpu(Date.parse(new Date())).then((data) => {
            let i = 0;
            this.refresh_cpu = setInterval(() => {
                this.setState({
                    cpu: Number(data.result[i].toFixed(2))
                })
                i++;
                if (i === 60) {
                    this.refresh_cpu && clearTimeout(this.refresh_cpu);
                    clearInterval(this.refresh_cpu);
                    this.getCpu();
                }
            }, 1000);
        })
    }
    getMemory() {
        getMemory(Date.parse(new Date())).then((data) => {
            let i = 0;
            this.refresh_memory = setInterval(() => {
                this.setState({
                    memory: Number(data.result[i].toFixed(2))
                })
                i++;
                if (i === 60) {
                    this.refresh_memory && clearTimeout(this.refresh_memory);
                    clearInterval(this.refresh_memory);
                    this.getMemory();
                }
            }, 1000);
        })
    }
    getDiskRead() {
        getDiskRead(Date.parse(new Date())).then((data) => {
            let i = 0;
            this.refresh_disk_read = setInterval(() => {
                this.setState({
                    disk_read: Number(data.result[i].toFixed(2))
                })
                i++;
                if (i === 60) {
                    this.refresh_disk_read && clearTimeout(this.refresh_disk_read);
                    clearInterval(this.refresh_disk_read);
                    this.getDiskRead();
                }
            }, 1000);
        })
    }
    getDiskWrite() {
        getDiskWrite(Date.parse(new Date())).then((data) => {
            let i = 0;
            this.refresh_disk_write = setInterval(() => {
                this.setState({
                    disk_write: Number(data.result[i].toFixed(2))
                })
                i++;
                if (i === 60) {
                    this.refresh_disk_write && clearTimeout(this.refresh_disk_write);
                    clearInterval(this.refresh_disk_write);
                    this.getDiskWrite();
                }
            }, 1000);
        })
    }

    componentWillUnmount() {
        this.refresh_cpu && clearTimeout(this.refresh_cpu);
        clearInterval(this.refresh_cpu);
        this.refresh_memory && clearTimeout(this.refresh_memory);
        clearInterval(this.refresh_memory);
        this.refresh_disk_read && clearTimeout(this.refresh_disk_read);
        clearInterval(this.refresh_disk_read);
        this.refresh_disk_write && clearTimeout(this.refresh_disk_write);
        clearInterval(this.refresh_disk_write);
    }
    render() {
        return (
            <div className="gutter-example button-demo">
                <Row gutter={10}>
                    <Col className="gutter-row dash-card" span={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="team" className="text-2x text-danger" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">用户</div>
                                        <h3>{this.state.users.length}</h3>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box dash-card">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="filter" className="text-2x" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">策略</div>
                                        <h3 className="script-color">{this.state.scripts.length}</h3>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box dash-card">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="loading" className="text-2x text-info" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">交易实盘</div>
                                        <h3 className='real'>{this.state.run_trade.length}</h3>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box dash-card">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="loading" className="text-2x text-info" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">预测实盘</div>
                                        <h3 className="predict_real">{this.state.run_predict.length}</h3>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                     <Col className="gutter-row dash-card" span={5}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                               <div className="text-muted">cpu</div>
                               <Progress className="dash-cpu" type="circle" percent={this.state.cpu} width={128.2}/>
                            </Card>
                        </div>
                    </Col>
                   <Col className="gutter-row dash-card" span={5}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                               <div className="text-muted">memory</div>
                               <Progress className="dash-memory" type="circle" percent={this.state.memory} width={128.2}/>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row dash-card" span={6}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        {/*<Icon type="save" className="text-2x text-success" />*/}
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">Disk Read(kilobytes/s)</div>
                                        <h3 className="disk-read">{this.state.disk_read}</h3>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box dash-card">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        {/*<Icon type="scan" className="text-2x text-success" />*/}
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">Disk Write(kilobytes/s)</div>
                                        <h3 className="disk-write">{this.state.disk_write}</h3>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>

                    

{/*                   <Col className="gutter-row" span={2}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'no-padding'}>
                                <div className="test-tab"></div>
                            </Card>
                        </div>
                    </Col>*/}
                   <Col className="gutter-row" span={8} value={400}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'run_div run_trade_div'}>
                                <h5>交易实盘(运行中)</h5>
                                <div className="run-trade-div">
                               {this.state.run_trade.map((x,index)=>{
                                return(
                                    <div className="trade-div" key={index}>
                                    <span>{x.name}</span>
                                    <span className="span-right">{x.username}</span>
                                    </div>
                                    )
                               })
                               }
                               </div>
                            </Card>
                        </div>
                    </Col>
                   <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'run_div run_predict_div'}>
                            <h5>预测实盘(运行中)</h5>
                            <div className="run-predict-div">
                             {this.state.run_predict.map((x,index)=>{
                                return(
                                    <div className='predict-div' key={index}>
                                    <span>{x.name}</span>
                                    <span className="span-right">{x.username}</span>
                                    </div>
                                    )
                               })
                               }
                               </div>
                            </Card>
                        </div>
                    </Col>


                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'run_div'}>
                                <div className="pb-m">
                                    <h5>平台事件</h5>
                                </div>
                                <a className="card-tool"><Icon type="sync" /></a>
                                <Timeline>
                                    <Timeline.Item color="green">-------</Timeline.Item>
                                    <Timeline.Item color="green">-------</Timeline.Item>
                                    <Timeline.Item color="red">
                                        <p>-------</p>
                                        <p>-------</p>
                                    </Timeline.Item>

                                    <Timeline.Item color="#108ee9">
                                        <p>-------</p>
                                        <p>-------</p>
                                        <p>-------</p>
                                    </Timeline.Item>
                                </Timeline>
                            </Card>
                        </div>
                    </Col>
{/*                    <Col className="gutter-row" span={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                </div>
                                <a className="card-tool"><Icon type="sync" /></a>
                               
                            </Card>
                        </div>
                    </Col>*/}
                </Row>
            </div>
        );
    }
}


export default DashMain;