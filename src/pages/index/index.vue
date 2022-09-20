<template>
  <view class="page_field">
    <image
      class="image"
      mode="widthFix"
      src="https://636c-cloud1-7gs40qcu242746b1-1311667620.tcb.qcloud.la/pic/home_background.png?sign=cc7d0ba273b8f850757823b4bedfc654&t=1663681881"
    ></image>
    <view class="input_card">
      <view class="select_entry">
        <picker
          mode="selector"
          :range="selector"
          :value="selectorValue"
          @change="handleChange"
        >
          <view class="demo-list-item">
            <view class="demo-list-item__label">证书选择</view>
            <view class="demo-list-item__value__grey" v-if="this.selectorValue == '-1'">
              点击此处选择活动
            </view>
            <view class="demo-list-item__value" v-else>
              {{ selector[selectorValue] }}
            </view>
          </view>
        </picker>
      </view>

      <view class="mine_button">
        <AtButton type="primary" @click="submit" :loading="this.button_loading" style="background-color:#cc1318; border-color:  #cc1318;"
          >确认</AtButton
        >
      </view>
    </view>
  </view>
</template>

<script>
import "./index.css";
import { AtButton } from "taro-ui-vue3";
import "taro-ui-vue3/dist/style/components/input.scss";
import "taro-ui-vue3/dist/style/components/button.scss";
import Taro from "@tarojs/taro";
export default {
  components: {
    AtButton,
  },
  data() {
    return {
      name: "",
      volunteer_no: "",
      button_loading: false,
      show_toast: false,
      selector: ['2022春季疫情防控志愿服务', '2022秋季"小红帽"志愿服务'],
      selectorValue: '-1',
    };
  },
  methods: {
    handleChange(e) {
      this.selectorValue = e.detail.value.toString();
    },


    submit() {
      this.button_loading = true;
      console.log(this.selectorValue);
      switch (this.selectorValue){
        case '0':
          // 疫情防控志愿服务证书
          Taro.navigateTo({
            url: "../entr_epidemic_prevention/entr_epidemic_prevention",
          });
          break;
        case '1':
          // 2022秋季小红帽志愿服务证明
          Taro.showToast({
          // title: "未找到相关信息,请提交志愿服务证明至tj_vs@163.com进行补录,邮件标题为'疫情服务证书补录-姓名'",
          title: "通道尚未开启，敬请期待",
          icon: "error",
          duration: 3000,
          });
          // Taro.navigateTo({
          //   url: "../entr_homecomming_2022aut/entr_homecomming_2022aut",
          // });
          break;
      }
      this.button_loading = false;
    },
  },
};
</script>

<style scoped>
</style>
