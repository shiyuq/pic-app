<template>
  <view class="container">
    <view class="login">
      <view class="content">
        <view
          style="
            font-size: 26px;
            font-weight: 800;
            color: #222222;
            margin-bottom: 15px;
          "
        >
          <text>登录</text>
        </view>
        <view class="line-edit">
          <input
            class="line-input"
            type="phone"
            v-model="phone"
            placeholder="请输入手机号"
          />
        </view>
        <view class="line-edit">
          <input
            class="line-input"
            type="password"
            v-model="password"
            placeholder="请输入密码"
          />
        </view>
        <view class="line-edit">
          <input
            class="line-input"
            type="text"
            v-model="roomNo"
            placeholder="请输入画室号"
          />
        </view>
        <button class="button-login" @click="login">
          <span>立即登录</span>
        </button>
        <span
          style="text-align: right; color: #333333"
          @click="gotoPage('/pages/forgetPwd/forgetPwd')"
          >忘记密码？</span
        >
        <view class="bottom-reg" @click="gotoPage('/pages/register/register')"
          ><span>还没有账号？</span
          ><span style="color: #217bfb">马上注册</span></view
        >
      </view>
    </view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      phone: "",
      password: "",
      roomNo: "",
    };
  },
  methods: {
    gotoPage(url) {
      uni.navigateTo({ url });
    },
    navigatorToTab(url) {
      uni.switchTab({
        url: url,
      });
    },
    async login() {
      if (!this.phone) {
        uni.showToast({
          title: "请输入手机号",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (!this.password) {
        uni.showToast({
          title: "请输入密码",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (!this.roomNo) {
        uni.showToast({
          title: "请输入画室号",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      const result = await apiService.login({
        phone: this.phone,
        password: this.password,
        roomCode: this.roomNo,
      });
      uni.setStorageSync("token", result.data && result.data.token);
      const userInfo = await apiService.getUserInfo();
      uni.setStorageSync("userInfo", JSON.stringify(userInfo && userInfo.data));
      uni.showToast({
        title: "登录成功",
        icon: "success",
        duration: 1000,
      });
      setTimeout(() => {
        this.navigatorToTab("/pages/home/home");
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: linear-gradient(0deg, #217bfb 0%, #4491ff 100%);
  height: 100vh;
  padding: 0 15px;
  padding-top: 90px;
  .login {
    height: 427px;
    background-color: #fff;
    border-radius: 19px;
    padding: 24px 30px;
    .content {
      display: flex;
      flex-direction: column;
    }
  }
}

.line-edit {
  height: 50px;
  padding-bottom: 2px;
  border-bottom: 1px solid #efefef;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .line-input {
    .uni-input-placeholder {
      color: #cccccc;
    }
  }
}

.button-login {
  margin: 21px 0 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(86deg, #4391ff 0%, #217bfb 100%);
  height: 44px;
  border-radius: 22px;
  span {
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
  }
}

.bottom-reg {
  margin: 105px 0 33px 0;
  text-align: center;
}
</style>
