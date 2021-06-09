
import {INCREMENT,DECREMENT} from './action_type'
export const increment=(number)=>({type:INCREMENT,number})
export const decrement=(number)=>({type:DECREMENT,number})
export const incrementAsync=(number)=>{
    return dispatch=>{
        setTimeout(() => {
            //有了结果后分发同步的action
            dispatch(increment(number))
        }, 1000);
    }
}