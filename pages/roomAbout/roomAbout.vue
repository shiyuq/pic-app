<template>
  <view v-if="room">
    <view class="title">
      <img :src="room.avatar || '/static/avatar-user.png'" alt="" />
      <view class="upper">{{ room.name }}</view>
      <view class="downer">{{ room.roomCode }}</view>
    </view>
    <view class="intro">{{ room.introduction }}</view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      room: null,
    };
  },
  async onShow() {
    await this.getPicRoomDetail();
  },
  methods: {
    async getPicRoomDetail() {
      try {
        const { data } = await apiService.getPicRoomDetail();
        this.room = data;
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    margin: 20px 0 15px 0;
    width: 64px;
    height: 64px;
    border-radius: 10px;
  }
  .upper {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 11.5px;
  }
  .downer {
    font-size: 13px;
    font-weight: 500;
    color: #333333;
    margin-bottom: 30px;
  }
}
.intro {
  padding: 0 15px 60px 15px;
  background-color: #fff;
}
</style>
