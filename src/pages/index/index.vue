<template>
  <view class="page_field">
    <image
      class="image"
      mode="widthFix"
      src="https://636c-cloud1-7gs40qcu242746b1-1311667620.tcb.qcloud.la/pic/outside-newest.png?sign=b2a909eb2460e12ac96d1fd0554b2d4e&t=1660973747"
    ></image>
    <view class="input_card">
      <view class="title"> 信息填写 </view>
      <AtInput
        required
        :border="false"
        title="姓名"
        type="text"
        placeholder="请输入姓名"
        v-model:value="this.name"
        :adjustPosition="true"
      />
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
import { AtInput, AtButton } from "taro-ui-vue3";
import "taro-ui-vue3/dist/style/components/input.scss";
import "taro-ui-vue3/dist/style/components/button.scss";
import Taro from "@tarojs/taro";
export default {
  components: {
    AtInput,
    AtButton,
  },
  data() {
    return {
      name: "",
      button_loading: false,
      show_toast: false,
    };
  },
  methods: {
    submit() {
      this.button_loading = true;
      Taro.cloud
        .callFunction({
          name: "getStudentInfor",
          data: {
            name: this.name,
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
              title: "未找到相关信息!",
              icon: "error",
              duration: 3000,
            });
          }
        })
        .catch((errMsg) => {
          this.button_loading = false;
          console.log(errMsg);
        });
    }
  },
};
</script>
