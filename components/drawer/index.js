const app = getApp()
Component({
    /**
	 * Drawer 抽屉
	 * @description 抽屉侧滑菜单
	 * @property {Boolean} mask = [true | false] 是否显示遮罩
	 * @property {Boolean} maskClick = [true | false] 点击遮罩是否关闭
	 * @property {Boolean} mode = [left | right | bottom] Drawer 滑出位置
	 * 	@value left 从左侧滑出
	 * 	@value right 从右侧侧滑出
     *  @value bottom 从底部滑出
	 * @property {Number} width 抽屉的宽度
	 * @event {Function} close 组件关闭时触发事件
	 */
    data:{
        visibleSync: false,
        showDrawer: false,
        rightMode: false,
        leftMode: false,
        bottomMode: false,
        watchTimer: null,
        drawerWidth: 220,
        draweHeight: 220,
        className: ''
    },
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties:{
        /**
         * 显示模式（左、右），只在初始化生效
         */
        mode: {
            type: String,
            value: 'right'
        },
        /**
         * 蒙层显示状态
         */
        mask: {
            type: Boolean,
            value: true
        },
        /**
         * 遮罩是否可点击关闭
         */
        maskClick:{
            type: Boolean,
            value: true
        },
        /**
         * 抽屉宽度
         */
        width: {
            type: Number,
            value: 220
        },
        /**
         * 抽屉高度
         */
        height: {
            type: Number,
            default: 220
        },
    },
    attached: function () { 
        this.setData({
            drawerWidth: this.data.width,
            draweHeight: this.data.height,
            rightMode: this.data.mode === 'right',
            leftMode: this.data.mode === 'left',
            bottomMode: this.data.mode === 'bottom'
        },() => {
            let className = "uni-drawer__content"
            if(this.data.showDrawer){
                className += ' uni-drawer__content--visible'
            }
            if(this.data.rightMode) {
                className += ' uni-drawer--right'
            }
            if(this.data.bottomMode){
                className += ' uni-drawer--bottom'
            }
            if(this.data.leftMode){
                className += ' uni-drawer--left'
            }
            this.setData({
                className
            })
        }) 
    },
    methods:{
        clear(){},
        close(e) {
            console.log(e)
            // fixed by mehaotian 抽屉尚未完全关闭或遮罩禁止点击时不触发以下逻辑
            let { maskClick, visibleSync } = this.data
            let type = e.target.dataset
            if((type === 'mask' && !maskClick) || !visibleSync) return
            this._change('showDrawer', 'visibleSync', false)
        },
        open() {
            // fixed by mehaotian 处理重复点击打开的事件
            if(this.data.visibleSync) return
            this._change('visibleSync', 'showDrawer', true)
        },
        _change(param1, param2, status) {
            this.setData({
                [param1]: status
            },() => {
                let {watchTimer} = this.data
                if (watchTimer) {
                    clearTimeout(watchTimer)
                }
                watchTimer = setTimeout(() => {
                    this.setData({
                        [param2]: status
                    })
                    // this.$emit('change',status)
                }, status ? 50 : 300)
                this.setData({
                    watchTimer
                })
            })
           
        }
    }
})