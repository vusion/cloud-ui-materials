const timerObj = {
    timers: {},

    exist(timerName) {
        return this.timers[timerName] && typeof this.timers[timerName] === 'number';
    },
    clear(timerName) {
        if (this.exist(timerName)) {
            clearTimeout(this.timers[timerName]);
            this.timers[timerName] = null;
        }
    },
    clearAll() {
        Object.keys(this.timers).forEach((timerName) => {
            if (this.exist(timerName)) {
                clearTimeout(this.timers[timerName]);
                this.timers[timerName] = null;
            }
        });
    },
    start(timerName, cb, wait) {
        if (this.exist(timerName)) {
            this.clear(timerName);
        }
        this.timers[timerName] = setTimeout(() => {
            cb();
        }, wait);
    },
};

export default timerObj;
