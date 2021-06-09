import ajax from "./ajax";
import jsonp from 'jsonp'
import { message} from "antd";
export const reqLogin =(username,password)=>ajax('/login',{username,password},"POST")
export const reAddUser=(user)=>ajax('/manage/user/add',user,'POST')

// 获取一级或二级分类列表
export const reqCategory=(parentId)=>ajax('/manage/category/list',{parentId})
//根据id获取分类
export const reqCategoryName=(categoryId )=>ajax('/manage/category/info',{categoryId })
// 更新品类名称
export const reqUpdateCategory = ({categoryId, categoryName}) =>
    ajax('/manage/category/update', {
    categoryId,
    categoryName
}, 'POST')
// 添加分类
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add',
    {
    parentId,
    categoryName
}, 'POST')

// 请求商品数据
export const  reqGetGoods=(pageNum,pageSize )=>ajax('/manage/product/list',{pageNum,pageSize})
//根据ID/Name搜索产品分页列表
export const  reqSearchGoods=({pageNum,pageSize,searchType ,searchName})=>ajax('/manage/product/search',
{
    pageNum,
    pageSize,
    [searchType]: searchName
})
//添加商品
export const  reqAddGoods=(good)=>ajax('/manage/product/add',good,'POST')
//更新商品
export const  reqUpdateGoods=(good)=>ajax('/manage/product/update',good,'POST')
// 对商品进行上下架处理
export const  reqStatusGoods=(productId ,status )=>ajax('/manage/product/updateStatus',{productId,status},'POST')

//获取角色列表
export const reqActor=()=>ajax('/manage/role/list')
// 添加角色信息
export const reqAddActor=(actorName)=>ajax('/manage/role/add',{roleName:actorName},'POST')
//设置权限
export const reqUpActor=(newActor)=>ajax('/manage/role/update',newActor,'POST')
//获取用户列表
export const reqGetUsers=()=>ajax('/manage/user/list')
// 添加用户
export const reqAddUser=(user)=>ajax('/manage/user/add',user,"POST")
// 修改用户
export const reqUpdateUser=({_id,username,phone,email,role_id})=>ajax('/manage/user/update',{_id,username,phone,email,role_id},"POST")
//删除用户
export const reqDeleteUser=(userId)=>ajax('/manage/user/delete',{userId },"POST")
//删除图片
export const reDeleteImage=(name)=>ajax("/manage/img/delete",{name},'POST')

// jsonp方式请求天气数据
// https://v0.yiketianqi.com/api?version=v61&appid=85277763&appsecret=k9hwtwSp&city=%E6%B8%A9%E5%B7%9E
export function reqWeather(city) { 
    const url=`https://v0.yiketianqi.com/api?version=v61&appid=85277763&appsecret=k9hwtwSp&city=${city}`
    return new Promise((resolve,reject)=>{
        jsonp(url,{
            param:'callback'
        },(error,response)=>{
            if(!error&&response.cityid){
                const {wea_img,wea}=response
                resolve({wea_img,wea})
            }else{
                message.error("天气请求失败")
            }
        })
    })
 }