import React, { Component } from 'react'
import GoodsHome from './GoodsHome'
import Details from './Dtails'
import AddGoods from './AddGoods'
import {Switch, Route, Redirect} from 'react-router-dom'
export default class Goods extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/product' exact component={GoodsHome}/>
                    <Route path='/product/details' component={Details}/>
                    <Route path='/product/addProduct' component={AddGoods}/>
                    <Route path='/product/updateProduct' component={AddGoods}/>
                    <Redirect to='/product'/>
                </Switch>
            </div>
        )
    }
}

