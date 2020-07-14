import $ from '@core/dom';
import {Emitter} from '@core/Emitter';

class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const componentOptions = {
      emitter: this.emitter
    };

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);

      // ** DEBUG **
      // if (component.name) {
      //   console.log('доступен ' + component.name);
      //   window[component.name] = component;
      // }
      // ** DEBUG **

      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }

  destroy() {
    this.components.forEach((component) => {
      component.destroy();
    });
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach((component) => {
      component.init();
    });
  }
}

export default Excel;