import DomListener from '@core/DOMListener';

class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '(?)';
    this.prepare();
    this.emitter = options.emitter;
    this.unsubscribers = [];
  }

  prepare() {}

  init() {
    this.initDOMListeners();
  }

  $dispatch(eventName, ...args) {
    this.emitter.dispatch(eventName, ...args);
  }

  $on(eventName, fn) {
    const unsub = this.emitter.subscribe(eventName, fn);
    this.unsubscribers.push(unsub);
  }

  destroy() {
    this.unsubscribers.forEach((unsub) => unsub());
  }
}

export default ExcelComponent;