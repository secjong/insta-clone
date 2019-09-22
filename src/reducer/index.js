function reducer(state, action) {
    // action.type 에 따라 다른 작업 수행
    switch (action.type) {
      case 'SET_VALUE':
        console.log("action : " , action);
        return { value: action.value };
      default:
        // 아무것도 해당되지 않을 때 기존 상태 반환
        return state;
    }
  }
  export default reducer;