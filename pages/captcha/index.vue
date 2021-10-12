<template>
  <page-meta :root-font-size="$fontsize"></page-meta>
  <view class="wrapper">
    <view class="content">
      <button type="button" @click="showCaptcha">体验验证码</button>
      <div class="ticket" v-if="result.ticket">验证成功的票据为: {{ result.ticket }}</div>
      <div class="ticket" v-if="result.ticket">验证成功的randstr为: {{ result.randstr }}</div>
      <button type="button" v-if="result.ticket" @click="checkCaptcha">校验验证码是否成功</button>
    </view>
    <uni-popup ref="popup" type="center" class="popWrap">
      <div class="popbox" @click="$refs.popup.close()" :style="popStyle">
        <div>验证码结果：{{ result.ret === 0 ? '验证成功' : '用户主动关闭验证码' }}</div>
        <div v-if="result.ret === 0">验证成功的票据: {{ result.ticket }}</div>
      </div>
    </uni-popup>
    <uni-popup ref="checkPopup" type="center" class="popWrap">
      <div class="popbox" @click="$refs.popup.close()" :style="popStyle">
        <div>
          验证码校验结果：{{
            checkResult.CaptchaCode === 1 ? '验证通过' : `验证不通过，错误码：${checkResult.CaptchaCode}`
          }}
        </div>
        <div>CaptchaMsg（状态描述及验证错误信息）: {{ checkResult.CaptchaMsg }}</div>
        <div>EvilLevel（恶意等级）: {{ checkResult.EvilLevel }}</div>
        <div>GetCaptchaTime（前端获取验证码时间）: {{ checkResult.GetCaptchaTime }}</div>
      </div>
    </uni-popup>
  </view>
</template>

<script>
import { captchaCreater, describeCaptchaResult } from '@/js_sdk/tencentcloud-plugin-captcha';

export default {
  data() {
    return {
      result: {},
      checkResult: {},
      popStyle: {
        width: `${document.body.clientWidth * 0.9}px`
      }
    };
  },
  methods: {
    // 触发验证码
    async showCaptcha() {
      try {
        uni.showLoading({
          mask: true
        });
        // 创建验证码实例
        const captcha = await captchaCreater((res) => {
          this.result = res;
        });
        // 显示验证码
        captcha.show();
        uni.hideLoading();
      } catch (error) {
        throw new Error(error);
      } finally {
        console.log(this.result)
      }
    },
    // 校验验证码是否成功
    async checkCaptcha() {
      try {
        uni.showLoading({
          mask: true
        });
        // 进行验证码校验
        const captcha = await describeCaptchaResult({
          captchaType: 9,
          ticket: this.result.ticket,
          randstr: this.result.randstr
        });
        // 得到验证码校验结果
        this.checkResult = captcha.result;
        uni.hideLoading();
      } catch (error) {
        throw new Error(error);
      }
    }
  },
};
</script>

<style>
.content {
  margin: 40rpx;
}
.popbox {
  border-radius: 4rpx;
  padding: 12rpx;
  box-sizing: border-box;
  background-color: #fff;
  margin: 0 auto;
  font-size: 14px;
}
.content button {
  margin-top: 20rpx;
}
.ticket {
  word-break: break-all;
}
</style>