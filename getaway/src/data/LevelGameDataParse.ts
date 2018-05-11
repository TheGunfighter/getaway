//关卡数据解析类
// 
class LevelGameDataParse {
	public static parseLevelGameData(val:any){
		GameData.stepNum = val.step; //步数
		GameData.levelStepNum = val.step; //关卡步数
		GameData.elementTypes = val.element; //元素的类型
		GameData.levelBackgroundImageName = val.levelgbimg; //当前关卡背景图
		LevelGameDataParse.parselevelReq( val.levelreq ); //过关条件
	}


	//关关条件
	private static parselevelReq(val:any){
		GameData.levelreq.openChange();
		var len: number = val.length;
		for(var i = 0; i<len;i++){
			GameData.levelreq.addElement(val[i].type,val[i].num);
		}
	}
}