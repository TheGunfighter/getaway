class ElementView extends egret.Sprite
{	//当这个类new的时候我们首先知道他的父级


	private thisparent:egret.Sprite;//首先建立一个父级，缓存父级显示对象的属性

	public constructor(tparent:egret.Sprite) 
	{	
		super();
		this.thisparent = tparent;
		this.init();//初始化 
	}

	public location:number = 0;//位置编号，适用于位置移动的。

	public _id:number = -1;//ID编号，对应GameDate.elements中的数据ID，与数据下标相同
	public get id():number
	{
		return this._id;
	}
	public set id(val:number)
	{
		this._id = val;
	}

	//元素位图， 初始化相关功能
	private bitmap:egret.Bitmap;//当前元素中的位图数据


	//进行初始化所有的数据
	private init()
	{	//touchEnable是指自身允许不允许触摸事件，touchChildren是指子项允许不允许触摸事件
		this.touchEnabled = true;//开启触摸
		this.touchChildren = false;
		this.bitmap = new egret.Bitmap();//创建位图
		var bitwidth:number = (GameData.stageW - 40)/GameData.MaxColumn;
		this.bitmap.width = bitwidth-10;//设置宽高
		this.bitmap.height = bitwidth-10;
		this.bitmap.x = -1*bitwidth/2;
		this.bitmap.y = -1*bitwidth/2;
		this.addChild(this.bitmap);
	}
	
	//设置贴图
	public setTexture(val:string)
	{
		this.bitmap.texture = RES.getRes(val);//获取资源
	}

	//管理焦点，点击的焦点
	private _focus:boolean = false;//是否被用户点击过了
	public get focus():boolean
	{
		return this._focus;
	}
	private _focusMc:egret.MovieClip;
	//设置选中状态的焦点样式
	public setFocus(val:boolean)
	{
		if(val!=this._focus)
		{
			this._focus = val;
			if(!this._focusMc)
			{	//下面是播放点击元素的动画
				var tex = RES.getRes("foucsmc_png");
				var data = RES.getRes("foucsmc_json");
				var mcf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,tex);
				this._focusMc = new egret.MovieClip(mcf.generateMovieClipData("foucsmc"));
				this._focusMc.x = this._focusMc.width/-2;
				this._focusMc.y = this._focusMc.width/-2;
				this._focusMc.width = this.bitmap.width;
				this._focusMc.height = this.bitmap.height;
			}
			if(val)
			{
				//焦点为true,显示焦点进行播放
				this.addChild(this._focusMc);
				this._focusMc.play(-1);//进行播放
			}
			else
			{
				//为false进行焦点移除
				if(this._focusMc.parent)
				{
					this._focusMc.stop();//暂定动画的播放
					this.removeChild(this._focusMc);//进行焦点的移除
				}
			}
		}
	}


	//移动到新位置，乱序操作使用
	public speed:number = 700;//运动的速度
	//移动到新位置，使用cublicInOut算法，直线移动
	public move()
	{
		var tw:egret.Tween = egret.Tween.get(this);
		tw.to({x:this.targetX(),y:this.targetY()},this.speed,egret.Ease.cubicInOut);
	}


	//元素掉落，从上方掉落
	//掉落后添加到父级别显示列表
	public show(wait:number)
	{
		var tw:egret.Tween = egret.Tween.get(this);
		tw.wait(wait,false);
		tw.call(this.addThisToParent,this);//执行回调
		tw.to({x:this.targetX(),y:this.targetY()},this.speed,egret.Ease.bounceOut);
	}

	//添加到父级显示对象
	private addThisToParent()
	{
		if(!this.parent)
		{
			this.thisparent.addChild(this);
		}
	}

	//目标X轴的位置
	public targetX():number
	{	//计算的公式
		var girdwidth:number = (GameData.stageW - 40)/GameData.MaxColumn;
		var xx:number = 20 + girdwidth*(this.location%GameData.MaxColumn)+girdwidth/2+5;
		return xx;
	}

	//目标Y轴的位置
	public targetY():number
	{
		var girdwidth:number = (GameData.stageW - 40)/GameData.MaxColumn;
		var startY:number = (GameData.stageH-(GameData.stageW-30)/6 - 60)-girdwidth*GameData.MaxColumn;
		var yy:number = startY + girdwidth*(Math.floor(this.location/8))+girdwidth/2+5;
		return yy;
	}

}