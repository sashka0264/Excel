export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'});
  let listeners = [];
  // для приватности

  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter((listener) => listener !== fn);
        }
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      // функция, которая возвращает новый state
      listeners.forEach((listener) => listener(state, action));
      // дергаем всех слушателей после обновления состояния
    },
    getState() {
      return state;
    }
  };
}