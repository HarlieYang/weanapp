const app = getApp()
Component({
    data:{
        current: 0
    },
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties:{
        data:{
            type: Array,
            value: [
                {
                    text: '全部',
                    index: 0,
                    slot: 'one'
                },
                {
                    text: '服饰',
                    index: 1,
                    slot: 'two'
                },
                {
                    text: '护肤',
                    index: 2,
                    slot: 'three'
                },
                {
                    text: '运动',
                    index: 3,
                    slot: 'four'
                },
                {
                    text: '家电',
                    index: 4,
                    slot: 'five'
                },
                {
                    text: '化妆品',
                    index: 5,
                    slot: 'six'
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