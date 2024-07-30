<template>
    <div class="myClock">

        <!-- main codes start -->
        <div class="signboard outer">
            <div class="signboard front inner anim04c">
                <li class="year anim04c">
                    <span></span>
                </li>
                <ul class="calendarMain anim04c">
                    <li class="month anim04c">
                        <span></span>
                    </li>
                    <li class="date anim04c">
                        <span></span>
                    </li>
                    <li class="day anim04c">
                        <span></span>
                    </li>
                </ul>
                <li class="clock minute anim04c">
                    <span></span>
                </li>
                <li class="calendarNormal date2 anim04c">
                    <span></span>
                </li>
            </div>
            <div class="signboard left inner anim04c">
                <li class="clock hour anim04c">
                    <span></span>
                </li>
                <li class="calendarNormal day2 anim04c">
                    <span></span>
                </li>
            </div>
            <div class="signboard right inner anim04c">
                <li class="clock second anim04c">
                    <span></span>
                </li>
                <li class="calendarNormal month2 anim04c">
                    <span></span>
                </li>
            </div>
        </div>
        <!-- main codes end -->

    </div>
</template>

<script>
export default {
    name: 'Ray829GithubIoMyClock',

    data() {
        return {
            intervalId: '',
        };
    },


    mounted() {

        var monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
        var dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

        var newDate = new Date();

        this.intervalId = setInterval(function () {
            var now = new Date();
            var hours = now.getHours();
            document.querySelector(".hour").innerHTML = (hours < 10 ? "0" : "") + hours;

            var seconds = now.getSeconds();
            document.querySelector(".second").innerHTML = (seconds < 10 ? "0" : "") + seconds;

            var minutes = now.getMinutes();
            document.querySelector(".minute").innerHTML = (minutes < 10 ? "0" : "") + minutes;

            document.querySelector(".month span").textContent = monthNames[newDate.getMonth()];
            document.querySelector(".date span").textContent = newDate.getDate();
            document.querySelector(".day span").textContent = dayNames[newDate.getDay()];
            document.querySelector(".year span").innerHTML = newDate.getFullYear();
        }, 1000);
    },

    methods: {
        
    },

    beforeDestroy() {
        clearInterval(this.intervalId);
    }
};
</script>

<style lang="less" scoped>

.myClock {
    margin-top: 100px;
}
/* -- usable codes start -- */

span, ul, li {
    margin: 0;
    padding: 0;
    border: 0;
    font-weight: inherit;
    font-style: inherit;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;
    text-decoration: none;
    list-style: none;
}


.anim04c {
    -webkit-transition: all .4s cubic-bezier(.5, .35, .15, 1.4);
    transition: all .4s cubic-bezier(.5, .35, .15, 1.4);
}

/*-----*/

.outer {
    position: relative;
    top: 50%;
    z-index: 1;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    cursor: pointer;
}

/*-----*/

.signboard {
    width: 100px;
    height: 100px;
    margin: auto;
    color: #fff;
    border-radius: 10px;
}

/*-----*/

.front {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    background: #ff726b;
    text-align: center;
}

.right {
    position: absolute;
    right: 0;
    z-index: 2;
    -webkit-transform: rotate(-10deg) translate(7px, 8px);
    -moz-transform: rotate(-10deg) translate(7px, 8px);
    -ms-transform: rotate(-10deg) translate(7px, 8px);
    -o-transform: rotate(-10deg) translate(7px, 8px);
    transform: rotate(-10deg) translate(7px, 8px);
    background: #EFC94C;
}

.left {
    position: absolute;
    left: 0;
    z-index: 1;
    -webkit-transform: rotate(5deg) translate(-4px, 4px);
    -moz-transform: rotate(5deg) translate(-4px, 4px);
    -ms-transform: rotate(5deg) translate(-4px, 4px);
    -o-transform: rotate(5deg) translate(-4px, 4px);
    transform: rotate(5deg) translate(-4px, 4px);
    background: #3498DB;
}

/*-----*/

.outer:hover .inner {
    -webkit-transform: rotate(0) translate(0);
    -moz-transform: rotate(0) translate(0);
    -ms-transform: rotate(0) translate(0);
    -o-transform: rotate(0) translate(0);
    transform: rotate(0) translate(0);
}

/*-----*/

.outer:active .inner {
    -webkit-transform: rotate(0) translate(0) scale(0.9);
    -moz-transform: rotate(0) translate(0) scale(0.9);
    -ms-transform: rotate(0) translate(0) scale(0.9);
    -o-transform: rotate(0) translate(0) scale(0.9);
    transform: rotate(0) translate(0) scale(0.9);
}

.outer:active .front .date {
    transform: scale(2);
}

.outer:active .front .day,
.outer:active .front .month {
    visibility: hidden;
    opacity: 0;
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
}

.outer:active .right {
    -webkit-transform: rotate(-5deg) translateX(80px) scale(0.9);
    -moz-transform: rotate(-5deg) translateX(80px) scale(0.9);
    -ms-transform: rotate(-5deg) translateX(80px) scale(0.9);
    -o-transform: rotate(-5deg) translateX(80px) scale(0.9);
    transform: rotate(-5deg) translateX(80px) scale(0.9);
}

.outer:active .left {
    -webkit-transform: rotate(5deg) translateX(-80px) scale(0.9);
    -moz-transform: rotate(5deg) translateX(-80px) scale(0.9);
    -ms-transform: rotate(5deg) translateX(-80px) scale(0.9);
    -o-transform: rotate(5deg) translateX(-80px) scale(0.9);
    transform: rotate(5deg) translateX(-80px) scale(0.9);
}

/*-----*/

.outer:active .calendarMain {
    transform: scale(1.8);
    opacity: 0;
    visibility: hidden;
}

.outer:active .clock {
    transform: scale(1.4);
    opacity: 1;
    visibility: visible;
}

.outer:active .calendarNormal {
    bottom: -30px;
    opacity: 1;
    visibility: visible;
}

.outer:active .year {
    top: -30px;
    opacity: 1;
    visibility: visible;
    letter-spacing: 3px;
}

/*-----*/

.calendarMain {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 1;
}

.month,
.day {
    font-size: 10px;
    line-height: 30px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 3px;
}

.date {
    font-size: 40px;
    line-height: 40px;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 3px;
}

/*-----*/

.clock {
    width: 100%;
    height: 100%;
    position: absolute;
    font-size: 40px;
    line-height: 100px;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-align: center;
    opacity: 0;
    visibility: hidden;
}

/*-----*/

.year {
    width: 100%;
    position: absolute;
    top: 0;
    font-size: 14px;
    line-height: 30px;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0;
    text-align: center;
    opacity: 0;
    visibility: hidden;
    color: #ff726b;
}

.calendarNormal {
    width: 100%;
    position: absolute;
    bottom: 0;
    font-size: 14px;
    line-height: 30px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-align: center;
    opacity: 0;
    visibility: hidden;
}

.date2 {
    color: #ff726b;
}

.day2 {
    color: #3498DB;
}

.month2 {
    color: #EFC94C;
}

</style>