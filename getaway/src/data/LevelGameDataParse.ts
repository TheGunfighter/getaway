class LevelGameDataParse
{
    //针对当前关卡JSON数据，进行解析
    public static parseLevelGameData(val:any)
    {
        GameData.stepNum = val.step;
        GameData.levelStepNum = val.step;
        GameData.elementTyps = val.element;
        GameData.levelBackgrouindImageName = val.levelbgimg;
        LevelGameDataParse.parseLevelReq(val.levelreq);
    }

    //解析过关条件数据
    private static parseLevelReq(val:any)
    {
        //console.log(val);
        GameData.levelreq.openChange();
        var len:number = val.length;
        for(var i:number=0;i<len;i++)
        {
            GameData.levelreq.addElement(val[i].type,val[i].num);
        }
    }

}