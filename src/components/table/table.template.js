import {ROWS_COUNT, CODES} from '@core/constants';

function getWidth(colState, id) {
  return colState[id] ? `width: ${colState[id]}px` : '';
}

function getHeight(rowState, id) {
  return rowState[id] ? `height: ${rowState[id]}px` : '';
}

function toCell(row, col, colState) {
  return `
    <div 
      class="cell" 
      contenteditable 
      data-col="${col}"
      data-id="${row}:${col}"
      data-type="cell"
      style="${getWidth(colState, col)}"
    >
    </div>
  `; // для создания полей по типу инпутов
}

function toColumn(content, index, state) {
  return `
    <div 
      class="column" 
      data-type="resizable" 
      data-col="${index + 1}" 
      style="${getWidth(state, index + 1)}"
    >
      ${content}
      <div class="col-resize" data-resize="col" data></div>
    </div>
  `; // для создания колонок A, B, C... в шапке
}

function createRow(content, number, rowState) {
  const resize = number ? 
    '<div class="row-resize" data-resize="row"></div>' : 
    '';
  return `
    <div 
      class="row" 
      data-type="resizable" 
      data-row="${number}"
      style="${getHeight(rowState, number)}"
    >
      <div class="row-info">
        ${number}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `; 
  // в 'row-data' помещаем content, созданный через createCol или createCell, 
  // и на выходе получаем готовую строку
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = ROWS_COUNT, state) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map((content, index) => toColumn(content, index, state.colState))
      .join('');
  rows.push(createRow(cols, '', {})); // шапка
  
  for (let row = 1; row <= rowsCount; row += 1) {
    const cells = new Array(colsCount)
        .fill('')
        .map((_, col) => toCell(row, col + 1, state.colState))
        .join('');

    rows.push(createRow(cells, row, state.rowState));
  }
  return rows.join('');
}