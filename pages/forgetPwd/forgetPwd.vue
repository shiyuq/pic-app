<template>
  <view>
    <view class="content">
      <view class="logo">
        <img src="/static/phone.png" alt="" srcset="" />
      </view>
      <view class="phone">
        <span class="text-first">联系管理员找回密码</span>
        <span class="text-second">186-8318-8048</span>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin: 20px 15px 0 15px;
  background-color: #e9f1f7;
  height: 82px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .logo {
    background-color: #217bfb;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 37px;
      height: 30px;
    }
  }
  .phone {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 60px;
    .text-first {
      font-size: 15px;
      color: #333333;
      font-weight: 500;
    }
    .text-second {
      font-size: 20px;
      color: #333333;
      font-weight: 800;
    }
  }
}
</style>
