import React, { Component } from 'react'
import { Menu } from 'antd'
import {
    PieChartOutlined,
    MailOutlined,
  } from '@ant-design/icons';
import {Link,withRouter} from 'react-router-dom'
import menuList from '../../config/menuList.js';

const { SubMenu } = Menu;

class MenuNav extends Component {
  openKey='/'
  getMenuNodes=(menuList)=>{
    const path=this.props.location.pathname
    return menuList.map(item=>{
      if(!item.children){
        return (
          <Menu.Item key={item.key} icon={<PieChartOutlined />}>
                <Link to={item.key}> {item.title}</Link>
          </Menu.Item>
        )
      }else{
        if(item.children.find(cItem=>path.indexOf(cItem.key)===0)){
          this.openKey=item.key
          console.log(this.openKey)
        }
        return (
          <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
               {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
    render() {
      const selectPath=this.props.location.pathname
      const MenuNodes=this.getMenuNodes(menuList)
      const openKey=this.openKey
      console.log(openKey,"-----")
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