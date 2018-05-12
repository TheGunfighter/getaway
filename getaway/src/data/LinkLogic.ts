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
		for(i =0; i<GameData.MaxRow;i++){
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
	//判断有没有下一步可走
	public static isNextHaveLine():boolean
	{
		//循环行进行检索
		for(var i = 0;i <GameData.MaxRow;i++)
		{
			for(var t = 0;t<GameData.MaxColumn;t++)
			{	//当前的元素不可为-1
				if( GameData.mapData[i][t] !=-1)
				{	//判断下一个元素和极限值问题，若没问题进行判断当前的元素和下一个元素是否相同 
					if( t<(GameData.MaxColumn-1) && GameData.mapData[i][t+1] != -1 && GameData.elements[ GameData[i][t] ].type == GameData.elements[ GameData[i][t+1] ].type)
					{
						if(t>0 && GameData.mapData[i][t-1]!=-1)
						{	//左上角的元素不为空，不为-1，在进行判断左上角的元素和当前的元素是否类型相同
							if(i>0 && t>0 && GameData.mapData[i-1][t-1] &&  GameData.mapData[i-1][t-1]!=-1 && GameData.elements[GameData.mapData[i-1][t-1]].type == GameData.elements[ GameData[i][t] ].type)
							{
								return true;	
							}
							if(i< (GameData.MaxRow - 1)&& t>0 && GameData.mapData[i+1][t-1] && GameData.mapData[i+1][t-1] != -1 && GameData.elements[ GameData.mapData[i+1][t-1] ].type == GameData.elements[ GameData.mapData[i][t] ].type)
							{
								return true;
							}
							if(t>1 && GameData.mapData[i][t-2] && GameData.mapData[i][t-2] != -1 && GameData.elements[ GameData.mapData[i][t-2] ].type == GameData.elements[ GameData.mapData[i][t] ].type)
							{
								return true;
							}
						}
						//判断右侧
						if(t < (GameData.MaxColumn -1) && GameData[i][t+2] != -1)
						{
							if(t < (GameData.MaxColumn - 2) && i > 0 && GameData.mapData[i-1][t+2] && GameData.mapData[i-1][t+2] != -1 && GameData.elements[ GameData.mapData[i-1][t+2] ].type == GameData.elements[ GameData.mapData[i][t] ].type)
							{
								return true;
							}
							if(t < (GameData.MaxColumn - 2) && i < (GameData.MaxRow- 1) && GameData.mapData[i+1][t+2] && GameData.mapData[i+1][t+2] != -1 &&  GameData.elements[ GameData.mapData[i+1][t+2] ].type == GameData.elements[ GameData.mapData[i][t] ].type)
							{
								return true;
							}
							if(t < (GameData.MaxColumn - 3) && GameData.mapData[i][t+3] && GameData.mapData[i][t+3] != -1 && GameData.elements[ GameData.mapData[i][t+3] ].type ==  GameData.elements[ GameData.mapData[i][t] ].type)
							{
								return true;
							}
						}
					}
                    if(i<(GameData.MaxRow-1)&&GameData.mapData[i+1][t]!=-1&&GameData.elements[GameData.mapData[i][t]].type==GameData.elements[GameData.mapData[i+1][t]].type)
                    {
                        if(i>0&&GameData.mapData[i-1][t]!=-1)
                        {
                            if(i>1&&GameData.mapData[i-2][t]&&GameData.mapData[i-2][t]!=-1&&GameData.elements[GameData.mapData[i-2][t]].type==GameData.elements[GameData.mapData[i][t]].type)
                            {
                                return true;
                            }
                            if(i>0&&t>0&&GameData.mapData[i-1][t-1]&&GameData.mapData[i-1][t-1]!=-1&&GameData.elements[GameData.mapData[i-1][t-1]].type==GameData.elements[GameData.mapData[i][t]].type)
                            {
                                return true;
                            }
                            if(i>0&&t<(GameData.MaxColumn-1)&&GameData.mapData[i-1][t+1]&&GameData.mapData[i-1][t+1]!=-1&&GameData.elements[GameData.mapData[i-1][t+1]].type==GameData.elements[GameData.mapData[i][t]].type)
                            {
                                return true;
                            }
                        }
                        if(i<(GameData.MaxRow-2)&&GameData.mapData[i+2][t]!=-1)
                        {
                            if(i<(GameData.MaxRow-3)&&GameData.mapData[i+3][t]&&GameData.mapData[i+3][t]!=-1&&GameData.elements[GameData.mapData[i+3][t]].type==GameData.elements[GameData.mapData[i][t]].type)
                            {
                                return true;
                            }
                            if(t<(GameData.MaxColumn-2)&&GameData.mapData[i+2][t+1]&&GameData.mapData[i+2][t+1]!=-1&&GameData.elements[GameData.mapData[i+2][t+1]].type==GameData.elements[GameData.mapData[i][t]].type)
                            {
                                return true;
                            }
                            if(t>0&&GameData.mapData[i+2][t-1]&&GameData.mapData[i+2][t-1]!=-1&&GameData.elements[GameData.mapData[i+2][t-1]].type==GameData.elements[GameData.mapData[i][t]].type)
                            {
                                return true;
                            }
                        }
                    }
                    if(t<(GameData.MaxColumn-2)&&GameData.mapData[i][t+2]!=-1&&GameData.elements[GameData.mapData[i][t]].type==GameData.elements[GameData.mapData[i][t+2]].type)
                    {
                        if(GameData.mapData[i][t+1]!=-1)
                        {
                            if(i>0&&GameData.mapData[i-1][t+1]&&GameData.mapData[i-1][t+1]!=-1&&GameData.elements[GameData.mapData[i-1][t+1]].type==GameData.elements[GameData.mapData[i][t]].type)
                            {
                                return true;
                            }
                            if(i<(GameData.MaxRow-1)&&GameData.mapData[i+1][t+1]&&GameData.mapData[i+1][t+1]!=-1&&GameData.elements[GameData.mapData[i+1][t+1]].type==GameData.elements[GameData.mapData[i][t]].type)
                            {
                                return true;
                            }
                        }
                    }
                    if(i<(GameData.MaxRow-2)&&GameData.mapData[i+2][t]!=-1&&GameData.elements[GameData.mapData[i][t]].type==GameData.elements[GameData.mapData[i+2][t]].type)
                    {
                        if(GameData.mapData[i+1][t]!=-1)
                        {
                            if(t<(GameData.MaxColumn-1)&&GameData.mapData[i+1][t+1]&&GameData.mapData[i+1][t+1]!=-1&&GameData.elements[GameData.mapData[i+1][t+1]].type==GameData.elements[GameData.mapData[i][t]].type)
                            {
                                return true;
                            }
                            if(i<(GameData.MaxRow-1)&&t>0&&GameData.mapData[i+1][t-1]&&GameData.mapData[i+1][t-1]!=-1&&GameData.elements[GameData.mapData[i+1][t-1]].type==GameData.elements[GameData.mapData[i][t]].type)
                            {
                                return true;
                            }
                        }
                    }

				}
			}
		}
		return false;
	}





}