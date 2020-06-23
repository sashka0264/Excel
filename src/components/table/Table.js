import ExcelComponent from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import resizeHandler from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';

class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }
  
  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(this.$root, e);
    }
  }

  toHTML() { 
    return createTable();
  }
}

export default Table;