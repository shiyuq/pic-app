<template>
  <view class="artist-list">
    <view class="artist-single" v-for="item in artists" :key="item.id">
      <img :src="item.avatar" alt="" />
      <view class="artist-detail">
        <span style="font-size: 15px">{{ item.name }}</span>
        <span style="font-size: 12px">{{ item.type }}</span>
      </view>
      <view
        class="view-detail"
        @click="gotoPage('/pages/artist/artist', item.id)"
        >查看</view
      >
    </view>
    <view class="no-more" v-if="!hasNextPage">没有更多了~</view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      artists: [],
      hasNextPage: false,
      loading: false,
    };
  },
  async onShow() {
    this.artists = [];
    this.hasNextPage = false;
    this.loading = false;
    await this.getArtistList({ start: 0, hit: 10 });
  },
  async onReachBottom() {
    if (this.hasNextPage) {
      await this.getArtistList({ start: this.artists.length, hit: 10 });
    }
  },
  methods: {
    async getArtistList({ start = 0, hit = 10 }) {
      if (this.hasNextPage === false && this.artists.length !== 0) return;
      this.loading = true;
      try {
        const { data } = await apiService.getArtistList({ start, hit });
        this.artists = [...this.artists, ...data.items];
        this.hasNextPage = data.hasNextPage;
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    gotoPage(url, id) {
      uni.navigateTo({ url: `${url}?id=${id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.artist-list {
  margin: 15px;
  .artist-single {
    padding: 0 10px;
    background-color: #fff;
    border-radius: 5px;
    height: 73px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 9px;
    }
    .artist-detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #222222;
    }
    .view-detail {
      margin-left: auto;
      height: 29px;
      width: 62.5px;
      background-color: #e4ecf7;
      border: 1px solid #217bfb;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #217bfb;
      font-size: 13px;
    }
  }
}
.no-more {
  height: 20px;
  color: #cccccc;
  text-align: center;
}
</style>
