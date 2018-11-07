import React , {Component} from 'react'
import requests from '../../utils/requests'

import './index.less'

class Countdown extends Component {
    constructor (props) {
        super (props)
        this.state = {
            endDateStr : '2019-11-25 8:00:45',
            days : '',
            hours : '',
            minutes : '',
            seconds : '',

        }
    }

    componentDidMount (){
        this.TimeDown()
    }

    TimeDown () {
        const that = this
        var endDate = new Date(this.state.endDateStr);  //结束时间
        var nowDate = new Date();   //当前时间
        var totalSeconds = parseInt((endDate - nowDate) / 1000);    //相差的总秒数
        var days = Math.floor(totalSeconds / (60 * 60 * 24));   //天数
        var modulo = totalSeconds % (60 * 60 * 24); //取模（余数）
        var hours = Math.floor(modulo / (60 * 60)); //小时数
        modulo = modulo % (60 * 60);
        var minutes = Math.floor(modulo / 60);  //分钟
        var seconds = modulo % 60;  //秒
        //输出到页面
        this.setState({
            days : days,
            hours : hours,
            minutes : minutes,
            seconds : seconds
        })
        //延迟一秒执行自己
        const timeOut = setTimeout(function () {
            const nowTime = (new Date()).getTime()
            const simulationEndTime = that.state.simulationEndTime
            if(nowTime >= simulationEndTime){
                clearTimeout(timeOut);
                console.log('------倒计时结束------')
            }else{
                that.TimeDown();
            }
        }, 1000)
    }
    render (){
        const { days,hours,minutes,seconds } = this.state
        return (
            <div className="Countdown">
                <div className="Countdown_box">
                    <span className="Countdown_days">{days}</span><strong> 天 </strong>
                    <span>{hours}</span><strong> : </strong>
                    <span>{minutes}</span><strong> : </strong>
                    <span>{seconds}</span>
                </div>
            </div>
        )
    }
}

export default Countdown