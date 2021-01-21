<template>
<u-linear-layout gap="small" :class="$style.root" direction="vertical">
    <video :class="$style.video" ref="video" :width="width" :height="height"></video>
    <u-linear-layout gap="small">
        <u-button @click="open()">开启</u-button>
        <u-button @click="close()">关闭</u-button>
        <u-button color="primary" @click="snapshot()">截图</u-button>
    </u-linear-layout>
    <canvas v-show="false" ref="canvas"></canvas>
    <u-uploader v-if="url" ref="uploader" readonly
        :url="url" :url-field="urlField"
        list-type="card" accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
        :value="currentValue"
        @send="$emit('send', $event, this)"
        @progress="$emit('progress', $event, this)"
        @complete="$emit('complete', $event, this)"
        @success="$emit('success', $event, this)"
        @error="$emit('error', $event, this)"
        @input="$emit('input', $event, this)"
        @update:value="$emit('update:value', $event, this)"
    ></u-uploader>
</u-linear-layout>
</template>

<script>
 // 一堆兼容代码
window.URL = (window.URL || window.webkitURL || window.mozURL || window.msURL);
if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
}
if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
        const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(((resolve, reject) => {
            getUserMedia.call(navigator, constraints, resolve, reject);
        }));
    };
}

export default {
    name: 'lcap-camera',
    props: {
        value: [Array, String],
        url: String,
        urlField: { type: String, default: 'url' },
        width: { type: [Number, String], default: 800 },
        height: { type: [Number, String], default: 600 },
    },
    computed: {
        currentValue() {
            if (typeof this.value === 'string') {
                return JSON.parse(this.value);
            } else {
                return this.value;
            }
        },
    },
    created() {

    },
    methods: {
        open() {
            // 摄像头调用配置
            const mediaOpts = {
                audio: false,
                // video: true,
                // video: { facingMode: 'environment' }, // 或者 "user"
                video: { width: this.width, height: this.height },
                // video: { facingMode: { exact: "environment" } }// 或者 "user"
            };

            navigator.mediaDevices.getUserMedia(mediaOpts)
                .then((stream) => {
                    this.mediaStreamTrack = stream;
                    const video = this.$refs.video;
                    if ('srcObject' in video) {
                        video.srcObject = stream;
                    } else {
                        video.src = window.URL && window.URL.createObjectURL(stream) || stream;
                    }
                    video.play();
                });
        },
        close() {
            this.mediaStreamTrack.getVideoTracks().forEach((track) => {
                track.stop();
                // context1.clearRect(0, 0,context1.width, context1.height);//清除画布
            });
        },
        snapshot() {
            const video = this.$refs.video;
            const canvas = this.$refs.canvas;
            const context = canvas.getContext('2d');

            canvas.setAttribute('width', video.videoWidth);
            canvas.setAttribute('height', video.videoHeight);
            context.drawImage(video, 0, 0, video.width, video.height);

            if (this.url) {
                canvas.toBlob((blob) => {
                    this.$refs.uploader.upload(blob);
                }, 'image/jpeg');
            }
        },
    },
};
</script>

<style module>
.root {}

.video {
    background: black;
}
</style>

