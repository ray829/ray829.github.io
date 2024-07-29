<template>
    <div class="myClock">
        <div class="clock">
            <div class="hr">
                <div class="strip">
                    <div class="number">0</div>
                    <div class="number">1</div>
                    <div class="number">2</div>
                </div>
                <div class="strip">
                    <div class="number">0</div>
                    <div class="number">1</div>
                    <div class="number">2</div>
                    <div class="number">3</div>
                    <div class="number">4</div>
                    <div class="number">5</div>
                    <div class="number">6</div>
                    <div class="number">7</div>
                    <div class="number">8</div>
                    <div class="number">9</div>
                </div>
            </div>
            <div class="min">
                <div class="strip">
                    <div class="number">0</div>
                    <div class="number">1</div>
                    <div class="number">2</div>
                    <div class="number">3</div>
                    <div class="number">4</div>
                    <div class="number">5</div>
                </div>
                <div class="strip">
                    <div class="number">0</div>
                    <div class="number">1</div>
                    <div class="number">2</div>
                    <div class="number">3</div>
                    <div class="number">4</div>
                    <div class="number">5</div>
                    <div class="number">6</div>
                    <div class="number">7</div>
                    <div class="number">8</div>
                    <div class="number">9</div>
                </div>
            </div>
            <div class="sec">
                <div class="strip">
                    <div class="number">0</div>
                    <div class="number">1</div>
                    <div class="number">2</div>
                    <div class="number">3</div>
                    <div class="number">4</div>
                    <div class="number">5</div>
                </div>
                <div class="strip">
                    <div class="number">0</div>
                    <div class="number">1</div>
                    <div class="number">2</div>
                    <div class="number">3</div>
                    <div class="number">4</div>
                    <div class="number">5</div>
                    <div class="number">6</div>
                    <div class="number">7</div>
                    <div class="number">8</div>
                    <div class="number">9</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Ray829GithubIoMyClock',

    data() {
        return {
            numberSize: '8',
        };
    },

    computed: {
        strips() {
            return [...document.querySelectorAll(".strip")];
        }
    },

    mounted() {
        // const strips = [...document.querySelectorAll(".strip")];
        // const numberSize = "8"; // in rem

        // highlight number i on strip s for 1 second

        setInterval(() => {
            // get new time
            const time = new Date();

            // get h,m,s
            const hours = time.getHours();
            const mins = time.getMinutes();
            const secs = time.getSeconds();

            // slide strips
            this.stripSlider(0, hours);
            this.stripSlider(2, mins);
            this.stripSlider(4, secs);

            // highlight numbers
        }, 1000)
    },

    methods: {
        highlight(strip, d) {
            this.strips[strip].querySelector(`.number:nth-of-type(${d + 1})`).classList.add("pop");
            setTimeout(() => {
                this.strips[strip]
                    .querySelector(`.number:nth-of-type(${d + 1})`)
                    .classList.remove("pop");
            }, 950); // causes ticking
        },

        stripSlider(strip, number) {
            let d1 = Math.floor(number / 10);
            let d2 = number % 10;

            this.strips[strip].style.transform = `translateY(${d1 * -this.numberSize}vmin)`;
            this.highlight(strip, d1);
            this.strips[strip + 1].style.transform = `translateY(${d2 * -this.numberSize}vmin)`;
            this.highlight(strip + 1, d2);
        },
    },
};
</script>

<style lang="less" scoped>
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.myClock {
    font-family: 'Roboto Mono', monospace;
    font-size: 4vmin;
    min-height: 100vh;
    display: grid;
    overflow: hidden;
    place-items: center;
}

.hr,
.min,
.sec {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4vmin;
    grid-row: 1/2;
    align-items: start;
}

.number {
    user-select: none;
    width: 8vmin;
    height: 8vmin;
    display: grid;
    place-items: center;
    color: #f9fbfd;
    transition: all 500ms 100ms ease;
    border-radius: 50%;
}

.number.pop {
    color: #3e6ccb;
    font-weight: bold;
    transform: scale(1.3);
    background-color: #dfe6f6;
    box-shadow: -1vmin -1vmin 2vmin -0.5vmin #f9fbfd, 1vmin 1vmin 2vmin #a9bee8;
}

.strip {
    transition: transform 500ms ease-in-out;
    border-radius: 1.333333333333333vmin;
    background-color: #dfe6f6;
    box-shadow: -1vmin -1vmin 2vmin -0.5vmin #f9fbfd, 1vmin 1vmin 2vmin #a9bee8;
}

.clock {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 8vmin;
    height: 4vmin;
    position: relative;
    padding: 0 4vmin;
}
</style>