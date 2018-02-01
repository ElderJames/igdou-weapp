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
        // window: {
        //     backgroundTextStyle: 'light',
        //     navigationBarBackgroundColor: '#fff',
        //     navigationBarTitleText: '爱海大',
        //     navigationBarTextStyle: 'black'
        // },
        window: {
            "navigationBarBackgroundColor": "#f7f7f8",
            "navigationBarTextStyle": "black",
            "navigationBarTitleText": "爱海大",
            "backgroundColor": "#efeff4",
            "backgroundTextStyle": "dark"
        },
        tabBar: {
            "color": "#888888",
            "selectedColor": "#04BE02",
            "borderStyle": "white",
            "backgroundColor": "#f7f7f8",
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
