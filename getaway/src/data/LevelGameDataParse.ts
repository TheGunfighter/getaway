class LevelGameDataParse {
	public static parseLevelGameData(val:any){
		GameData.stepNum = val.step;
		GameData.levelStepNum = val.step;
		GameData.elementTypes = val.element;
		GameData.levelBackgroundImageName = val.levelgbimg;
		LevelGameDataParse.parselevelReq(val.levelreq);
	}

	private static parselevelReq(val:any){
		GameData.levelreq.openChange();
		var len: number = val.length;
		for(var i = 0; i<len;i++){
			GameData.levelreq.addElement(val[i].type,val[i].num);
		}
	}
}