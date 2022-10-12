<template>
  <view>
    <uni-segmented-control
      class="header"
      :current="current"
      :values="tabs"
      styleType="text"
      @clickItem="onClickItem"
    ></uni-segmented-control>
    <view class="content">
      <view class="item" v-for="item in items" :key="item.id">
        <view class="title">
          <view class="left">作品状态：</view>
          <view
            class="right"
            v-if="item.statusCode === '1'"
            style="color: #217bfb"
            >{{ item.statusName }}</view
          >
          <view
            class="right"
            v-if="item.statusCode === '2'"
            style="color: #f9a83f"
            >{{ item.statusName }}</view
          >
          <view
            class="right"
            v-if="item.statusCode === '3'"
            style="color: #fa2929"
            >{{ item.statusName }}</view
          >
          <view
            class="right"
            v-if="item.statusCode === '4'"
            style="color: #fa7329"
            >{{ item.statusName }}</view
          >
          <view
            class="right"
            v-if="item.statusCode === '5'"
            style="color: #fa7329"
            >{{ item.statusName }}</view
          >
          <view
            class="right"
            v-if="item.statusCode === '6'"
            style="color: #fa7329"
            >{{ item.statusName }}</view
          >
          <view
            class="right"
            v-if="item.statusCode === '7'"
            style="color: #fa7329"
            >{{ item.statusName }}</view
          >
          <view
            class="right"
            v-if="item.statusCode === '8'"
            style="color: #fa7329"
            >{{ item.statusName }}</view
          >
          <view
            class="right"
            v-if="item.statusCode === '9'"
            style="color: #fa2929"
            >{{ item.statusName }}</view
          >
        </view>
        <view class="pic">
          <img :src="item.avatar" alt="" />
          <view class="info">
            <view class="upper">{{ item.name }}</view>
            <view class="downer">{{ item.credit }} 积分</view>
          </view>
        </view>
        <view v-if="item.statusCode === '1'">
          <view class="button" v-if="roleName === 'normal'">
            <view class="btn-single" @click.stop="editGoods(item.id)">
              编辑作品
            </view>
          </view>
          <view
            class="button"
            v-if="roleName === 'roomer' || roleName === 'admin'"
          >
            <view
              class="btn-single btn-single-blue"
              @click.stop="remindUser(item.id)"
            >
              提醒用户
            </view>
          </view>
        </view>
        <view v-if="item.statusCode === '2'">
          <view class="button" v-if="roleName === 'normal'">
            <view class="btn-single" @click.stop="editGoods(item.id)">
              编辑作品
            </view>
          </view>
          <view
            class="button"
            v-if="roleName === 'roomer' || roleName === 'admin'"
          >
            <view
              class="btn-single btn-single-blue"
              @click.stop="checkGoods(item.id)"
            >
              审核作品
            </view>
          </view>
        </view>
        <view v-if="item.statusCode === '3'">
          <view class="button" v-if="roleName === 'normal'">
            <view class="btn-single" @click.stop="lookReason(item.reason)">
              查看原因
            </view>
            <view
              class="btn-single btn-single-blue"
              @click.stop="editGoods(item.id)"
            >
              重新提交
            </view>
          </view>
          <view
            class="button"
            v-if="roleName === 'roomer' || roleName === 'admin'"
          >
            <view
              class="btn-single btn-single-blue"
              @click.stop="gotoPage('/pages/picDetail/picDetail', item.id)"
            >
              查看作品
            </view>
          </view>
        </view>
        <view v-if="item.statusCode === '4'">
          <view
            class="button"
            v-if="roleName === 'roomer' || roleName === 'admin'"
          >
            <view class="btn-single" @click.stop="lockGoods(item.id)">
              锁定作品
            </view>
            <view class="btn-single" @click.stop="offlineGoods(item.id)">
              下架作品
            </view>
          </view>
        </view>
        <view v-if="item.statusCode === '5'">
          <view
            class="button"
            v-if="roleName === 'roomer' || roleName === 'admin'"
          >
            <view
              class="btn-single btn-single-blue"
              @click.stop="onlineGoods(item.id)"
            >
              上架作品
            </view>
          </view>
        </view>
        <view v-if="item.statusCode === '6'">
          <view
            class="button"
            v-if="roleName === 'roomer' || roleName === 'admin'"
          >
            <view
              class="btn-single btn-single-blue"
              @click.stop="unlockGoods(item.id)"
            >
              解锁作品
            </view>
          </view>
        </view>
        <view v-if="item.statusCode === '7'">
          <!-- 卖家待确认，不进行任何操作 -->
        </view>
        <view v-if="item.statusCode === '8'">
          <view class="button" v-if="roleName === 'roomer'">
            <view
              class="btn-single btn-single-blue"
              @click.stop="editGoods(item.id)"
            >
              编辑作品
            </view>
          </view>
          <view class="button" v-if="roleName === 'admin'">
            <view
              class="btn-single btn-single-blue"
              @click.stop="checkGoods(item.id)"
            >
              审核作品
            </view>
          </view>
        </view>
        <view v-if="item.statusCode === '9'">
          <view class="button" v-if="roleName === 'roomer'">
            <view
              class="btn-single btn-single-blue"
              @click.stop="lookReason(item.reason)"
            >
              查看原因
            </view>
            <view
              class="btn-single btn-single-blue"
              @click.stop="editGoods(item.id)"
            >
              重新编辑
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="no-more" v-if="!hasNextPage && items.length">没有更多了~</view>
    <view class="no-more" v-else>暂无作品~</view>
  </view>
</template>

<script>
import apiService from "../../common/api";
export default {
  data() {
    return {
      current: 0,
      tabs: ["所有商品", "已上架", "未上架"],
      tabsCopy: ["所有商品", "已上架", "未上架"],
      counts: [],
      hasNextPage: false,
      items: [],
      loading: false,
      userInfo: {},
      roleName: "",
    };
  },
  onLoad(option) {
    const typeMap = {
      all: 1,
      onSell: 2,
      offSell: 3,
    };
    if (!option.type) this.current = 0;
    if (typeMap[option.type]) {
      this.current = typeMap[option.type];
    } else {
      this.current = 0;
    }
  },
  async onShow() {
    this.items = [];
    this.hasNextPage = false;
    this.loading = false;
    const [{ data }] = await Promise.all([
      apiService.getUserInfo(),
      this.getCount(),
      this.getMyPicList({ start: 0, hit: 10 }),
    ]);
    let roleName = "normal";
    if (data.roleCode === "1") {
      roleName = "admin";
    } else if (data.roleCode === "2") {
      if (data.isManager) {
        roleName = "admin";
      }
    } else {
      if (data.isRoomer) {
        roleName = "roomer";
      }
    }
    this.roleName = roleName;
    this.userInfo = data;
  },
  async onReachBottom() {
    if (this.hasNextPage) {
      await this.getMyPicList({ start: this.items.length, hit: 10 });
    }
  },
  methods: {
    gotoPage(url, id) {
      uni.navigateTo({ url: `${url}?id=${id}` });
    },
    async onClickItem(i) {
      if (i.currentIndex !== this.current) {
        this.current = i.currentIndex;
        this.items = [];
        this.hasNextPage = false;
        await this.getMyPicList({ start: 0, hit: 10 });
      }
    },
    async getCount() {
      if (this.counts.length) return;
      const [first, second, third] = await Promise.all([
        apiService.getMyPicList({ start: 0, hit: 1, type: "1" }),
        apiService.getMyPicList({ start: 0, hit: 1, type: "2" }),
        apiService.getMyPicList({ start: 0, hit: 1, type: "3" }),
      ]);
      const counts = [first.data.total, second.data.total, third.data.total];
      this.counts = counts;
      this.tabs = this.tabs.map((tab, index) => `${tab}(${counts[index]})`);
    },
    async getMyPicList({ start = 0, hit = 10 }) {
      if (this.hasNextPage === false && this.items.length !== 0) return;
      this.loading = true;
      let type = "1";
      if (this.current === 0) type = "1";
      if (this.current === 1) type = "2";
      if (this.current === 2) type = "3";
      try {
        const { data } = await apiService.getMyPicList({ start, hit, type });
        this.items = [...this.items, ...data.items];
        this.hasNextPage = data.hasNextPage;
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    async remindUser(id) {
      await apiService.sendNotice({ id });
      uni.showToast({
        title: "提醒成功",
        icon: "success",
        duration: 2000,
      });
    },
    editGoods(id) {
      let type = "normal";
      if (this.roleName === "normal") {
        type = "normal";
      } else if (this.roleName === "roomer") {
        type = "roomer";
      }
      uni.navigateTo({ url: `/pages/picEdit/picEdit?id=${id}&type=${type}` });
    },
    checkGoods(id) {
      // TODO: 这里需要跳转到商品审核页面
      let type = "normal";
      if (this.roleName === "roomer") {
        type = "roomer";
      } else if (this.roleName === "admin") {
        type = "admin";
      }
      if (type !== "normal") {
        uni.navigateTo({
          url: `/pages/checkPic/checkPic?id=${id}&type=${type}`,
        });
      }
    },
    lookReason(reason) {
      uni.showModal({
        title: "原因",
        content: reason,
        showCancel: false,
      });
    },
    async lockGoods(id) {
      await apiService.lockGoods({ id });
      uni.showToast({
        title: "锁定成功",
        icon: "success",
        duration: 1000,
      });
      this.hasNextPage = false;
      this.items = [];
      setTimeout(async () => {
        await this.getMyPicList({ start: 0, hit: 10 });
      }, 500);
    },
    async unlockGoods(id) {
      await apiService.unlockGoods({ id });
      uni.showToast({
        title: "解锁成功",
        icon: "success",
        duration: 1000,
      });
      this.hasNextPage = false;
      this.items = [];
      setTimeout(async () => {
        await this.getMyPicList({ start: 0, hit: 10 });
      }, 500);
    },
    async offlineGoods(id) {
      await apiService.offlineGoods({ id });
      uni.showToast({
        title: "下架成功",
        icon: "success",
        duration: 1000,
      });
      this.hasNextPage = false;
      this.items = [];
      this.counts = [];
      this.tabs = this.tabsCopy;
      setTimeout(async () => {
        await Promise.all([
          this.getCount(),
          this.getMyPicList({ start: 0, hit: 10 }),
        ]);
      }, 500);
    },
    async onlineGoods(id) {
      await apiService.onlineGoods({ id });
      uni.showToast({
        title: "上架成功",
        icon: "success",
        duration: 1000,
      });
      this.hasNextPage = false;
      this.items = [];
      this.counts = [];
      this.tabs = this.tabsCopy;
      setTimeout(async () => {
        await Promise.all([
          this.getCount(),
          this.getMyPicList({ start: 0, hit: 10 }),
        ]);
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #fff;
}
.content {
  margin: 15px;
  .item {
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .title {
    padding: 20px 12px 18.5px 12px;
    display: flex;
    flex-direction: row;
    .left {
      font-size: 15px;
      font-weight: 500;
      color: #555555;
      line-height: 24px;
    }
    .right {
      font-size: 15px;
      font-weight: 500;
      color: #fa9f29;
      line-height: 24px;
      margin-left: auto;
    }
  }
  .pic {
    padding: 0 12px 16px 12px;
    display: flex;
    flex-direction: row;
    img {
      height: 74.5px;
      width: 99px;
      border-radius: 10px;
      margin-right: 19.5px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .upper {
        font-size: 15px;
        font-weight: 500;
        color: #333333;
        line-height: 24px;
      }
      .downer {
        font-size: 15px;
        font-weight: 500;
        color: #999999;
        line-height: 24px;
      }
    }
  }
  .button {
    padding: 4px 12px 18px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .btn-single {
      text-align: center;
      height: 33px;
      width: 75px;
      font-size: 13px;
      font-weight: 500;
      color: #333333;
      line-height: 33px;
      border: 1px solid #d2d2d2;
      border-radius: 16.5px;
      margin-left: 7.5px;
    }
    .btn-single-blue {
      color: #217bfb;
      border: 1px solid #217bfb;
    }
  }
}
.no-more {
  height: 20px;
  color: #cccccc;
  text-align: center;
  padding-bottom: 20px;
}
</style>
