<template>
  <view v-if="artist">
    <view class="part1">
      <view class="artist-detail">
        <span style="color: #000000; font-size: 22px; font-weight: 800">{{
          artist.name
        }}</span>
        <span style="color: #666666; font-size: 16px; font-weight: 500">{{
          artist.type
        }}</span>
      </view>
      <img :src="artist.avatar" alt="" />
    </view>
    <view class="part2">
      <view class="part2-detail">画家详情</view>
      <view class="part2-desc">{{ artist.introduction }}</view>
    </view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      id: "",
      artist: null,
    };
  },
  onLoad(option) {
    this.id = option.id;
  },
  async onShow() {
    await this.getArtistDetail();
  },
  methods: {
    async getArtistDetail() {
      try {
        const { data } = await apiService.getArtistDetail({ id: this.id });
        this.artist = data;
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
.part1 {
  background-color: #fff;
  padding: 17.5px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  .artist-detail {
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  img {
    margin-left: auto;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}
.part2 {
  background-color: #fff;
  padding: 28px 15px;
  .part2-detail {
    font-size: 18px;
    font-weight: 500;
    color: #000000;
    margin-bottom: 18px;
  }
  .part2-desc {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
  }
}
</style>
