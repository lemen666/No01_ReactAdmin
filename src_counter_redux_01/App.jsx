import React, { Component } from 'react'
import Proptypes from 'prop-types'
import {increment,decrement} from './redux/action'
export default class App extends Component {
    constructor(props){
        super(props)
        this.selectRef=React.createRef()
    }
    static proptype={
        store:Proptypes.object.isRequired
    }
    // state={
    //     count:0
    // }
    increment=()=>{
        const number=this.selectRef.current.value*1
        // console.log(number)
        // this.setState((state)=>({
        //     count:state.count+number
        // }))
        this.props.store.dispatch(increment(number))
    }
    decrement=()=>{
        const number=this.selectRef.current.value*1
        // console.log(number)
        // this.setState((state)=>({
        //     count:state.count-number
        // }))
        this.props.store.dispatch(decrement(number))
    }
    incrementOdd=()=>{
        const number=this.selectRef.current.value*1
        // console.log(number)
        if(this.props.store.getState()%2!==0){
            this.props.store.dispatch(increment(number))
        }
    }
    incrementAsync=()=>{
        const number=this.selectRef.current.value*1
        // console.log(number)
        setTimeout(() => {
            this.props.store.dispatch(increment(number))
        }, 1000);
        
    }
    render() {
        return (
            <div>
                <span>click{this.props.store.getState()}次</span><br />
                <select name="number" ref={this.selectRef}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <button onClick={this.increment}>点击加</button>
                <button onClick={this.decrement}>点击减</button>
                <button onClick={this.incrementOdd}>奇数加</button>
                <button onClick={this.incrementAsync}>异步加</button>
            </div>
        )
    }
}
