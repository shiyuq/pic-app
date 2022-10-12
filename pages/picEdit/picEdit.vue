<template>
  <view v-if="goods">
    <view class="status">
      <view class="upper">{{ goods.statusName }}</view>
      <view class="downer" v-if="goods.statusCode === '8'"
        >请耐心等待审核结果</view
      >
      <view class="downer" v-if="goods.statusCode === '9'">{{
        goods.reason
      }}</view>
      <view class="downer" v-if="goods.statusCode === '3'">{{
        goods.reason
      }}</view>
    </view>
    <view class="upload" v-if="type === 'roomer'">
      <view v-if="tempPath" @click="uploadImage" class="upload-main">
        <img :src="tempPath" alt="" />
      </view>
      <view v-else class="upload-main" @click="uploadImage">
        <img :src="goods.avatar" alt="" />
      </view>
    </view>
    <view class="upload" v-if="type === 'normal'">
      <view class="upload-main">
        <img :src="goods.avatar" alt="" />
      </view>
    </view>
    <view class="goods-info">
      <view class="line">
        <view class="star"> * </view>
        <view class="line-name"> 作品分类 </view>
        <view class="selector">
          <picker
            @change="bindPickerChange"
            :value="category"
            :range="range"
            :disabled="type === 'normal' ? true : false"
          >
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
            v-model="goods.credit"
          />
        </view>
      </view>
      <view class="line">
        <view class="line-name"> 画家信息 </view>
        <view class="selector">
          <picker
            @change="bindArtChange"
            :value="artistIndex"
            :range="artists"
            :disabled="type === 'normal' ? true : false"
          >
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
          :disabled="type === 'normal' ? true : false"
          type="text"
          placeholder="请输入您的作品名称，不超过30个字"
          v-model="goods.name"
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
          :disabled="type === 'normal' ? true : false"
          type="text"
          placeholder="请详细描述您的作品"
          v-model="goods.description"
        />
      </view>
    </view>
    <view class="goods-miaosha" v-if="type !== 'normal'">
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
              v-model="goods.sellTime"
              @change="selectTime"
            />
          </view>
        </view>
      </view>
    </view>
    <view v-else style="margin-bottom: 50px"></view>
    <view class="bottom"></view>
    <view class="footer">
      <view class="btn">
        <view class="botton" @click="rePublish()">重新提交</view>
      </view>
    </view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      category: "0",
      range: ["积分商城"],
      tempPath: "",
      id: "",
      artistIds: [],
      artistIndex: -1,
      artists: [],
      type: "normal",
      goods: null,
      avatar: {
        baseData: "",
        fileName: "avatar.png",
      },
    };
  },
  onLoad(option) {
    this.id = option.id;
    this.type = option.type || "normal";
  },
  async onShow() {
    await this.getGoodsDetail();
    await this.getArtistList();
  },
  methods: {
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
        const selectedArtistIndex = artistIds.findIndex(
          (item) => item === this.goods.artistId
        );
        if (selectedArtistIndex >= 0) this.artistIndex = selectedArtistIndex;
      }
    },
    async getGoodsDetail() {
      try {
        const { data } = await apiService.getGoodsDetail({ id: this.id });
        this.goods = data;
      } catch (error) {}
    },
    bindPickerChange(d) {
      this.category = d.detail.value;
    },
    bindArtChange(d) {
      this.artistIndex = d.detail.value;
    },
    selectTime(d) {},
    async rePublish() {
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
      if (this.type === "roomer") {
        const fields = {
          id: this.goods.id,
          credit: this.goods.credit,
          name: this.goods.name,
          description: this.goods.description,
          sellTime: this.goods.sellTime,
          artistId:
            this.artistIndex >= 0 ? this.artistIds[this.artistIndex] : "",
        };
        if (this.avatar.baseData) {
          fields.avatar = this.avatar;
        }
        await apiService.updatePic(fields);
      } else if (this.type === "normal") {
        const fields = {
          id: this.goods.id,
          credit: this.goods.credit,
        };
        await apiService.editMyPic(fields);
      }
      uni.showToast({
        title: "更新成功",
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
.status {
  background-color: #fff;
  height: 130.5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  .upper {
    font-size: 18px;
    font-weight: 800;
    color: #217bfb;
    margin-bottom: 18px;
  }
  .downer {
    font-size: 16px;
    font-weight: 500;
    color: #000000;
  }
}
.upload {
  height: 166px;
  width: 100%;
  background-color: #fff;
  .upload-main {
    padding: 17.5px 15px;
    height: 131px;
    img {
      height: 100%;
      width: 100%;
      border-radius: 5px;
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
