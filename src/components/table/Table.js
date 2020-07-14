import ExcelComponent from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import resizeHandler from '@/components/table/table.resize';
import {
  shouldResize,
  isCell,
  nextSelector
} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {matrix} from '@/components/table/table.functions';
import $ from '@core/dom';

class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: [
        'mousedown',
        'keydown',
        'input'
      ],
      ...options
    });
  }

  prepare() { // вызывается перед методом init
    this.selection = new TableSelection();
  }

  init() {
    super.init(); // вызываем также родительский метод
    this.selectCell(this.$root.find('[data-id="1:1"]'));

    this.$on('formula:input', (data) => {
      this.selection.current.text(data);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$dispatch('table:select', $cell);
  }
  
  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(this.$root, e);
    }
    if (isCell(e)) {
      const $target = $(e.target);
      if (e.shiftKey) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);
        const $cells = matrix(target, current)
            .map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(e) {
    const keys = [
      'Tab',
      'Enter',
      'ArrowRight',
      'ArrowLeft',
      'ArrowUp',
      'ArrowDown'
    ];

    const {key, shiftKey} = e;

    if (keys.includes(key) && !shiftKey) {
      e.preventDefault();
      const {col, row} = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, col, row));
      this.selectCell($next);
    }
  }

  onInput(e) {
    this.$dispatch('table:input', $(e.target));
  }

  toHTML() { 
    return createTable();
  }
}

export default Table;