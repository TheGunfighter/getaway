class MapDataParse
{

    //根据外部加载的数据来创建地图数据
    //数组中存放着无法放置内容得区域，该区域数值均为-1
    public static createMapData(val:Array<number>):void
    {
        var len:number = val.length;
        GameData.unmapnum = len;
        var index:number = 0;
        for(var i:number=0;i<len;i++)
        {
            index = val[i];
            GameData.mapData[Math.floor(index/GameData.MaxColumn)][index%GameData.MaxRow] = -1;
        }

        GameData.currentElementNum = GameData.MaxColumn*GameData.MaxRow - len;
    }
}