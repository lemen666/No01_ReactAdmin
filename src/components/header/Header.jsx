import React, { Component } from 'react'
import {withRouter} from  'react-router-dom'
import logo from './images/logo.png'
import menuList from '../../config/menuList'
import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils.js'
import LinkButton from '../linkButton/LinkButton'
import {Modal} from 'antd'
import {formateDate} from '../../utils/dateTimeUtils'
import {reqWeather} from '../../api/index'
import './header.less'
const {confirm}=Modal
class Header extends Component {
    state={
        username:memoryUtils.user.username,
        dateTime:formateDate(Date.now()),
        city:'温州',
        weather:'',
        weather_img:'',
    }
    // 退出登录
    quit=()=>{
        confirm({
            title: '确定要退出登录吗？',
            content: '点击确定退出登录',
            onOk:()=> {
                // 1.清楚储存的数据
                memoryUtils.user={}
                storageUtils.delUser()

                // 2.跳转界面
                this.props.history.replace('/login')
            },
          });
        
    }
    // 获取时间
    getTime=()=>{
        this.dateTimer=setInterval(()=>{
            const dateTime=formateDate(Date.now())
            this.setState({dateTime})
        },1000)
    }
    getWeather=async ()=>{
        const result=await reqWeather(this.state.city)
        const {wea_img,wea}=result
        this.setState({
            weather:wea,
            weather_img:wea_img
        })
        console.log(result,"----weather")
    }
    getPageName=(path)=>{
        let pageName
        menuList.forEach(menu=>{
            if(menu.key===path){
                pageName=menu.title
            }else if(menu.children){
                menu.children.forEach(cMenu=>{
                    if(path.indexOf(cMenu.key)===0){
                        pageName=cMenu.title
                    }
                })
            }
        })
        return pageName
    }
    componentDidMount(){
       this.getTime()
       this.getWeather()
        
    }
    componentWillUnmount(){
        clearInterval(this.dateTimer)
    }
    render() {
        const {username,dateTime,weather,city}=this.state
        const pagename=this.getPageName(this.props.location.pathname)
        return (
            <div className="admin_header">
                        <div className="admin_header_top">
                            <div className="admin_header_top_content">
                                <span>欢迎,{username}</span>
                                {/* eslint-disable-next-line */}
                                <LinkButton onClick={this.quit}>退出</LinkButton>
                            </div>
                        </div>
                        <div className="admin_header_bottom">
                            <div className="admin_header_bottom_left">
                                <span>{pagename}</span>
                            </div>
                            <div className="admin_header_bottom_right">
                                <span>{dateTime}</span>
                                <img src={logo} alt="weather" />
                                <span>城市:{city}</span>  
                                <span>天气:{weather}</span>
                            </div>
                        </div>
                </div>
        )
    }
}
export default withRouter(Header)
