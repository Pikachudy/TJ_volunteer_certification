<template>
    <view class="page_field" style="background-color: #f2f2f2; height: 86vh">
      <canvas canvas-id="myCanvas" style="width: 100%; height: 1120rpx" />
      <!-- ?1500rpx" /> -->
      <!-- <div>1111</div> -->
      <!-- <div class="btn">
        <div class="btn-wei clear-style">
          <img src="../../../static/images/wei.png" @click="shareFriend" />
          <P>微信</P>
        </div>
        <div class="btn-save">
          <img src="../../../static/images/erweima.png" @click="clickSaveImg" />
          <P>保存</P>
        </div>
      </div> -->
      <view class="mine_button">
        <view v-if="this.certification_num != this.page_no + 1">
          <AtButton
            type="primary"
            @click="goNextCert"
            style="width: 90%; margin-top: 5%"
            >下一张证书</AtButton
          >
        </view>
        <AtButton
          type="primary"
          @click="clickSaveImg"
          style="width: 90%; margin-top: 5%"
          >保存至相册</AtButton
        >
      </view>
    </view>
    <!-- <view style="font-size: 35rpx">
      共青团同济大学
    </view> -->
  </template>
  
  <script>
  import Taro, { eventCenter, getCurrentInstance } from "@tarojs/taro";
  import { AtButton } from "taro-ui-vue3";
  // import { Canvas } from '@tarojs/components'
  export default {
    components: {
      AtButton,
    },
    data() {
      const { windowHeight, windowWidth, pixelRatio } =
        Taro.getSystemInfoSync(); /* 动态获取设备的宽和高  */
      return {
        canvasStyle: {
          /* cavnas 的宽高 */ width: windowWidth + "px",
          height: windowHeight + "px",
        },
        windowWidth,
        pixelRatio /* 屏幕缩放比 */,
        windowHeight,
        canvasWidth: 0,
        canvasHeight: 0,
        scale: 1,
        backImage: "",
        //   "https://commleague2023-1311667620.cos.ap-shanghai.myqcloud.com/volunteer_certification/sci_tech_festival_2022.jpg", //背景图
        tempFilePath: "",
        name: "用户昵称", //用户昵称
        button_loading: false,
        group_name: "",
        page_no: 0,
        activity_name: "",
        certification_info: [],
        certification_num: -1,
        certification_dict: {
          "同济大学2023年强基计划面试":
            "https://commleague2023-1311667620.cos.ap-shanghai.myqcloud.com/volunteer_certification/TJ-VS/2023%E5%BC%BA%E5%9F%BA%E8%AE%A1%E5%88%92%E5%BF%97%E6%84%BF%E8%80%85.jpg",
          "同济大学2023校园开放日":
            "https://commleague2023-1311667620.cos.ap-shanghai.myqcloud.com/volunteer_certification/TJ-VS/2023%E6%A0%A1%E5%9B%AD%E5%BC%80%E6%94%BE%E6%97%A5%E5%BF%97%E6%84%BF%E8%80%85.jpg",
          "同济大学2023届毕业典礼":
            "https://commleague2023-1311667620.cos.ap-shanghai.myqcloud.com/volunteer_certification/TJ-VS/2023%E6%AF%95%E4%B8%9A%E5%85%B8%E7%A4%BC%E5%BF%97%E6%84%BF%E6%9C%8D%E5%8A%A1.jpg",
          "同济大学2023年综合评价面试":
            "https://commleague2023-1311667620.cos.ap-shanghai.myqcloud.com/volunteer_certification/TJ-VS/2023%E7%BB%BC%E5%90%88%E8%AF%84%E4%BB%B7%E6%8B%9B%E7%94%9F%E5%BF%97%E6%84%BF%E8%80%85.jpg"
        },
      };
    },
    onLoad(query) {
      this.certification_info = JSON.parse(
        decodeURIComponent(query.volunteer_info)
      );
      this.certification_num = this.certification_info.length;
      this.activity_name = JSON.parse(decodeURIComponent(query.activity_name));
      this.backImage = this.certification_dict[this.activity_name];
      this.page_no = JSON.parse(decodeURIComponent(query.page_no));
      this.group_name = this.certification_info[this.page_no].workGroup;
      this.name = this.certification_info[this.page_no].studentName;
      this.certification_id = this.certification_info[this.page_no].volunteerId;
      this.workhour = this.certification_info[this.page_no].workHour;
      this.student_id = this.certification_info[this.page_no].studentNo;
      // console.log(this.page_no);
    },
    async onShow() {
      const context = Taro.createCanvasContext("myCanvas", this.$scope);
      const windowW = this.windowWidth;
      const windowH = this.windowHeight;
      const ratio = this.pixelRatio;
      const name = this.name;
      // const nowTime = this.year + " 年 " + this.month + " 月 " + this.day + " 日";
      const student_id = this.student_id;
      const group_name = this.group_name;
      const certification_id = this.certification_id;
      const activity_name = this.activity_name;
      const workhour = this.workhour;
      let that = this;
      Taro.downloadFile({
        url: this.backImage,
        success: function (res) {
          if (res.statusCode === 200) {
            console.log(res);
            const imgPath = res.tempFilePath;
            Taro.getImageInfo({
              src: res.tempFilePath,
              success: function (res) {
                context.drawImage(
                  imgPath,
                  0,
                  0,
                  windowW,
                  (windowW / res.width) * res.height
                ); //图片背景图
                context.setTextAlign("center");
                // context.font = "17px bold Microsoft YaiHei";
                context.font = "17px SimSun";
                context.setFontSize((33 * windowW) / 750);
                //context.setFillStyle("#928770");
                // context.fillText(name, 0.40 * windowW *(windowW)/res.width, 0.225 * windowH );
                context.fillText(
                  name,
                  0.225 * windowW,
                  0.46 * res.height * (windowW / res.width)
                );

                context.setTextAlign("center");
                // context.font = "17px bold Microsoft YaiHei";
                context.font = "17px SimSun";
                context.setFontSize((33 * windowW) / 750);
                //context.setFillStyle("#928770");
                // context.fillText(name, 0.40 * windowW *(windowW)/res.width, 0.225 * windowH );
                context.fillText(
                  student_id,
                  0.62 * windowW,
                  0.46 * res.height * (windowW / res.width)
                );
  
                context.setTextAlign("center"); //
                // context.font = "17px bold Microsoft YaiHei";
                context.font = "20px SimSun";
                context.setFontSize((33 * windowW) / 750);
                //context.setFillStyle("#928770");
                // context.fillText(name, 0.40 * windowW *(windowW)/res.width, 0.225 * windowH );
                if (
                  activity_name ==
                  "同济大学2023年强基计划面试"
                ) {
                  context.fillText(
                    workhour,
                    0.59 * windowW,
                    0.625 * res.height * (windowW / res.width)
                  );
                } else if (activity_name == "同济大学2023校园开放日") {
                  context.fillText(
                    workhour,
                    0.45 * windowW,
                    0.625 * res.height * (windowW / res.width)
                  );
                } else if (activity_name == "同济大学2023届毕业典礼") {
                  context.fillText(
                    workhour,
                    0.59 * windowW,
                    0.625 * res.height * (windowW / res.width)
                  );
                } else if (activity_name == "同济大学2023年综合评价面试") {
                  context.fillText(
                    workhour,
                    0.59 * windowW,
                    0.625 * res.height * (windowW / res.width)
                  );
                } else {
                  context.fillText(
                    workhour,
                    0.59 * windowW,
                    0.625 * res.height * (windowW / res.width)
                  );
                }
  
                // context.setTextAlign("center"); //
                // // context.font = "17px bold Microsoft YaiHei";
                // context.font = "17px SimSun";
                // context.setFontSize((33 * windowW) / 750);
                // //context.setFillStyle("#928770");
                // // context.fillText(name, 0.40 * windowW *(windowW)/res.width, 0.225 * windowH );
                // context.fillText(
                //   "证书编号：" + certification_id,
                //   0.75 * windowW,
                //   0.05 * res.height * (windowW / res.width)
                // );
  
                context.draw(
                  true,
                  () => {
                    Taro.canvasToTempFilePath({
                      canvasId: "myCanvas",
                      success: function (res) {
                        console.log(res);
                        that.tempFilePath = res.tempFilePath;
                        Taro.setStorageSync("OutputImgPath", res.tempFilePath);
                      },
                    });
                  },
                  that
                );
              },
            });
          }
        },
      });
    },
  
    methods: {
      //保存至相册imgUrl
      clickSaveImg() {
        this.button_loading = true;
        var _this = this;
        console.log(this.tempFilePath);
        this.tempFilePath = Taro.getStorageSync("OutputImgPath");
        console.log(this.tempFilePath);
        Taro.saveImageToPhotosAlbum({
          filePath: this.tempFilePath, //生成图片临时路径
          success: function () {
            Taro.showToast({
              title: "图片已保存至相册！",
              icon: "success",
              duration: 2000,
            });
          },
          fail: (error) => {
            Taro.showToast({
              title: "保存图片失败",
              icon: "error",
              duration: 2000,
            });
            if (
              error.errMsg === "saveImageToPhotosAlbum:fail:auth denied" ||
              error.errMsg === "saveImageToPhotosAlbum:fail auth deny" ||
              error.errMsg === "saveImageToPhotosAlbum:fail authorize no response"
            ) {
              // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
              Taro.showModal({
                title: "提示",
                content: "需要您授权保存相册",
                showCancel: false,
                success: (modalSuccess) => {
                  Taro.openSetting({
                    success(settingdata) {
                      console.log("settingdata", settingdata);
                      if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                        Taro.showModal({
                          title: "提示",
                          content: "获取权限成功",
                          showCancel: false,
                        });
                      } else {
                        Taro.showModal({
                          title: "提示",
                          content: "获取权限失败，将无法保存到相册哦~",
                          showCancel: false,
                        });
                      }
                    },
                  });
                },
              });
            }
          },
        });
      },
      goNextCert() {
        Taro.navigateTo({
          url:
            "../certi_sciFestival_2022/certi_sciFestival_2022?volunteer_info=" +
            encodeURIComponent(JSON.stringify(this.certification_info)) +
            "&activity_name=" +
            encodeURIComponent(JSON.stringify(this.activity_name)) +
            "&page_no=" +
            encodeURIComponent(JSON.stringify(this.page_no+1)),
        });
      },
      // shareFriend() {
      //   wx.canvasToTempFilePath({
      //     //将canvas生成图片
      //     canvasId: "myCanvas",
      //     x: 0,
      //     y: 0,
      //     width: 370,
      //     height: 472,
      //     success: function (res) {
      //       let urls = res.tempFilePath; //图片临时路径
      //       wx.showShareImageMenu({
      //         //分享给朋友
      //         path: urls,
      //         success: (res) => {
      //           console.log("分享成功：", res);
      //         },
      //         fail: (err) => {
      //           console.log("分享失败：", err);
      //           wx.showToast({
      //             title: "分享失败",
      //             duration: 2000,
      //           });
      //         },
      //       });
      //     },
      //   });
      // },
    },
  };
  </script>
  
  <style scoped></style>
  