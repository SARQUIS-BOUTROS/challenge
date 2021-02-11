import { createStore } from 'redux';

let reducer = (state, action ) => {
    if (action.type === 'SET_LIST') {
        return {
            ...state,
            list : action.list
        }
    }

    if (action.type === 'ADD_TO_LIST') {

        let oldList = state.list
        oldList.push(action.order)
        return {
            ...state,
            list : oldList
        }
    }

    if (action.type === 'SEARCH'){
        return {
            ...state,
            index: action.index
        }
    }

    return state;
}
export default createStore(reducer, {list:[], order:{}, index:''});