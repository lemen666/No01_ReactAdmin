import React from 'react'
import  ReactDOM from 'react-dom'

import App from './App.jsx'
import memoryUtils from './utils/memoryUtils.js';
import storageUtils from './utils/storageUtils.js'
const user=storageUtils.getUser();
if(user&&user._id){
    memoryUtils.user=user
}
ReactDOM.render(<App/>,document.getElementById("root"))