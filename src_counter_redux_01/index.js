import React from 'react'
import  ReactDOM from 'react-dom'
import App from './App.jsx'
import store from './redux/store'
// 将store传递给APP组件
ReactDOM.render(<App store={store}/>,document.getElementById("root"))
//通过store订阅state改变的监听
store.subscribe(()=>{
    ReactDOM.render(<App store={store}/>,document.getElementById("root"))
})