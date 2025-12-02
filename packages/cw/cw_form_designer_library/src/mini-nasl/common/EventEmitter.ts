export type EventListener = (event?: any) => void;

export class EventEmitter {
  private readonly _events: { [name: string]: Array<EventListener> } = {};

  on(eventName: string, listener: EventListener) {
    let listeners = this._events[eventName];
    if (!listeners) listeners = this._events[eventName] = [];
    const index = listeners.indexOf(listener);
    !~index && listeners.push(listener);
  }

  off(eventName: string, listener: EventListener) {
    const listeners = this._events[eventName];
    if (listeners) {
      const index = listeners.indexOf(listener);
      ~index && listeners.splice(index, 1);
    }
  }

  once(eventName: string, listener: EventListener) {
    const temp = (...args: Array<any>) => {
      this.off(eventName, temp);
      listener.apply(this, args);
    };
    this.on(eventName, temp);
  }

  emit(eventName: string, event?: any) {
    const listeners = this._events[eventName];
    if (event) {
      event.target = event.target || this;
      event.currentTarget = event.currentTarget || this;
    }
    listeners && listeners.forEach((listener) => listener && listener.apply(this, [event]));
  }

  /**
   * 请求-响应模式：触发事件并获取返回值
   * @param eventName - 事件名称
   * @param event - 事件参数
   * @returns 第一个监听器的返回值
   */
  request(eventName: string, event?: any) {
    const listeners = this._events[eventName];
    if (listeners && listeners.length > 0) {
      // 返回第一个监听器的返回值
      return listeners[0].apply(this, [event]);
    }
    return undefined;
  }
}

export default EventEmitter;
