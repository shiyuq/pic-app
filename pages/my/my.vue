<template>
  <view>
    <view class="part1">
      <view class="part1-1">
        <view class="part1-2">
          <view class="part1-ring">
            <img src="/static/my/ring.png" alt="" />
            <view class="part1-son">
              <view class="part1-number">2</view>
            </view>
          </view>
          <view class="user-info">
            <img :src="userInfo.avatar || avatar" alt="" />
            <view class="user-detail">
              <span style="font-weight: bold; font-size: 16px">{{
                userInfo.nickname
              }}</span>
              <view class="button-part1">普通会员</view>
            </view>
            <view class="button" @click="gotoPage('/pages/room/room')"
              >我的画室 ></view
            >
          </view>
          <view class="credits">
            <view style="color: #818892; font-size: 12px; margin-bottom: 14px"
              >积分</view
            >
            <span
              style="
                color: #262c35;
                font-size: 19px;
                font-weight: 600;
                line-height: 15px;
              "
              >{{ userInfo.remainCredits }}</span
            >
          </view>
          <view class="my-commission">
            <view class="commission-title">
              <span style="font-size: 18px; font-weight: 500; color: #333333"
                >我的订单</span
              >
              <view style="margin-left: auto; color: #999999">></view>
            </view>
            <view class="commission-detail">
              <view class="commission-single">
                <img src="/static/my/confirm.png" alt="" />
                <view class="commission-text">待确认</view>
              </view>
              <view class="commission-single">
                <img src="/static/my/finished.png" alt="" />
                <view class="commission-text">已完成</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="part2">
        <view class="part2-line">
          <img src="/static/my/info.png" alt="" />
          <span style="color: #333333; font-size: 16px">我的资料</span>
          <view style="margin-left: auto; color: #999999">></view>
        </view>
        <view class="part2-line">
          <img src="/static/my/data.png" alt="" />
          <span style="color: #333333; font-size: 16px">业绩统计</span>
          <view style="margin-left: auto; color: #999999">></view>
        </view>
        <view class="part2-line">
          <img src="/static/my/edit.png" alt="" />
          <span style="color: #333333; font-size: 16px">修改密码</span>
          <view style="margin-left: auto; color: #999999">></view>
        </view>
        <view class="part2-line">
          <img src="/static/my/logout.png" alt="" />
          <span style="color: #333333; font-size: 16px" @click="logout()"
            >退出登录</span
          >
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
    gotoPage(url) {
      uni.navigateTo({ url });
    },
    logout() {
      uni.removeStorageSync("token");
      uni.removeStorageSync("roomNo");
      this.gotoPage("/pages/login/index");
    },
  },
};
</script>

<style lang="scss" scoped>
.part1 {
  width: 100%;
  .part1-1 {
    width: 100%;
    background-color: #f4f7fe;
    height: 300px;
  }
  .part1-2 {
    width: 100%;
    background: url("/static/my/bgc.png") no-repeat right top 100px;
  }
  .part1-ring {
    padding: 10px 15px 8px 0;
    display: flex;
    position: relative;
    img {
      margin-left: auto;
      width: 18px;
      height: 21px;
    }
    .part1-son {
      position: absolute;
      right: 10px;
    }
    .part1-number {
      background: #f75c5c;
      border-radius: 50%;
      height: 12px;
      width: 12px;
      color: #fff;
      font-size: 11px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
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
      color: #333333;
      span {
        font-weight: bold;
        font-size: 16px;
      }
      .button-part1 {
        margin-top: 8px;
        width: 63px;
        height: 24px;
        background-color: #e1eaf7;
        color: #789ad7;
        font-size: 12px;
        text-align: center;
        border-radius: 12px;
      }
    }
    .button {
      text-align: center;
      border-radius: 5px;
      height: 24px;
      width: 76px;
      background: #d1e4f8;
      font-size: 12px;
      color: #217bfb;
      font-weight: 500;
      margin-left: auto;
    }
  }
  .credits {
    padding: 0 0 17px 33px;
  }
  .my-commission {
    margin: 15px;
    background-color: #fff;
    border-radius: 10px;
    padding: 18px;
    .commission-title {
      display: flex;
      flex-direction: row;
    }
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
        img {
          margin-bottom: 12px;
          width: 35px;
          height: 35px;
        }
        .commission-text {
          font-size: 16px;
          font-weight: 500;
          color: #555555;
        }
      }
    }
  }
  .part2 {
    margin: 15px;
    margin-top: 140px;
    background-color: #fff;
    border-radius: 10px;
    padding: 9px 18px;
    .part2-line {
      height: 44px;
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 18px;
        height: 18px;
        margin-right: 14.5px;
      }
    }
  }
}
</style>
