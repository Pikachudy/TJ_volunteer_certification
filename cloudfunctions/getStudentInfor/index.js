// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"cloud1-7gs40qcu242746b1"
})

// 云函数入口函数
const db = cloud.database({env: "cloud1-7gs40qcu242746b1"})
exports.main = async (event, context) => {
  try{
    if(event.dbname == 'epidemic22spring'){
      return await db.collection('volunteer_info_epidemic22spring').where({
        name:event.name,
        volunteer_no:event.volunteer_no
      }).get().then(res=>{
        if(res.data.length > 0){
              return true
        }
        else{
          return false
        }
      })
    }
    else if (event.dbname == 'redhat22fall'){
      return await db.collection('volunteer_info_redhat22fall').where({
        name:event.name,
        student_id:parseInt(event.student_id)
      }).get().then(res=>{
        if(res.data.length > 0){
              return true
        }
        else{
          return false
        }
      })

    }
    
    // }).get({
    //   success:function(){
    //     return
    //   },
    //   fail:function(){
    //     console.log("false")
    //     return false
    //   }
    // });
  }catch (e) {
    console.error(e);
  }
}