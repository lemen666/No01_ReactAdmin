import ajax from "./ajax";

export const reqLogin =(username,password)=>ajax('/login',{username,password},"POST")
export const reAddUser=(user)=>ajax('/manage/user/add',user,'POST')