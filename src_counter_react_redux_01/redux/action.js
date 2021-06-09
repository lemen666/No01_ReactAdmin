
import {INCREMENT,DECREMENT} from './action_type'
export const increment=(number)=>({type:INCREMENT,number})
export const decrement=(number)=>({type:DECREMENT,number})