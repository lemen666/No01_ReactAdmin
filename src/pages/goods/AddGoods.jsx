// 添加商品列
import React, { Component } from 'react'
import {Card,Form,Input ,Cascader,Button, message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../components/linkButton/LinkButton';
import Image from './Image';
import { reqAddGoods, reqCategory, reqUpdateGoods } from '../../api';
import RichTextEditor from './rich-text-editor';
const { TextArea } = Input;

export default class AddGoods extends Component {
    state={
        options:[]
    }
    constructor(props){
        super(props)
        this.formRef=React.createRef()
        this.imgsRef=React.createRef()
        this.editorRef=React.createRef()
        this.details=this.props.location.state||{}
        // console.log(this.details.pCategoryId,this.details.categoryId)
        this.details.categoryIds=[]
    }
    initOptions=async(cateGorys)=>{
        const options = cateGorys.map(c => {
            this.getCategorys(c._id).then(resullt=>{
                const options=this.state.options
                if(resullt.length>0){
                    console.log(resullt[0].parentId)
                    options.forEach(option=>{
                        if(option.value===resullt[0].parentId){
                            option.isLeaf=false
                        }
                    })
                    // console.log(options.find(option=>option.value===resullt[0].parentId).isLeaf,'options')
                    // options[c._id].isLeaf=true
                }else{
                    // options[c._id].isLeaf=false
                }
                this.setState({options:[...options]})
            })
            return {
                value: c._id,
                label: c.name,
                isLeaf: true,
            }
        })

        
        if(this.details.pCategoryId==="0"){
            this.details.categoryIds=[this.details.categoryId]
        }else{// 如果是二级分类
            
            if(this.details._id){//说明是在修改
                // 异步获取 product.pCategoryId 的二级分类列表
                const subCategorys = await this.getCategorys(this.details.pCategoryId)
                if (subCategorys && subCategorys.length>0) {
                // 生成二级的 option 数组
                const cOptions = subCategorys.map(c => ({
                    value: c._id,
                    label: c.name,
                    isLeaf: true,
                }))
                // 找到对应的 option
                const targetOption = options.find(option => option.value===this.details.pCategoryId)
                // 将 cOptions 添加为对应的一级 option 的 children
                targetOption.children = cOptions
                }
                this.details.categoryIds=[this.details.pCategoryId,this.details.categoryId]
            // console.log(this.details.categoryIds,'categoryIds6666666666666')
            }
        }
        this.setState({options})
        // console.log(this.state.options)

    }
    getCategorys=async(parentId)=>{
        const result=await reqCategory(parentId)
        if(result.status===0){
            const cateGorys=result.data
            if(parentId==='0') {
                // 根据一级分类数组初始化生成 options 数组
                this.initOptions(cateGorys)
            } else { // 当前得到是二级分类列表
                // 返回二级分类列表(作为 async 函数的 promise 对象的成功的 value 值)
                return cateGorys
            }
        }
    }
    loadData=async(selectedOptions)=>{
        const targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true 
        const subCategorys = await this.getCategorys(targetOption.value)
        targetOption.loading=false
        if(subCategorys && subCategorys.length>0) { // 有子分类
            // 生成一个二级的 options
            const cOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            // 添加为对应的 option 的 children(子 options)
            targetOption.children = cOptions
        } else { // 没有子分类
            targetOption.isLeaf = true
        }
       // 更新 options 状态
        this.setState({
            options: [...this.state.options],
        });
        // console.log(this.formRef.current.getFieldsValue(),'formref')
    }
    submit=async()=>{
        // console.log(this.formRef.current.getFieldsValue(),'getFieldsValue')
        const {name,desc ,price,categoryIds}=this.formRef.current.getFieldsValue()
        let pCategoryId="0"
        let categoryId="0"
        if(categoryIds.length>1){
             pCategoryId=categoryIds[0]
             categoryId =categoryIds[1]
        }else{
             pCategoryId="0"
             categoryId =categoryIds[0]
        }
        const imgs=this.imgsRef.current.getImgs()
        const detail=this.editorRef.current.getDetail()
        const {_id} =this.details
        // console.log(product)
        if(!(this.details&&this.details._id)){
            const product={name,desc,price,pCategoryId,categoryId,imgs,detail}
            const result =await reqAddGoods(product)
            if(result.status===0){
                message.success("添加成功！")
                this.props.history.replace("/product")
            }else{
                message.error("添加商品失败！")
            }
        }else{
            const product={_id,name,desc,price,pCategoryId,categoryId,imgs,detail}
            const result=await reqUpdateGoods(product)
            if(result.status===0){
                message.success("修改成功！")
                this.props.history.replace("/product")
            }else{
                message.error("修改失败！！")
            }
        }

    }
    componentDidMount(){
        this.getCategorys("0")
    }
    render() {
        setTimeout(() => {
            this.formRef.current.setFieldsValue({
                name:this.details.name,
                desc:this.details.desc,
                price:this.details.price,
                categoryIds:this.details.categoryIds
            })
          }, 100);
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
          };
          const {options}=this.state
        return (
            <div>
               <Card title={<span><LinkButton onClick={() => this.props.history.goBack()}><ArrowLeftOutlined /></LinkButton><span>添加商品</span></span>}>
                    <Form
                        {...layout}
                        ref={this.formRef}
                        initialValues={
                            {
                                name:this.details.name,
                                desc:this.details.desc,
                                price:this.details.price,
                                categoryIds:this.details.categoryIds
                            }
                        }
                        >
                        <Form.Item
                            label="商品名称"
                            name="name"
                            rules={[{ required: true, message: '请输入商品名称！' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="商品描述"
                            name="desc"
                            rules={[{ required: true, message: '请输入商品描述' }]}
                        >
                            <TextArea rows={4}/>
                        </Form.Item>
                        <Form.Item
                            label="商品价格"
                            name="price"
                            rules={[{ required: true, message: '请输入商品价格！' }]}
                        >
                            <Input type="number" min={0} addonAfter="元" />
                        </Form.Item>
                        <Form.Item
                            label="商品分类"
                            name="categoryIds"
                            rules={[{ required: true, message: '请选择商品分类' }]}
                        >
                            <Cascader options={options} loadData={this.loadData} placeholder="请选择商品分类"/>
                        </Form.Item>
                        <Form.Item
                            label="商品图片"
                            name="imgs "
                        >
                            <Image ref={this.imgsRef} imgs={this.details.imgs}/>
                        </Form.Item>
                        <Form.Item
                            label="商品详情"
                            name="details "
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 20 }}    
                        >
                            <RichTextEditor ref={this.editorRef} detail={this.details.detail}/>
                        </Form.Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Form>
                </Card>  
            </div>
        )
    }
}
