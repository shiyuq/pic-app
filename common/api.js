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

const userRegister = async (params) => {
  return axios.post("/user/register", params);
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

const updateConfig = async ({ transformPercent, promotionWnt }) => {
  return axios.post("/config/update", {
    transformPercent,
    promotionWnt,
  });
};

const getConfig = async () => {
  return axios.post("/config/get", {});
};

const crossOut = async () => {
  return axios.post("/user/crossOut", {})
}

const getArtistList = async ({ start = 0, hit = 10 }) => {
  return axios.post("/artist/list", {
    start,
    hit,
  });
};

const addArtist = async (params) => {
  return axios.post("/artist/add", params);
};

const updateArtist = async (params) => {
  return axios.post("/artist/update", params);
};

const deleteArtist = async (params) => {
  return axios.post("/artist/delete", params);
};

const getArtistDetail = async (params) => {
  return axios.post("/artist/detail", params);
};

const getGoodsList = async (params) => {
  return axios.post("/pic/list", params);
}

const getGoodsDetail = async (params) => {
  return axios.post("/pic/detail", params);
}

const buyGoods = async (params) => {
  return axios.post("/pic/buy", params);
}

const getOrderList = async (params) => {
  return axios.post("/order/list", params);
}

const getOrderDetail = async (params) => {
  return axios.post("/order/detail", params);
}

const confirmOrder = async (params) => {
  return axios.post("/order/confirm", params);
}

const getMyPicList = async (params) => {
  return axios.post("/my/pic/list", params);
}

const editMyPic = async (params) => {
  return axios.post("/my/pic/edit", params);
}

const sendNotice = async (params) => {
  return axios.post("/message/notice/send", params);
}

const getMessageList = async (params) => {
  return axios.post("/message/list", params);
}

const readMessage = async (params) => {
  return axios.post("/message/read", params);
}

const addPic = async (params) => {
  return axios.post("/pic/add", params);
}

const updatePic = async (params) => {
  return axios.post("/pic/update", params);
}

const checkPic = async (params) => {
  return axios.post("/pic/check", params);
}

const adminCheck = async (params) => {
  return axios.post("/pic/admin/check", params);
}

const lockGoods = async (params) => {
  return axios.post("/pic/lock", params);
}

const unlockGoods = async (params) => {
  return axios.post("/pic/unlock", params);
}

const offlineGoods = async (params) => {
  return axios.post("/pic/offline", params);
}

const onlineGoods = async (params) => {
  return axios.post("/pic/online", params);
}

const getPicRoomDetail = async (params) => {
  return axios.post("/room/detail", params);
}

const updateRoom = async (params) => {
  return axios.post("/room/update", params);
}

const reversePic = async (params) => {
  return axios.post("/pic/reverse", params);
}

const getRoomList = async (params) => {
  return axios.post("/room/list", params);
}

module.exports = {
  login,
  logout,
  crossOut,
  userRegister,
  updateUserInfo,
  resetPwd,
  getUserInfo,

  updateConfig,
  getConfig,

  getArtistList,
  addArtist,
  updateArtist,
  deleteArtist,
  getArtistDetail,

  getGoodsList,
  getGoodsDetail,
  buyGoods,

  getOrderList,
  getOrderDetail,
  confirmOrder,

  getMyPicList,
  editMyPic,

  addPic,
  updatePic,
  checkPic,
  adminCheck,
  lockGoods,
  unlockGoods,
  offlineGoods,
  onlineGoods,

  sendNotice,
  getMessageList,
  readMessage,
  getPicRoomDetail,
  updateRoom,
  reversePic,
  getRoomList,
};
