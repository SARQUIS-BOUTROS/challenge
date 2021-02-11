import { createStore } from 'redux';
import { STATUS_ORDER_REQUEST } from './constants.js';


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

        let newOngoingValue = action.ongoing_value != undefined? action.ongoing_value : state.ongoing_value;
        let newRejectValue = action.reject_value != undefined ? action.reject_value : state.reject_value;
        let newReadyValue = action.ready_value != undefined ? action.ready_value : state.ready_value

        let filterResume = '';
        if (newOngoingValue) {
            filterResume +=  STATUS_ORDER_REQUEST.ONGOING
        }else {
            filterResume.replace(STATUS_ORDER_REQUEST.ONGOING,'')
        }
        if (newRejectValue) {
            filterResume +=  STATUS_ORDER_REQUEST.REJECTED
        }else {
            filterResume.replace(STATUS_ORDER_REQUEST.REJECTED,'')
        }
        if (newReadyValue) {
            filterResume += STATUS_ORDER_REQUEST.READY
        }else {
            filterResume.replace(STATUS_ORDER_REQUEST.READY,'')
        }
    console.log(filterResume)
        return {
            ...state,
            index: action.index,
            ongoing_value: newOngoingValue,
            reject_value:newRejectValue,
            ready_value: newReadyValue,
            filter_resume: filterResume
        }
    }

    return state;
}
export default createStore(reducer, {list:[], order:{}, index:'', ongoing_value: false, reject_value:false, ready_value:false , filter_resume:''});