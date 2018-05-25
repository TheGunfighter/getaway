class MapControl 
{
	public constructor() {

	}

	//创建全地图元素
	public createElementAllmap(){
		this.createAllMap();
	}


    public createElements(num:number):string[]
    {
        var types:string[] = new Array();
        for(var i:number=0;i<num;i++)
        {
            types.push(this.createType());
        }
        return types;
    }



	//针对某一个数据元素更新它得类型
    public changeTypeByID(id:number)
    {
        GameData.elements[id].type = this.createType();
    }

	//创建全部地图元素
    //游戏开始时调用
    private createAllMap()
    {
        var len:number = GameData.MaxColumn * GameData.MaxRow;
        var type:string = "";
        var havelink:boolean = true;
        var id:number = 0;
        var ztype:string = "";
        var htype:string = "";
        for(var i:number=0;i<GameData.MaxRow;i++)
        {
            for (var t:number = 0; t < GameData.MaxColumn; t++)
            {
                if(GameData.mapData[i][t]!=-1)
                {

                    while(havelink)
                    {
                        type = this.createType();
                        if(i>1 && GameData.mapData[i-1][t]!=-1 && GameData.mapData[i-2][t]!=-1)
                        {
                            if(GameData.elements[GameData.mapData[i-1][t]].type==GameData.elements[GameData.mapData[i-2][t]].type)
                            {
                                ztype = GameData.elements[GameData.mapData[i-1][t]].type;
                            }
                        }
                        if(t>1 && GameData.mapData[i][t-1]!=-1 && GameData.mapData[i][t-2]!=-1)
                        {
                            if(GameData.elements[GameData.mapData[i][t-1]].type==GameData.elements[GameData.mapData[i][t-2]].type)
                            {
                                htype = GameData.elements[GameData.mapData[i][t-1]].type;
                            }
                        }
                        if(type!=ztype && type!=htype)
                        {
                            havelink = false;
                        }
                    }
                    id = GameData.unusedElements[0];
                    GameData.elements[id].type = type;
                    GameData.elements[id].location = i*GameData.MaxRow+t;
                    GameData.mapData[i][t] = id;
                    GameData.unusedElements.shift();
                    havelink = true;
                    ztype = "";
                    htype = "";
                }
            }
        }
    }


	//随机创建一个类型元素
    private createType():string
    {
        return GameData.elementTypes[Math.floor(Math.random()*GameData.elementTypes.length)].toString();
    }



	//根据当前删除得地图元素，刷新所有元素得位置
    public updateMapLocation()
    {
        //id去重
        var ids:number[]=new Array();
        var len:number = LinkLogic.lines.length;
        for(var i:number=0;i<len;i++)
        {
            var l:number = LinkLogic.lines[i].length;
            for(var t:number=0;t<l;t++)
            {
                var rel:boolean = false;
                var ll:number = ids.length;
                for(var r:number=0;r<ll;r++)
                {
                    if(ids[r]==LinkLogic.lines[i][t])
                    {
                        rel = true;
                    }
                }
                if(!rel)
                {
                    this.changeTypeByID(LinkLogic.lines[i][t]);
                    ids.push(LinkLogic.lines[i][t]);
                }
            }
        }
        //ids是此次被删除得元素ID,要更新其他得元素位置，并未这几个ids定制新的类型和位置
        len = ids.length;
        var colarr:number[] = new Array();//存储列编号得数据，记录共有几列需要移动位置
        for(i=0;i<len;i++)
        {
            rel = false;
            for(t=0;t<colarr.length;t++)
            {
                if(colarr[t]==GameData.elements[ids[i]].location%GameData.MaxColumn)
                {
                    rel=true;
                }
            }
            if(!rel)
            {
                colarr.push(GameData.elements[ids[i]].location%GameData.MaxColumn);
            }
        }
        //重新得到当前这列ID的排序
        var colelids:number[] ;
        len = colarr.length;
        for(i=0;i<len;i++)
        {
            var newcolids:number[] = new Array();
            var removeids:number[] = new Array();
            for(t=GameData.MaxRow-1;t>=0;t--)
            {
                rel = false;
                for(var q:number=0;q<ids.length;q++)
                {
                    if(ids[q]==GameData.mapData[t][colarr[i]])
                    {
                        removeids.push(ids[q]);
                        rel = true;
                    }
                }
                if(!rel)
                {
                    if(GameData.mapData[t][colarr[i]]!=-1)
                    {
                        newcolids.push(GameData.mapData[t][colarr[i]]);
                    }
                }
            }
            //合并两个数组
            newcolids = newcolids.concat(removeids);
            //将元素重新放入map中，并改变元素Location
            for(t=GameData.MaxRow-1;t>=0;t--)
            {
                if(GameData.mapData[t][colarr[i]]!=-1)
                {
                    GameData.mapData[t][colarr[i]] = newcolids[0];
                    GameData.elements[newcolids[0]].location = t*GameData.MaxRow+colarr[i];
                    newcolids.shift();
                }
            }
        }

    }


}