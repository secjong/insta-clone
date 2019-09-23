import { bindActionCreators } from 'redux';
import types from './types';

// Action Functions
function setIsLoading(isLoading) {
    return {
        type: types.SET_IS_LOADING,
        isLoading: isLoading
    };
}

function setPageNo(pageNo) {
    return {
        type: types.SET_PAGE_NO,
        pageNo: pageNo
    };
}









// Reducer 데이터를 스토어의 props로 전달
export function mapStateToProps(state, props) {
    console.log("state : " , state);
    console.log("props : " , props);
    return {
        state: state.postReducer
    };
}

// Actions을 스토어의 props로 전달
export function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setIsLoading: setIsLoading,
        setPageNo: setPageNo
    }, dispatch);
}