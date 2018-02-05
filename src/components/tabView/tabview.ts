import Component from "component";
import wepy from "wepy";

export default class tabView extends Component {
  windowWidth: number;
  tabsCount: number;
  tapStartTime: number;
  startX: number;
  tapStartX: number;
  tapStartY: number;

  props = {
    tabs: Object
  };

  data = {
    stv: { windowWidth: 0, lineWidth: 0, offset: 0, tStart: false },
    activeTab: 0
  };

  complated = {};

  watcher = {
    activeTab(newValue, oldValue) {
      console.log(`activeTab value: ${oldValue} -> ${newValue}`);
    }
  };

  async onLoad(options: any) {
    try {
      let { tabs } = this.data;
      var res = await wepy.getSystemInfoSync();
      this.stv.lineWidth = res.windowWidth / this.data.tabs.length;
      this.stv.windowWidth = res.windowWidth;
      this.tabsCount = tabs.length;

      this.$apply();
    } catch (e) {
      console.log("tabview error", e);
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
      this.stv = stv;
      this.$apply();
    },
    handlerCancel(e) {},
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
          }
          stv.offset = stv.windowWidth * page;
        }
      } else {
        let page = Math.round(offset / windowWidth);
        if (activeTab != page) {
          activeTab = page;
        }
        stv.offset = stv.windowWidth * page;
      }

      stv.tStart = false;
      this.stv = stv;
      this.activeTab = activeTab;
    },
    handlerTabTap(e) {
      this._updateSelectedPage(e.currentTarget.dataset.index);
    }
  };
  _updateSelectedPage(page) {
    let { tabs, stv, activeTab } = this.data;
    stv.offset = stv.windowWidth * page;
    this.stv = stv;
    this.activeTab = page;
  }
}
