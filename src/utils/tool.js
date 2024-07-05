const debounce = (fn, delay) => {
    let timer = null;
    return (...args) => {
        if (timer !== null) {
            clearTimeout(timer);  // cd中再次调用 fn 时清空计时器
        }
        timer = setTimeout(() => {
            fn.call(undefined, ...args);   // delay 后调用 fn 并清空计时器
            timer = null;
        }, delay);
    };
};
function throttle(fn, delay) {
    let previous = 0;
    return function () {
        let _this = this;
        let _args = arguments;
        let now = new Date();
        if (now - previous > delay) {
            fn.apply(_this, _args);
            previous = now;
        }
    }
}

export {debounce, throttle };