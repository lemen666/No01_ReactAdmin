// 详情页
import React, { Component } from 'react'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../components/linkButton/LinkButton'
import { Card , List,} from 'antd'
import './detail.less'
import { reqCategoryName } from '../../api'
export default class Dtails extends Component { 
    state={
        cname1:'',
        cname2:'',
    }
    constructor(props){
        super(props)
          this.details=this.props.location.state
          console.log(this.details)
          
    }
    getCateGoryName=async ()=>{
        const {categoryId, pCategoryId} = this.props.location.state
        if(pCategoryId==="0"){//所属一级分类
            
            const result=await reqCategoryName(categoryId)
            
            if(result.status===0){
               this.setState({cname1:result.data.name})
            }
        }else{
            
            const results=await Promise.all([reqCategoryName(pCategoryId),reqCategoryName(categoryId)])
            const result1=results[0]
            const result2=results[1]
       
            this.setState({
                cname1:result1.data.name,
                cname2:result2.data.name,
            })
        }
    }
    componentDidMount(){
        this.getCateGoryName()
    }
    render() {
        const {name,price,desc,imgs,detail}=this.details
        console.log(imgs,"imgs")
        const {cname1,cname2}=this.state
        return (
            <div>
               <Card title={<span><LinkButton onClick={() => this.props.history.goBack()}><ArrowLeftOutlined /></LinkButton><span>商品详情</span></span>}>
               <List>
                    <List.Item className="item">
                    <span className='left'>商品名称:<span>{name}</span></span>
                    
                    </List.Item>
                    <List.Item>
                    <span className='left'>商品描述:<span>{desc}</span></span>
                    
                    </List.Item>
                    <List.Item>
                    <span className='left'>商品价格:<span>{price + '元'}</span></span>
                    
                    </List.Item>
                    <List.Item>
                    <span className='left'>所属分类:<span>{cname1 + (cname2 ? ' --> ' + cname2 : '')}</span></span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>商品图片:
                        <span>
                            {
                            
                            imgs.map(img => {console.log(img.url);return(
                            <img src={img.url} alt="img" key={img.url} style={{width:"200px"}}/>
                            )})
                            }
                        </span>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>商品详情:
                            <div dangerouslySetInnerHTML={{__html: detail}}></div>
                        </span>
                        
                    </List.Item>
                </List>
                </Card>  
            </div>
        )
    }
}
