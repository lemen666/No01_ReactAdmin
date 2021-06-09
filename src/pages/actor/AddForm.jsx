import React, { Component } from 'react'
import { Form,Input} from 'antd'
import PropTypes from 'prop-types'
export default class AddForm extends Component {
    static propTypes ={
        setForm:PropTypes.func.isRequired
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
          console.log(this.formRef)
        return (
            <Form
                {...layout}
                name="basic"
                ref={this.formRef}
                >
                <Form.Item
                    label="角色名称"
                    name="name"
                    rules={[{ required: true, message: '请输入角色名称！' }]}
                >
                    <Input placeholder="请输入角色的名称"/>
                </Form.Item>
            </Form>
        )
    }
}
