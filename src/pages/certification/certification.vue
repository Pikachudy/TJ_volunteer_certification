<template>
   <view class="page_field">
    <image
      class="image"
      mode="widthFix"
      src="https://636c-cloud1-7gs40qcu242746b1-1311667620.tcb.qcloud.la/pic/inside.png?sign=14351dbfba2052c3296819adedbd28ca&t=1660655836"
    ></image>
    <text class="name">
      {{ name }}
    </text>
    <text class="month">
      {{ month }}
    </text>
    <text class="day">
      {{day}}
    </text>
    <view class="opration_card">
      
    </view>
  </view>
</template>

<script>
import '../certification/certification.css'
export default {
    data(){
        return{
            name:"",
            month:"",
            day:""
        }
    },
    onLoad(query){
       this.name=JSON.parse(decodeURIComponent(query.data));
       var cur_date = new Date();
       this.month = cur_date.getMonth() + 1;// 0 - 11
       this.day = cur_date.getDate();
    }
}
</script>
