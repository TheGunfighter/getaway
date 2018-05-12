//
//过关条件筛选 （对象池）
class LevelRequire {


	public reqElements:LevelRequireElement[];

	public constructor() {
		this.reqElements = [];
	}

	//过关条件的数量（需要消除多少元素过关）
	public getLevelReqNum():number
	{
		return this.getLevelReqNum.length;
	}

	//添加关卡元素对象池
	public addElement(type:string,num:number){
		var ele:LevelRequireElement = new LevelRequireElement();
		ele.num = num;
		ele.type = type;
		this.reqElements.push(ele);
	}

	//启动关卡修改
	public openChange(){
		this.reqElements = [];
	}

	//减少关卡中元素数量
	public changeReqNum(type:string,num:number){
		var l:number = this.getLevelReqNum();
		for(var i =0; i<l;i++){
			if(this.reqElements[i].type==type){
				this.reqElements[i].num -= num;
				return;
			}
		}
	}

	//判断玩家是否通关
	public isClear():boolean{
		var l:number = this.getLevelReqNum();
		for(var i =0 ;i<l;i++){
			if(this.reqElements[i].num>0){
				return false;
			}
		}
		return true;
	}
}