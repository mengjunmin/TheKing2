/*
 *本虚拟列表只支持垂直递增显示。
 *view锚点必须是（0.5, 1）
 *content锚点必须是（0.5, 1）
 *item锚点必须是（0.5, 1）
 */
cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: {
            get() {
                return this._prefab
            },
            set(value) {
                this._prefab = value;
            }
        },
        data: {
            get() {
                return this._data
            },
            set(value) {
                this._data = value;
            }
        },
        numItems: {
            get() {
                return this._numItems
            },
            set(value) {
                this._numItems = value;
            }
        },
        itemRenderer: {
            set(value) {
                this._itemRenderer = value;
            }
        },
        _list: null,
        _listcontent: null,
        _view: null,
        _pool: null,
        _py: 0,
        _itemList: null,
        _itemIidex: null,
        _itemPoint: null,
        _childNum: 0,
        _offsetY: 0,
    },

    // LIFE-CYCLE CALLBACKS:
    ctor:function () {
         var self = this;
        
    },

    onLoad() {
        // cc.ScrollView
        console.log('view list  onLoad');
        this._list = this.node.getChildByName('scrollview');
        this._view = this._list.getChildByName('view');
        this._listcontent = this._view.getChildByName('content');
        this._pool = new cc.NodePool();
        this._py = 0;
        this._offsetY = 0;
        this._itemList = [];
        this._itemIidex = [];
        this._itemPoint = [];

        // this._list.on('scroll-to-top', this.scrollToTop, this);
        // this._list.on('scrolling', this.scrolling, this);
        // this._list.on('touch-up', this.touchUp, this);
    },

    scrollToTop(e) {
        console.log('------>scrollToTop:', e);
    },
    scrolling(e) {

    },
    touchUp(e) {
        console.log('------>touchUp:', e);
    },

    start() {

    },

    updateView() {
        this.cleanList();
        var viewW = this._view.width;
        var viewH = this._view.height;
        if (this.numItems === 0) return;

        var item = this.createItem();
        this._listcontent.addChild(item);
        this.onItemRender(0, item);
        this._itemList.push(item);
        this._itemIidex.push(0);

        var width = item.width;
        var height = item.height;

        this._listcontent.height = this.numItems * height;
        for (var k = 0; k < this.numItems; k++) {
            this._itemPoint.push(-k * height);
        }

        this._childNum = Math.ceil(viewH / height) + 2;
        this._childNum = this._childNum > this.numItems ? this.numItems : this._childNum;

        for (var i = 1; i < this._childNum; i++) {
            item = this.createItem();
            this._listcontent.addChild(item);
            this.onItemRender(i, item);
            this._itemList.push(item);
            this._itemIidex.push(i);
        }

        for (var i = 0; i < this._itemList.length; i++) {
            this._itemList[i].y = this._itemPoint[i];
        }


    },


    cleanList() {
        this._py = 0;
        this._itemList = [];
        this._itemPoint = [];
        if (this._listcontent) {
            var children = this._listcontent.children;
            var num = children.length;
            for (var i = num - 1; i >= 0; i--) {
                this.putItem(children[i]);
            }
        }
    },

    onItemRender(index, item) {
        if (this._itemRenderer) {
            this._itemRenderer(index, item);
        }
    },


    ///pool
    createItem() {
        if (!this._prefab) return null;

        let item = null;
        if (this._pool.size() > 0) {
            item = this._pool.get();
        } else {
            item = cc.instantiate(this._prefab);
        }

        return item;
    },

    putItem(item) {
        this._pool.put(item);
    },

    clearPool() {
        this._pool.clear();
    },

    //是想虚拟列表
    update(dt) {
        var Scroll = this._list.getComponent(cc.ScrollView);
        var offset = Scroll.getScrollOffset();
        var maxoffset = Scroll.getMaxScrollOffset();
        // console.log('------>this._list:', offset);
        // return;
        if (offset.y <= 0 || offset.y >= maxoffset.y) {
            return;
        }
        var viewH = this._view.height;
        // console.log('------>viewH:', viewH);
        var offsetY = Math.floor(offset.y);
        if (this._offsetY == offsetY) return;
        var off = offsetY - this._offsetY;
        this._offsetY = offsetY;

        var num = this._itemList.length;
        // console.log('------>off:', off);
        if (off > 0) { //向上拖动
            var itemNode = this._itemList[0];

            if (this._offsetY > (itemNode.height - itemNode.y)) {
                var index = this._itemIidex[num - 1];
                // console.log('------>向上拖动:    ', index);
                if (index == (this._numItems - 1)) return;
                // console.log('------>向上拖动:   1');
                this._itemIidex.shift();
                this._itemIidex.push(index + 1);
                this._itemList.shift();
                this._itemList.push(itemNode);
                itemNode.y = this._itemPoint[index + 1];
                this.onItemRender(index + 1, itemNode);
            }

        } else {
            //向下拖动
            var itemNode = this._itemList[num - 1];
            if ((-itemNode.y - this._offsetY) > viewH) {
                var index = this._itemIidex[0];
                // console.log('------>向下拖动:   ', index);
                if (index == 0) return;
                // console.log('------>向下拖动:   1');
                this._itemIidex.pop();
                this._itemIidex.unshift(index - 1);
                this._itemList.pop();
                this._itemList.unshift(itemNode);
                itemNode.y = this._itemPoint[index - 1];
                this.onItemRender(index - 1, itemNode);
            }

        }

    },

    onDestroy() {
        if (true) {
            this.cleanList();
            this.clearPool();
        }

    },



});