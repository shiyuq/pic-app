<template>
  <view>
    <view class="goods">
      <view
        class="goods-single"
        v-for="item in items"
        :key="item.id"
        @click="gotoPage('/pages/picDetail/picDetail', item.id)"
      >
        <img :src="item.avatar" alt="" />
        <view class="name">{{ item.name }}</view>
        <view class="credit">{{ item.realCredit }} 积分</view>
      </view>
      <view class="no-more" v-if="!hasNextPage">没有更多了~</view>
    </view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      items: [],
      hasNextPage: false,
      loading: false,
    };
  },
  async onShow() {
    this.items = [];
    this.hasNextPage = false;
    this.loading = false;
    await this.getGoodsList({ start: 0, hit: 10 });
  },
  async onReachBottom() {
    await this.getGoodsList({ start: this.items.length, hit: 10 });
  },
  methods: {
    async getGoodsList({ start = 0, hit = 10 }) {
      if (this.hasNextPage === false && this.items.length !== 0) return;
      this.loading = true;
      try {
        const { data } = await apiService.getGoodsList({ start, hit });
        this.items = [...this.items, ...data.items];
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
.goods {
  margin: 15px 7.5px 15px 7.5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .goods-single {
    margin: 7px 7.5px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      border-radius: 5px 5px 0 0;
      width: 165px;
      height: 124px;
    }
    .name {
      font-size: 16px;
      font-weight: 500;
      color: #030303;
      margin: 13.5px 0 9.5px 0;
    }
    .credit {
      font-size: 15px;
      font-weight: 500;
      color: #217bfb;
      margin-bottom: 14.5px;
    }
  }
}
.no-more {
  height: 20px;
  color: #cccccc;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>
