import React, { Component } from 'react'
import { Card,Button ,Input ,Select,Table, message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

import LinkButton from '../../components/linkButton/LinkButton'
import { reqAddGoods, reqGetGoods, reqSearchGoods, reqStatusGoods } from '../../api'
const {Option}= Select
export default class GoodsHome extends Component {
    state={
        goodsList:[],
        pageSize:5,
        total:0,
        searchType: 'productName', // 搜索类型 productName / productDesc
        searchInner:''
    }
    initColumns=()=>{
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => <span>¥{price}</span>
            },
            {
                title: '状态',
                width: 100,
                dataIndex: 'status',
                render: (status, product) => { // 1: 在售, 2: 已下架
                    let btnText = '下架'
                    let statusText = '在售'
                    if (status === 2) {
                        btnText = '上架'
                        statusText = '已下架'
                    }
                    status = status === 1 ? 2 : 1
                    return (
                        <span>
                        <Button type='primary' onClick={() =>
                        this.updateProductStatus(product._id, status)}>{btnText}</Button>
                        <span>{statusText}</span>
                        </span>
                    )
                }   
            },
            {
                title: '操作',
                width: 100,
                render: (product) => (
                    <span>
                    <LinkButton onClick={() => this.props.history.push('/product/details',product)}>详情</LinkButton>
                    &nbsp;&nbsp;&nbsp;
                    <LinkButton onClick={() => this.addOrUpdate(product)}>修改</LinkButton>
                    </span>
                )
            },
            ]
    }
    updateProductStatus=async (id,status)=>{
        const result =await reqStatusGoods(id,status)
        if(result.status===0){
            message.success("处理成功！")
            this.getGoods(1)
        }else{
            message.error("处理失败！")
        }
    }
    getGoods=async (pageNum)=>{
        this.pageNum = pageNum
        const {searchType,searchInner,pageSize}=this.state
    
        if(searchInner===''){
            const result= await reqGetGoods(pageNum,pageSize)
            if(result.status===0){
                const {list,total}=result.data

                this.setState({goodsList:list,total})
                console.log(this.state.goodsList,pageNum)
            }else{
                message.error("商品列表获取失败")
            }
        }else{//搜索查询商品列表
            const result = await reqSearchGoods({pageNum, pageSize, searchType,searchName:searchInner} )
            if(result.status===0){
                const {list,total}=result.data
                this.setState({goodsList:list,total})
            }else{
                message.error("商品列表获取失败")
            }
        }
        
        
    }
    addOrUpdate=(product)=>{
        if(!product){//点击了添加
            this.props.history.push("/product/addProduct")
        }else if(product){//点击了修改
            this.props.history.push("/product/updateProduct",product)
        }
        
    }
    addGoods=async ()=>{
        const result=await reqAddGoods({
            categoryId :"60b7932080f62e471c378ee0",
            pCategoryId :"0",
            name :"杨幂6666",
            desc :"你好你好",
            price:"100",
            detail :"我是描述信息",
            // imgs
        })
        if(result.status===0){
            message.success("添加商品成功！")
            console.log(result.data)
        }else{
            message.error("添加商品失败！")
        }
    }
    componentDidMount(){
        this.initColumns()

        // this.addGoods()
        setTimeout(() => {
            this.getGoods(1)  
        }, 100);
    }
    render() {
        const {goodsList,pageSize,total}=this.state
        const select=(
            <Input.Group compact>
                <Select defaultValue="productName"
                      onChange={(value)=>{this.setState({searchType:value})}}
                >
                <Option value="productName">按名称搜索</Option>
                <Option value="productDesc">按内容搜索</Option>
                </Select>
                <Input style={{ width: '20%' }} placeholder="请输入要搜索的内容" onChange={(e)=>this.setState({searchInner:e.target.value})}/>
                <Button type="primary"  onClick={()=>this.getGoods(1)}>搜索</Button>
          </Input.Group>
        )
        return (
            
            <div>
                <Card title={select} extra={<Button type="primary" icon={<PlusOutlined />} onClick={()=>{this.addOrUpdate()}}>添加</Button>}>
                <Table rowKey='_id' columns={this.columns} dataSource={goodsList} loading="false" 
                pagination={{
                        defaultPageSize: pageSize,
                        total,
                        showQuickJumper: true,
                        onChange: this.getGoods,
                        current:this.pageNum
                        }}/>
                </Card>
            </div>
        )
    }
}