<template>
  <view class="temp">
    <view class="user-info" v-if="userInfo">
      <view class="upper">
        <view class="china">推广积分</view>
        <view class="number">{{ userInfo.promoCreditCount }}</view>
      </view>
      <view class="downer">
        <view class="left">
          <view class="number">{{ userInfo.fanCount }}</view>
          <view class="china">我的粉丝</view>
        </view>
        <view class="right">
          <view class="number">{{ userInfo.promoOrderCount }}</view>
          <view class="china">推广订单</view>
        </view>
      </view>
    </view>
    <view style="color: #333333; font-size: 18px; margin: 12px 15px"
      >佣金明细</view
    >
    <view class="info1">
      <view class="left">好友</view>
      <view class="right">佣金</view>
    </view>
    <view class="main" v-for="item in items" :key="item.id">
      <view class="info">
        <view class="left">{{ item.nickname }}</view>
        <view class="right">{{ item.credit }}</view>
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
      userInfo: null,
    };
  },
  async onShow() {
    this.items = [];
    this.hasNextPage = false;
    this.loading = false;
    const [{ data }] = await Promise.all([
      apiService.getUserInfo(),
      this.getRoomList({ start: 0, hit: 10 }),
    ]);
    this.userInfo = data;
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
        const { data } = await apiService.getUpperList({ start, hit });
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
.user-info {
  margin: 0 15px;
  background: linear-gradient(-55deg, #217bfb 0%, #4491ff 100%);
  border-radius: 5px;
  padding: 22px 0;
  color: #ffffff;
  .upper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .downer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  .china {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .number {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 8px;
  }
}
.info1 {
  border-radius: 5px;
  margin: 0 15px;
  background-color: #fff;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .left {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
  }
  .right {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
  }
}
.main {
  padding: 0 15px 0 15px;
  .info {
    background-color: #fff;
    padding: 10px 13px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .left {
      font-size: 15px;
      font-weight: 500;
      color: #333333;
      text-align: center;
    }
    .right {
      font-size: 15px;
      font-weight: 500;
      color: #333333;
      text-align: center;
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
