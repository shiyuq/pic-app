<template>
  <view v-if="goods">
    <view class="upload">
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
            :disabled="true"
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
            :disabled="true"
            class="line-right"
            type="digit"
            style="color: #999999"
            placeholder="请输入拍卖所需积分数"
            v-model="goods.credit"
          />
        </view>
      </view>
      <view class="line">
        <view class="line-name"> 画家信息 </view>
        <view class="selector" style="color: #999999">
          {{ goods.artistName }}
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
          :disabled="true"
          type="text"
          style="color: #999999"
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
          :disabled="true"
          type="text"
          style="color: #999999"
          placeholder="请详细描述您的作品"
          v-model="goods.description"
        />
      </view>
    </view>
    <view class="goods-miaosha" v-if="type === 'roomer'">
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
    <view class="goods-miaosha" v-if="type === 'admin'">
      <view class="line">
        <view class="star"> * </view>
        <view class="line-name"> 秒杀时间 </view>
        <view class="selector" style="margin-right: 10px; color: #999999">
          {{ goods.sellTime }}
        </view>
      </view>
    </view>
    <view class="goods-miaosha">
      <view class="line">
        <view class="star"> * </view>
        <view class="line-name"> 审核结果 </view>
        <radio-group class="selector-list" @change="radioChange">
          <label
            class="check-list"
            v-for="(item, index) in items"
            :key="item.value"
          >
            <view
              style="
                font-size: 15px;
                font-weight: 500;
                color: #000000;
                margin-right: 7px;
              "
              >{{ item.name }}</view
            >
            <view>
              <radio :value="item.value" :checked="index === current" />
            </view>
          </label>
        </radio-group>
      </view>
    </view>
    <view class="goods-name">
      <view class="part3-line">
        <view class="left">*</view>
        <view class="right">填写原因</view>
      </view>
      <view class="part3-content">
        <input
          type="text"
          placeholder="请描述作品未通过原因"
          v-model="goods.reason"
        />
      </view>
    </view>
    <view class="bottom" style="padding-bottom: 50px"></view>
    <view class="footer">
      <view class="btn">
        <view class="botton" @click="checkGoods()">提交</view>
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
      type: "roomer",
      goods: null,
      current: null,
      items: [
        {
          value: "0",
          name: "通过",
        },
        {
          value: "1",
          name: "拒绝",
        },
      ],
    };
  },
  onLoad(option) {
    this.id = option.id;
    this.type = option.type || "roomer";
  },
  async onShow() {
    await this.getGoodsDetail();
  },
  methods: {
    selectTime(d) {},
    async getGoodsDetail() {
      try {
        const { data } = await apiService.getGoodsDetail({ id: this.id });
        this.goods = data;
      } catch (error) {}
    },
    radioChange(evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.detail.value) {
          this.current = i;
          break;
        }
      }
    },
    async checkGoods() {
      const params = {
        id: this.goods.id,
      };
      if (this.current === 0) {
        params.passed = true;
      } else if (this.current === 1) {
        if (!this.goods.reason) {
          uni.showToast({
            title: "请填写原因",
            icon: "none",
            duration: 2000,
          });
          return;
        }
        params.passed = false;
        params.reason = this.goods.reason;
      } else {
        uni.showToast({
          title: "请选择审核结果",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (this.type === "admin") {
        await apiService.adminCheck(params);
        uni.showToast({
          title: "审核成功",
          icon: "success",
          duration: 1000,
        });
        setTimeout(() => {
          uni.navigateTo({ url: "/pages/picManage/picManage" });
        }, 500);
      } else if (this.type === "roomer") {
        if (!this.goods.sellTime && params.passed) {
          uni.showToast({
            title: "请选择秒杀时间",
            icon: "none",
            duration: 2000,
          });
          return;
        }
        params.sellTime = this.goods.sellTime;
        await apiService.checkPic(params);
        uni.showToast({
          title: "审核成功",
          icon: "success",
          duration: 1000,
        });
        setTimeout(() => {
          uni.navigateTo({ url: "/pages/picManage/picManage" });
        }, 500);
      }
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
        color: #999999;
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
  margin: 10px 0 10px 0;
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
    .selector-list {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      margin-right: 10px;
      margin-left: auto;
    }
    .check-list {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      margin-left: 20px;
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
