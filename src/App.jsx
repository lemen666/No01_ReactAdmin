import React, { Component } from 'react'
// import {Button,message} from 'antd'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'
export default class App extends Component {
    // handleClick=()=>{
    //     message.success('This is a success message');
    // }
    
    render() {
       
        return (
            <div>
                {/* MyAPP222
                <Button type="primary" onClick={this.handleClick}>点我点我</Button> */}
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/" component={Admin}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}
