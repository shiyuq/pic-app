<template>
  <view class="part" v-if="userInfo">
    <view class="line">
      <view class="left">头像</view>
      <img :src="userInfo.avatar || avatar" alt="" />
    </view>
    <view class="line">
      <view class="left">姓名</view>
      <view class="right">{{ userInfo.name }}</view>
    </view>
    <view class="line">
      <view class="left">昵称</view>
      <view class="right">{{ userInfo.nickname }}</view>
    </view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      userInfo: null,
      avatar: "/static/avatar-user.png",
    };
  },
  async onShow() {
    const { data } = await apiService.getUserInfo();
    this.userInfo = data;
  },
  methods: {},
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
  img {
    margin-left: auto;
    width: 37px;
    height: 37px;
  }
  .right {
    color: #333333;
    margin-left: auto;
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
