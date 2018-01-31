/*
 * index
 * @Author: hejinming <b84866466@gmail.com>
 * @Date: 2017-12-18 15:58:55
 * @since 1.0.0
 */

import Page from 'page'
import List from '@/components/list/list'
import Panel from '@/components/panel/panel'
import Counter from '@/components/counter/counter'
import Group from '@/components/group/group'
import Toast from 'wepy-com-toast'
import testMixin from '@/mixins/test'

export default class Main extends Page {
    config = {
        navigationBarTitleText: '校园资讯'
    }
    components = {
        panel: Panel,
        counter1: Counter,
        counter2: Counter,
        list: List,
        group: Group,
        toast: Toast
    }

    mixins = [testMixin]

    data = {
        newsList: [
            {
                thumbnail: "../../assets/news.jpg",
                title: "学校召开领导干部报告个人有关事项培训暨动员部署会",
                description: "1月24日上午，学校召开2018年领导干部报告个人有关事项培训暨动员部署会。会议由学校党委副书记向献兵主持.."
            },
            {
                thumbnail: "../../assets/news.jpg",
                title: "学校召开领导干部报告个人有关事项培训暨动员部署会",
                description: "1月24日上午，学校召开2018年领导干部报告个人有关事项培训暨动员部署会。会议由学校党委副书记向献兵主持.."
            },
            {
                thumbnail: "../../assets/news.jpg",
                title: "学校召开领导干部报告个人有关事项培训暨动员部署会",
                description: "1月24日上午，学校召开2018年领导干部报告个人有关事项培训暨动员部署会。会议由学校党委副书记向献兵主持.."
            },
            {
                thumbnail: "../../assets/news.jpg",
                title: "学校召开领导干部报告个人有关事项培训暨动员部署会",
                description: "1月24日上午，学校召开2018年领导干部报告个人有关事项培训暨动员部署会。会议由学校党委副书记向献兵主持.."
            }
        ]
    }

    computed = {
        now() {
            return +new Date()
        }
    }

    methods = {
        plus() {
            this.mynum++
        },
        toast() {
            let promise = this.$invoke('toast', 'show', {
                title: '自定义标题',
                img: 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
            })

            promise.then((d) => {
                console.log('toast done')
            })
        },
        tap() {
            console.log('do noting from ' + this.$name)
        },
        communicate() {
            console.log(this.$name + ' tap')

            this.$invoke('counter2', 'minus', 45, 6)
            this.$invoke('counter1', 'plus', 45, 6)

            this.$broadcast('index-broadcast', 1, 3, 4)
        },
        request() {
            let self = this
            let i = 10
            let map = ['MA==', 'MQo=', 'Mg==', 'Mw==', 'NA==', 'NQ==', 'Ng==', 'Nw==', 'OA==', 'OQ==']
            while (i--) {
                wepy.request({
                    url: 'https://www.madcoder.cn/tests/sleep.php?time=1&t=css&c=' + map[i] + '&i=' + i,
                    success: function (d) {
                        self.netrst += d.data + '.'
                        self.$apply()
                    }
                })
            }
        },
        counterEmit(...args) {
            let $event = args[args.length - 1]
            console.log(`${this.$name} receive ${$event.name} from ${$event.source.$name}`)
        }
    }

    events = {
        'index-emit': (...args) => {
            let $event = args[args.length - 1]
            // console.log(`${this.$name} receive ${$event.name} from ${$event.source.$name}`)
        }
    }

    onLoad() {
        let self = this
        this.$parent.getUserInfo(function (userInfo) {
            if (userInfo) {
                self.userInfo = userInfo
            }
            self.normalTitle = '标题已被修改'

            self.setTimeoutTitle = '标题三秒后会被修改'
            setTimeout(() => {
                self.setTimeoutTitle = '到三秒了'
                self.$apply()
            }, 3000)

            self.$apply()
        })
    }
}
