import Page from "page";
import testMixin from "@/mixins/test";
import Swiper from "@/components/swiper/swiper";

export default class LifePage extends Page {
  config = { navigationBarTitleText: "生活" };
  components = { swiper: Swiper };

  data = {
    swiper: {
      direction: "horizontal", //"vertical",
      slideLength: 3,
      onInit(weswiper) {},
      onTouchStart(weswiper, event) {},
      onTouchMove(weswiper, event) {},
      onTouchEnd(weswiper, event) {},
      onSlideChangeStart(weswiper) {},
      onSlideChangeEnd(weswiper) {},
      onTransitionStart(weswiper) {},
      onTransitionEnd(weswiper) {},
      onSlideMove(weswiper) {},
      onSlideNextStart(weswiper) {},
      onSlideNextEnd(weswiper) {},
      onSlidePrevStart(swiper) {},
      onSlidePrevEnd(weswiper) {}
    }
  };
  computed = {};
  methods = {};
  mixins = [testMixin];
  events = {};
  onLoad() {
    setTimeout(() => this.$invoke("weSwiper", "slideTo", 2), 3000);
  }
}
