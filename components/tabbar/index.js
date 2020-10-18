const app = getApp()
Component({
    data(){
        return{
            current: 0
        }
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
                }
            ]
        }
    },
    methods:{
        onChange(e){
            console.log(e.detail)
        },
        onSwiper(index){
            this.setData({
                current: index
            })
        }
    }
})