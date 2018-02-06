import wepy from "wepy";
import "wepy-async-function";

export default class extends wepy.app {
  config = {
    pages: [
      "pages/index/index",
      "pages/study/index",
      "pages/life/index",
      "pages/me/index"
    ],
    window: {
      navigationBarBackgroundColor: "#e91e63",
      navigationBarTextStyle: "white",
      navigationBarTitleText: "爱海大",
      backgroundColor: "#fff",
      backgroundTextStyle: "light"
    },
    tabBar: {
      color: "#BDBDBD",
      selectedColor: "#e91e63",
      borderStyle: "#880E4F",
      backgroundColor: "#FAFAFA",
      list: [
        {
          pagePath: "pages/index/index",
          iconPath: "assets/tabbar/newspaper.png",
          selectedIconPath: "assets/tabbar/newspaper2.png",
          text: "资讯"
        },
        {
          pagePath: "pages/study/index",
          iconPath: "assets/tabbar/book-open-page-variant.png",
          selectedIconPath: "assets/tabbar/book-open-page-variant2.png",
          text: "学习"
        },
        {
          pagePath: "pages/life/index",
          iconPath: "assets/tabbar/compass-outline.png",
          selectedIconPath: "assets/tabbar/compass-outline2.png",
          text: "发现"
        },
        {
          pagePath: "pages/me/index",
          iconPath: "assets/tabbar/face.png",
          selectedIconPath: "assets/tabbar/face2.png",
          text: "我"
        }
      ]
    }
  };

  globalData = { userInfo: null };

  constructor() {
    super();
    this.use("requestfix");
  }

  onLaunch() {
    this.testAsync();
  }

  sleep(s) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("promise resolved");
      }, s * 1000);
    });
  }

  async testAsync() {
    const data = await this.sleep(3);
    console.log(data);
  }

  getUserInfo(cb) {
    const that = this;
    if (this.globalData.userInfo) {
      return this.globalData.userInfo;
    }
    wepy.getUserInfo({
      success(res) {
        that.globalData.userInfo = res.userInfo;
        cb && cb(res.userInfo);
      }
    });
  }
}
