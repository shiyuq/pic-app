import axios from "./request";

const login = async ({ phone, password, roomCode }) => {
  return axios.post("/user/login", {
    phone,
    password,
    roomCode
  });
};

const logout = async () => {
  return axios.post("/user/logout", {});
};

const userRegister = async ({ phone, password }) => {
  return axios.post("/user/register", {
    phone,
    password,
  });
};

const updateUserInfo = async ({
  avatar,
  nickname,
  name,
  identityCard,
  address,
  addressDetail,
}) => {
  return axios.post("/user/info/update", {
    avatar,
    nickname,
    name,
    identityCard,
    address,
    addressDetail,
  });
};

const resetPwd = async ({ oldPwd, newPwd }) => {
  return axios.post("/user/pwd/reset", {
    oldPwd,
    newPwd,
  });
};

const getUserInfo = async () => {
  return axios.post("/user/info/get", {});
};

const rechargeTransform = async ({ wnt }) => {
  return axios.post("/recharge/transform", {
    wnt,
  });
};

const getRechargeList = async ({ limit, offset }) => {
  return axios.post("/recharge/list", {
    limit,
    offset,
  });
};

const sharePromition = async ({ upperUserId }) => {
  return axios.post("/promotion/share", {
    upperUserId,
  });
};

const updateConfig = async ({ transformPercent, promotionWnt }) => {
  return axios.post("/config/update", {
    transformPercent,
    promotionWnt,
  });
};

const getConfig = async () => {
  return axios.post("/config/get", {});
};

const uploadGoods = async ({ photoBanner, photoDetail, name, detail }) => {
  return axios.post("/mall/upload", {
    photoBanner,
    photoDetail,
    name,
    detail,
  });
};

const updateGoods = async ({ id, photoBanner, photoDetail, name, detail }) => {
  return axios.post("/mall/update", {
    id,
    photoBanner,
    photoDetail,
    name,
    detail,
  });
};

const deleteGoods = async ({ id }) => {
  return axios.post("/mall/delete", {
    id,
  });
};

const getGoodsList = async ({ start, hit }) => {
  return axios.post("/mall/list", {
    start,
    hit,
  });
};

const getGoodsDetail = async ({ id }) => {
  return axios.post("/mall/detail", {
    id,
  });
};

const sendWnt = async ({ mobile, wnt }) => {
  return axios.post("/wnt/send", {
    mobile,
    wnt
  })
}

const getAllLevel = async () => {
  return axios.post("/level/all", {})
}

const crossOut = async () => {
  return axios.post("/user/crossOut", {})
}

module.exports = {
  login,
  logout,
  crossOut,
  userRegister,
  updateUserInfo,
  resetPwd,
  getUserInfo,

  rechargeTransform,
  getRechargeList,

  sharePromition,

  updateConfig,
  getConfig,

  uploadGoods,
  updateGoods,
  deleteGoods,
  getGoodsList,
  getGoodsDetail,

  sendWnt,

  getAllLevel,
};
