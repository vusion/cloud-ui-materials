export default {
    methods: {
        _setCursor(jflow, cursor) {
            if(jflow.canvas.style.cursor !== cursor) {
                jflow.canvas.style.cursor = cursor;
            }
        },
        setDefaultCursor($event) {
            const jflow = $event.detail.jflow;
            this._setCursor(jflow, 'default');
            $event.detail.bubbles = false;
        },
        setPointerCursor($event) {
            const jflow = $event.detail.jflow;
            this._setCursor(jflow, 'pointer');
            $event.detail.bubbles = false;
        },
    },
};
