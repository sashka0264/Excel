import {capitalize} from '@core/utils';

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`;
}

class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener), // e.g. 'onInput'
        name = `No such method '${method}' in ${this.name} Component`;
      if (!this[method]) {
        throw new Error(name);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

export default DomListener;