import {range} from '@/core/utils';
import {COLS_COUNT, MIN_VALUE, ROWS_COUNT} from '@core/constants';

export function shouldResize(e) {
  return e.target.dataset.resize;
}

export function isCell(e) {
  return e.target.dataset.type === 'cell';
}

export function matrix(target, current) {
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, col, row) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > ROWS_COUNT ? ROWS_COUNT : row + 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 > COLS_COUNT ? COLS_COUNT : col + 1;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
    default:
      break;
  }
  return `[data-id="${row}:${col}"]`;
}