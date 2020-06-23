const CODES = {
  A: 65,
  Z: 90
};

function toCell(content, index) {
  return `
    <div class="cell" contenteditable data-col="${index}">${content}</div>
  `; // для создания полей по типу инпутов
}

function toColumn(content, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${content}
      <div class="col-resize" data-resize="col" data></div>
    </div>
  `; // для создания колонок A, B, C... в шапке
}

function createRow(content, number = '') {
  const resize = number ? 
    '<div class="row-resize" data-resize="row"></div>' : 
    '';
  return `
    <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');
  rows.push(createRow(cols)); // шапка
  
  for (let i = 1; i <= rowsCount; i += 1) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('');
    rows.push(createRow(cells, i));
  }

  return rows.join('');
}