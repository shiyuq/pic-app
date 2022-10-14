<template>
  <view class="artist-list">
    <view
      class="artist-single"
      v-for="item in messages"
      :key="item.id"
      @click="readMessage(item)"
    >
      <span class="dot" v-if="!item.isRead"></span>
      <view class="part1">
        <img src="/static/message/message.png" alt="" />
        <view class="left">{{
          item.typeCode === "2" ? "秒杀通知" : "发布提醒"
        }}</view>
        <view class="right">{{ item.createdTime }}</view>
      </view>
      <view class="part2" v-if="item.typeCode === '2'">
        您好，您预约的《{{ item.name }}》即将开始秒杀，请提前做好准备哦！
      </view>
      <view class="part2" v-else>
        您好，您购买的《{{ item.name }}》尚未发布，请尽快编辑提交审核！
      </view>
      <view class="line"></view>
      <view class="detail">
        <view class="left">查看详情</view>
        <view class="right">></view>
      </view>
    </view>
    <view class="no-more" v-if="!hasNextPage && messages.length"
      >没有更多了~</view
    >
    <view class="no-more" v-else>暂无消息~</view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      messages: [],
      hasNextPage: false,
      loading: false,
    };
  },
  async onShow() {
    this.messages = [];
    this.hasNextPage = false;
    this.loading = false;
    await this.getMessageList({ start: 0, hit: 10 });
  },
  async onReachBottom() {
    if (this.hasNextPage) {
      await this.getMessageList({ start: this.artists.length, hit: 10 });
    }
  },
  methods: {
    async getMessageList({ start = 0, hit = 10 }) {
      if (this.hasNextPage === false && this.messages.length !== 0) return;
      this.loading = true;
      try {
        const { data } = await apiService.getMessageList({ start, hit });
        this.messages = [...this.messages, ...data.items];
        this.hasNextPage = data.hasNextPage;
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    gotoPage(url, id) {
      if (id) {
        uni.navigateTo({ url: `${url}?id=${id}` });
      } else {
        uni.navigateTo({ url });
      }
    },
    async readMessage(item) {
      if (!item.isRead) {
        await apiService.readMessage({ id: item.id });
      }
      if (item.typeCode === "2") {
        this.gotoPage("/pages/picDetail/picDetail", item.picId);
      } else {
        this.gotoPage("/pages/picManage/picManage");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.artist-list {
  margin: 15px;
  .artist-single {
    padding: 0 14px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    position: relative;
    .dot {
      position: absolute;
      left: 35px;
      top: 17px;
      background-color: #f63838;
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    .part1 {
      padding: 15px 0 18.5px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 27px;
        height: 27px;
        border-radius: 50%;
        margin-right: 9px;
      }
      .left {
        font-size: 18px;
        font-weight: 500;
        color: #000000;
      }
      .right {
        margin-left: auto;
      }
    }
    .part2 {
      font-size: 14px;
      font-weight: 500;
      color: #666666;
      line-height: 21px;
      padding-bottom: 17.5px;
    }
    .line {
      border-bottom: 1px solid #f8f8f8;
    }
    .detail {
      padding: 15.5px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      .left {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
      }
      .right {
        margin-left: auto;
        color: #999999;
      }
    }
  }
}
.no-more {
  height: 20px;
  color: #cccccc;
  text-align: center;
}
</style>
