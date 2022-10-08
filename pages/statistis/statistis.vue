<template>
  <view>
    <view class="part1">
      <view class="part1-1">
        <view class="user-info">
          <img :src="userInfo.avatar || avatar" alt="" />
          <view class="user-detail">
            <span style="font-weight: bold; font-size: 16px">{{
              userInfo.nickname
            }}</span>
            <span style="font-weight: 500; font-size: 13px"
              >推荐人：{{ userInfo.upperName }}</span
            >
          </view>
          <view class="button">普通会员</view>
        </view>
        <view class="invite-code">
          <img src="/static/data/code.png" alt="" />
          <span style="font-size: 15px; color: #666666; margin-left: 11px"
            >我的邀请码：</span
          ><span style="font-size: 15px; color: #666666; font-weight: bold">{{
            userInfo.inviteCode
          }}</span>
          <view class="copy" @click="copy">复制</view>
        </view>
        <view class="my-commission">
          <span style="font-size: 18px; font-weight: 500; color: #333333"
            >我的佣金</span
          >
          <view class="commission-detail">
            <view class="commission-single">
              <view class="commission-number">{{ userInfo.totalCredits }}</view>
              <view class="commission-text">总积分</view>
            </view>
            <view class="commission-single">
              <view class="commission-number">{{
                userInfo.remainCredits
              }}</view>
              <view class="commission-text">剩余积分</view>
            </view>
          </view>
        </view>
        <view class="my-data">
          <span style="font-size: 18px; font-weight: 500; color: #333333"
            >我的数据</span
          >
          <view class="line-data">
            <view class="single-data">
              <img src="/static/data/promotion.png" alt="" />
              <view class="data-detail">
                <span class="data-detail-title">推广佣金</span>
                <span class="data-detail-count"
                  >{{ userInfo.promoCreditCount }}积分</span
                >
              </view>
            </view>
            <view class="single-data">
              <img src="/static/data/promo-order.png" alt="" />
              <view class="data-detail">
                <span class="data-detail-title">推广订单</span>
                <span class="data-detail-count"
                  >{{ userInfo.promoOrderCount }}笔</span
                >
              </view>
            </view>
          </view>
          <view class="line-data">
            <view class="single-data">
              <img src="/static/data/fans.png" alt="" />
              <view class="data-detail">
                <span class="data-detail-title">我的粉丝</span>
                <span class="data-detail-count">{{ userInfo.fanCount }}人</span>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      userInfo: {},
      avatar: "/static/avatar-user.png",
    };
  },
  async onShow() {
    const { data } = await apiService.getUserInfo();
    this.userInfo = data;
  },
  methods: {
    copy() {
      const aux = document.createElement("input");
      aux.setAttribute("value", this.userInfo.inviteCode);
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
.part1 {
  width: 100%;
  height: 280px;
  background: linear-gradient(264deg, #217bfb 0%, #4491ff 100%);
  .part1-1 {
    width: 100%;
    height: 280px;
    background: url("/static/data/data-bgc.png") no-repeat right top 10px;
  }
  .user-info {
    padding: 32px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .user-detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 17px;
      color: #fff;
      span {
        font-weight: bold;
        font-size: 16px;
      }
    }
    .button {
      text-align: center;
      border-radius: 12px;
      height: 24px;
      width: 63px;
      background: #3687fc;
      font-size: 12px;
      color: #fff;
      font-weight: bold;
      margin-left: auto;
    }
  }
  .invite-code {
    margin: 0 15px;
    background: linear-gradient(90deg, #fdf1da 0%, #fbe4be 100%);
    border-radius: 10px;
    height: 60px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    img {
      width: 45px;
      height: 35px;
    }
    .copy {
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 62px;
      height: 30px;
      color: #fff;
      background: #c09e64;
      border-radius: 5px;
      font-size: 15px;
      text-align: center;
    }
  }
  .my-commission {
    margin: 15px;
    background-color: #fff;
    border-radius: 10px;
    padding: 18px;
    .commission-detail {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      margin: 30px 0 12px 0;
      .commission-single {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .commission-number {
          font-size: 23px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 8px;
        }
        .commission-text {
          font-size: 14px;
          font-weight: 500;
          color: #666666;
        }
      }
    }
  }
  .my-data {
    margin: 15px;
    background-color: #fff;
    border-radius: 10px;
    padding: 18px;
    .line-data {
      margin-top: 25px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      .single-data {
        width: 50%;
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          margin-right: 12px;
        }
        .data-detail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .data-detail-title {
            font-size: 14px;
            font-weight: bold;
            color: #333333;
          }
          .data-detail-count {
            font-size: 12px;
            font-weight: 500;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>
