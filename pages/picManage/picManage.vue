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
          <view class="left">作品状态：</view>
          <view class="right">{{ item.statusName }}</view>
        </view>
        <view class="pic">
          <img :src="item.avatar" alt="" />
          <view class="info">
            <view class="upper">{{ item.name }}</view>
            <view class="downer">{{ item.credit }} 积分</view>
          </view>
        </view>
        <view class="button" v-if="item.statusCode === '1'">
          <view class="btn-single" @click.stop="editGoods(item.id)">
            编辑作品
          </view>
          <view
            class="btn-single btn-single-blue"
            @click.stop="submitGoods(item.id)"
          >
            提交审核
          </view>
        </view>
      </view>
    </view>
    <view class="no-more" v-if="!hasNextPage && items.length">没有更多了~</view>
    <view class="no-more" v-else>暂无作品~</view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      current: 0,
      tabs: ["所有商品", "已上架", "未上架"],
      hasNextPage: false,
      items: [],
      loading: false,
    };
  },
  onLoad(option) {
    const typeMap = {
      all: 1,
      onSell: 2,
      offSell: 3,
    };
    if (!option.type) this.current = 0;
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
    await this.getCount();
    await this.getMyPicList({ start: 0, hit: 10 });
  },
  async onReachBottom() {
    if (this.hasNextPage) {
      await this.getMyPicList({ start: this.items.length, hit: 10 });
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
        await this.getMyPicList({ start: 0, hit: 10 });
      }
    },
    async getCount() {
      const [first, second, third] = await Promise.all([
        apiService.getMyPicList({ start: 0, hit: 1, type: "1" }),
        apiService.getMyPicList({ start: 0, hit: 1, type: "2" }),
        apiService.getMyPicList({ start: 0, hit: 1, type: "3" }),
      ]);
      const counts = [first.data.total, second.data.total, third.data.total];
      this.tabs = this.tabs.map((tab, index) => `${tab}(${counts[index]})`);
    },
    async getMyPicList({ start = 0, hit = 10 }) {
      if (this.hasNextPage === false && this.items.length !== 0) return;
      this.loading = true;
      let type = "1";
      if (this.current === 0) type = "1";
      if (this.current === 1) type = "2";
      if (this.current === 2) type = "3";
      try {
        const { data } = await apiService.getMyPicList({ start, hit, type });
        this.items = [...this.items, ...data.items];
        this.hasNextPage = data.hasNextPage;
      } catch (error) {
      } finally {
        this.loading = false;
      }
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
        color: #999999;
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
      margin-left: 7.5px;
    }
    .btn-single-blue {
      color: #217bfb;
      border: 1px solid #217bfb;
    }
  }
}
.no-more {
  height: 20px;
  color: #cccccc;
  text-align: center;
}
</style>
