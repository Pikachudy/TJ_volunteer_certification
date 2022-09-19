<template>
  <view class="page_field">
    <image
      class="image"
      mode="widthFix"
      src="https://636c-cloud1-7gs40qcu242746b1-1311667620.tcb.qcloud.la/pic/background.png?sign=c910aaf9fdf80d391c55d4b2f8de40d8&t=1660639375"
    ></image>
    <text class="slogan_title">
      {{ slogan_title }}
    </text>
    <text class="slogan_text">
      {{ slogan_descrip }}
    </text>
    <view class="input_card">
      <view class="title">
        信息填写
      </view>
      <AtInput
        required
        :border="false"
        title="姓名"
        type="text"
        placeholder="请输入姓名"
        :value="name"
        :adjustPosition="true"
        cursorSpacing="1000"
      />
      <AtInput
        required
        :border="false"
        title="志愿者编号"
        type="text"
        placeholder="请输入您的志愿者编号（志愿汇中可查）"
        :value="volunteer_no"
        :adjustPosition="true"
        cursorSpacing="1000"
      />
      <!-- <input value="{{value}}" bindinput="bindinput" confirm-type="send" adjust-position="{{inputUp}}" bindfocus="inputFocus" bindblur="inputBlur"/> -->
      <!-- <input type="text" placeholder="将会获取焦点" :focus="true" adjustPosition="true"/> -->
      <view class="mine_button">
        <AtButton type='primary'>提交</AtButton>
      </view>
    </view>
  </view>
</template>

<script>
import "./backupquestionaire.css";
import { AtInput, AtButton } from "taro-ui-vue3";
import "taro-ui-vue3/dist/style/components/input.scss";
import "taro-ui-vue3/dist/style/components/button.scss";
export default {
  components: {
    // AtInput,
    AtButton
  },
  data() {
    return {
      slogan_title: "同济大学防疫志愿者证书",
      slogan_descrip: "快来领取你的专属志愿纪念证书！",
      name:""
    };
  },
  methods:{
    inputFocus(e) {
    console.log(e,'键盘弹起')
    var inputHeight = 0
    if (e.detail.height) {
      inputHeight = e.detail.height
    }
  },
  inputBlur() {
    console.log('键盘收起')
  },

  }
};
</script>
