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

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: [
        'mousedown',
        'keydown'
      ]
    });
  }

  prepare() { // вызывается перед методом init
    this.selection = new TableSelection();
  }

  init() {
    super.init(); // вызываем также родительский метод
    const $cell = this.$root.find('[data-id="1:1"]');
    this.selection.select($cell);
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
        this.selection.select($target);
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
      this.selection.select($next);
    }
  }

  toHTML() { 
    return createTable();
  }
}

export default Table;