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
        console.log(oldList)
        return {
            ...state,
            list : oldList
        }
    }

    return state;
}
export default createStore(reducer, {list:[], order:{}});