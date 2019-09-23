import types from '../actions/types';

// Default State
const initialState = {
    isLoading: true,
    pageNo: 1
};

// Reducer - 리듀서가 리턴하는 값이 store에 세팅됨
// state 는 기존값, action은 액션함수에서 리턴하는 값이 존재
function reducer(state = initialState, action) {
  console.log("state : " , state);
  console.log("action : " , action);
  switch (action.type) {
    case types.SET_IS_LOADING: 
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case types.SET_PAGENO: 
      return {
        ...state,
        pageno: action.pageno
      };
    default: 
      return state;
  }
}

// Exports Default
export default reducer;