import { Form, Input,Select } from 'antd';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
const { Option } = Select;
export default class AddCategory extends Component {
    formRef=React.createRef();
    static propTypes={
        parentID:PropTypes.string,
        setForm: PropTypes.func.isRequired,
        categorysList:PropTypes.array.isRequired
    }
    handleChange=(values)=>{
        console.log(values)
    }
    componentWillUnmount(){
        this.formRef.current.resetFields() 
    }
    componentDidMount(){
        // this.formRef.current.setFieldsValue({
        //     changename: this.formRef.current.getFieldValue("cateGoryName"),
        // })
        this.props.setForm(this.formRef.current)
    }
    render() {
        
        const {categorysList,parentID}=this.props
       
        return (
            <Form
            name="basic"
            ref={this.formRef}
            initialValues={{
                parent:parentID
            }}
          >
            <Form.Item 
                label='所属分类'
                name="parent"
                
            >
             
                        <Select>
                        <Option key='0' value='0'>一级分类</Option>
                        {
                        categorysList.map(c => <Option key={c._id}
                        value={c._id}>{c.name}</Option>)
                        }
                        </Select>

            </Form.Item>
            <Form.Item
              label="修改分类"
              name="changename"
              rules={[{ required: true, message: '分类名称不能为空!' }]}  
            >
                <Input placeholder='请输入分类名称'/>    
            </Form.Item>
          </Form>
          
        )
    }
}
