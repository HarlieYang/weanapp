const app = getApp()
Component({
    data: {
        current: 0
    },
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties:{
        data: {
            type: Array,
            value: [
                {
                    name: '首页',
                    path: '/pages/index/index',
                    slot: "index"
                },
                {
                    name: '我的',
                    path: '/pages/mine/index',
                    slot: "mine"
                },
                {
                    name: '我的',
                    path: '/pages/mine/index',
                    slot: "mine"
                }
            ]
        }
    },
    methods:{
        onChange(e){
            this.setData({
                current: e.detail.current
            })
        },
        onSwiper(e){
            this.setData({
                current: e.currentTarget.dataset.index
            })
        }
    }
})