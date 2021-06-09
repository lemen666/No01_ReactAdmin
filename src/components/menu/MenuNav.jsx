import React, { Component } from 'react'
import { Menu } from 'antd'
import {Link,withRouter} from 'react-router-dom'
import menuList from '../../config/menuList.js';
import memoryUtils from '../../utils/memoryUtils.js';
const { SubMenu } = Menu;

class MenuNav extends Component {
  openKey='/'
  constructor(props){
    super(props)
    this.getUserRoles()
    console.log(memoryUtils.user)
  }
  getUserRoles=()=>{
    this.roleMenus=memoryUtils.user.role.menus||[]
  }
  isRole=(item)=>{
    //admin全部权限
    //home是公共权限
    //如果该菜单的子菜单有权限，一级菜单也应该显示
    if(memoryUtils.user.username==="admin"||item.isPublic||(this.roleMenus.indexOf(item.key)!==-1)){
      return true
    }else if(item.children){
      return !!item.children.find(child => this.roleMenus.indexOf(child.key)!==-1)
    }else{
      return false
    }
  }
  getMenuNodes=(menuList)=>{
    const path=this.props.location.pathname
    return menuList.map(item=>{
      if(this.isRole(item)){
        if(!item.children){
          if(this.props.location.pathname.indexOf(item.key)!==-1){
            this.selectPath=item.key
          }
        
          return (
            <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.key}> {item.title}</Link>
            </Menu.Item>
          )
        }else{
          if(item.children.find(cItem=>{
            if(path.indexOf(cItem.key)!==-1){
              this.selectPath=cItem.key
              return true
            }else{
              return false
            }
            })){
            this.openKey=item.key
          }
       
          return (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
                 {this.getMenuNodes(item.children)}
            </SubMenu>
          )
        }
      }else{
        return ''
      }

    })
  }
  componentDidMount(){
    
  }
    render() {
      const MenuNodes=this.getMenuNodes(menuList)
      const selectPath=this.selectPath
      const openKey=this.openKey
      // console.log(openKey,"-----")
        return (
            <div style={{ width: 200 }}>
            <Menu
              selectedKeys={[selectPath]}
              defaultOpenKeys={[openKey]}
              mode="inline"
              theme="dark"
            >
              {MenuNodes}
            </Menu>
          </div>
        )
    }
}
export default withRouter(MenuNav)
