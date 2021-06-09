import React, { Component } from 'react'

export default class App extends Component {
    constructor(props){
        super(props)
        this.selectRef=React.createRef()
    }
    state={
        count:0
    }
    increament=()=>{
        const number=this.selectRef.current.value*1
        // console.log(number)
        this.setState((state)=>({
            count:state.count+number
        }))
    }
    decreament=()=>{
        const number=this.selectRef.current.value*1
        // console.log(number)
        this.setState((state)=>({
            count:state.count-number
        }))
    }
    increamentOdd=()=>{
        const number=this.selectRef.current.value*1
        // console.log(number)
        if(this.state.count%2!==0){
            this.setState((state)=>({
                count:state.count+number
            }))
        }
    }
    increamentAsync=()=>{
        const number=this.selectRef.current.value*1
        // console.log(number)
        setTimeout(() => {
            this.setState((state)=>({
                count:state.count+number
            }))
        }, 1000);
        
    }
    render() {
        const {count}=this.state
        return (
            <div>
                <span>click{count}次</span><br />
                <select name="number" ref={this.selectRef}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <button onClick={this.increament}>点击加</button>
                <button onClick={this.decreament}>点击减</button>
                <button onClick={this.increamentOdd}>奇数加</button>
                <button onClick={this.increamentAsync}>异步加</button>
            </div>
        )
    }
}
