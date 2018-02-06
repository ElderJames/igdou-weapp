import Page from "page";
import testMixin from "@/mixins/test";
import Swiper from "@/components/swiper/swiper";

export default class StudyPage extends Page {
  config = { navigationBarTitleText: "学习" };
  components = { swiper: Swiper };

  data = {
    swiper: {
      tabTiles: ["一", "二", "三", "四", "五", "六", "日"]
    }
  };
  computed = {};
  methods = {};
  mixins = [testMixin];
  events = {};
  onLoad() {}
}
