import Component from 'component'
import wepy from 'wepy';

export default class tabView extends Component {

    windowWidth: number;
    tabsCount: number;
    tapStartTime: number;
    startX: number;
    tapStartX: number;
    tapStartY: number;


    data = {
        tabs: ['收入', '支出', '通知', '我的'],
        stv: {
            windowWidth: 0,
            lineWidth: 0,
            offset: 0,
            tStart: false
        },
        activeTab: 0
    }

    async onLoad(options: any) {
        try {
            let { tabs } = this.data;
            var res = await wepy.getSystemInfoSync()
            console.log(res);
            this.data.stv.lineWidth = res.windowWidth / this.data.tabs.length;
            this.data.stv.windowWidth = res.windowWidth;
            // this.stv: this.data.stv })
            this.$apply();
            this.tabsCount = tabs.length;
        } catch (e) {
            console.log('tabview error')
        }
    }

    methods = {

        handlerStart(e) {
            let { clientX, clientY } = e.touches[0];
            this.startX = clientX;
            this.tapStartX = clientX;
            this.tapStartY = clientY;
            this.data.stv.tStart = true;
            this.tapStartTime = e.timeStamp;
            this.$apply();
            // this.setData({ stv: this.data.stv })
        },

        handlerMove(e) {
            let { clientX, clientY } = e.touches[0];
            let { stv } = this.data;
            let offsetX = this.startX - clientX;
            this.startX = clientX;
            stv.offset += offsetX;
            if (stv.offset <= 0) {
                stv.offset = 0;
            } else if (stv.offset >= stv.windowWidth * (this.tabsCount - 1)) {
                stv.offset = stv.windowWidth * (this.tabsCount - 1);
            }
            this.$apply();
            this.data.stv = stv;
            // this.setData({ stv: stv });
        },

        handlerCancel(e) {

        },

        handlerEnd(e) {
            let { clientX, clientY } = e.changedTouches[0];
            let endTime = e.timeStamp;
            let { tabs, stv, activeTab } = this.data;
            let { offset, windowWidth } = stv;
            //快速滑动
            if (endTime - this.tapStartTime <= 300) {
                //向左
                if (Math.abs(this.tapStartY - clientY) < 50) {
                    if (this.tapStartX - clientX > 5) {
                        if (activeTab < this.tabsCount - 1) {
                            ++activeTab;
                        }
                    } else {
                        if (activeTab > 0) {
                            --activeTab;
                        }
                    }
                    stv.offset = stv.windowWidth * activeTab;
                } else {
                    //快速滑动 但是Y距离大于50 所以用户是左右滚动
                    let page = Math.round(offset / windowWidth);
                    if (activeTab != page) {
                        activeTab = page;
                        // this.setData({ activeTab: page })
                    }
                    stv.offset = stv.windowWidth * page;
                }
            } else {
                let page = Math.round(offset / windowWidth);
                if (activeTab != page) {
                    activeTab = page;
                    // this.setData({ activeTab: page })
                }
                stv.offset = stv.windowWidth * page;
            }

            stv.tStart = false;
            this.data.stv = stv;
            this.data.activeTab = activeTab;
            this.$apply();

            console.log(this.data);
            // this.$parent.setData({ stv: this.data.stv })
        },

        handlerTabTap(e) {
            this._updateSelectedPage(e.currentTarget.dataset.index);
        }
    }
    _updateSelectedPage(page) {
        let { tabs, stv, activeTab } = this.data;
        this.data.activeTab = page;
        // this.setData({ activeTab: activeTab })
        stv.offset = stv.windowWidth * page;
        this.data.stv = stv;
        console.log(this.data);
        // this.setData({ stv: this.data.stv })
        this.$apply();
    }
}
