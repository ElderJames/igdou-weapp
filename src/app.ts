import wepy from 'wepy'
import 'wepy-async-function'

export default class extends wepy.app {
    config = {
        pages: [
            'pages/index/index',
            "pages/study/index",
            "pages/life/index",
            "pages/me/index",
        ],
        window: {
            "navigationBarBackgroundColor": "#e91e63",
            "navigationBarTextStyle": "white",
            "navigationBarTitleText": "爱海大",
            "backgroundColor": "#fff",
            "backgroundTextStyle": "light"
        },
        tabBar: {
            "color": "#888888",
            "selectedColor": "#fff",
            "borderStyle": "white",
            "backgroundColor": "#e91e63",
            "list": [{
                "pagePath": "pages/index/index",
                "iconPath": "assets/images/iconfont-demo.png",
                "selectedIconPath": "assets/images/iconfont-demo-active.png",
                "text": "资讯"
            },
            {
                "pagePath": "pages/study/index",
                "iconPath": "assets/images/iconfont-about.png",
                "selectedIconPath": "assets/images/iconfont-about-active.png",
                "text": "学习"
            },
            {
                "pagePath": "pages/life/index",
                "iconPath": "assets/images/iconfont-about.png",
                "selectedIconPath": "assets/images/iconfont-about-active.png",
                "text": "生活"
            },
            {
                "pagePath": "pages/me/index",
                "iconPath": "assets/images/iconfont-about.png",
                "selectedIconPath": "assets/images/iconfont-about-active.png",
                "text": "我"
            }]
        },
    }

    globalData = {
        userInfo: null
    }

    constructor() {
        super()
        this.use('requestfix')
    }

    onLaunch() {
        this.testAsync()
    }

    sleep(s) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('promise resolved')
            }, s * 1000)
        })
    }

    async testAsync() {
        const data = await this.sleep(3)
        console.log(data)
    }

    getUserInfo(cb) {
        const that = this
        if (this.globalData.userInfo) {
            return this.globalData.userInfo
        }
        wepy.getUserInfo({
            success(res) {
                that.globalData.userInfo = res.userInfo
                cb && cb(res.userInfo)
            }
        })
    }
}
