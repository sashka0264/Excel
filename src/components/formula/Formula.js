import ExcelComponent from '@core/ExcelComponent';
import $ from '@core/dom';

class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');

    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.text());
    });
    this.$storeSubscribe((state) => this.$formula.text(state.currentText));
  }

  onInput(e) {
    this.$dispatch('formula:input', $(e.target).text());
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(e.key)) {
      e.preventDefault();
      this.$dispatch('formula:done');
    }
  }


  toHTML() { 
    return `
      <div class="info">
        fx
      </div>

      <div class="input" id="formula" contenteditable spellcheck="false">

      </div>
    `;
  }
}

export default Formula;