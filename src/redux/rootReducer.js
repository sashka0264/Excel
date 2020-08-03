import {TABLE_RESIZE, CHANGE_TEXT} from '@/redux/types';

export function rootReducer(state, action) {
  let field;
  // data {id: "4:1", text: "dssd"}
  console.log('ACTION: ', action);
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
    case CHANGE_TEXT: 
      return {
        ...state,
        currentText: action.data.text,
        dataState: {
          ...state.dataState,
          [action.data.id]: action.data.text
        }
      };
    default: 
      return state;
  }
}