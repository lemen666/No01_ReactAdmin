import {INCREMENT,DECREMENT} from './action_type'

export default function count(state=0,action){
    console.log("reducer,count()",state,action)
    switch (action.type) {
        case INCREMENT:
            
            return state+action.number;
        case DECREMENT:
            
            return state-action.number;
    
        default:
            return state;
            
    }
}
