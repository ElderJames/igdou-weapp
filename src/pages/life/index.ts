import Page from 'page'
import testMixin from '@/mixins/test'

export default class LifePage extends Page {
    config = {
        navigationBarTitleText: '生活'
    }
    components = {}

    data = {}
    computed = {}
    methods = {}
    mixins = [testMixin]
    events = {}
    onLoad() { }
}