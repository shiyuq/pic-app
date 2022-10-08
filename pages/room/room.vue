<template>
  <view>
    <view class="part1">
      <view class="header">
        <img :src="userInfo.avatar || avatar" alt="" />
      </view>
    </view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      userInfo: {},
      avatar: "/static/avatar-user.png",
    };
  },
  async onShow() {
    const { data } = await apiService.getUserInfo();
    this.userInfo = data;
  },
};
</script>

<style lang="scss" scoped>
.part1 {
  height: 174px;
  background-color: #217bfb;
  padding: 30px 15px 20px 15px;
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 44px;
      height: 44px;
    }
  }
}
</style>
