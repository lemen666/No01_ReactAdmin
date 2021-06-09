import React, { Component } from 'react'
import { Form,Input,Tree } from 'antd'
import PropTypes from 'prop-types'
import menuList from '../../config/menuList.js'
export default class ActorForm extends Component {
    
    static propTypes ={
        setForm:PropTypes.func.isRequired,
        actor: PropTypes.object
    }
    state={
        roleList:this.props.actor.menus,
    }
    constructor(props){
        super(props)
        this.formRef=React.createRef();
        
    }
    getMenus = () => this.state.roleList
    onCheck=(checkedKeys)=>{
        // console.log('onCheck', checkedKeys);
        this.setState({ roleList:checkedKeys });
    }
    componentDidMount(){
        this.props.setForm(this.formRef)
    }
    componentWillReceiveProps (nextProps) {
        // console.log('componentWillReceiveProps()', nextProps)
        const menus = nextProps.actor.menus
        this.setState({
            roleList: menus
        })
        // this.state.checkedKeys = menus
        }
    render() {
        const {roleList}=this.state
        if(roleList.indexOf("all")===0){
            // console.log("有all")
            roleList.splice(roleList.indexOf("all"),1)
        }
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
          };
          console.log(roleList,'rolelist')
        return (
            <div>
                <Form
                    {...layout}
                    name="basic"
                    ref={this.formRef}
                    >
                    <Form.Item
                        label="角色名称"
                        name="name"  
                    >
                        <Input  disabled placeholder={this.props.actor.name}/>
                    </Form.Item>
                </Form>
                <Tree
                    checkable
                    treeData={menuList}
                    defaultExpandAll={true}
                    checkedKeys={roleList}
                    onCheck={this.onCheck}
                >
                </Tree>
            </div>
            
            
        )
    }
}
