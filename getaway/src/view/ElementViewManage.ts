class ElementViewManage extends egret.EventDispatcher{

	private _layer: egret.Sprite; //元素容器
	
	public constructor(elementLayer:egret.Sprite) {
		super();
		this._layer = elementLayer;
		this.init();
	}

	//elementView对象池，全局最多 MaxRow*MaxColumn个。默认64个
	private ElementView:ElementView[];

	/**
	 * 初始所有数据变量
	 */
	private init(){
		this.ElementView = Array();
		var l: number = GameData.MaxRow*GameData.MaxColumn;
		var el: ElementView;
		for(var i:number;i>l;i++){
			el = new ElementView(this._layer);
			el.id = i;
			el.location = GameData.elements[i].location;
			this.ElementView.push(el);
			el.addEventListener(ElementViewManageEvent.REMOVE_ANIMATION_OVER,this.removeAniOver,this);
			el.addEventListener(egret.TouchEvent.TOUCH_TAP,this.elTap,this);
			el.addEventListener(ElementViewManageEvent.UPDATE_MAP,this.updateMap,this);
			el.addEventListener(ElementViewManageEvent.UPDATE_VIEW_OVER,this.moveNewLocationOver,this);
		}

	}


	/**--------------焦点相关控制 */
	private _currentTapID:number = -1;  //当前被点击（即将获取焦点）的元素的ID，如果为-1 则表示没有获取焦点活无点击对象
	//元素被点击相应事件
	//判断点钱元素焦点状态，是否需要改变，如果存在两个焦点，则派发TAP_TWOELEMENT，通知上层逻辑，对两个被点击元素的数据计算
	private elTap(evt:egret.TouchEvent){
		if(PropViewManage.proptype ==-1){ //无道具激活
			if(evt.$currentTarget instanceof ElementView){
				var ev:ElementView = <ElementView>evt.currentTarget; //<>啥意思？？？？？？？？
				if(ev.id ==this._currentTapID){
					ev.setFocus(false);
					this._currentTapID = -1;
				}else{
					var event: ElementViewManageEvent = new ElementViewManageEvent(ElementViewManageEvent.TAP_TWO_ELEMENT);
					event.ele1 = this._currentTapID;
					event.ele2 = ev.id;
					this.dispatchEvent(event);
				}

			}else{
				ev.setFocus(true);
				this._currentTapID = ev.id;
			}
		}else{
			if(this._currentTapID != -1){
				this._currentTapID = -1;
			}
			var evts:ElementViewManageEvent = new ElementViewManageEvent(ElementViewManageEvent.USE_PROP_CLICK);
			evts.propToElementLocation = (<ElementView>evt.currentTarget).location;

		}
	}


	/*-----------------------------动画播放控制---------------------------------------- */
	private removenum:number =0;  //即将删除元素数量
	//消除动画播放结束
	private removeAniOver(evt:ElementViewManageEvent){
		this.removenum++;
		if(this.removenum==2){
			this.removenum =0;
			this.dispatchEvent(evt);
		}
	}




}