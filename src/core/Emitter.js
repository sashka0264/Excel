export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // уведомление слушателей, если они есть
  // table.dispatch('table:select', {a: 1});
  dispatch(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false;
    } else {
      this.listeners[eventName].forEach((fn) => {
        fn(...args);
      });
      return true;
    }
  }

  // добавление слушателей
  // e.g. formula.subscribe('table:select', () => {});
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return () => {
      this.listeners[eventName] =
        this.listeners[eventName].filter((listener) => listener !== fn);
    };
  }
}