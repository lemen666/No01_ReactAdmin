import React, { Component } from 'react'
import LinkButton from '../../components/linkButton/LinkButton'
import { Card ,Button,Table,Modal, message} from 'antd';
import { formateDate } from '../../utils/dateTimeUtils'
import { reqAddUser, reqDeleteUser, reqGetUsers, reqUpdateUser } from '../../api'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import UserForm from './UserForm';
const { confirm } = Modal
export default class User extends Component {
    state={
        userList:[],
        user:{},
        roles:[],
        showModal:false
    }
    initColunms=()=>{
        this.columns=[
            {
                title: '用户名',
                dataIndex: 'username', 
              },
              {
                title: '邮箱',
                dataIndex: 'email',
              },
              {
                title: '电话',
                dataIndex: 'phone', 
              },
              {
                title: '注册时间',
                dataIndex: 'create_time',
                render:formateDate
                
              },
              {
                title: '所属角色',
                dataIndex: 'role_id',
                render:(value)=>this.roleName[value]
                
              },
              {
                title: '操作',
                render:(user)=>(
                    <span>
                        <LinkButton onClick={()=>this.handleUpdate(user)}>修改</LinkButton>
                        <LinkButton onClick={()=>this.handleDelete(user)}>删除</LinkButton>
                    </span>
                )

                
                
              },
        ]
    }
    initRoleName=(roles)=>{
        // 设置角色id和角色名对应的对象
        this.roleName=roles.reduce((pre,role)=>{
            pre[role._id]=role.name
            return pre
        },[])
    }
    getUsers=async ()=>{
        const result=await reqGetUsers()
        if(result.status===0){
            this.initRoleName(result.data.roles)
            this.setState({userList:result.data.users,roles:result.data.roles})
            // console.log(result.data.users,'users')
            
            
        }
    }
    handleUpdate=(user)=>{
        this.setState({showModal:true,user})
        console.log(this.state.user)

    }
    handleDelete=(user)=>{
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: `确定删除${user.username}吗?`,
            onOk:async()=> {
              const result=await reqDeleteUser(user._id)
              if(result.status===0){
                  message.success("删除成功！")
                  this.getUsers()
                
              }else{
                  message.error("删除失败请重试！")
              }
            },
          });
    }
    handleOk=async ()=>{
        this.setState({showModal:false})
        const user=this.form.current.getFieldsValue()
        if(this.state.user._id){
            user._id=this.state.user._id
            const {username,phone,email,role_id,_id}=user
            const result=await reqUpdateUser({_id,username,phone,email,role_id})
            if(result.status===0){
                message.success("修改成功！")
                this.getUsers()
            }else{
                message.error("修改失败！")
            }
            this.setState({user:{}})
        }else{
            const result=await reqAddUser(user)
            if(result.status===0){
                message.success("添加成功")
                this.getUsers()
            }else{
                message.error("添加失败了")
            }
        }
        this.form.current.resetFields()
    }
    handleCancel=()=>{
        this.setState({showModal:false})
        this.setState({user:{}})
    }
    componentDidMount(){
        this.initColunms()
        this.getUsers()
        
    }
    render() {
        const {userList,showModal,roles,user}=this.state
        const leftInner=(
            <span>
                <Button type="primary"  onClick={()=>this.setState({showModal:true})}>添加用户</Button>
            </span>
        )
        return (
            <div>
                <Card title={leftInner}  >
                    
                    <Table 
                        bordered
                        columns={this.columns} 
                        dataSource={userList} 
                        rowKey='_id'
                        pagination={{defaultPageSize: 3}}
                    />
                    <Modal title={user._id?"修改用户":"添加用户"} visible={showModal} onOk={this.handleOk} onCancel={this.handleCancel}>
                    {/* <AddForm setForm={(formRef) => this.formRef = formRef}/> */}
                        <UserForm roles={roles} setForm={(form)=>this.form=form} user={user}/> 
                    </Modal>

                </Card>
            </div>
        )
    }
}
