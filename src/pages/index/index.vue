<template>
  <view class="page_field">
    <image
      class="image"
      mode="widthFix"
      src="https://cos20231211-1322921586.cos.ap-shanghai.myqcloud.com/volunteer_certification/TJ-VS/cover1.png"
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
      selector: ['同济大学2023年综合评价面试','同济大学2023年强基计划面试','同济大学2023校园开放日','同济大学2023届毕业典礼','第三十九届“枫林节”开幕式暨2023级研究生迎新晚会','第二十八次研究生代表大会','第十届勇往「职」前·模拟求职大赛','第十三届“同声唱响”研究生歌手大赛','“我是领学人”学习接力活动','“人民建议在校园·雏凤清声”同济大学第二届提案大赛','“春风十里 芳华如你”国际妇女节主题活动','第十六届“学术先锋”评选','第二十二届“拍同济”摄影大赛','2022年度学生科创盛典暨30U30卓越科创青年颁奖仪式', '2022秋季"小红帽"志愿服务', '2022春季疫情防控志愿服务'],
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
        case '13':
          // 疫情防控志愿服务证书
          Taro.navigateTo({
            url: "../entr_epidemic_prevention/entr_epidemic_prevention",
          });
          break;
        case '14':
          // 2022秋季小红帽志愿服务证明
          // Taro.showToast({
          // // title: "未找到相关信息,请提交志愿服务证明至tj_vs@163.com进行补录,邮件标题为'疫情服务证书补录-姓名'",
          // title: "通道尚未开启，敬请期待",
          // icon: "error",
          // duration: 3000,
          // });
          console.log(this.selector[this.selectorValue]);
          Taro.navigateTo({
            url: "../entr_homecomming_2022aut/entr_homecomming_2022aut",
          });
          break;
        case '0':
        case '1':
        case '2':
        case '3':
          console.log(this.selector[this.selectorValue]);
          Taro.navigateTo({
            url: "../entr_TJVS_2023/entr_TJVS_2023?activity_name=" + encodeURIComponent(JSON.stringify(this.selector[this.selectorValue])),
          });
          break;
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '10':
        case '11':
        case '12':
        case '13':
          // 研会各项证书
          console.log(this.selector[this.selectorValue]);
          Taro.navigateTo({
            url: "../entr_sciFestival_2022/entr_sciFestival_2022?activity_name=" + encodeURIComponent(JSON.stringify(this.selector[this.selectorValue])),
          });
          break;
      }
      this.button_loading = false;
    },
  },
};
</script>

<style scoped>
</style>
