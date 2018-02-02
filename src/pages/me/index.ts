
import Page from 'page'
import testMixin from '@/mixins/test'

export default class MePage extends Page {
    config = {
        navigationBarTitleText: '我'
    }
    components = {}

    data = {}
    computed = {}
    methods = {}
    mixins = [testMixin]
    events = {}
    onLoad() { }
}