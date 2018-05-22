export class DateUtils {
    static showCountdownAccurateToDate (timeStr: string) {
        const TOTAL_TIME_FOR_SECOND = 1000
        const TOTAL_TIME_FOR_MINUTE = TOTAL_TIME_FOR_SECOND * 60
        const TOTAL_TIME_FOR_HOUR = TOTAL_TIME_FOR_MINUTE * 60
        const TOTAL_TIME_FOR_DAY = TOTAL_TIME_FOR_HOUR * 24
        let time = new Date(timeStr.replace(/-/g, '/')).getTime()
        let nowTime = new Date().getTime()
        let timeDiff = time - nowTime
        let showStr = []
        if (time - nowTime > 0) {
            let day = timeDiff / TOTAL_TIME_FOR_DAY
            let hour = (timeDiff - Math.floor(day) * TOTAL_TIME_FOR_DAY) / TOTAL_TIME_FOR_HOUR
            let minute = (timeDiff - Math.floor(day) * TOTAL_TIME_FOR_DAY - Math.floor(hour) * TOTAL_TIME_FOR_HOUR) / TOTAL_TIME_FOR_MINUTE
            let second = (timeDiff - Math.floor(day) * TOTAL_TIME_FOR_DAY - Math.floor(hour) * TOTAL_TIME_FOR_HOUR - Math.floor(minute) * TOTAL_TIME_FOR_MINUTE) / TOTAL_TIME_FOR_SECOND
            showStr.push(day.toFixed(0) + '天')
            showStr.push(hour.toFixed(0) + '时')
            showStr.push(minute.toFixed(0) + '分')
            showStr.push(second.toFixed(0) + '秒')
            return showStr.join('')
        } else {
            return timeStr
        }
    }
}