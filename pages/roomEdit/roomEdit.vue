<template>
  <view>
    <view class="line">
      <view class="star"> * </view>
      <view class="line-name"> 画室名称 </view>
      <view class="selector">
        <input
          class="line-right"
          type="text"
          placeholder="请填写画室名称"
          v-model="room.name"
        />
      </view>
    </view>
    <view class="line">
      <view class="star"> * </view>
      <view class="line-name"> 画室图片 </view>
      <view class="selector" @click="uploadImage">
        <img :src="room.avatar || '/static/avatar-user.png'" alt="" />
      </view>
    </view>
    <view class="line">
      <view class="star"> * </view>
      <view class="line-name"> 画室号 </view>
      <view class="selector">
        <input
          :disabled="true"
          class="line-right"
          type="text"
          placeholder="画室号"
          v-model="room.roomCode"
        />
      </view>
    </view>
    <view class="goods-name">
      <view class="part3-line">
        <view class="left">*</view>
        <view class="right">画室简介 </view>
      </view>
      <view class="part3-content">
        <input
          type="text"
          placeholder="请输入画室简介"
          v-model="room.introduction"
        />
      </view>
    </view>
    <view class="footer">
      <view class="btn">
        <view class="botton" @click="updateRoom()">保存修改</view>
      </view>
    </view>
  </view>
</template>

<script>
import apiService from "../../common/api";
import { pathToBase64 } from "../../js_sdk/mmmm-image-tools/index";
export default {
  data() {
    return {
      id: "",
      room: {
        avatar: "",
        name: "",
        introduction: "",
      },
      avatar: {
        baseData: "",
        fileName: "avatar.png",
      },
    };
  },
  async onShow() {
    await this.getPicRoomDetail();
  },
  methods: {
    async getPicRoomDetail() {
      try {
        const { data } = await apiService.getPicRoomDetail();
        this.room = data;
      } catch (error) {}
    },
    uploadImage() {
      uni.chooseImage({
        sourceType: ["camera", "album"],
        sizeType: "compressed",
        count: 1,
        success: (res) => {
          this.room.avatar = res.tempFilePaths[0];
          pathToBase64(res.tempFilePaths[0]).then((base64) => {
            this.avatar.baseData = base64;
          });
        },
      });
    },
    async updateRoom() {
      if (!this.room.name) {
        uni.showToast({
          title: "请填写画室名称",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (!this.room.introduction) {
        uni.showToast({
          title: "请填写画室介绍",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      const params = {
        name: this.room.name,
        introduction: this.room.introduction,
      };
      if (this.avatar.baseData) {
        params.avatar = this.avatar;
      }
      params.id = this.room.id;
      await apiService.updateRoom(params);
      uni.showToast({
        title: "更新成功",
        icon: "success",
        duration: 1000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
  background-color: #fff;
  height: 48px;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 1px;
  .star {
    line-height: 48px;
    color: #f61212;
    margin-right: 2px;
  }
  .line-name {
    line-height: 48px;
    font-size: 16px;
    font-weight: 500;
    color: #000000;
  }
  .selector {
    line-height: 48px;
    margin-left: auto;
    display: flex;
    align-items: center;
    .select {
      font-size: 15px;
      font-weight: 500;
      color: #cccccc;
    }
    .line-select-new {
      text-align: right;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
    img {
      width: 37px;
      height: 37px;
      border-radius: 50%;
    }
  }
  .line-right {
    margin-left: auto;
    text-align: right;
    font-size: 15px;
  }
}
.goods-name {
  margin: 10px 0;
  background-color: #fff;
  .part3-line {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 17px 0 25px 15px;
    .left {
      color: #f61212;
    }
    .right {
      font-size: 16px;
      font-weight: 500;
      color: #000000;
    }
  }
  .part3-content {
    padding: 0 15px 75px 15px;
  }
}
.footer {
  background-color: #fff;
  width: 100%;
  position: fixed;
  bottom: 0;
  .btn {
    margin: 10px 15px;
  }
  .botton {
    width: 100%;
    height: 44px;
    background-color: #217bfb;
    border-radius: 22px;
    font-size: 15px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    line-height: 44px;
  }
}
</style>
