import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import {Switch,Route,Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import logo from './images/logo.png'
import MenuNav from '../../components/menu/MenuNav'
import './admin.less'
import Home from '../home/Home'
import Category from '../category/Category'
import Goods from '../goods/Goods'
import User from '../user/User'
import Actor from '../actor/Actor'
import Histogram from '../histogram/Histogram'
import Line from '../line/Line'
import Pie from '../pie/Pie'
import Order from '../order/Order'
const { Header, Footer, Sider, Content } = Layout;
export default class Admin extends Component {
    render() {
        const user=memoryUtils.user
        if(!user||!user._id){
            return <Redirect to='/login'/>
        }
        else{
            console.log(user.username,"您好")
        }
        return (
            <Layout className="admin">
                <Sider className="admin_slider">
                    <div className="admin_slider_header">
                        <img src={logo} alt="logo" />
                        <h2>尚硅谷后台</h2>
                    </div>
                    <MenuNav/>
                </Sider>
                <Layout>
                    <Header className="admin_header">Header</Header>
                    <Content className="admin_content">
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path="/category" component={Category}/>
                            <Route path="/goods" component={Goods}/>
                            <Route path="/user" component={User}/>
                            <Route path="/actor" component={Actor}/>
                            <Route path="/charts/histogram" component={Histogram}/>
                            <Route path="/charts/line" component={Line}/>
                            <Route path="/charts/pie" component={Pie}/>
                            <Route path="/order" component={Order}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer className="admin_footer">推荐使用谷歌浏览器</Footer>
                </Layout>
            </Layout>
        )
    }
}
