import { convertTimeToTargetTimezone } from '../logics/index';

type DirectiveBinding = {
    value: any;
};

function normalizeToUTCString(input: any): string {
    if (input == null) return '';
    if (input instanceof Date) return input.toISOString();
    if (typeof input === 'number') return new Date(input).toISOString();
    return String(input);
}

function render(el: HTMLElement, binding: DirectiveBinding) {
    
    const raw = normalizeToUTCString(binding.value);
    console.log(raw)
    const result = raw ? convertTimeToTargetTimezone(raw as any) : '';
    el.textContent = String(result || '');
}

export const zoneTime = {
    bind(el: HTMLElement, binding: DirectiveBinding) {
        render(el, binding);
    },
    update(el: HTMLElement, binding: DirectiveBinding) {
        if (binding && binding.value !== undefined) {
            render(el, binding);
        }
    }
};

export default {
    install(Vue: any) {
        Vue.directive('zone-time', zoneTime);
    }
};


