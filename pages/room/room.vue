<template>
  <view>
    <view class="part1">
      <view class="header">
        <img :src="userInfo.avatar || avatar" alt="" />
        <view class="header-content">
          <view class="upper">{{ userInfo.nickname }}</view>
          <view class="downer">画室号:{{ roomNo }}</view>
        </view>
        <view class="header-tag">
          <view class="upper">{{ roleMap[currentRole] }}</view>
          <view class="downer" @click="gotoRoom()">我的画室 ></view>
        </view>
      </view>
      <view class="credits">
        <view class="credits-single">
          <view class="upper">总积分</view>
          <view class="downer">{{ userInfo.totalCredits }}</view>
        </view>
        <view class="credits-single" style="padding-left: 87px">
          <view class="upper">剩余积分</view>
          <view class="downer">{{ userInfo.remainCredits }}</view>
        </view>
      </view>
    </view>
    <view class="part2"></view>
    <view class="part3">
      <view
        class="part3-order"
        @click="gotoPage('/pages/orderList/orderList', 'all')"
      >
        <view class="left">订单管理</view>
        <view class="right">查看订单 ></view>
      </view>
      <view class="order-list">
        <view
          class="order-single"
          @click="gotoPage('/pages/orderList/orderList', 'toConfirm')"
        >
          <view class="upper">{{ userInfo.toConfirmOrders }}</view>
          <view class="downer">待确认</view>
        </view>
        <view
          class="order-single"
          @click="gotoPage('/pages/orderList/orderList', 'finished')"
        >
          <view class="upper">{{ userInfo.finishedOrders }}</view>
          <view class="downer">已完成</view>
        </view>
        <view
          class="order-single"
          @click="gotoPage('/pages/orderList/orderList', 'all')"
        >
          <view class="upper">{{ userInfo.totalOrders }}</view>
          <view class="downer">全部订单</view>
        </view>
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
      <view class="my-tool">
        <view class="tool-header">我的工具</view>
        <view v-if="currentRole === 4">
          <view class="tool-list">
            <view
              class="tool-single"
              @click="gotoPage('/pages/picManage/picManage')"
            >
              <img src="/static/room/goods-manage.png" alt="" />
              <view class="single-text">作品管理</view>
            </view>
            <view
              class="tool-single"
              @click="gotoPage('/pages/roomAbout/roomAbout')"
            >
              <img src="/static/room/room-manage.png" alt="" />
              <view class="single-text">关于画室</view>
            </view>
            <view class="tool-single">
              <img src="/static/room/data-center.png" alt="" />
              <view class="single-text">数据中心</view>
            </view>
          </view>
        </view>
        <view v-else>
          <view class="tool-list">
            <view
              class="tool-single"
              @click="gotoPage('/pages/publish/publish')"
            >
              <img src="/static/room/publish.png" alt="" />
              <view class="single-text">发布作品</view>
            </view>
            <view
              class="tool-single"
              @click="gotoPage('/pages/picManage/picManage')"
            >
              <img src="/static/room/goods-manage.png" alt="" />
              <view class="single-text">作品管理</view>
            </view>
            <view
              class="tool-single"
              @click="gotoPage('/pages/artistManage/artistManage')"
            >
              <img src="/static/room/artist-manage.png" alt="" />
              <view class="single-text">画家管理</view>
            </view>
            <view class="tool-single" @click="gotoRoomListByType()">
              <img src="/static/room/room-manage.png" alt="" />
              <view class="single-text">画室管理</view>
            </view>
          </view>
          <view class="tool-list">
            <view class="tool-single">
              <img src="/static/room/data-center.png" alt="" />
              <view class="single-text">数据中心</view>
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
      roomNo: "",
      avatar: "/static/avatar-user.png",
      currentRole: 4,
      roleMap: {
        1: "超级管理员",
        2: "大管理员",
        3: "画室长",
        4: "普通用户",
      },
    };
  },
  async onShow() {
    const { data } = await apiService.getUserInfo();
    this.userInfo = data;
    this.roomNo = uni.getStorageSync("roomNo") || "";
    if (data.isRoomer) this.currentRole = 3;
    if (data.roleCode === "1") this.currentRole = 1;
    if (data.roleCode === "2" && data.isManager) this.currentRole = 2;
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
    gotoPage(url, type) {
      if (type) {
        uni.navigateTo({ url: `${url}?type=${type}` });
      } else {
        uni.navigateTo({ url });
      }
    },
    gotoRoomListByType() {
      if (this.currentRole >= 3) {
        this.gotoPage("/pages/roomEdit/roomEdit");
      } else {
        this.gotoPage("/pages/roomList/roomList");
      }
    },
    gotoRoom() {
      uni.switchTab({
        url: "/pages/my/my",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.part1 {
  height: 140px;
  background-color: #217bfb;
  padding: 30px 15px 20px 15px;
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 44px;
      height: 44px;
    }
    .header-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 12.5px;
      .upper {
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
        padding-bottom: 5px;
      }
      .downer {
        font-size: 13px;
        font-weight: 500;
        color: #bad1f2;
      }
    }
    .header-tag {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      margin-left: auto;
      .upper {
        font-size: 12px;
        font-weight: bold;
        color: #ffffff;
        padding-bottom: 5px;
      }
      .downer {
        text-align: center;
        padding: 5px;
        border-radius: 5px;
        background-color: #d1e4f8;
        font-size: 15px;
        line-height: 14px;
        font-weight: 500;
        color: #217bfb;
      }
    }
  }
  .credits {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 25px 0 18px 0;
    .credits-single {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .upper {
        font-size: 12px;
        font-weight: 500;
        color: #bad1f2;
        margin-bottom: 10px;
      }
      .downer {
        font-size: 19px;
        font-weight: 600;
        color: #ffffff;
      }
    }
  }
}
.part2 {
  background-color: #ffffff;
  height: 25px;
  width: 100%;
  border-radius: 10px 10px 0 0;
  margin-top: -10px;
}
.part3 {
  background-color: #ffffff;
  padding: 0 15px 15px 15px;
  .part3-order {
    display: flex;
    flex-direction: row;
    .left {
      font-size: 17px;
      font-weight: bold;
      color: #333333;
    }
    .right {
      font-size: 14px;
      font-weight: 500;
      color: #666666;
      margin-left: auto;
    }
  }
  .order-list {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    padding: 36px 0 25px 0;
    .order-single {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .upper {
        font-size: 22px;
        font-weight: bold;
        color: #000000;
        padding-bottom: 14px;
      }
      .downer {
        font-size: 13px;
        font-weight: 500;
        color: #666666;
      }
    }
  }
  .invite-code {
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
  .my-tool {
    padding: 19px 0;
    margin-bottom: 10px;
    .tool-header {
      font-size: 17px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 30px;
    }
    .tool-list {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 36px;
      .tool-single {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 35px;
          height: 35px;
          margin: 0px 8px 13px 8px;
        }
        .single-text {
          font-size: 13px;
          font-weight: 500;
          color: #010101;
        }
      }
    }
  }
}
</style>
