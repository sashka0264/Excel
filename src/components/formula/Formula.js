import ExcelComponent from '@core/ExcelComponent';

class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input']
    });
  }

  onInput(e) {
    console.log(e.target.textContent.trim());
  }

  toHTML() { 
    return `
      <div class="info">
        fx
      </div>

      <div class="input" contenteditable spellcheck="false">

      </div>
    `;
  }
}

export default Formula;