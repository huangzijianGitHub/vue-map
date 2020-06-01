/**
 * Created by ASUS on 2019-10-12.
 */
 import Mock from 'mockjs'

 export default {
   listData: confit => {
     // confit中存放的是{url: "/list/index", type: "GET", body: null}
     // body是传过来的值
     console.log(confit)
     return Mock.mock({
       'list|5':[{
         'title':'@ctitle(5,20)'
       }]
     })
   }
 }
