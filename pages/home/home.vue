<template>
  <view>
    <view class="part1">
      <view class="swiper">
        <swiper
          :indicator-dots="true"
          :autoplay="true"
          :interval="3000"
          :duration="1000"
        >
          <swiper-item>
            <view class="swiper-item">
              <img src="/static/home-logo.png" alt="" />
            </view>
          </swiper-item>
        </swiper>
      </view>
      <view class="order-list">
        <view class="order-item">
          <view class="bgc">
            <img src="/static/home/topay.png" alt="" />
          </view>
          <span style="font-size: 15px; padding-top: 15px">待确认订单</span>
        </view>
        <view class="order-item">
          <view class="bgc">
            <img src="/static/home/finished.png" alt="" />
          </view>
          <span style="font-size: 15px; padding-top: 15px">已完成订单</span>
        </view>
        <view class="order-item">
          <view class="bgc">
            <img src="/static/home/topublish.png" alt="" />
          </view>
          <span style="font-size: 15px; padding-top: 15px">委托代卖</span>
        </view>
      </view>
    </view>
    <view class="part2">
      <view class="title">
        <text>画苑商城</text>
      </view>
      <view class="mall">
        <view class="mall-left">
          <view class="content-left">
            <span class="enter">进入商城</span>
            <view class="enter-mall">ENTER THE MALL</view>
            <view class="enter-pic">
              <span></span>
              <img src="/static/home/mall.png" alt=""
            /></view>
          </view>
        </view>
        <view class="mall-right">
          <view class="content-right">
            <view class="r-l">
              <view class="r-l-l">
                <span class="enter">体验区</span>
                <view class="enter-mall">EXPERIENCE</view>
              </view>
              <view class="enter-pic-new">
                <span></span>
                <img src="/static/home/experience.png" alt=""
              /></view>
            </view>
            <view class="r-d">
              <view class="r-l-l">
                <span class="enter">可预约</span>
                <view class="enter-mall">RESERVE</view>
              </view>
              <view class="enter-pic-new">
                <span></span>
                <img src="/static/home/yuyue.png" alt=""
              /></view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="part3">
      <view class="title-3">
        <span class="title-left">画家资料</span>
        <span class="title-right">更多 ></span>
      </view>
      <view class="content-3">
        <view class="artist-3" v-for="item in artists">
          <view class="single-3">
            <img :src="item.avatar" alt="" />
            <view class="item-name">{{ item.name }}</view>
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
      artists: [],
    };
  },
  async onShow() {
    const { data } = await apiService.getArtistList({ start: 0, hit: 3 });
    this.artists = (data && data.items) || [];
  },
};
</script>

<style lang="scss" scoped>
.part1 {
  background-color: #fff;
  padding: 15px;
}
.swiper-item {
  img {
    width: 100%;
  }
}
.order-list {
  padding: 28px 0 8px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .order-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .bgc {
      width: 60px;
      height: 60px;
      background-color: #eef3fa;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.part2 {
  margin: 10px 0;
  background-color: #fff;
  padding-bottom: 27px;
  .title {
    font-size: 18px;
    font-weight: 500;
    color: #222222;
    padding: 18px 0 20px 15px;
  }
  .mall {
    padding: 0 7.5px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .mall-left {
      padding: 0 7.5px;
      width: 50%;
      height: 157px;
    }
    .mall-right {
      padding: 0 7.5px;
      width: 50%;
      height: 157px;
    }
    .content-left {
      border: 1px solid #e5e5e5;
      border-radius: 5px;
      padding: 32px 0 0 17px;
      .enter {
        font-size: 16px;
        font-weight: 800;
        color: #333333;
        line-height: 13px;
      }
      .enter-mall {
        padding: 12px 0 18px 0;
        font-size: 11px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #989898;
        line-height: 13px;
      }
      .enter-pic {
        display: flex;
        justify-content: flex-end;
      }
    }
    .content-right {
      .r-l {
        border: 1px solid #e5e5e5;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        .r-l-l {
          padding-top: 16px;
          padding-left: 15px;
          padding-bottom: 15px;
        }
      }
      .r-d {
        border: 1px solid #e5e5e5;
        border-radius: 5px;
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        .r-l-l {
          padding-top: 16px;
          padding-left: 15px;
          padding-bottom: 15px;
        }
      }
      .enter {
        font-size: 16px;
        font-weight: 800;
        color: #333333;
        line-height: 13px;
      }
      .enter-mall {
        padding: 8px 0 0 0;
        font-size: 11px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #989898;
        line-height: 13px;
      }
      .enter-pic-new {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
        img {
          height: 66px;
        }
      }
    }
  }
}

.part3 {
  padding-top: 18px;
  background-color: #fff;
  .title-3 {
    padding: 0 15px;
    display: flex;
    .title-left {
      font-size: 18px;
      font-weight: 500;
      color: #222222;
    }
    .title-right {
      margin-left: auto;
      color: #989898;
      font-size: 16px;
    }
  }
  .content-3 {
    padding: 20px 15px 30px 15px;
    display: flex;
    justify-content: space-around;
    .single-3 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fafafa;
      border-radius: 10px;
      padding: 18px 25px 28px 25px;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .item-name {
        padding-top: 20px;
        height: 15px;
        line-height: 15px;
        font-size: 16px;
        font-weight: 500;
        color: #222222;
      }
    }
  }
}
</style>
