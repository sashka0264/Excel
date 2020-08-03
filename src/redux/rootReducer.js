import {TABLE_RESIZE} from '@/redux/types';

export function rootReducer(state, action) {
  let field;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return {
        ...state, 
        [field]: {
          ...state[field],
          [action.data.id]: action.data.value
        }
      };
    default: 
      return state;
  }
}