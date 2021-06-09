import { Form, Input} from 'antd';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class UpdateCategory extends Component {
    formRef=React.createRef();
    static propTypes={
        cateGoryName:PropTypes.string,
        setForm: PropTypes.func.isRequired
    }
    componentWillUnmount(){
        this.formRef.current.resetFields() 
    }
    componentDidMount(){
      
        this.props.setForm(this.formRef.current)
    }
    render() {
        setTimeout(() => {
            this.formRef.current.setFieldsValue({
                changename: cateGoryName,
            })
        }, 100);
        const cateGoryName=this.props.cateGoryName
        
        return (
            <Form
            name="basic"
            ref={this.formRef}
            initialValues={{changename:cateGoryName}}
          >
            <Form.Item
              label="修改分类"
              name="changename"
              rules={[{ required: true, message: '不能为空!' }]}  
              
            >
                <Input />    
            </Form.Item>
          </Form>
          
        )
    }
}
