import DomListener from '@core/DOMListener';

class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '(?)';
    this.prepare();
    this.emitter = options.emitter;
    this.store = options.store;
    this.unsubscribers = [];
    this.storeSub = null;
  }

  prepare() {}

  init() {
    this.initDOMListeners();
  }

  $storeDispatch(action) {
    this.store.dispatch(action);
  }

  $storeSubscribe(fn) {
    this.storeSub = this.store.subscribe(fn);
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
    this.storeSub.unsubscribe();
  }
}

export default ExcelComponent;