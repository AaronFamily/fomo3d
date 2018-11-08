import React , {Component} from 'react'

import './index.less'

class Countdown extends Component {
    constructor (props) {
        super (props)
        this.state = {
            endTime : props.endTime,
            hours : 0,
            minutes : 0,
            seconds : 0
        }

        this.timeOut = null
    }

    render (){
        const { hours, minutes, seconds } = this.state

        return (
            <div className="Countdown">
                <div className="Countdown_box">
                    <span>{ hours <10 && '0' }{ hours }</span><strong> : </strong>
                    <span>{ minutes <10 && '0' }{ minutes }</span><strong> : </strong>
                    <span>{ seconds <10 && '0' }{ seconds }</span>
                </div>
            </div>
        )
    }

    componentDidMount (){
        this.timeDown()
    }

    componentWillUnmount () {
        clearTimeout(this.timeOut)
    }

    timeDown () {
        if ((new Date()).getTime() >= this.state.endTime ) return

        let endDate = new Date(this.state.endTime)
        let nowDate = new Date()
        let totalSeconds = parseInt((endDate - nowDate) / 1000)
        let modulo = totalSeconds % (60 * 60 * 24)
        let hours = Math.floor(modulo / (60 * 60))

        modulo = modulo % (60 * 60)
        
        let minutes = Math.floor(modulo / 60)
        let seconds = modulo % 60
        
        this.setState({
            hours : hours,
            minutes : minutes,
            seconds : seconds
        })
        
        this.timeOut = setTimeout( () => {
            const nowTime = (new Date()).getTime()

            if(nowTime >= this.state.endTime){
                clearTimeout(this.timeOut)

            }else{
                this.timeDown()
            }
        }, 1000)
    }
}

export default Countdown