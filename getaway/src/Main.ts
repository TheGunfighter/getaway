class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        //egret.Profiler.getInstance().run();

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig("resource/resource.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.loadGroup("preload");
    }
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            this.createGameScene();
        }
    }
    /**
    * 资源组加载出错
     *  The resource group loading failed
    */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    private _gameLogic:GameLogic;
    private _gameLayer:egret.Sprite;
    private createGameScene(): void {
        this._gameLayer = new egret.Sprite();
        this.addChild(this._gameLayer);
        this._gameLogic = new GameLogic(this._gameLayer);

    }
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private evm:ElementViewManage
    private acreateGameScene(): void {
        GameData.initData();  //初始化数据

        var leveldata = RES.getRes("l1");   //初始化GameData数据
        MapDataParse.createMapData(leveldata.map);  //创建地图数据
        LevelGameDataParse.parseLevelGameData(leveldata);  //解析游戏关卡数据

        //console.log("ddd");
        //console.log(GameData.unuseeElements);
        var mapc:MapControl = new MapControl();
        mapc.createElementAllMap();


        console.log(GameData.mapData);
        console.log(GameData.elements);



        //*************** test code ******************
        var gbg:GameBackGround = new GameBackGround();
        this.addChild(gbg);
        gbg.changeBackground();

        var cc:egret.Sprite = new egret.Sprite();
        this.addChild( cc );
        this.evm = new ElementViewManage(cc);

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.click,this);

        /*this.darwbitmap();


        this.drawd();



        var s1:egret.Shape = new egret.Shape();
        s1.graphics.beginFill(0x00ff00);
        s1.graphics.lineStyle(5,0xff0000);
        s1.graphics.drawRect(0,0,GameData.stageW,50);
        s1.graphics.endFill();
        s1.y = 400;
        this.addChild(s1);

        var ss:egret.Shape = new egret.Shape();
        ss.graphics.beginFill(0x0000ff);
        ss.graphics.lineStyle(5,0xff0000);
        ss.graphics.drawRect(0,0,30,GameData.stageH);
        ss.graphics.endFill();
        ss.x = GameData.stageW - 40;
        this.addChild(ss);
*/

    }
    private click(evt:egret.TouchEvent)
    {
        this.evm.showAllElement();
        /*this.drawd();
        var rel = LinkLogic.isHaveLine();
        console.log(rel);
        console.log(LinkLogic.lines);

        rel = LinkLogic.isNextHaveLine();
        console.log("是否存在可消除的方块",rel);
*/
        //LinkLogic.changeOrder();

       // this.drawd();
        //this.darwbitmap();
        //this.move();
    }
    private move()
    {
        var l:number = this.els.length;
        var lo:number = 0;
        var xx:number = 0;
        var yy:number = 0;
        var ll:number = (GameData.stageW - 40)/GameData.MaxColumn;
        for(var i:number=0;i<l;i++)
        {
            lo = GameData.elements[Number(this.els[i].name)].location;
            yy = (GameData.stageH - (GameData.stageW - 30)/6 - 60 )-ll*GameData.MaxColumn+ll*Math.floor(lo/8) ;
            xx = 20+ ll*(lo%8);
            egret.Tween.get(this.els[i]).to({x:(xx+ll/2),y:(yy+ll/2)},700, egret.Ease.cubicInOut);
        }
    }

    private bgc:egret.Sprite;
    private els:egret.Sprite[];
    private darwbitmap()
    {
        this.els = new Array();
        this.removeChildren();
        this.bgc = new egret.Sprite();
        this.addChild(this.bgc);
        //先贴背景
        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("background");
        bg.width = GameData.stageW;
        bg.height = GameData.stageH;
        this.bgc.addChild(bg);
        var ll:number = (GameData.stageW - 40)/GameData.MaxColumn;
        for(var i:number=0;i<GameData.MaxRow;i++) {
            for (var t:number = 0; t < GameData.MaxColumn; t++) {
                if(GameData.mapData[i][t]!=-1) {
                    var kuai:egret.Bitmap = new egret.Bitmap();
                    kuai.y = (GameData.stageH - (GameData.stageW - 30)/6 - 60 )-ll*GameData.MaxColumn+ll*i ;
                    kuai.x = 20+ ll*t;
                    kuai.width = ll;
                    kuai.height = ll;
                    this.bgc.addChild(kuai);
                    //处理边框
                    if(i==0)
                    {
                        var bb:egret.Bitmap = new egret.Bitmap();
                        bb.width = ll;
                        bb.height = 6;
                        bb.x = kuai.x;//kuai.x+3;
                        bb.y = kuai.y-3;//kuai.y-3;
                        bb.texture = RES.getRes("bianheng_jpg");
                        this.bgc.addChild(bb);
                    }
                    if(i==(GameData.MaxRow-1))
                    {
                        var bba:egret.Bitmap = new egret.Bitmap();
                        bba.width = ll;
                        bba.height = 6;
                        bba.x = kuai.x;//kuai.x+3;
                        bba.y = ll+kuai.y+3;//kuai.y-3;
                        bba.scaleY = -1;
                        bba.texture = RES.getRes("bianheng_jpg");
                        this.bgc.addChild(bba);
                    }
                    if(t==0)
                    {
                        var bbf:egret.Bitmap = new egret.Bitmap();
                        bbf.width = 6;
                        bbf.height = ll;
                        bbf.x = kuai.x-3;//kuai.x+3;
                        bbf.y = kuai.y;//kuai.y-3;
                        bbf.texture = RES.getRes("bianshu_jpg");
                        this.bgc.addChild(bbf);
                    }
                    if(t==(GameData.MaxColumn-1))
                    {
                        var bbd:egret.Bitmap = new egret.Bitmap();
                        bbd.width = 6;
                        bbd.height = ll;
                        bbd.x = ll+kuai.x+3;//kuai.x+3;
                        bbd.y = kuai.y;//kuai.y-3;
                        bbd.texture = RES.getRes("bianshu_jpg");
                        bbd.scaleX = -1;
                        this.bgc.addChild(bbd);
                    }


                    if((i%2==0&&t%2==0)||(i%2==1&&t%2==1))
                    {
                        kuai.texture = RES.getRes("elementbg1");
                    }
                    else
                    {
                        kuai.texture = RES.getRes("elementbg2");
                    }

                    var el:egret.Sprite = new egret.Sprite();
                    var ele:egret.Bitmap = new egret.Bitmap();
                    ele.texture = RES.getRes("e"+GameData.elements[GameData.mapData[i][t]].type+"_png");
                    ele.width = kuai.width-10;
                    ele.height = kuai.height - 10;
                    ele.x = -1 * ele.width/2;
                    ele.y = -1 * ele.height/2;
                    el.addChild(ele);
                    el.x = kuai.x+kuai.width/2;
                    el.y = kuai.y+kuai.height/2;
                    el.cacheAsBitmap = true;
                    this.addChild(el);
                    this.els.push(el);
                    el.name = GameData.elements[GameData.mapData[i][t]].id.toString();
                    //console.log(el.name);
                }

            }
        }
        this.bgc.cacheAsBitmap = true;
    }

    private drawd()
    {
        this.removeChildren();
        var color:number = 0xffffff;
        for(var i:number=0;i<GameData.MaxRow;i++) {
            for (var t:number = 0; t < GameData.MaxColumn; t++) {
                if(GameData.mapData[i][t]!=-1)
                {
                    var shp:egret.Shape = new egret.Shape();
                    switch( GameData.elements[GameData.mapData[i][t]].type )
                    {
                        case "0":
                            color = 0x0000ff;
                            break;
                        case "1":
                            color = 0xff0000;
                            break;
                        case "2":
                            color = 0x00ff00;
                            break;
                        case "3":
                            color = 0xff00ff;
                            break;
                        case "4":
                            color = 0x00ffff;
                            break;
                        case "5":
                            color = 0xffffff;
                            break;
                    }
                    shp.graphics.beginFill(color);
                    shp.graphics.lineStyle(1,0);
                    var ll:number = (GameData.stageW - 40)/GameData.MaxColumn;
                    shp.graphics.drawRect(0,0,ll,ll);
                    shp.graphics.endFill();
                    shp.y = (GameData.stageH - (GameData.stageW - 30)/6 - 60 )-ll*GameData.MaxColumn+ll*i ;
                    shp.x = 20+ ll*t;
                    //console.log(shp.x,shp.y);
                    this.addChild(shp);
                }

            }
        }
        var ww:number = (GameData.stageW - 60)/6;
        var yy:number = GameData.stageH - ww - 30;
        for(var q:number=0;q<6;q++)
        {
            var sh:egret.Shape = new egret.Shape();
            sh.graphics.beginFill(0x00ffff);
            sh.graphics.lineStyle(3,0xff0000);
            sh.graphics.drawRect(0,0,ww,ww);
            sh.graphics.endFill();
            sh.x = 30 + ww*q;
            sh.y = yy;
            this.addChild(sh);
        }
    }

}


