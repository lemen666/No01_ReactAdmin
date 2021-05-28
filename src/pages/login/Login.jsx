import React, { Component} from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './images/logo.png'
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils';
import './login.less'
import { Redirect } from 'react-router';
export default class Login extends Component {
    loginFun=(result)=>{
        if(result.status===0){//登录成功
            const user=result.data
            message.success('登录成功',2)
            this.props.history.replace('/')
            // 记录用户的数据
            memoryUtils.user=user
            storageUtils.saveUser(user)
          }else{//登录失败
            message.error('登录失败，请检查一下您的账号或密码是否有误！')
          }
    }
    render() {
        if(memoryUtils.user&&memoryUtils.user._id){
            return <Redirect to="/" />
        }
        return (
            <div className="loginWrap">
                <div className="loginHeader">
                    <img src={logo} alt="logo" />
                    <h1>React:后台管理系统</h1>
                </div>
                <div className="loginContent">
                    <h2>用户登录</h2>
                    <NormalLoginForm loginFun={this.loginFun}/>
                </div>
            </div>
        )
    }
}
// 函数组件中直接使用props
const NormalLoginForm = (props) => {
    const onFinish = async(values) => {
    //   console.log('发送ajax请求登录 ', values);
      const result=await reqLogin(values.username,values.password)
      props.loginFun(result)
    };
    return (
        <Form
        name="normal_login"
        className="login-form"
        initialValues={
            { remember: true,username:"admin" }
        }
        onFinish={onFinish}
        >
        <Form.Item
            name="username"
            rules={[
                { required: true, message: '请输入您的用户名!' },
                { min:4,message:"用户名不得小于4个字符！" },
                { max:12,message:"用户名不得大于12个字符！" },
                {pattern:/^[a-zA-Z0-9-]+$/,message:"必须由字母、数字或者下划线组成！"},
                {whitespace:true}
            ]}
            
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" style={{color:"rgba(0,0,0,0.25)"}}  />} placeholder="用户名" initialvalues="admin" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
                {required:true,message:"请输入密码"},
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    const lg=value && value.length
                      if (lg>12||lg<4) {
                        return Promise.reject(new Error('密码长度应在4-12之间'));
                      }else if(!(/^[a-zA-Z0-9-]+$/.test(value))){
                        return Promise.reject(new Error('必须由字母、数字或者下划线组成！'));
                      }
                      return Promise.resolve();
                    },
                }),
            ]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon"  style={{color:"rgba(0,0,0,0.25)"}} />}
            type="password"
            placeholder="密码"
            />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
            登录
            </Button>
        </Form.Item>
    </Form>
    );
  }; 
