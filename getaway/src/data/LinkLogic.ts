//检索逻辑类
class LinkLogic {
	

	/**
	 * 当前搜索结果有无可消除数据
	 */
	public static lines: number[][]; //存放用于消除的数据
	public static isHaveLine():boolean{
		LinkLogic.lines = [];
		var currentType:string = ""; //标记当前类型
		var typeNum : number = 0;    //当前数据类型 
		//行检索
		for(var i =0;i<GameData.MaxRow;i++){
			for(var t =0;t<GameData.MaxColumn;t++){
				if(GameData.mapData[i][t] !=-1){ //有元素或没元素
					if(currentType != GameData.elements[GameData[i][t]].type){ //当前类型与存放类型不同
						if( typeNum >=3){ //上一组计数大于三，有可消除数据
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
			//一行判断完成以后结尾
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
		}
		return false;
	}


	/**
	 * 判断有没有下一步可走
	 * 预检索算法，找到能移动一次便消除不做任何处理，找不到就乱序重置元素顺序
	 * 排列特征
	 * 1 2深红周围6个方块
	 * 2 
	 */
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
						if(t>0 && GameData.mapData[i][t-1]!=-1) //
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


	/**
	 * 元素空间交换算法
	 * 是否可以位置交换
	 * 1相邻（横向/纵向）
	 * 
	 */
	public static canMove(id1:number,id2:number):boolean{
		var l1row:number = Math.floor(GameData.elements[id1].location/GameData.MaxRow);
		var l1col:number = GameData.elements[id1].location % GameData.MaxColumn;
		
		var l2row:number = Math.floor(GameData.elements[id2].location/GameData.MaxRow);
		var l2col:number = GameData.elements[id2].location % GameData.MaxColumn;
		//行相同可交换
		if(l1row == l2row){
			if(Math.abs(l1col-l2col)== 1){
				return true;
			}
		}
		//列相同
		if(l1col == l2col){
			if(Math.abs(l1row-l2row)== 1){
				return true;
			}
		}
		return false;
	}

	/**
	 * 全局乱序算法
	 * 当无可移动元素时乱序排列元素
	 */
	public static changeOrder(){
		var arr:number[]= [];
		for(var i =0; i<GameData.MaxRow;i++){
			for(var t =0 ;t< GameData.MaxColumn;t++){
				if(GameData.mapData[i][t] != -1){
					arr.push(GameData.mapData[i][t]);
				}
			}
		}

		var index:number = 0;
		for(var i =0; i<GameData.MaxRow;i++){
			for(var t =0 ;t< GameData.MaxColumn;t++){
				index = Math.floor(Math.random()* arr.length);
				GameData.mapData[i][t] = arr[index];
				GameData.elements[arr[index]].location = i * GameData.MaxColumn + t; 
				arr.slice(index,i);
			}
		}
	}

	/**
	 * 
	 */




	




}