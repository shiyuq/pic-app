<template>
  <view v-if="goods" class="goods">
    <img :src="goods.avatar" alt="" />
    <view class="miaosha">秒杀时间：{{ goods.sellTime }}开抢</view>
    <view class="goods-name">
      <view class="name">{{ goods.name }}</view>
      <view class="credit">{{ goods.realCredit }} 积分</view>
    </view>
    <view
      class="artist-info"
      v-if="goods.artistId"
      @click="gotoPage('/pages/artist/artist', goods.artistId)"
    >
      <view class="name">画家信息</view>
      <view class="name">{{ goods.artistName }}</view>
      <view class="right">></view>
    </view>
    <view class="desc">
      <view class="upper">作品描述</view>
      <view class="downer">{{ goods.description }}</view>
    </view>
    <view class="footer">
      <view class="btn">
        <view
          class="botton"
          v-if="currentTime > +new Date(goods.sellTime)"
          @click="buy()"
          >立即购买</view
        >
        <view class="botton" v-else>我要预约</view>
      </view>
    </view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      id: "",
      goods: null,
      currentTime: 0,
    };
  },
  onLoad(option) {
    this.id = option.id;
  },
  async onShow() {
    this.currentTime = +new Date();
    await this.getGoodsDetail();
  },
  methods: {
    async getGoodsDetail() {
      try {
        const { data } = await apiService.getGoodsDetail({ id: this.id });
        this.goods = data;
      } catch (error) {}
    },
    gotoPage(url, id) {
      uni.navigateTo({ url: `${url}?id=${id}` });
    },
    async buy() {
      const _this = this;
      uni.showModal({
        title: "购买",
        content: "是否确认购买该画",
        success: function (res) {
          if (!res.confirm) return;
          apiService.buyGoods({ id: _this.id }).then((data) => {
            if (!data) return;
            const orderId = data.data && data.data.orderId;
            uni.showToast({
              title: "购买成功",
              duration: 2000,
            });
            setTimeout(() => {}, 2000);
            _this.gotoPage("/pages/orderDetail/orderDetail", orderId);
          });
        },
        fail: function () {},
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.goods {
  position: relative;
  min-height: 100%;
  img {
    width: 100%;
    height: 281.5px;
  }
  .miaosha {
    position: absolute;
    z-index: 100;
    margin-top: -25px;
    width: 100%;
    background-color: #fa7329;
    height: 27px;
    line-height: 27px;
    padding-left: 14.5px;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
  }
  .goods-name {
    height: 60px;
    background-color: #fff;
    padding: 25px 15px;
    margin-bottom: 10px;
    .name {
      font-size: 21px;
      font-weight: bold;
      color: #000000;
      margin-bottom: 24px;
    }
    .credit {
      font-size: 18px;
      font-weight: 500;
      color: #217bfb;
    }
  }
  .artist-info {
    background-color: #fff;
    padding: 15px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .name {
      font-size: 16px;
      font-weight: 500;
      color: #000000;
      margin-right: 25px;
    }
    .right {
      margin-left: auto;
      color: #cccccc;
    }
  }
  .desc {
    background-color: #fff;
    padding: 15px;
    .upper {
      font-size: 18px;
      font-weight: 500;
      color: #000000;
      margin-bottom: 18px;
    }
    .downer {
      font-size: 14px;
      font-weight: 500;
      color: #333333;
      padding-bottom: 60px;
    }
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
