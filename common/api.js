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
  deleteArtist
};
