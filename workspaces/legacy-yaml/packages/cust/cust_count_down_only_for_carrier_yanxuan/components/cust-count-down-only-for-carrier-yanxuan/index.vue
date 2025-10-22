<template>
    <span>{{ text }}</span>
</template>

<script>
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function addZero(time) {
    return time < 10 ? '0' + time : time;
}
function convertTimestamp(timestamp) {
    // 创建一个新的Date对象，通过时间戳设置日期和时间
    let v = Math.floor(timestamp / 1000); //单位是毫秒
    let symbol = v < 0 ? '-' : '';
    let hours = Math.abs(Math.floor(v / 3600));
    let minutes = Math.abs(Math.floor((v % 3600) / 60));
    let seconds = Math.abs(Math.floor(v % 60));
    // 返回转换后的时间
    return (
        symbol +
        addZero(hours) +
        ':' +
        addZero(minutes) +
        ':' +
        addZero(seconds)
    );
}
export default {
    name: 'cust-count-down-only-for-carrier-yanxuan',
    props: {
        inquiryStartTime: {
            type: Number,
            default: () => Date.now(),
        },
    },
    data() {
        return {
            text: '00:00:00',
        };
    },
    computed: {
        inquiryEndTime() {
            const addDay =
                new Date(this.inquiryStartTime).getHours() > 14
                    ? 60 * 60 * 24 * 2 * 1000
                    : 60 * 60 * 24 * 1000;
            const inquiryEndDay =
                formatDate(new Date(this.inquiryStartTime + addDay)) +
                ' 18:00:00';
            return new Date(inquiryEndDay).getTime();
        },
    },
    destroyed() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    },
    mounted() {
        this.startTimer();
    },
    methods: {
        startTimer() {
            if (this.timerId) {
                clearInterval(this.timerId);
                this.timerId = null;
            }
            this.timerId = setInterval(() => {
                const countDownTime =
                    this.inquiryEndTime - new Date().getTime();
                this.text = convertTimestamp(countDownTime);
            });
        },
    },
};
</script>

<style></style>
