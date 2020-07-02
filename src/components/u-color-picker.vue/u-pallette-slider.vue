<script>
import { USlider } from 'cloud-ui.vusion';

export default {
    name: 'u-pallette-slider',
    extends: USlider,
};
</script>

<style module>
.root {
    vertical-align: -7px;
}

.body {
    position: relative;
    margin: var(--slider-body-margin);
    padding: var(--slider-body-padding);
    height: 10px;
}

.track {
    position: relative;
    cursor: var(--cursor-pointer);
    height: var(--slider-track-height);
    background: var(--slider-track-background);
}

.trail {
    position: absolute;
    height: 100%;
    background: var(--slider-trail-background);
}

.bound {
    box-sizing: content-box;
    position: absolute;
    background: var(--slider-bound-background);
    height: 100%;
}

.bound[role="start"] {
    left: -7px;
    padding-left: 7px;
}

.bound[role="end"] {
    right: -7px;
    padding-right: 7px;
}

.handle {
    position: absolute;
    left: 0;
    top: 0;
    cursor: var(--cursor-pointer);
    margin-left: calc(var(--slider-handle-width) / -2);
    width: var(--slider-handle-width);
    height: var(--slider-handle-height);
    background: var(--slider-handle-background);
    border: var(--slider-handle-border);
    border-radius: 2px;
}

.root[disabled] {
    cursor: var(--cursor-not-allowed);
}

.root[disabled] .trail {
    background: var(--slider-trail-background-disabled);
}

.root[disabled] .track::before {
    background: var(--brand-disabled);
}

.root {
    position: relative;
    border-radius: 2px;
    box-shadow: inset 0px 0px 2px rgba(0,0,0,0.5);
}

.root:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url('./assets/transparent.png') left center;
}

.body {
    display: block;
    margin: 0 3px;
    padding: 0;
}

.track {
    height: 10px;
    border-radius: 0;
    background: none;
}

.trail {
    background: none;
}

.handle {
    margin-left: -2px;
    margin-top: 1px;
    width: 4px;
    height: 8px;
    border-radius: 1px;
    background: var(--background-color-base);
    box-shadow: 0 0 1px 0px rgba(0,0,0,0.5);
}
</style>
