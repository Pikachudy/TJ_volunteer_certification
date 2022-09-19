<template>
  <view class="page_field">
    <image
      class="image"
      mode="widthFix"
      src="https://636c-cloud1-7gs40qcu242746b1-1311667620.tcb.qcloud.la/pic/home_background.jpg?sign=6c6764ab283824bfe753ff8ab55f9d79&t=1663576441"
    ></image>
    <view class="input_card">
      <view class="select_entry">
        <picker
          mode="selector"
          :range="selector"
          :value="selectorValue"
          @change="handleChange"
          @cancel="handleCancel"
        >
          <view class="demo-list-item">
            <view class="demo-list-item__label">证书选择</view>
            <view class="demo-list-item__value">
              {{ selector[selectorValue] }}
            </view>
          </view>
        </picker>
      </view>

      <view class="mine_button">
        <AtButton type="primary" @click="submit" :loading="this.button_loading"
          >提交</AtButton
        >
      </view>
    </view>
    <AtToast :isOpened="this.show_toast" :text="text" status="error"></AtToast>
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
      selector: ["疫情防控志愿服务证书", "2022秋季小红帽志愿服务证明", "巴西", "日本"],
      selectorValue: 0,
    };
  },
  methods: {
    handleChange(e) {
      this.selectorValue = e.detail.value;
    },
    submit() {
      if (this.name == "" || this.volunteer_no == "") {
        Taro.showToast({
          // title: "未找到相关信息,请提交志愿服务证明至tj_vs@163.com进行补录,邮件标题为'疫情服务证书补录-姓名'",
          title: "请将信息填写完整",
          icon: "error",
          duration: 3000,
        });
        return;
      } else {
        this.button_loading = true;
        Taro.cloud
          .callFunction({
            name: "getStudentInfor",
            data: {
              name: this.name,
              volunteer_no: this.volunteer_no,
            },
          })
          .then((res) => {
            this.button_loading = false;
            if (res.result) {
              Taro.navigateTo({
                url:
                  "../drawcertification/drawcertification?data=" +
                  encodeURIComponent(JSON.stringify(this.name)),
              });
            } else {
              Taro.showToast({
                // title: "未找到相关信息,请提交志愿服务证明至tj_vs@163.com进行补录,邮件标题为'疫情服务证书补录-姓名'",
                title: "未找到相关信息,补录方式请查看推送",
                icon: "none",
                duration: 3000,
              });
              this.name = "";
            }
          })
          .catch((errMsg) => {
            this.button_loading = false;
            console.log(errMsg);
          });
      }
    },
  },
};
</script>

<style scoped>
</style>
