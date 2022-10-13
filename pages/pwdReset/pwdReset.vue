<template>
  <view class="part">
    <view class="line">
      <view class="left">原密码</view>
      <view class="right">
        <input type="password" placeholder="请输入原密码" v-model="oldPwd" />
      </view>
    </view>
    <view class="line">
      <view class="left">新密码</view>
      <view class="right">
        <input type="password" placeholder="请输入新密码" v-model="newPwd" />
      </view>
    </view>
    <view class="line">
      <view class="left">确认密码</view>
      <view class="right">
        <input
          type="password"
          placeholder="请确认新密码"
          v-model="newPwdAgain"
        />
      </view>
    </view>
    <view class="button" @click="resetPwd()">确认修改</view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      oldPwd: "",
      newPwd: "",
      newPwdAgain: "",
    };
  },
  methods: {
    async resetPwd() {
      if (!this.oldPwd) {
        uni.showToast({
          title: "请填写原密码",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (!this.newPwd) {
        uni.showToast({
          title: "请填写新密码",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (!this.newPwdAgain) {
        uni.showToast({
          title: "请填写新密码",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (this.newPwd !== this.newPwdAgain) {
        uni.showToast({
          title: "两次密码不一致",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      await apiService.resetPwd({ oldPwd: this.oldPwd, newPwd: this.newPwd });
      uni.showToast({
        title: "密码重置成功",
        icon: "success",
        duration: 2000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.part {
  padding-top: 10px;
}
.line {
  height: 44px;
  background-color: #fff;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1px;
  .left {
    font-size: 15px;
    font-weight: 500;
    color: #333333;
    width: 30%;
  }
  .right {
    font-size: 15px;
    font-weight: 500;
  }
}
.button {
  margin: 10px;
  background-color: #217bfb;
  border-radius: 44px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: #fff;
}
</style>
