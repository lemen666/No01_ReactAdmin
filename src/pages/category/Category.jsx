import React, { Component } from 'react'
import { Card ,Button,Table, Space, message,Modal } from 'antd';
import {PlusOutlined } from '@ant-design/icons'
import LinkButton from '../../components/linkButton/LinkButton'
import {reqAddCategory, reqCategory, reqUpdateCategory} from '../../api/index'
import UpdateCategory from './UpdateCategory';
import AddCategory from './AddCategory';
export default class Category extends Component {

    state={
        categorysList:[],
        subCategorysList:[],
        parentID:'0',
        parentName:'一级菜单',
        isLoading:false,
        showTips:0,//0都关闭，1添加框开启，2修改框开启
    }
    getCateGory= async (parentid)=>{
        
        const parent_id=parentid||this.state.parentID
        this.columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',
              key: 'name',
              width:"70%",
              // eslint-disable-next-line
              render: text => <a>{text}</a>,
            },
            {
              title: '操作',
              key: 'action',
              width:"30%",
              render: (text, record) => (
                <Space size="middle">
                  <LinkButton onClick={()=>this.changeTips(2,record)}>修改分类</LinkButton>
                  {
                      parent_id==="0"?<LinkButton onClick={()=>this.showSubCateGory(record)}>查看子分类</LinkButton>:<span></span>
                  }
                  
                </Space>
              ),
            },
          ];
          this.setState({isLoading:true})
          const result=await reqCategory(parent_id)
          const {status,data}=result
          if(status===0&&data){
            // console.log(result,"-----getCateGory")
            this.setState({isLoading:false})
            if(parent_id==='0'){
                this.setState({
                    categorysList:data
                })

            }else{
                this.setState({
                    subCategorysList:data
                })
            }
            
          }else{
            message.error("获取列表失败")
        }
          
    }
    showSubCateGory=(category)=>{
        if(category){
            const parentID=category._id
            const parentName=category.name
            this.setState({
                parentID,
                parentName,
            },()=>{
                this.getCateGory()
                
            })
            
        }
    }
    showCategory=()=>{
        const parentID="0"
        const parentName="一级子菜单"
        this.setState({
            parentID,
            parentName,
        })
    }
    changeTips=(type,record)=>{
        this.setState({
            showTips:type
        })
        if(record){
            this.record=record;
            // this.setState({cateGoryName:record.name})
            this.cateGoryId=record._id
            this.cateGoryName=record.name
        }
    }
    updateCategory= async ()=>{
        
        const changename=this.form.getFieldValue("changename")
        // eslint-disable-next-line
       if(changename!=""&&(changename !== this.cateGoryName)){
            const result =await reqUpdateCategory({categoryId:this.cateGoryId,categoryName:changename})
            console.log(this.cateGoryId,changename)
            if (result.status === 0) {
            // 重新获取列表
            this.getCateGory()
            }
            this.setState({
                showTips:0
            })
       }else if(changename===this.cateGoryName){
           message.error("没有修改！")
       }
      
    }
    addCategory=async ()=>{
        
        const {changename,parent}=this.form.getFieldValue()
        if(changename&&(changename.trim()!=="")){
            const result=await reqAddCategory(parent,changename)
            if(result.status===0){
                console.log(result.data)
                if(this.state.parentID===parent){
                    this.getCateGory()
                }else if(parent==="0"){
                    this.getCateGory(parent)
                }
            }
            this.setState({
                showTips:0
            })
        }else{
            message.error("不能添加空的分类！")
        }
        
    }
    handleCancel=()=>{
        this.setState({
            showTips:0
        })
        
    }
    componentDidMount(){
        this.getCateGory()
    }
    render() {
        const {parentID,parentName,categorysList,subCategorysList,isLoading,showTips}=this.state

        return (
            <div>
                <Card title={parentID==="0"?<span>{parentName}</span>:<div><LinkButton onClick={this.showCategory}>一级子菜单</LinkButton><span>{parentName}</span></div>} extra={
                    <Button type="primary" icon={<PlusOutlined />} onClick={()=>this.changeTips(1)}>添加</Button>
                }>
                    <Table rowKey='_id' columns={this.columns} dataSource={parentID==="0"?categorysList:subCategorysList} bordered="true" 
                     loading={isLoading} pagination={{
                        defaultPageSize:5,
                        showQuickJumper:true
                        
                        }}/>
                    <Modal
                        title="修改分类"
                        visible={showTips===2}
                        onOk={this.updateCategory}
                        onCancel={this.handleCancel}
                    >
                        <UpdateCategory  cateGoryName={this.cateGoryName}  setForm={form => this.form = form}/>
                    </Modal>
                    <Modal
                        title="添加分类"
                        visible={showTips===1}
                        onOk={this.addCategory}
                        onCancel={this.handleCancel}
                    >
                        <AddCategory parentID={parentID} setForm={form => this.form = form} categorysList={categorysList}/>
                    </Modal>
                </Card>
            </div>
        )
    }
}
