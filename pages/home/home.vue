<template>
  <view>
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
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
