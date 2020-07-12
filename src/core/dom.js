class Dom {
  constructor(selector) {
    // eslint-disable-next-line max-len
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.innerHTML;
  }

  clear() {
    this.html('');
    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  get getWidth() {
    return this.$el.scrollWidth - 40;
  }

  get getHeight() {
    return this.$el.offsetHeight - 40;
  }

  css(styles = {}) {
    Object
        .keys(styles)
        .forEach((key) => this.$el.style[key] = styles[key]);
    return this;
  }

  addClass(className) {
    this.$el.classList.add(className);
  }

  removeClass(className) {
    this.$el.classList.remove(className);
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  focus() {
    this.$el.focus();
    return this;
  }

  id(parse = false) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: Number(parsed[0]),
        col: Number(parsed[1])
      };
    }
    return this.data.id;
  }

  append(element) {
    if (element instanceof Dom) element = element.$el;
    
    if (Element.prototype.append) {
      this.$el.append(element);
    } else {
      this.$el.appendChild(element);
    }
    return this;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
}

export default function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) el.classList.add(classes);
  return $(el);
};