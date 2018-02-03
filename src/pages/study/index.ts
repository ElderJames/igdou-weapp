import Page from "page";
import testMixin from "@/mixins/test";
import tabView from "@/components/tabView/tabview";

export default class StudyPage extends Page {
  config = { navigationBarTitleText: "学习" };
  components = { "tab-view": tabView };

  data = {
    tablist: ["一", "二", "三", "四", "五", "六"]
  };
  computed = {};
  methods = {};
  mixins = [testMixin];
  events = {};
  onLoad() {}
}
