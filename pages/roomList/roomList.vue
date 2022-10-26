<template>
  <view class="temp">
    <view class="main" v-for="item in items" :key="item.id">
      <view class="info">
        <view class="detail">
          <img :src="item.avatar" alt="" />
          <view class="center">
            <view class="upper">{{ item.name }}</view>
            <view class="downer">{{ item.roomCode }}</view>
          </view>
          <view class="right" @click="copy(item.roomCode)">复制</view>
        </view>
      </view>
      <view class="line123"></view>
    </view>
    <view class="no-more" v-if="!hasNextPage">没有更多了~</view>
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
    await this.getRoomList({ start: 0, hit: 10 });
  },
  async onReachBottom() {
    if (this.hasNextPage) {
      await this.getRoomList({ start: this.items.length, hit: 10 });
    }
  },
  methods: {
    async getRoomList({ start = 0, hit = 10 }) {
      if (this.hasNextPage === false && this.items.length !== 0) return;
      this.loading = true;
      try {
        const { data } = await apiService.getRoomList({ start, hit });
        this.items = [...this.items, ...data.items];
        this.hasNextPage = data.hasNextPage;
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    copy(value) {
      const aux = document.createElement("input");
      aux.setAttribute("value", value);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      uni.showToast({
        title: "已复制到剪切板",
        duration: 2000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.temp {
  margin-top: 15px;
}
.main {
  padding: 0 15px 0 15px;
  .info {
    background-color: #fff;
    padding: 10px 13px;
    border-radius: 5px;
    .detail {
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 33px;
        height: 33px;
        border-radius: 50%;
      }
      .center {
        display: flex;
        flex-direction: column;
        padding-left: 11px;
        .upper {
          font-size: 15px;
          color: #333333;
        }
        .downer {
          font-size: 10px;
          font-weight: 500;
          color: #666666;
        }
      }
      .right {
        padding-left: 25px;
        font-size: 12px;
        text-decoration: underline;
        color: #000000;
      }
    }
  }
  .line123 {
    width: 100%;
    border-bottom: 1px solid #f3f3f3;
  }
}
.no-more {
  padding-top: 20px;
  height: 20px;
  color: #cccccc;
  text-align: center;
}
</style>
