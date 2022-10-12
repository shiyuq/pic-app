<template>
  <view>
    <uni-segmented-control
      class="header"
      :current="current"
      :values="tabs"
      styleType="text"
      @clickItem="onClickItem"
    ></uni-segmented-control>
    <view class="content">
      <view
        class="item"
        v-for="item in items"
        :key="item.id"
        @click="gotoPage('/pages/orderDetail/orderDetail', item.id)"
      >
        <view class="title">
          <view class="left">订单号：{{ item.id }}</view>
          <view class="right">{{ item.statusName }}</view>
        </view>
        <view class="pic">
          <img :src="item.avatar" alt="" />
          <view class="info">
            <view class="upper">{{ item.name }}</view>
            <view class="downer"
              ><span style="color: #fd6464">{{ item.credit }}</span>
              <span>积分</span></view
            >
          </view>
        </view>
        <view
          class="button"
          v-if="item.typeCode === '2' && item.statusCode === '1'"
        >
          <view class="btn-single" @click.stop="confirmOrder(item.id)">
            确认订单
          </view>
        </view>
      </view>
    </view>
    <view class="no-more" v-if="!hasNextPage && items.length">没有更多了~</view>
    <view class="no-more" v-else>暂无订单~</view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      current: 0,
      tabs: ["全部", "待确定", "已完成"],
      hasNextPage: false,
      items: [],
      loading: false,
    };
  },
  onLoad(option) {
    const typeMap = {
      toConfirm: 1,
      finished: 2,
    };
    if (!option.type) this.current = 0;
    if (option.type === "all") this.current = 0;
    if (typeMap[option.type]) {
      this.current = typeMap[option.type];
    } else {
      this.current = 0;
    }
  },
  async onShow() {
    this.items = [];
    this.hasNextPage = false;
    this.loading = false;
    await this.getOrderList({ start: 0, hit: 10 });
  },
  async onReachBottom() {
    if (this.hasNextPage) {
      await this.getOrderList({ start: this.items.length, hit: 10 });
    }
  },
  methods: {
    gotoPage(url, id) {
      uni.navigateTo({ url: `${url}?id=${id}` });
    },
    async onClickItem(i) {
      if (i.currentIndex !== this.current) {
        this.current = i.currentIndex;
        this.items = [];
        this.hasNextPage = false;
        await this.getOrderList({ start: 0, hit: 10 });
      }
    },
    async getOrderList({ start = 0, hit = 10 }) {
      if (this.hasNextPage === false && this.items.length !== 0) return;
      this.loading = true;
      let type = "1";
      if (this.current === 0) type = "3";
      if (this.current === 1) type = "1";
      if (this.current === 2) type = "2";
      try {
        const { data } = await apiService.getOrderList({ start, hit, type });
        this.items = [...this.items, ...data.items];
        this.hasNextPage = data.hasNextPage;
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    confirmOrder(orderId) {
      const _this = this;
      uni.showModal({
        title: "确认",
        content: "是否确认该订单",
        success: function (res) {
          if (!res.confirm) return;
          apiService.confirmOrder({ id: orderId }).then((data) => {
            if (!data) return;
            uni.showToast({
              title: "购买成功",
              duration: 2000,
            });
            setTimeout(() => {
              _this.gotoPage("/pages/orderDetail/orderDetail", orderId);
            }, 1000);
          });
        },
        fail: function () {},
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #fff;
}
.content {
  margin: 15px;
  .item {
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .title {
    padding: 20px 12px 18.5px 12px;
    display: flex;
    flex-direction: row;
    .left {
      font-size: 15px;
      font-weight: 500;
      color: #555555;
      line-height: 24px;
    }
    .right {
      font-size: 15px;
      font-weight: 500;
      color: #fa9f29;
      line-height: 24px;
      margin-left: auto;
    }
  }
  .pic {
    padding: 0 12px 16px 12px;
    display: flex;
    flex-direction: row;
    img {
      height: 74.5px;
      width: 99px;
      border-radius: 10px;
      margin-right: 19.5px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .upper {
        font-size: 15px;
        font-weight: 500;
        color: #333333;
        line-height: 24px;
      }
      .downer {
        font-size: 15px;
        font-weight: 500;
        line-height: 24px;
      }
    }
  }
  .button {
    padding: 4px 12px 18px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .btn-single {
      text-align: center;
      height: 33px;
      width: 75px;
      font-size: 13px;
      font-weight: 500;
      color: #333333;
      line-height: 33px;
      border: 1px solid #d2d2d2;
      border-radius: 16.5px;
    }
  }
}
.no-more {
  height: 20px;
  color: #cccccc;
  text-align: center;
}
</style>
