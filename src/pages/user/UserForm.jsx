import React, { Component } from 'react'
import { Form, Input ,Select} from 'antd';
import PropTypes  from 'prop-types';

const { Option } = Select;
export default class UserForm extends Component {
   
    static propTypes = {
        roles: PropTypes.array,
        setForm:PropTypes.func.isRequired,
        user:PropTypes.object.isRequired
    }
    constructor(props){
        super(props)
        this.formRef=React.createRef();
    }
    componentDidMount(){
        this.props.setForm(this.formRef)
        
    }
    render() {
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
          };
          const {roles,user}=this.props
          setTimeout(() => {
            this.formRef.current.setFieldsValue({
                "username":user.username,
                "password":user.password,
                "phone":user.phone,
                "email":user.email,
                "role_id":user.role_id
            })
          }, 100);
        return (
            <Form
                {...layout}
                ref={this.formRef}
 
                >
                <Form.Item
                    label="用户名:"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="请输入用户名"/>
                </Form.Item>
                {
                    user._id?"":(
                        <Form.Item
                            label="密码:"
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password placeholder="请输入密码"/>
                        </Form.Item>
                    )
                }

                <Form.Item
                    label="手机号:"
                    name="phone"
                    rules={[{ required: true, message: '请输入手机号' }]}
                >
                    <Input placeholder="请输入手机号"/>
                </Form.Item>
                <Form.Item
                    label="邮箱:"
                    name="email"
                    rules={[{ required: true, message: '请输入邮箱' }]}
                >
                    <Input placeholder="请输入邮箱"/>
                </Form.Item>
                <Form.Item
                    label="角色:"
                    name="role_id"
                    rules={[{ required: true, message: '请选择' }]}
                >
                     <Select
                        placeholder="请选择用户的角色"
                        allowClear
                    >
                        {
                            roles.map((role)=>(
                                <Option value={role._id} key={role._id}>{role.name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
        )
    }
}
