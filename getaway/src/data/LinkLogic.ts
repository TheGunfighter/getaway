//检索逻辑类
class LinkLogic {
	public static lines: number[][];
	public static isHaveLine():boolean{
		LinkLogic.lines = [];
		var currentType:string = "";
		var typeNum : number = 0;
		//行检索
		for(var i =0;i<GameData.MaxRow;i++){
			for(var t =0;t<GameData.MaxColumn;t++){
				if(GameData.mapData[i][t] !=-1){
					if(currentType != GameData.elements[GameData[i][t]].type){
						if( typeNum >=3){
							var arr:number[] =[];
							for(var q =0; q<typeNum;q++){
								arr.push(GameData.mapData[i][t-q-1]);
							}
							LinkLogic.lines.push(arr);
						}
						currentType = GameData.elements[GameData[i][t]].type;
						typeNum = 1;
					}else{
						typeNum++;
					}
				}else{
					if(typeNum >=3){
						var arr:number[] =[];
							for(var q =0; q<typeNum;q++){
								arr.push(GameData.mapData[i][t-q-1]);
							}
							LinkLogic.lines.push(arr);
					}
					currentType = "";
					typeNum = 0;
				}
			}
			if(typeNum >=3){
				var arr:number[] =[];
				for(var q =0; q<typeNum;q++){
					arr.push(GameData.mapData[i][t-q-1]);
				}
				LinkLogic.lines.push(arr);
			}
			currentType = "";
			typeNum = 0;
		}

		//纵向判断
		for(i =0; i<GameData.MaxColumn;i++){
			for(var t =0;t<GameData.MaxColumn;i++){
				if(GameData.mapData[t][i] != -1){
					if(currentType != GameData.elements[GameData.mapData[t][i]].type){
						if( typeNum >=3){
							var arr:number[] = [];
							for(q = 0; q < typeNum; q++){
								arr.push(GameData.mapData[t - q -1][i]);
							}
							LinkLogic.lines.push(arr);
						}
						currentType = GameData.elements[GameData.mapData[t][i]].type;
						typeNum = 1;
					}else{
						typeNum++;
					}
				}else{
					if( typeNum >=3){
						var arr:number[] = [];
						for(q = 0; q < typeNum; q++){
							arr.push(GameData.mapData[t - q -1][i]);
						}
						LinkLogic.lines.push(arr);
					}
					currentType = "";
					typeNum = 0;
				}
			}
			if( typeNum >=3){
				var arr:number[] = [];
				for(q = 0; q < typeNum; q++){
					arr.push(GameData.mapData[t - q -1][i]);
				}
				LinkLogic.lines.push(arr);
			}
			currentType = "";
			typeNum = 0;
		}
		if( LinkLogic.lines.length!=0 ){
			return true;
		}return false;
	}
	
}