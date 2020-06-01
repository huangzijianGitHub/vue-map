import req from "./index";

export default {
  //测试登陆
  login(data) {
    // console.log("12121");
    return req.axiosPost(loginPath, data);
  },
  egPost: (url, data) => {
    return req.axiosPost(url, data);
  },
  egGet: url => {
    return req.axiosGet(url, "");
  },
  egGetTemp: (data, params) => {
    return req.axiosGet(_skuPath + "/city/list", data);
  },
  //投诉建议提交按钮
  complaintSubmit(data) {
    return req.axiosPostForm(_skuPath + "/user/complain/save", data);
  },
  //用户是否购买过课程
  isBuyLesson() {
    return req.axiosPost(_skuPath + "/users/complain/isBuy");
  },
  getSkuVideoList(data) {
    return req.axiosGet(_skuPath + "/wap/moreCourses/" + data);
  },

  //系统班列表
  postSystemClass(skuId, data) {
    return req.axiosPost(_skuPath + "/feeLive/" + skuId + "?" + data);
  }
};
