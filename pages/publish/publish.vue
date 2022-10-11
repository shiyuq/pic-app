<template>
  <view>
    <view class="upload">
      <view v-if="avatar.baseData" @click="uploadImage" class="upload-main">
        <img :src="tempPath" alt="" />
      </view>
      <view v-else class="upload-else" @click="uploadImage">
        <view class="bgc">
          <img src="/static/publish/photo.png" alt="" />
        </view>
      </view>
    </view>
    <view class="goods-info">
      <view class="line">
        <view class="star"> * </view>
        <view class="line-name"> 作品分类 </view>
        <view class="selector">
          <picker @change="bindPickerChange" :value="category" :range="range">
            <view v-if="category < 0" class="select">请选择作品分类 ></view>
            <view v-else class="line-select-new">{{ range[category] }}</view>
          </picker>
        </view>
      </view>
      <view class="line">
        <view class="star"> * </view>
        <view class="line-name"> 作品价格 </view>
        <view class="selector">
          <input
            class="line-right"
            type="digit"
            placeholder="请输入拍卖所需积分数"
            v-model="credit"
          />
        </view>
      </view>
      <view class="line">
        <view class="line-name"> 画家信息 </view>
        <view class="selector">
          <picker @change="bindArtChange" :value="artistIndex" :range="artists">
            <view v-if="artistIndex < 0" class="select">请选择画家 ></view>
            <view v-else class="line-select-new">{{
              artists[artistIndex]
            }}</view>
          </picker>
        </view>
      </view>
    </view>
    <view class="goods-name">
      <view class="part3-line">
        <view class="left">*</view>
        <view class="right">作品名称</view>
      </view>
      <view class="part3-content">
        <input
          type="text"
          placeholder="请输入您的作品名称，不超过30个字"
          v-model="name"
          maxlength="30"
        />
      </view>
    </view>
    <view class="goods-name">
      <view class="part3-line">
        <view class="left">*</view>
        <view class="right">作品描述 </view>
      </view>
      <view class="part3-content">
        <input
          type="text"
          placeholder="请详细描述您的作品"
          v-model="description"
        />
      </view>
    </view>
    <view class="goods-miaosha">
      <view class="line">
        <view class="star"> * </view>
        <view class="line-name"> 秒杀时间 </view>
        <view class="selector" @click="selectTime">
          <view class="line-select-new">
            <uni-datetime-picker
              class="datetime-picker"
              type="datetime"
              :clear-icon="false"
              return-type="string"
              placeholder="请选择秒杀时间 >"
              :border="false"
              v-model="sellTime"
              @change="selectTime"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="bottom"></view>
    <view class="footer">
      <view class="btn">
        <view class="botton" @click="publish()">提交审核</view>
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
      showPicker: false,
      category: -1,
      range: ["积分商城"],
      artistIds: [],
      artistIndex: -1,
      artists: [],
      tempPath: "",
      credit: null,
      name: "",
      description: "",
      sellTime: "",
      avatar: {
        baseData: "",
        fileName: "avatar.png",
      },
    };
  },
  async onShow() {
    await this.getArtistList();
  },
  methods: {
    async getArtistList() {
      const { data } = await apiService.getArtistList({ start: 0, hit: 50 });
      if (data.items.length) {
        const artistIds = [];
        const artists = [];
        data.items.forEach((item) => {
          artists.push(item.name);
          artistIds.push(item.id);
        });
        this.artistIds = artistIds;
        this.artists = artists;
      }
    },
    uploadImage() {
      uni.chooseImage({
        sourceType: ["camera", "album"],
        sizeType: "compressed",
        count: 1,
        success: (res) => {
          this.tempPath = res.tempFilePaths[0];
          pathToBase64(res.tempFilePaths[0]).then((base64) => {
            this.avatar.baseData = base64;
          });
        },
      });
    },
    bindPickerChange(d) {
      this.category = d.detail.value;
    },
    bindArtChange(d) {
      this.artistIndex = d.detail.value;
    },
    selectTime(d) {},
    async publish() {
      if (!this.avatar.baseData) {
        uni.showToast({
          title: "请上传图片",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (this.category < 0) {
        uni.showToast({
          title: "请选择作品分类",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (+this.credit <= 0) {
        uni.showToast({
          title: "请填写积分",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (!this.name) {
        uni.showToast({
          title: "请填写作品名称",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (!this.description) {
        uni.showToast({
          title: "请填写作品描述",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (!this.sellTime) {
        uni.showToast({
          title: "请选择秒杀时间",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      await apiService.addPic({
        avatar: this.avatar,
        artistId: this.artistIndex >= 0 ? this.artistIds[this.artistIndex] : "",
        credit: this.credit,
        name: this.name,
        description: this.description,
        sellTime: this.sellTime,
      });
      uni.showToast({
        title: "提交成功",
        icon: "success",
        duration: 1000,
      });
      setTimeout(() => {
        uni.navigateTo({ url: "/pages/picManage/picManage" });
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.upload {
  height: 166px;
  width: 100%;
  background-color: #fff;
  .upload-main {
    height: 166px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .upload-else {
    display: flex;
    height: 166px;
    justify-content: center;
    align-items: center;
    .bgc {
      background-color: #e9eff7;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 34px;
        height: 31px;
      }
    }
  }
}
.goods-info {
  margin: 10px 0;
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
    }
    .line-right {
      margin-left: auto;
      text-align: right;
      font-size: 15px;
    }
  }
}
.select {
  border: 0;
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
.goods-miaosha {
  margin: 10px 0 50px 0;
  .line {
    background-color: #fff;
    height: 48px;
    padding: 0 0 0 15px;
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
    }
    .line-right {
      margin-left: auto;
      text-align: right;
      font-size: 15px;
    }
  }
}
.datetime-picker {
  ::before {
    content: "";
  }
}
.bottom {
  height: 50px;
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
