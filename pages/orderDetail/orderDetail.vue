<template>
  <view v-if="order">
    <view class="status">{{ order.statusName }}</view>
    <view class="content">
      <view class="pic">
        <img :src="order.avatar" alt="" />
        <view class="pic-name">
          <view class="upper">{{ order.name }}</view>
          <view class="downer">
            <span style="color: #fd6464; padding-right: 2px">{{
              order.credit
            }}</span>
            <span>积分</span>
          </view>
        </view>
      </view>
      <view class="line">
        <view class="left">订单编号：</view>
        <view class="right">{{ order.id }}</view>
      </view>
      <view class="line">
        <view class="left">下单时间：</view>
        <view class="right">{{ order.createdTime }}</view>
      </view>
      <view class="line">
        <view class="left">支付方式：</view>
        <view class="right">在线支付</view>
      </view>
      <view class="line" style="padding-bottom: 10px">
        <view class="left">商品总额：</view>
        <view class="right">{{ order.credit }} 积分</view>
      </view>
    </view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      orderId: "",
      order: null,
    };
  },
  onLoad(option) {
    this.orderId = option.id;
  },
  async onShow() {
    await this.getOrderDetail();
  },
  methods: {
    async getOrderDetail() {
      const { data } = await apiService.getOrderDetail({ id: this.orderId });
      this.order = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.status {
  height: 76px;
  background: linear-gradient(0deg, #217bfb 0%, #4491ff 100%);
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  padding: 18px 0 0 28px;
}
.content {
  margin: -33px 15px 0 15px;
  background-color: #fff;
  border-radius: 5px;
  padding: 18px 0 0 12px;
  .pic {
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    img {
      width: 99px;
      height: 74px;
      border-radius: 10px;
      margin-right: 20px;
    }
    .pic-name {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .upper {
        font-size: 15px;
        font-weight: 500;
        color: #333333;
      }
      .downer {
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
  .line {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 34px;
    .left {
      font-size: 13px;
      font-weight: 500;
      color: #999999;
      margin-right: 35px;
    }
    .right {
      font-size: 15px;
      font-weight: 500;
      color: #333333;
      line-height: 24px;
    }
  }
}
</style>
