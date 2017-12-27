     import $ from 'jquery'

     // console.log(window.location.href)
     // console.warn(window.location.href.indexOf('120.27.140.211') > 0 ? '%cAccess Server' : '%cAccess Localhost', 'background: #332a00; color: #ffdc9e');

     // const dataBaseIp = 'http://120.27.140.211/api/';

     // const dataBaseIp = 'http://121.41.19.183:8080/api/';
     // console.log(window.location.href.indexOf('121.41.19.183') !== -1)

     let dataBaseIp = window.location.href.indexOf('121.41.19.183') !== -1 ? 'http://121.41.19.183:8080/api/' : 'http://120.27.140.211/api/';
     if(window.location.href.indexOf('192')!==-1 || window.location.href.indexOf('localhost')!==-1){
          dataBaseIp = 'http://121.41.19.183:8080/api/';
          // dataBaseIp = 'http://120.27.140.211/api/';
     }
     const oldDataBase = 'http://114.55.238.82:81/';

     let staticData = [];

     //获取浏览器
     // export const getBrowser = () => {
     //           let Sys = {};
     //           let ua = navigator.userAgent.toLowerCase();
     //           let s;
     //           (s = ua.amatch(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1]:
     //                (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
     //                (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
     //                (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
     //                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
     //                (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
     //           if (Sys.ie) return true;
     //           if (Sys.firefox) return false;
     //           if (Sys.chrome) return parseInt(Sys.chrome, 10) < 58;
     //           if (Sys.opera) return falsge;
     //           if (Sys.safari) return true;
     //      }
     // console.log(new Date().getTimezoneOffset())


     //登录
     export const Login = (username, password) => {
               return new Promise((resolve, reject) => {
                    let user = [];
                    let formdata = new FormData();
                    formdata.append('username', username);
                    formdata.append('password', password);
                    $.ajax({
                         url: dataBaseIp + 'api-token-auth/',
                         type: 'POST',
                         contentType: false,
                         processData: false,
                         data: formdata,
                         success: function(data) {
                              user = data;
                              resolve(user);
                         },
                         error: function(data) {
                              switch (data.status) {
                                   case 400:
                                        user = '用户名或密码错误';
                                        break;
                                        // case 403:
                                        //      user = JSON.parse(data.responseText).detail;
                                        //      break;
                                   default:
                                        user = data.status + '-' + JSON.parse(data.responseText).detail;
                                        break;
                              }
                              resolve(user);
                              // user = false;
                         }
                    });
                    // return user;
               });

          }
          //是否历史交易
     export const getHis = (flag, data) => {
               let trueData = [];
               let falseData = [];
               for (let i = 0; i < data.length; i++) {
                    if (data[i].status === 4) {
                         trueData.push(data[i]);
                    } else {
                         falseData.push(data[i]);
                    }
               }
               return flag ? trueData : falseData;
          }
          //修改用户密码
     export const changePass = (user, old_pass, new_pass) => {
               return new Promise((resolve, reject) => {
                    let formdata = new FormData();
                    formdata.append('oldPassword', old_pass);
                    formdata.append('newPassword', new_pass);
                    fetch(dataBaseIp + 'api-auth/password/' + user + '/', {
                         method: "POST",
                         headers: {
                              // "Content-Type": "application/x-www-form-urlencoded",
                              'Authorization': 'token ' + localStorage.getItem("token")
                         },
                         body: formdata,
                    }).then(function(res) {
                         resolve(res.status)
                    }).then(function(data) {
                         // resolve(data);
                    }).catch(function(err) {
                         // console.log(err)
                         reject(err);
                    });
               });
          }
          //是否获取预测实例
     export const getPre = (flag, data) => {
               let trueData = [];
               let falseData = [];
               for (let i = 0; i < data.length; i++) {
                    if (data[i].script_mode === 'predict') {
                         trueData.push(data[i]);
                    } else {
                         falseData.push(data[i]);
                    }
               }
               return flag ? trueData : falseData;
          }
          //获取平台函数列表
     export const getKeywords = () => {
          let keywords = [
               "on_init",
               "on_start",
               "on_stop",
               "on_tick",
               "on_bar",
               "on_order",
               "on_newday",
               "context.function.buy",
               "context.function.sell",
               "context.function.short",
               "context.function.cover",
               "context.function.cancel",
               "context.function.log",
               "context.function.mlog",
               "context.function.get_market_data",
               "context.function.predict",
               "context.function.get_time",
               "context.let.tick",
               "context.let.bar",
               "context.let.order"
          ]
          return keywords;
     }

     //获取交易列表 真实交易为true
     export const getStra = (flag, data) => {
               let falseList = [];
               let trueList = [];
               let m = 0,
                    n = 0;
               for (let i = 0; i < data.length; i++) {
                    if (data[i].status === -2) {
                         data.splice(i, 1);
                         i = -1;
                    }
               }
               for (let i = 0; i < data.length; i++) {
                    if (data[i].account_id != null) {
                         trueList[m++] = data[i];
                    } else {
                         falseList[n++] = data[i];
                    }
               }
               if (flag) {
                    return trueList;
               } else {
                    return falseList;
               }
          }
          //根据策略id获取相应的实例
     export const idGetStra = (id, data) => {
          for (let i = 0; i < data.length; i++) {
               if (data[i].script_id !== id) {
                    data.splice(i, 1);
                    i = -1;
               }
          }
          return data;
     }

     //根据策略交易所代码获取相应的实例
     export const exchangeGetStra = (exchange, data) => {
               for (let i = 0; i < data.length; i++) {
                    if (data[i].exchange !== exchange) {
                         data.splice(i, 1);
                         i = -1;
                    }
               }
               return data;
          }
          //数组排序 传入asc降序 desc升序  根据sortBy字段排序
     export const getSortFun = (order, sortBy) => {
               let ordAlpah = (order === 'desc') ? '>' : '<';
               let sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
               return sortFun;
          }
          //根据状态码加上相应的中文
     export const statusToChinese = (data) => {
          for (let i = 0; i < data.length; i++) {
               switch (data[i].status) {
                    case -2:
                         data[i].flag = '已删除';
                         break;
                    case -1:
                         data[i].flag = '错误';
                         break;
                    case 0:
                         data[i].flag = '加载中';
                         break;
                    case 1:
                         data[i].flag = '加载结束';
                         break;
                    case 2:
                         data[i].flag = '运行中';
                         break;
                    case 3:
                         data[i].flag = '停止运行';
                         break;
                    case 4:
                         data[i].flag = '运行结束';
                         break;
                    default:
                         data[i].flag = '未知状态';
               }
          }
          return data;
     }
     let staticDateList = [];
     //根据id获取交易数据的日期列表
     export const getDateList = (id) => {
          // console.log(staticDateList)
          // for (let i in staticDateList) {
          //      if (staticDateList[i].id == id) {
          //           return staticDateList[i].dates;
          //      }
          // }
          let body = '?type=trade_date&strategy_id=' + id;
          let dateList = [];
          $.ajax({
               url: dataBaseIp + 'strategy_datas/' + body,
               headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
               },
               type: 'GET',
               contentType: false,
               processData: false,
               async: false,
               success: function(data) {
                    for (let i in data) {
                         data[i] = data[i].slice(0, 10);
                    }
                    dateList = data;
                    staticDateList.push({ //save dateList to use
                         id: id,
                         dates: dateList
                    })
               },
               error: function(data) {
                    // console.log(data);
               }
          });
          return dateList;
     }

     export const get_unix_timestamp = (dateStr) => {
               var newstr = dateStr.replace(/-/g, '/');
               var date = new Date(newstr);
               var time_str = date.getTime().toString();
               return Number(time_str);
          }
          // console.log(get_unix_timestamp('2014-05-08 00:22:11'))

     //根据id和时间获取交易数据
     export const getTransaction = (id, start, end) => {
          let transaction = [];
          let body = '?strategy_id=' + id;
          body += '&trade_date=' + start;
          body += '&type=order'
          $.ajax({
               url: dataBaseIp + 'strategy_datas/' + body,
               headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
               },
               type: 'GET',
               contentType: false,
               processData: false,
               async: false,
               success: function(data) {
                    for (let i in data) {
                         data[i].datetime = get_unix_timestamp(dateTodate(data[i].datetime));
                    }
                    if (data.length > 1) {
                         for (let i in data) {
                              if (data[i].exchange == 'OKCoin') {
                                   data[i].price *= 0.01;
                                   data[i].price = Number((data[i].price).toFixed(2));
                              }
                         }
                         transaction = data;
                    }
               },
               error: function(data) {}
          });
          staticData.transitions = transaction;
          return transaction;
     }
     export const downMarket = (exchange, symbol, start_date, end_date) => {
               return new Promise((resolve, reject) => {
                         let transaction = [];
                         let body = '?exchange=' + exchange;
                         body += '&symbol=' + symbol;
                         body += '&start_date=' + start_date;
                         body += '&end_date=' + end_date;
                         body += '&type=bar';
                         $.ajax({
                              url: dataBaseIp + 'market_datas/' + body,
                              headers: {
                                   'Authorization': 'token ' + localStorage.getItem("token")
                              },
                              type: 'GET',
                              processData: false,
                              success: function(data) {
                                   if (typeof(data) == 'string') {
                                        reject(data);
                                        return;
                                   }
                                   for (let i in data) {
                                        data[i].datetime = get_unix_timestamp(dateTodate(data[i].datetime));
                                   }
                                   data.sort((a, b) => {
                                        return a.datetime - b.datetime;
                                   });
                                   if (data.length > 1) {
                                        transaction = data;

                                        resolve(transaction);
                                   } else {

                                        resolve([]);
                                   }
                              },
                              error: function(data) {

                                   resolve([]);
                              }
                         });
                    })
                    // return transaction;
          }
          //获取行情数据
     export const getDatas = (exchange, symbol, trade_date, type) => {
          return new Promise((resolve, reject) => {
                    let transaction = [];
                    let body = '?exchange=' + exchange;
                    body += '&symbol=' + symbol;
                    body += '&trade_date=' + trade_date;
                    body += '&type=' + type;
                    $.ajax({
                         url: dataBaseIp + 'market_datas/' + body,
                         headers: {
                              'Authorization': 'token ' + localStorage.getItem("token")
                         },
                         type: 'GET',
                         processData: false,
                         async: true,
                         success: function(data) {
                              // data.splice(0, 1);
                              for (let i in data) {
                                   data[i].datetime = get_unix_timestamp(dateTodate(data[i].datetime));
                              }
                              data.sort((a, b) => {
                                   return a.datetime - b.datetime;
                              });
                              if (data.length > 1) {
                                   transaction = data;
                                   if (type == 'bar') {
                                        // console.warn(formatDate(data[0].datetime))
                                        staticData.datas = transaction;
                                   }
                                   // if (type == 'indicator') {
                                   //      staticData.qualifications = transaction;
                                   // }
                                   resolve(transaction);
                              } else {
                                   staticData.datas = [];
                                   resolve([]);
                              }
                         },
                         error: function(data) {
                              staticData.datas = [];
                              resolve([]);
                         }
                    });
               })
               // return transaction;
     }

     Date.prototype.Format = function(fmt) { //author: meizz 
          var o = {
               "M+": this.getMonth() + 1, //月份 
               "d+": this.getDate(), //日 
               "h+": this.getHours(), //小时 
               "m+": this.getMinutes(), //分 
               "s+": this.getSeconds(), //秒 
               "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
               "S": this.getMilliseconds() //毫秒 
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
               if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
     }
     export const formatNewDate = (date) => {
               return date.Format("yyyy-MM-dd")
          }
          //获取前天 昨天 今天 明天 后天 大后天 (-2,-1,0,1,2,3)
     export const getDay = (day) => {
               let today = new Date();
               let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
               today.setTime(targetday_milliseconds); //注意，这行是关键代码    
               let tYear = today.getFullYear();
               let tMonth = today.getMonth() + 1;
               let tDate = today.getDate();
               tMonth = tMonth < 10 ? '0' + tMonth : tMonth;
               tDate = tDate < 10 ? '0' + tDate : tDate;
               return tYear + "-" + tMonth + "-" + tDate;
          }
          //获取下一天的日期
     export const getNextDay = (sdate) => {
          let mm = sdate;
          let arr = mm.split("-");
          let newdt = new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]) + 1);
          let y = newdt.getFullYear();
          let m = newdt.getMonth() + 1;
          let d = newdt.getDate();
          m = m < 10 ? '0' + m : m;
          d = d < 10 ? '0' + d : d;
          return y + '-' + m + '-' + d;
     }

     // 获取产品的手续费
     export const gateways = (exchange) => {
          return new Promise((resolve, reject) => {
               fetch(dataBaseIp + 'gateways/' + exchange + '/', {
                    method: "GET",
                    headers: {
                         // "Content-Type": "application/x-www-form-urlencoded",
                         'Authorization': 'token ' + localStorage.getItem("token")
                    },
               }).then(function(res) {
                    if (res.ok) {
                         return res.json();
                    } else {
                         reject(res);
                    }

               }).then(function(data) {
                    staticData.fee[exchange] = {
                         exchange: exchange,
                         open_commission_rate: data.open_commission_rate,
                         close_commission_rate: data.close_commission_rate
                    }
                    resolve(data);
               }).catch(function(err) {
                    // console.log(err)
                    reject(err);
               });


               // $.ajax({
               //      url: dataBaseIp + 'gateways/' + exchange + '/',
               //      headers: {
               //           'Authorization': 'token ' + localStorage.getItem("token")
               //      },
               //      timeout: 15000,
               //      type: 'GET',
               //      contentType: false,
               //      processData: false,
               //      async: true,
               //      success: function(data) {
               //           staticData.fee[exchange] = {
               //                exchange: exchange,
               //                open_commission_rate: data.open_commission_rate,
               //                close_commission_rate: data.close_commission_rate
               //           }
               //           resolve(data);
               //      },
               //      error: function(err) {
               //           reject(err);
               //      }
               // });

          });
     }
     let hasUserList = false;
     //获取用户列表
     // staticData.userList = [];
     export const getUserList = () => {
          if (localStorage.getItem("username") != 'admin') {
               return new Promise((resolve, reject) => {
                    getStrategys().then((flag) => {
                         resolve(staticData.userList)
                    })
               });
          }
          return new Promise((resolve, reject) => {
               let userList = [];
               $.ajax({
                    url: dataBaseIp + 'users/',
                    headers: {
                         "Authorization": 'token ' + localStorage.getItem("token")
                    },
                    type: 'GET',
                    contentType: false,
                    processData: false,
                    async: true,
                    success: function(data) {
                         // body...
                         userList = data;
                         staticData.userList = data;
                         hasUserList = true;
                         getStrategys().then((flag) => {
                              resolve(userList)
                         })

                    },
                    error: function(data) {

                    }
               })
          });
     }
     staticData.userList = [];
     export const debug = () => {
          if (localStorage.getItem("username") == 'admin') {

          } else {
               staticData.userList.push({
                    username: localStorage.getItem("username")
               })
          }
     }
     debug();

     export const changeFee = (exchange, open, close) => {
          return new Promise((resolve, reject) => {
               let body = 'open_commission_rate=' + open;
               body += '&close_commission_rate=' + close;
               fetch(dataBaseIp + 'gateways/' + exchange + '/', {
                    method: "PATCH",
                    headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                         'Authorization': 'token ' + localStorage.getItem("token")
                    },
                    body: JSON.stringify({
                         open_commission_rate: open,
                         close_commission_rate: close
                    })
               }).then(function(res) {

                    if (res.ok) {
                         staticData.fee[exchange].open_commission_rate = open;
                         staticData.fee[exchange].close_commission_rate = close;
                         resolve('修改成功');
                    } else {
                         resolve('修改失败');
                    }

               }).catch(function(err) {
                    console.log(err)
                    reject(err);
               });
          });
     }


     //根据交易所代码，开仓价，平仓价，手数计算出手续费
     export const getTest = (exchange, a, b, volume) => {
               let charge;
               let charge_close;
               let fee = staticData.fee;
               if (fee[exchange] != undefined) {
                    charge = fee[exchange].open_commission_rate;
                    charge_close = fee[exchange].close_commission_rate;
               } else {
                    switch (exchange) {
                         case 'CTP':
                              charge_close = 0.00092;
                              charge = 0.00024;
                              break;
                         case 'CSRPME':
                              charge = 0.00035;
                              charge_close = 0.00035;
                              break;
                         case 'OKCoin':
                              charge = 0.002;
                              charge_close = 0.002;
                              break;
                         default:
                              charge_close = 0.00092;
                              charge = 0.00024;
                              break;
                    }
               }

               // console.log(charge, charge_close)
               let test = (a * charge + b * charge_close) * volume * 300;
               return Number((test).toFixed(6));
          }
          //根据交易类型和开仓价，平仓价计,交易手续计算出不带手续费的盈亏
     export const noTest = (flag, a, b, volume) => {
               let test;
               if (flag == "看多") {
                    test = b - a;
               } else {
                    test = a - b;
               }
               test = test * volume * 300;
               return Number((test).toFixed(6));
          }
          //配对算法
     export const pairData = (data) => {
               let newData = [];
               for (let k = 0; k < data.length; k++) {
                    newData.push(data[k]);
                    let type = data[k].type;
                    let find = false;
                    data.splice(k, 1);
                    for (let i = 0; i < data.length; i++) {
                         if (data[i].type != type) {
                              newData.push(data[i]);
                              data.splice(i, 1);
                              find = true;
                              k = -1;
                              break;
                         }

                    }
                    if (!find) {
                         newData.splice(newData.length - 1, 1);
                         break;

                    }
               }
               return newData;
          }
          //检查是否是真实交易
     export const checkTrue = (id) => {
               for (let i in staticData.strategys) {
                    if (staticData.strategys[i]._id == id) {
                         return staticData.strategys[i].account_id != null;
                    }
               }
               return false;
          }
          //将交易数据进行整理  真实交易为true 并计算出其胜率和年化收益率
     export const makeData = (id, data) => {
          let newData = [];
          if (checkTrue(id)) {
               for (let i = 0; i < data.length; i++) { //保留已成交
                    if (data[i].status == 0 || data[i].status == -1) {
                         data.splice(i, 1);
                         i = -1;
                    }
               }
          }
          data = pairData(data.concat());
          for (let i = 0; i < data.length && i + 1 < data.length; i = i + 2) {
               newData.push({
                    "direction": '',
                    "openprice": data[i].price,
                    "opentime": data[i].datetime,
                    "openserialno": data[i].order_id,
                    "closeprice": data[i + 1].price,
                    "closetime": data[i + 1].datetime,
                    "closeserialno": data[i + 1].order_id,
                    "time": data[i + 1].datetime,
                    "open": data[i].price,
                    "opentype": data[i].type,
                    "closetype": data[i + 1].type,
                    "exchange": data[i].exchange,
                    "symbol": data[i].symbol,
                    "volume": data[i].volume
               })
          }
          let total_yeild = 0;
          let zheng = 0;
          let total_buy = 0;
          let total_pal = 0;
          for (let j = 0; j < newData.length; j++) {
               newData[j].direction = newData[j].opentype == 'buy' ? '看多' : '看空';
               newData[j].test = getTest(newData[j].exchange, newData[j].openprice, newData[j].closeprice, newData[j].volume);
               newData[j].notestpal = noTest(newData[j].direction, newData[j].openprice, newData[j].closeprice, newData[j].volume);
               newData[j].pal = newData[j].notestpal - newData[j].test;
               newData[j].yeild = newData[j].openprice == 0 ? 0 : newData[j].pal / (newData[j].openprice * 300) / newData[0].volume;
               newData[j].test = Number((newData[j].test).toFixed(4));
               newData[j].notestpal = Number((newData[j].notestpal).toFixed(4));
               newData[j].pal = Number((newData[j].pal).toFixed(4));
               total_yeild += newData[j].yeild;
               if (newData[j].pal > 0) {
                    zheng++;
               }
               newData[j].yeild = Number((newData[j].yeild * 100).toFixed(4));
               total_buy += newData[j].openprice;
               total_pal += newData[j].pal;
          }
          let average_winrate = newData.length == 0 ? 0 : (zheng / newData.length);
          total_yeild = total_pal / (total_buy * 300);
          let nianhua = total_yeild / 250 * 360;
          average_winrate = Number(average_winrate * 100).toFixed(2);
          nianhua = Number(nianhua * 100).toFixed(4);
          if (average_winrate == 0 || isNaN(average_winrate)) {
               average_winrate = '0.00'
          }
          if (nianhua == 0 || isNaN(nianhua)) {
               nianhua = '0.0000'
          }

          return {
               'total_yeild': total_yeild,
               'newData': newData,
               'average_winrate': average_winrate,
               'nianhua': nianhua
          };
     }
     export const model_type = (type) => {
          switch (type) {
               case 'regress':
                    return '经典时间序列自回归模型';
               case 'machine_classify':
                    return '机器学习分类模型';
               case 'machine_regress':
                    return '机器学习回归模型';
               case 'finance_regress':
                    return '金融技术指标回归模型';
               case 'none':
                    return '未选择模型';
               default:
                    return '经典时间序列自回归模型';
          }
     }

     //根据实例类型和id操作操作实例 2：启动 3：暂停 操作成功返回true
     export const strategyAction = (flag, id, status) => {
          let formdata = new FormData();
          formdata.append('status', status);
          let ok = false;
          $.ajax({
               url: dataBaseIp + 'strategys/' + id + '/',
               headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
               },
               data: formdata,
               type: 'PATCH',
               contentType: false,
               processData: false,
               async: false,
               success: function(data) {
                    ok = true;
               },
               error: function(data) {
                    // console.log(data);
               }
          });
          return ok;
     }

     //根据实例类型和id删除实例
     export const delStrategy = (flag, id) => {
          let ok = '';
          $.ajax({
               url: dataBaseIp + 'strategys/' + id + '/',
               headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
               },
               type: 'DELETE',
               contentType: false,
               processData: false,
               async: false,
               success: function(data) {
                    ok = true;
               },
               error: function(data) {
                    // console.log(data);
               }
          });
          return ok;
     }

     //根据实例类型和id获取单个实例信息
     export const getStrategy = (id) => {
          let Strategy;
          $.ajax({
               url: dataBaseIp + 'strategys/' + id + '/',
               headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
               },
               type: 'GET',
               contentType: false,
               processData: false,
               async: false,
               success: function(data) {
                    Strategy = data;
               },
               error: function(data) {
                    // getStrategy(!type,id);
               }
          });
          return Strategy;
     }
     export const strategys = (id) => {
          return new Promise((resolve, reject) => {
               $.ajax({
                    url: dataBaseIp + 'strategys/' + id + '/',
                    headers: {
                         'Authorization': 'token ' + localStorage.getItem("token")
                    },
                    type: 'GET',
                    contentType: false,
                    processData: false,
                    async: true,
                    success: function(data) {
                         resolve(data)
                    },
                    error: function(data) {
                         // getStrategy(!type,id);
                    }
               });
          });
     }
     export const dateTodate = (date) => {
               return date.slice(0, 10) + ' ' + date.slice(11, 19);
          }
          //判断中文
     function isChinese(str) {
          var regExp = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
          if (!regExp.exec(str))
               return false;
          return true;
     }
     //超过长度省略号表示     
     var cutStrForNum = function(str, num) {
          var chinese = 0;
          for (var i = 0; i < num; i++) {
               if (isChinese(str[i])) {
                    chinese++;
               } //中文字符 

          }
          var newStr = str.substring(0, num - chinese) + "...";
          return newStr;
     }


     $.get(require("../../../predict_Demo.txt"), function(data, status) {
          staticData.predict_demo_code = data;
     })
     $.get(require("../../../trade_Demo.txt"), function(data, status) {
               staticData.trade_demo = data;
          })
          // export const put_predict_demo = (note_code) => {
          //      staticData.predict_demo = note_code + staticData.predict_demo_code;
          // }
     staticData.fee = [];

     staticData.scripts = [];
     //获取所有策略代码
     export const getClasss = () => {

               return new Promise((resolve, reject) => {
                    let Classs = [];
                    $.ajax({
                         url: dataBaseIp + 'scripts/',
                         headers: {
                              'Authorization': 'token ' + localStorage.getItem("token")
                         },
                         type: 'GET',
                         contentType: false,
                         processData: false,
                         async: true,
                         success: function(data) {
                              for (let i in data) {
                                   if (data[i].name.length >= 18) {
                                        data[i].shortname = cutStrForNum(data[i].name, 18);
                                   } else {
                                        data[i].shortname = data[i].name;
                                   }
                                   data[i].datetime = dateTodate(data[i].datetime);
                              }
                              Classs = data;
                              staticData.scripts = Classs;

                              resolve(Classs.slice(0));

                         },
                         error: function(data) {
                              reject(false);
                         }
                    });
               });

          }
          //根据实例类型和id获取单个实例信息，包含代码
     export const getClass = (id) => {
               return new Promise((resolve, reject) => {
                    $.ajax({
                         url: dataBaseIp + 'scripts/' + id + '/',
                         headers: {
                              'Authorization': 'token ' + localStorage.getItem("token")
                         },
                         type: 'GET',
                         contentType: false,
                         processData: false,
                         async: true,
                         success: function(data) {
                              resolve(data);
                         },
                         error: function(data) {
                              reject('error');
                         }
                    });
               });
          }
          //获取工作事件
     export const getWorkLog = (body) => {
               return new Promise((resolve, reject) => {
                    $.ajax({
                         url: dataBaseIp + 'work_logs/?' + body,
                         headers: {
                              'Authorization': 'token ' + localStorage.getItem("token")
                         },
                         type: 'GET',
                         contentType: false,
                         processData: false,
                         success: function(data) {
                              resolve(data)
                         },
                         error: function(data) {
                              reject(data)
                         }
                    });
               });
          }
          //编辑策略代码 
     export const pathCode = (formdata, id) => {
               return new Promise((resolve, reject) => {
                    let ok = '';
                    $.ajax({
                         url: dataBaseIp + 'scripts/' + id + '/',
                         headers: {
                              // "Content-Type": 'multipart/form-data',
                              'Authorization': 'token ' + localStorage.getItem("token")
                         },
                         type: 'PATCH',
                         data: formdata,
                         contentType: false,
                         processData: false,
                         async: true,
                         success: function(data) {
                              resolve(data)
                         },
                         error: function(data) {
                              reject(data)
                         }
                    });
               });

          }
          //获取单个预测代码信息
     export const getScripts = (id) => {
               return new Promise((resolve, reject) => {
                    $.ajax({
                         url: dataBaseIp + 'scripts/' + id + '/',
                         headers: {
                              'Authorization': 'token ' + localStorage.getItem("token")
                         },
                         type: 'GET',
                         contentType: false,
                         processData: false,
                         success: function(data) {
                              resolve(data);
                         },
                         error: function(data) {
                              reject([]);
                         }
                    });

               });
          }
          //从已有的代码获取信息
     export const getClassName = (id) => {
          for (let i in staticData.scripts) {
               if (id == staticData.scripts[i].id) {
                    return staticData.scripts[i];
               }
          }
          return false;
     }

     // 获取url的参数
     export const queryString = () => {
          let url = window.location.href;
          return url.slice(url.lastIndexOf('/') + 1, url.length);
     };
     // export const queryString = () => {
     //      let _queryString = {};
     //      const _query = window.location.search.substr(1);
     //      const _vars = _query.split('&');
     //      _vars.forEach((v, i) => {
     //           const _pair = v.split('=');
     //           if (!_queryString.hasOwnProperty(_pair[0])) {
     //                _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
     //           } else if (typeof _queryString[_pair[0]] === 'string') {
     //                const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
     //                _queryString[_pair[0]] = _arr;
     //           } else {
     //                _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
     //           }
     //      });
     //      return _queryString;
     // };
     //添加策略代码 
     export const addClass = (formdata) => {
          return new Promise((resolve, reject) => {
               //      let ok = '';
               //      $.ajax({
               //           url: dataBaseIp + 'scripts/',
               //           headers: {
               //                // "Content-Type": 'multipart/form-data',
               //                'Authorization': 'token ' + localStorage.getItem("token")
               //           },
               //           type: 'POST',
               //           data: formdata,
               //           contentType: false,
               //           processData: false,
               //           async: true,
               //           success: function(data) {
               //                resolve(data)
               //           },
               //           error: function(data) {
               //                if (data.status == 403) {
               //                     ok = '您没有权限，请联系管理员';
               //                } else {
               //                     ok = '网络错误';
               //                }
               //                reject(ok)
               //           }.bind(this),
               //      });

               fetch(dataBaseIp + 'scripts/', {
                    method: "POST",
                    headers: {
                         // "Content-Type": "application/x-www-form-urlencoded",
                         'Authorization': 'token ' + localStorage.getItem("token")
                    },
                    body: formdata,
               }).then(function(res) {
                    resolve(res.json())
               }).then(function(data) {
                    reject([])
               }).catch(function(err) {
                    console.log(err)
                    resolve([]);
               });


               // //创建xhr对象 
               // var xhr = new XMLHttpRequest();
               // //设置xhr请求的超时时间
               // xhr.timeout = 3000;
               // //设置响应返回的数据格式
               // // xhr.responseType = "text";
               // //创建一个 post 请求，采用异步
               // xhr.open('POST', dataBaseIp + 'scripts/', true);
               // xhr.setRequestHeader('Authorization', 'token ' + localStorage.getItem("token"));
               // //注册相关事件回调处理函数
               // xhr.onload = function(e) { 
               //   // if(this.status == 200||this.status == 304){
               //       resolve(this.responseText);
               //   // }
               // };
               // // xhr.ontimeout = function(e) { ... };
               // // xhr.onerror = function(e) { ... };
               // // xhr.upload.onprogress = function(e) { ... };

               // //发送数据
               // xhr.send(formdata);

          });

     }

     //删除策略代码
     export const delClass = (id) => {
               let ok;
               $.ajax({
                    url: dataBaseIp + 'scripts/' + id + '/',
                    headers: {
                         'Authorization': 'token ' + localStorage.getItem("token")
                    },
                    type: 'DELETE',
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function(data) {
                         ok = true;
                    },
                    error: function(data) {
                         // console.log(data);
                    }
               });
               return ok;
          }
          //获取行情日期
     export const getDataDate = (exchange, symbol) => {
               let body = '?type=trade_date&exchange=' + exchange + '&symbol=' + symbol;
               let dateList = [];
               $.ajax({
                    url: dataBaseIp + 'market_datas/' + body,
                    headers: {
                         'Authorization': 'token ' + localStorage.getItem("token")
                    },
                    type: 'GET',
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function(data) {
                         for (let i in data) {
                              data[i] = data[i].slice(0, 10);
                         }
                         dateList = data;
                    },
                    error: function(data) {
                         // console.log(data);
                    }
               });
               return dateList;
          }
          //毫秒时间戳 将时间格式化 2016-01-02 
     export const formatDate = (date, flag) => {
          let now = new Date(date);
          let year = now.getFullYear();
          let month = now.getMonth() + 1;
          let day = now.getDate();
          let hour = now.getHours();
          let minute = now.getMinutes();
          let second = now.getSeconds();
          month = month < 10 ? "0" + month : month;
          day = day < 10 ? "0" + day : day;
          hour = hour < 10 ? "0" + hour : hour;
          minute = minute < 10 ? "0" + minute : minute;
          second = second < 10 ? "0" + second : second;
          return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
     }
     staticData.trueStras = [];
     staticData.strategys = [];
     staticData.btstrategys = [];
     staticData.predictStras = [];
     staticData.predictBtras = [];
     staticData.his_strategys = [];
     staticData.all_stra = [];
     //获取实盘／回测
     export const getStrategys = () => {
               return new Promise((resolve, reject) => {
                    let TrueStraList = [];
                    let StrategyList = [];
                    let BtstrategyList = [];
                    let PredictStraList = [];
                    let PredictBtraList = [];
                    let HisStraList = [];
                    $.ajax({
                         url: dataBaseIp + 'strategys' + '/',
                         headers: {
                              'Authorization': 'token ' + localStorage.getItem("token")
                         },
                         type: 'GET',
                         contentType: 'application/x-www-form-urlencoded',
                         processData: false,
                         async: true,
                         success: function(data) {
                              staticData.all_stra = data;
                              let HisStraList = [];
                              for (let i in data) {
                                   if (data[i].mode == 'realtime' && data[i].status == 4) {
                                        HisStraList.push(data[i])
                                   }
                                   data[i].datetime = dateTodate(data[i].datetime);
                                   if (data[i].mode == 'realtime') {
                                        if (data[i].account_id != null) {
                                             TrueStraList.push(data[i])
                                        } else {
                                             if (data[i].script_mode == 'predict') {
                                                  PredictStraList.push(data[i]);
                                             } else {
                                                  StrategyList.push(data[i]);
                                             }
                                        }
                                   } else {
                                        if (data[i].script_mode == 'predict') {
                                             PredictBtraList.push(data[i]);
                                        } else {
                                             BtstrategyList.push(data[i]);
                                        }

                                   }
                              }

                              staticData.trueStras = TrueStraList;
                              staticData.strategys = StrategyList;
                              staticData.btstrategys = BtstrategyList;
                              staticData.predictStras = PredictStraList;
                              staticData.predictBtras = PredictBtraList;
                              staticData.his_strategys = HisStraList;
                              resolve(true);
                         },
                         error: function(XMLHttpRequest, textStatus, errorThrown) {
                              // strategys = XMLHttpRequest.status
                              reject(false);
                         }
                    });
               });

          }
          //获取所有实盘/历史回测列表
     export const getAllStrategy = (flag) => {
               return flag ? staticData.strategys : staticData.btstrategys;
          }
          //产生随机数
     export const randomNum = (MIN, MAX) => {
               let num;
               num = Math.floor(((MAX - MIN) + 1) * Math.random() + MIN);
               return num;
          }
          //将时间差时间戳转换成时间格式
     export const newTotalTime = (time) => {
               let hour = 0;
               //这里因为都需要把 小时数归零 所以 hour = 0 定义在外面
               let min = parseInt((time) / 1000 / 60);
               //分钟 的计算 除以 1000 是除去毫秒 之后 除以 60 计算出带小数点的分钟数 这里需要取整
               let sec = Math.ceil((((time) / 1000 / 60) - min) * 60);
               //秒 的计算 同分钟 这里用带毫秒的分钟数 减去 取整 后的分钟数 得到小数点后的 数值 之后 *60 向上取整 得到正确 秒
               if (min >= 60) {
                    hour = parseInt(min / 60);
                    min = min - hour * 60;
               }
               if (sec >= 60) {
                    min += parseInt(sec / 60);
                    sec = sec - parseInt(sec / 60) * 60;
               }
               if (hour < 10) hour = "0" + hour;
               if (min < 10) min = "0" + min;
               if (sec < 10) sec = "0" + sec;
               let totalTime = hour + ":" + min + ":" + sec;
               return totalTime;
          }
          //验证日期格式
     export const strDateTime = (str) => {
               var a = /^(\d{4})-(\d{2})-(\d{2})$/;
               return !a.test(str);
          }
          //下载文件
     export const downFile = (text, name) => {
          let file = new Blob([text], {
               // type: 'text/csv'
               // type: 'text/plain'
          })
          let a = $('<a hidden>Download py</a>').appendTo('body')
          a[0].href = URL.createObjectURL(file)
          a[0].download = name
          a[0].click()
     }

     //运行日志
     export const getLog = (id, date) => {
               let logs = [];
               $.ajax({
                    url: dataBaseIp + 'strategy_datas/?type=log&strategy_id=' + id + '&trade_date=' + date,
                    headers: {
                         'Authorization': 'token ' + localStorage.getItem("token")
                    },
                    type: 'GET',
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function(data) {
                         logs = data;
                    },
                    error: function(data) {
                         // console.log(data);
                    }
               });
               return logs;
          }
          //预测数据
     export const getPredict = (id, date) => {
          return new Promise((resolve, reject) => {
               fetch(dataBaseIp + 'strategy_datas/?type=predict&strategy_id=' + id + '&trade_date=' + date, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/x-www-form-urlencoded",
                         'Authorization': 'token ' + localStorage.getItem("token")
                    },
               }).then(function(res) {
                    return res.text();
               }).then(function(data) {

                    resolve(JSON.parse(data.replace(/\bNaN\b/g, "null")));
               }).catch(function(err) {
                    console.log(err)
                    resolve([]);
               });
          });
     }


     //      $.ajax({
     //           url: dataBaseIp + 'strategy_datas/?type=predict&strategy_id=' + id + '&trade_date=' + date,
     //           headers: {
     //                'Authorization': 'token ' + localStorage.getItem("token")
     //           },
     //           type: 'GET',
     //           contentType: false,
     //           processData: false,
     //           success: function(data) {
     //                resolve(data);
     //           },
     //           error: function(data) {
     //                resolve([]);
     //           }
     //      });
     //获取历史年化
     export const getNianHua2 = (id) => {
          return new Promise((resolve, reject) => {



               $.ajax({
                    url: dataBaseIp + 'strategy_datas_list/?strategy_id=' + id,
                    headers: {
                         'Authorization': 'token ' + localStorage.getItem("token")
                    },
                    type: 'GET',
                    contentType: false,
                    processData: false,
                    // async: false,
                    success: function(data) {
                         resolve(data)
                    },
                    error: function(data) {
                         reject(data)
                    }
               });
          });

     }
     export const getNianHua3 = (id) => {
          return new Promise((resolve, reject) => {



               $.ajax({
                    url: dataBaseIp + 'strategy_statistics/?script_id=' + id,
                    headers: {
                         'Authorization': 'token ' + localStorage.getItem("token")
                    },
                    type: 'GET',
                    contentType: false,
                    processData: false,
                    // async: false,
                    success: function(data) {
                         resolve(data)
                    },
                    error: function(data) {
                         reject(data)
                    }
               });
          });

     }
     export const getNianHua = (id) => {
          return new Promise((resolve, reject) => {
               let nianhuaList = [];
               let dateList = getDateList(id);
               if (dateList.length === 0) {
                    reject([])
               }
               for (let i = 0; i < dateList.length; i++) {
                    let body = '?strategy_id=' + id;
                    body += '&trade_date=' + dateList[i];
                    body += '&type=statistics';
                    $.ajax({
                         url: dataBaseIp + 'strategy_datas/' + body,
                         headers: {
                              'Authorization': 'token ' + localStorage.getItem("token")
                         },
                         type: 'GET',
                         contentType: false,
                         processData: false,
                         async: false,
                         success: function(data) {
                              data.date = dateList[i];
                              nianhuaList.push(data)
                         },
                         error: function(data) {
                              // console.log(data)
                              // reject(data)
                         }
                    });
               }
               resolve(nianhuaList)
          });

     }
     export const formToJson = () => {
               let o = {};
               let a = this.serializeArray();
               $.each(a, function() {
                    if (o[this.name]) {
                         if (!o[this.name].push) {
                              o[this.name] = [o[this.name]];
                         }
                         o[this.name].push(this.value || '');
                    } else {
                         o[this.name] = this.value || '';
                    }
               });
               return o;
          }
          //添加实例
     export const addTrade = (formdata, onprogress) => {
          return new Promise((resolve, reject) => {
               $.ajax({
                    url: dataBaseIp + 'strategys/',
                    headers: {
                         'Authorization': 'token ' + localStorage.getItem("token")
                    },
                    data: formdata,
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    async: true,
                    success: function(data) {
                         resolve(data);
                    },
                    error: function(data) {
                         reject(data);
                    }   ,
                    xhr: function() {    
                         let xhr = $.ajaxSettings.xhr();    
                         if (onprogress && xhr.upload) {     
                              xhr.upload.addEventListener("progress", onprogress, false);     
                              return xhr;    
                         }   
                    }

               });
          });
     }

     //计算移动平均线
     export const tradeMA = (data, num) => {
          let MA = [];
          if (data.length < num) return MA;
          for (let i = num - 1; i < data.length; i++) {
               let total = 0;
               for (let j = 0; j < num; j++) {
                    total += data[i - j].close;
               }
               MA.push([
                    data[i].datetime,
                    Number((total / num).toFixed(6))
               ])
          }
          return MA;
     }

     //获取技术指标
     export const getMeasure = (exchange, symbol, start, end) => {
               let measure = [];
               let body = '?exchange=' + exchange;
               body += '&symbol=' + symbol;
               body += '&start=' + start;
               body += '&end=' + end;
               $.ajax({
                    url: dataBaseIp + 'measure_datas/' + body,
                    headers: {
                         'Authorization': 'token ' + localStorage.getItem("token")
                    },
                    type: 'GET',
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function(data) {
                         measure = data;
                    },
                    error: function(data) {
                         // console.log(data);
                    }
               });
               return measure;
          }
          //清除null数据 保留2位
     export const delNull = (data) => {
          for (let i = 0; i < data.length; i++) {
               if (data[i][1] == null) {
                    data.splice(i, 1);
                    i = -1;
               }
          }
          for (let i = 0; i < data.length; i++) {
               data[i][1] = Number((data[i][1]).toFixed(6))
          }
          return data;
     }

     //将指标和时间组装起来
     export const makeMeasure = (measure_datas) => {
          let qualification = [];
          qualification.RSI = [];
          qualification.OBV = [];
          qualification.EMA5 = [];
          qualification.EMA10 = [];
          qualification.EMA30 = [];
          qualification.EMA60 = [];
          qualification.ATR = [];
          qualification.BBANDS = [];
          qualification.BBANDS2 = [];
          qualification.BBANDS3 = []; //
          qualification.DEMA = [];
          qualification.KDJ = []; //
          qualification.KDJ2 = [];
          qualification.MACD = []; //
          qualification.MACD2 = [];
          qualification.MACD3 = [];
          qualification.MOM = [];
          qualification.SAR = [];
          qualification.STOCHRSI = [];
          qualification.STOCHRSI2 = []; //
          qualification.WILLR = [];
          for (let i = 0; i < measure_datas.length; i++) {

               qualification.RSI.push([
                    measure_datas[i].datetime,
                    measure_datas[i].RSI
               ]);
               qualification.OBV.push([
                    measure_datas[i].datetime,
                    measure_datas[i].OBV
               ]);
               qualification.EMA5.push([
                    measure_datas[i].datetime,
                    measure_datas[i].EMA5
               ]);
               qualification.EMA10.push([
                    measure_datas[i].datetime,
                    measure_datas[i].EMA10
               ]);
               qualification.EMA30.push([
                    measure_datas[i].datetime,
                    measure_datas[i].EMA30
               ]);
               qualification.EMA60.push([
                    measure_datas[i].datetime,
                    measure_datas[i].EMA60
               ]);
               qualification.ATR.push([
                    measure_datas[i].datetime,
                    measure_datas[i].ATR
               ]);
               qualification.MOM.push([
                    measure_datas[i].datetime,
                    measure_datas[i].MOM
               ]);
               qualification.SAR.push([
                    measure_datas[i].datetime,
                    measure_datas[i].SAR
               ]);
               qualification.WILLR.push([
                    measure_datas[i].datetime,
                    measure_datas[i].WILLR
               ]);
               qualification.DEMA.push([
                    measure_datas[i].datetime,
                    measure_datas[i].DEMA
               ]);
               qualification.MACD.push([
                    measure_datas[i].datetime,
                    measure_datas[i].MACD[0]
               ]);
               qualification.MACD2.push([
                    measure_datas[i].datetime,
                    measure_datas[i].MACD[1]
               ]);
               qualification.MACD3.push([
                    measure_datas[i].datetime,
                    measure_datas[i].MACD[2]
               ]);
               qualification.BBANDS.push([
                    measure_datas[i].datetime,
                    measure_datas[i].BBANDS[0]
               ]);
               qualification.BBANDS2.push([
                    measure_datas[i].datetime,
                    measure_datas[i].BBANDS[1]
               ]);
               qualification.BBANDS3.push([
                    measure_datas[i].datetime,
                    measure_datas[i].BBANDS[2]
               ]);
               qualification.KDJ.push([
                    measure_datas[i].datetime,
                    measure_datas[i].KDJ[0]
               ]);
               qualification.KDJ2.push([
                    measure_datas[i].datetime,
                    measure_datas[i].KDJ[1]
               ]);
               qualification.STOCHRSI.push([
                    measure_datas[i].datetime,
                    measure_datas[i].STOCHRSI[0]
               ]);
               qualification.STOCHRSI2.push([
                    measure_datas[i].datetime,
                    measure_datas[i].STOCHRSI[1]
               ]);


          }
          for (let i in qualification) {
               qualification[i] = delNull(qualification[i]);
          }

          staticData.measure_datas = qualification;
          return qualification;
     }
     export const getAccounts = () => {
          return new Promise((resolve, reject) => {
               $.ajax({
                    url: dataBaseIp + 'accounts/',
                    headers: {
                         "Authorization": 'token ' + localStorage.getItem("token")
                    },
                    type: 'GET',
                    contentType: false,
                    processData: false,
                    async: true,
                    success: function(data) {
                         resolve(data);
                    },
                    error: function(data) {
                         resolve([]);
                    }
               })
          });
     }

     export const getActive = () => {
          return new Promise((resolve, reject) => {
               $.ajax({
                    url: dataBaseIp + 'activeCode/',
                    headers: {
                         "Authorization": 'token ' + localStorage.getItem("token")
                    },
                    type: 'GET',
                    contentType: false,
                    processData: false,
                    async: true,
                    success: function(data) {
                         resolve(data);
                    },
                    error: function(data) {
                         resolve([]);
                    }
               })
          });
     }
     export const addActive = () => {
          return new Promise((resolve, reject) => {
               $.ajax({
                    url: dataBaseIp + 'activeCode/',
                    headers: {
                         "Authorization": 'token ' + localStorage.getItem("token")
                    },
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    async: true,
                    success: function(data) {
                         resolve(data);
                    },
                    error: function(data) {
                         resolve([]);
                    }
               })
          });
     }
     export const delActive = (code) => {
          return new Promise((resolve, reject) => {
               $.ajax({
                    url: dataBaseIp + 'activeCode/' + code + '/',
                    headers: {
                         "Authorization": 'token ' + localStorage.getItem("token")
                    },
                    type: 'DELETE',
                    contentType: false,
                    processData: false,
                    async: true,
                    success: function(data) {
                         resolve(data);
                    },
                    error: function(data) {
                         resolve([]);
                    }
               })
          });
     }


     // 赋予用户权限
     export const givePermission = (name, status) => {
          let flag = false;
          let formdata = new FormData();
          formdata.append('status', status);
          $.ajax({
               url: dataBaseIp + 'users/' + name + '/',
               headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
               },
               data: formdata,
               type: 'PATCH',
               contentType: false,
               processData: false,
               async: false,
               success: function(data) {
                    flag = true;
               },
               error: function(data) {}

          })
          return flag;

     }

     export const deletUser = (name) => {
          let flag = false;
          $.ajax({
               url: dataBaseIp + 'users/' + name + '/',
               headers: {
                    'Authorization': 'token ' + localStorage.getItem("token")
               },
               type: 'DELETE',
               contentType: false,
               processData: false,
               async: false,
               success: function(data) {
                    flag = true;
               },
               error: function(data) {
                    // console.log(data);
                    flag = false;
               }
          });
          return flag;
     }


     // 注册用户
     export const register = (name, email, password, active_code) => {
          return new Promise((resolve, reject) => {
               let formdata = new FormData();
               formdata.append('username', name);
               formdata.append('email', email);
               formdata.append('password', password);
               formdata.append('active_code', active_code);
               $.ajax({
                    url: dataBaseIp + 'register/',
                    data: formdata,
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    success: function(data) {
                         resolve(data)
                    },
                    error: function(data) {
                         reject(data)
                    }
               });
          });
     }


     //获取模型列表
     export const getModels = (api) => {
               return new Promise((resolve, reject) => {
                    $.ajax({
                         url: oldDataBase + api + '/',
                         headers: {
                              // 'Authorization': 'token ' + localStorage.getItem("token")
                              'Authorization': 'token 91aa354c022f7d7ba1fe541669b2b2db6bc3010f'
                         },
                         timeout: 2000,
                         type: 'GET',
                         contentType: false,
                         processData: false,
                         async: true,
                         success: function(data) {
                              resolve(data);
                         },
                         complete: function(xmlHttpRequest, status) {
                              // reject(status);
                              resolve([]);
                              if (status == 'timeout') {
                                   console.log(oldDataBase + api + '/' + '  超时');
                              }
                         }
                    });
               })
          }
          //获取模型
     export const getModel = (api, _id) => {
               let models = [];
               $.ajax({
                    url: oldDataBase + api + '/' + _id + '/',
                    headers: {
                         // 'Authorization': 'token ' + localStorage.getItem("token")
                         'Authorization': 'token 91aa354c022f7d7ba1fe541669b2b2db6bc3010f'
                    },
                    type: 'GET',
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function(data) {
                         models = data;
                    },
                    error: function(data) {
                         // console.log(data);
                    }
               });
               return models;
          }
          //编辑模型智库
     export const editModel = (api, _id, formdata) => {
               let flag = false;
               $.ajax({
                    url: oldDataBase + api + '/' + _id + '/',
                    headers: {
                         // 'Authorization': 'token ' + localStorage.getItem("token")
                         'Authorization': 'token 91aa354c022f7d7ba1fe541669b2b2db6bc3010f'
                    },
                    data: formdata,
                    type: 'PATCH',
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function(data) {
                         flag = true;
                    },
                    error: function(data) {
                         // console.log(data);
                    }
               });
               return flag;
          }
          //删除模型智库
     export const delModel = (api, _id) => {
               let flag = false;
               $.ajax({
                    url: oldDataBase + api + '/' + _id + '/',
                    headers: {
                         // 'Authorization': 'token ' + localStorage.getItem("token")
                         'Authorization': 'token 91aa354c022f7d7ba1fe541669b2b2db6bc3010f'
                    },
                    type: 'DELETE',
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function(data) {
                         flag = true;
                    },
                    error: function(data) {
                         // console.log(data);
                    }
               });
               return flag;
          }
          // 添加模型智库
     export const addShare = (api, formdata) => {
          let flag = false;
          $.ajax({
               url: oldDataBase + api + '/',
               headers: {
                    // 'Authorization': 'token ' + localStorage.getItem("token")
                    'Authorization': 'token 91aa354c022f7d7ba1fe541669b2b2db6bc3010f'
               },
               data: formdata,
               type: 'POST',
               contentType: false,
               processData: false,
               async: false,
               success: function(data) {
                    flag = true;
               },
               error: function(data) {
                    // console.log(data);
               }
          });
          return flag;
     }

     //图床
     export const uploadImage = (formdata) => {
          let getData = false;
          $.ajax({
               url: "https://sm.ms/api/upload",
               headers: {
                    'Content-Type': undefined
               },
               data: formdata,
               type: 'POST',
               contentType: false,
               processData: false,
               async: false,
               success: function(data) {
                    getData = data;
               },
               error: function(data) {
                    // console.log(data);
               }
          });
          return getData;
     }

     staticData.predictChart = [];
     //获取已有数据
     export const getStatic = () => {
               return staticData;
          }
          //预测实例排序 先按最新日期 再x按名字排
     export const sortPredict = (data) => {
          //      data.sort(function(a, b) {
          //           return (new Date(b.endTime.replace(/-/g, '/')).getTime() - new Date(a.endTime.replace(/-/g, '/')).getTime());
          //      });
          //      return data;
          let okData = [];
          let haveDate = [];
          let withoutDate = [];
          for (let i in data) {
               if (data[i].endTime != '') {
                    haveDate.push(data[i]);
               } else {
                    withoutDate.push(data[i]);
               }
          }
          haveDate.sort(function(a, b) {
               return (new Date(b.endTime.replace(/-/g, '/')).getTime() - new Date(a.endTime.replace(/-/g, '/')).getTime());
          });

          for (let i = 0; i < haveDate.length;) {
               let date = haveDate[i].endTime;
               let thisData = [];
               for (let j = i; j < haveDate.length; j++) {
                    if (haveDate[j].endTime == date) {
                         thisData.push(haveDate[j]);
                    }
               }
               thisData.sort((a, b) => {
                    return b.accuracy - a.accuracy;
               });
               okData = okData.concat(thisData);
               i += thisData.length;
          }

          withoutDate.sort(function(a, b) {
               return (new Date(b.datetime.replace(/-/g, '/')).getTime() - new Date(a.datetime.replace(/-/g, '/')).getTime());
          });

          okData = okData.concat(withoutDate);
          return okData;
     }

     export const getDiskRead = (datetime) => {
          return new Promise((resolve, reject) => {
               $.ajax({
                    url: "http://120.27.140.211:19999/api/v1/data?chart=system.io&format=array&points=300&group=average&options=absolute|jsonwrap|nonzero&after=-300&dimensions=in&_=" + datetime,
                    headers: {
                         'Content-Type': undefined
                    },
                    type: 'GET',
                    contentType: false,
                    processData: false,
                    timeout: 5000,
                    success: function(data) {
                         resolve(data)
                    },
                    error: function(data) {
                         reject(data)
                    }
               });
          });
     }
     export const getDiskWrite = (datetime) => {
          return new Promise((resolve, reject) => {
               $.ajax({
                    url: "http://120.27.140.211:19999/api/v1/data?chart=system.io&format=array&points=300&group=average&options=absolute|jsonwrap|nonzero&after=-300&dimensions=out&_=" + datetime,
                    headers: {
                         'Content-Type': undefined
                    },
                    type: 'GET',
                    contentType: false,
                    processData: false,
                    timeout: 5000,
                    success: function(data) {
                         resolve(data)
                    },
                    error: function(data) {
                         reject(data)
                    }
               });
          });
     }
     export const getMemory = (datetime) => {
          return new Promise((resolve, reject) => {
               $.ajax({
                    url: "http://120.27.140.211:19999/api/v1/data?chart=system.ram&format=array&points=420&group=average&options=absolute|jsonwrap|nonzero|percentage&after=-420&dimensions=used|buffers|active|wired&_=" + datetime,
                    headers: {
                         'Content-Type': undefined
                    },
                    type: 'GET',
                    contentType: false,
                    processData: false,
                    timeout: 5000,
                    success: function(data) {
                         resolve(data)
                    },
                    error: function(data) {
                         reject(data)
                    }
               });
          });
     }
     export const getCpu = (datetime) => {
          return new Promise((resolve, reject) => {
               $.ajax({
                    url: "http://120.27.140.211:19999/api/v1/data?chart=system.cpu&format=array&points=300&group=average&options=absolute|jsonwrap|nonzero&after=-300&_=" + datetime,
                    headers: {
                         'Content-Type': undefined
                    },
                    type: 'GET',
                    contentType: false,
                    processData: false,
                    timeout: 5000,
                    success: function(data) {
                         resolve(data)
                    },
                    error: function(data) {
                         reject(data)
                    }
               });
          });
     }

     //将交易产品列表进行排序 先按日期 再按年化 最后按照创建时间 b-a(降序)
     export const sortNianhua = (data) => {
          // return data;
          let okData = [];
          let haveDate = [];
          let withoutDate = [];
          for (let i in data) {
               if (data[i].endTime != '') {
                    haveDate.push(data[i]);
               } else {
                    withoutDate.push(data[i]);
               }
          }
          // haveDate.sort(function(a, b) {
          //      return (new Date(b.endTime.replace(/-/g, '/')).getTime() - new Date(a.endTime.replace(/-/g, '/')).getTime());
          // });

          for (let i = 0; i < haveDate.length;) {
               let date = haveDate[i].endTime;
               let thisData = [];
               for (let j = i; j < haveDate.length; j++) {
                    if (haveDate[j].endTime == date) {
                         thisData.push(haveDate[j]);
                    }
               }
               thisData.sort((a, b) => {
                    return b.nianhua - a.nianhua;
               });
               okData = okData.concat(thisData);
               i += thisData.length;
          }

          // withoutDate.sort(function(a, b) {
          //      return (new Date(b.datetime.replace(/-/g, '/')).getTime() - new Date(a.datetime.replace(/-/g, '/')).getTime());
          // });

          okData = okData.concat(withoutDate);
          return okData;
     }