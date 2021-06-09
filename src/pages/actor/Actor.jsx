import React, { Component } from 'react'
import { Card ,Button,Table,Modal, message} from 'antd';
import { reqActor, reqAddActor, reqUpActor } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import { formateDate } from '../../utils/dateTimeUtils';

import AddForm from './AddForm';
import ActorForm from './ActorForm';
export default class Actor extends Component {
    state={
        actorList:[],
        actor:{},
        addShow:false,
        upShow:false,
    }
    constructor(props){
        super(props)
        this.upRef=React.createRef();
    }
    initColumns=()=>{
        this.columns=[
            {
                title: '角色名称',
                dataIndex: 'name', 
              },
              {
                title: '创建时间',
                dataIndex: 'create_time',
                render:formateDate
              },
              {
                title: '授权时间',
                dataIndex: 'auth_time',
                render:formateDate
                
              },
              {
                title: '授权人',
                dataIndex: 'auth_name',
                
              },
        ]
    }
    getActors= async ()=>{
        const result=await reqActor()
        if(result.status===0){
            const actorList=result.data
            this.setState({actorList})
            // console.log(this.state.actorList)
        }
    }
    onRow=(record)=>{
        return {
            onClick: event => {
                this.setState({
                    actor:record
                })
            }, // 点击行
          };
    }
    handleOk=()=>{
        
        // console.log(this.formRef.current)
        this.formRef.current.validateFields().then(async values=>{
            const name=values.name
            const result=await reqAddActor(name)
            if(result.status===0){
                message.success("添加成功")
                this.getActors()
                this.formRef.current.resetFields() 
            }else{
                message.error("添加失败")
            }
            this.setState({addShow:false})
        }).catch(err=>{
        })
        // this.formRef.current.validateFields(async (erro,values)=>{
        //     const name=values.name
        //     if(erro){
        //         message.error("不能为空")
        //     }else{
        //         const result=await reqAddActor(name)
        //         if(result.status===0){
        //             message.success("添加成功")
        //             this.getActors()
        //         }else{
        //             message.error("添加失败")
        //         }
        //     }
        // })
    }
    handleCancel=()=>{
        this.setState({addShow:false})
        this.formRef.current.resetFields()
    }
    handleOkUp=async ()=>{
        
        // console.log(this.upRef.current.getMenus())
        const newActor=this.state.actor
        newActor.menus=this.upRef.current.getMenus()
        newActor.auth_name =memoryUtils.user.username
        const result=await reqUpActor(newActor)
        if(result.status===0){
            if(this.state.actor._id===memoryUtils.user.role_id){
                memoryUtils.user={}
                this.props.history.replace('/login')
                message.warn("本用户权限已被修改，请重新登录")
                
            }else{
                message.success("设置权限成功！")
                this.getActors()
                this.setState({upShow:false})
            }
            
        }else{
            message.error("设置权限失败")
            this.setState({upShow:false})
        }
    }
    handleCancelUp=()=>{
        this.setState({upShow:false})
    }
    componentDidMount(){
        this.getActors()
        this.initColumns()
    }
    render() {
        const {actorList,actor,addShow,upShow}=this.state
        const {columns}=this
        const isDisabled=!(actor._id?true:false)
        const leftInner=(
            <span>
                <Button type="primary" style={{marginRight:"10px"}} onClick={()=>this.setState({addShow:true})}>创建角色</Button>
                <Button type="primary" disabled={isDisabled} onClick={()=>this.setState({upShow:true})}>设置角色权限</Button> 
            </span>
        )
        return (
            <div>
                <Card title={leftInner}  >
                    <Table 
                        bordered
                        columns={columns} 
                        dataSource={actorList} 
                        rowKey='_id'
                        rowSelection={{
                            type:"radio",
                            selectedRowKeys:[actor._id],
                            onSelect:(record)=>{
                                this.setState({actor:record})
                            }

                        }}
                        onRow={this.onRow}
                        pagination={{defaultPageSize: 3}}
                    />

                    <Modal title="添加角色" visible={addShow} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <AddForm setForm={(formRef) => this.formRef = formRef}/>
                    </Modal>
                    <Modal title="设置权限" visible={upShow} onOk={this.handleOkUp} onCancel={this.handleCancelUp}>
                    <ActorForm setForm={(formRef) => this.formRef = formRef} actor={actor} ref={this.upRef}/>
                    </Modal>
                </Card>
            </div>
        )
    }
}
