<template>
  <view class="container">
    <view class="register">
      <view class="content">
        <view
          style="
            font-size: 26px;
            font-weight: 800;
            color: #222222;
            margin-bottom: 15px;
          "
        >
          <text>注册</text>
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
          <view class="vcode-gene">
            <input
              class="line-input"
              type="text"
              v-model="inputVcode"
              placeholder="请输入验证码"
            />
            <view class="canvas-img-code" @click="refresh()">
              <canvas
                :style="{ width: width + 'px', height: height + 'px' }"
                canvas-id="imgcanvas"
                @error="canvasIdErrorCallback"
              ></canvas>
            </view>
          </view>
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
            v-model="name"
            placeholder="请输入真实姓名"
          />
        </view>
        <view class="line-edit">
          <input
            class="line-input"
            type="text"
            v-model="inviteCode"
            placeholder="请输入推荐人邀请码"
          />
        </view>
        <button class="button-login" @click="register()">
          <span>立即注册</span>
        </button>
        <view class="bottom-reg" @click="gotoPage('/pages/login/index')"
          ><span>已有账号？</span
          ><span style="color: #217bfb">立即登录</span></view
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
      name: "",
      inviteCode: "",
      vcode: "",
      inputVcode: "",
      width: 120,
      height: 30,
    };
  },
  onShow() {
    if (this.vcode) return;
    const _this = this;
    setTimeout(function () {
      _this.init();
    }, 500);
  },
  methods: {
    gotoPage(url) {
      uni.navigateTo({ url });
    },
    init() {
      const context = uni.createCanvasContext("imgcanvas", this),
        w = this.width,
        h = this.height;
      context.setFillStyle("white");
      context.setLineWidth(5);
      context.fillRect(0, 0, w, h);
      const pool = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "I",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "S",
        "Y",
        "Z",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
      ];
      let str = "";
      for (let i = 0; i < 4; i++) {
        var c = pool[this.rn(0, pool.length - 1)];
        var deg = this.rn(-30, 30);
        context.setFontSize(18);
        context.setTextBaseline("top");
        context.setFillStyle(this.rc(80, 150));
        context.save();
        context.translate(30 * i + 15, parseInt(h / 1.5));
        context.rotate((deg * Math.PI) / 180);
        context.fillText(c, -15 + 5, -15);
        context.restore();
        str += c;
      }
      this.vcode = str;
      for (let i = 0; i < 40; i++) {
        context.beginPath();
        context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
        context.closePath();
        context.setFillStyle(this.rc(150, 200));
        context.fill();
      }
      context.draw();
    },
    refresh() {
      this.init();
    },
    rc(min, max) {
      var r = this.rn(min, max);
      var g = this.rn(min, max);
      var b = this.rn(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    rn(max, min) {
      return parseInt(Math.random() * (max - min)) + min;
    },
    canvasIdErrorCallback(e) {
      console.error(e.detail.errMsg);
    },
    async register() {
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
      if (!this.name) {
        uni.showToast({
          title: "请输入名字",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (!this.inviteCode) {
        uni.showToast({
          title: "请输入邀请码",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (!this.inputVcode) {
        uni.showToast({
          title: "请输入验证码",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (this.inputVcode.toUpperCase() !== this.vcode) {
        uni.showToast({
          title: "邀请码错误",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      await apiService.userRegister({
        phone: this.phone,
        password: this.password,
        name: this.name,
        inviteCode: this.inviteCode,
      });
      uni.showToast({
        title: "注册成功",
        icon: "success",
        duration: 1000,
      });
      setTimeout(() => {
        this.gotoPage("/pages/login/index");
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: linear-gradient(0deg, #217bfb 0%, #4491ff 100%);
  height: calc(100vh - 134px);
  padding: 0 15px;
  padding-top: 90px;
  .register {
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

.vcode-gene {
  display: flex;
  flex-direction: row;
  align-items: center;
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
  margin: 20px 0 33px 0;
  text-align: center;
}

.canvas-img-code {
  display: inline-block;
}
</style>
