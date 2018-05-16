//
//道具类
//
class PropLogic {
	//使用道具
	public static useProp(proptype:number,ellocation:number){
		switch(proptype){
			case 0:
			PropLogic.tongse(ellocation);
			break;
			case 1:
			PropLogic.zhadan(ellocation);
			break;
			case 2:
			PropLogic.zhenghang(ellocation);
			break;
			case 3:
			PropLogic.zhenglie(ellocation);
			break;
			case 4:
			PropLogic.chanzi(ellocation);
			break;
		}
	}

	//同色消除
	private static tongse(loc:number){
		LinkLogic.lines = [];
		var arr: number[] = [];
		var type:string = GameData.elements[GameData.mapData[Math.floor( loc/8 )][loc % 8]].type;
		for( var i = 0;i< GameData.MaxRow;i++ ){
			for(var t = 0 ;t<GameData.MaxColumn;t++){
				if(GameData.mapData[i][t] != -1 && GameData.elements[GameData.mapData[i][t]].type == type){
					arr.push(GameData.mapData[i][t]);
				}
			}
		}
		LinkLogic.lines.push(arr);
	}

	//炸弹
	private static zhadan(loc:number){
		LinkLogic.lines = new Array();
		var i: number = Math.floor(loc / 8);
		var t: number = loc % 8;
		var arr:number[] = new Array();
		arr.push(GameData.elements[GameData.mapData[i][t]].id);
		if(i > 0 && GameData.mapData[i-1][t] != -1){ //up
			arr.push(GameData.elements[GameData.mapData[i - 1][t]].id);
		}
		if(i < (GameData.MaxRow - 1) && GameData.mapData[i + 1][t] != -1){ //down
			arr.push(GameData.elements[GameData.mapData[i + 1][t]].id)
		}
		if(t > 0 && GameData.mapData[i][t - 1] != -1){
			arr.push(GameData.elements[GameData.mapData[i][t - 1]].id);
		}
		if(t < (GameData.MaxColumn -1) && GameData.mapData[i][t + 1] != -1){
			arr.push(GameData.elements[GameData.mapData[i][t + 1]].id);
		}
		LinkLogic.lines.push(arr);
	}

	//整行
	private static zhenghang(loc:number){
		LinkLogic.lines = new Array();
		var arr: number[] = new Array();
		var i: number = Math.floor(loc / 8);
		for(var t: number = 0;t < GameData.MaxColumn;t++){
			if(GameData.mapData[i][t] != -1){
				console.log(i,t);
				arr.push(GameData.elements[GameData.mapData[i][t]].id);
			}
		}
		LinkLogic.lines.push(arr);
	}
	//整列
	private static zhenglie(loc:number){
		LinkLogic.lines = new Array();
		var arr: number[] = new Array();
		var t: number = loc % 8;
		for(var i: number = 0;i < GameData.MaxRow;i++){
			if(GameData.mapData[i][t] != -1){
				console.log(i,t);
				arr.push(GameData.elements[GameData.mapData[i][t]].id);
			}
		}
		LinkLogic.lines.push(arr);
	}
	//铲子
	private static chanzi(loc:number){
		LinkLogic.lines = new Array();
		LinkLogic.lines.push([GameData.elements[GameData.mapData[Math.floor(loc / 8)][loc % 8]].id]);
	}

}