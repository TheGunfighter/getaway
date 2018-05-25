class GameBackGround extends egret.Sprite
{
    public constructor()
    {
        super();
    }

    public changeBackground():void
    {
        this.cacheAsBitmap = false;
        this.removeChildren();
        this.createBackGroundImage();
        this.createMapBg();
        this.createLevelReqBg();
        this.createStepBg();
        this.cacheAsBitmap = true;
    }

    private bgImage:egret.Bitmap;
    private girdBg:egret.Bitmap[];//网格背景


    //创建地图背景图片
    private createBackGroundImage()
    {
        if(!this.bgImage)
        {
            this.bgImage = new egret.Bitmap();
        }
        //场景背景图
        this.bgImage.texture = RES.getRes(GameData.levelBackgrouindImageName);
        this.bgImage.width = GameData.stageW;
        this.bgImage.height = GameData.stageH;
        this.addChild(this.bgImage);
        //道具背景图
        var propbg:egret.Bitmap = new egret.Bitmap();
        propbg.texture = RES.getRes("propbg_png");
        propbg.width = GameData.stageW;
        propbg.height = GameData.stageW/5 + 20;
        propbg.y = GameData.stageH - propbg.height;
        this.addChild(propbg);
    }

    //创建地图背景图片的格子图
    private createMapBg()
    {
        if(!this.girdBg)
        {
            this.girdBg = new Array();
        }
        var gird:egret.Bitmap;
        var girdwidth:number = (GameData.stageW - 40)/GameData.MaxColumn;
        var startY:number = (GameData.stageH - (GameData.stageW - 30)/6 - 60 )-girdwidth*GameData.MaxColumn;
        for(var i:number=0;i<GameData.MaxRow;i++) {
            for (var t:number = 0; t < GameData.MaxColumn; t++) {
                if(GameData.mapData[i][t]!=-1) {
                    if(this.girdBg.length<(i*GameData.MaxRow+t))
                    {
                        gird = new egret.Bitmap();
                        this.girdBg.push(gird);
                    }
                    else
                    {
                        gird = this.girdBg[i*GameData.MaxRow+t];
                    }
                    gird.width = girdwidth;
                    gird.height = girdwidth;
                    gird.x = 20+girdwidth*t;
                    gird.y = startY + girdwidth*i;
                    if((i%2==0&&t%2==0)||(i%2==1&&t%2==1))
                    {
                        gird.texture = RES.getRes("elementbg1");
                    }
                    else
                    {
                        gird.texture = RES.getRes("elementbg2");
                    }
                    this.addChild(gird);
                }
            }
        }
    }

    //创建关卡背景图片
    private createLevelReqBg()
    {
        var girdwidth:number = (GameData.stageW - 40)/GameData.MaxColumn;
        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("levelreqbg_png");
        bg.width = GameData.levelreq.getLevelReqNum()*(10+girdwidth)+20;
        bg.height = girdwidth + 60;
        bg.x = 20;
        bg.y = 50;
        this.addChild(bg);

        var bgtxt:egret.Bitmap = new egret.Bitmap();
        bgtxt.texture = RES.getRes("levelreqtitle_png");
        bgtxt.x = bg.x + (bg.width - bgtxt.width)/2;
        bgtxt.y = bg.y - 18;
        this.addChild(bgtxt);
    }

    //剩余步数背景
    private createStepBg()
    {
        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("levelreqbg_png");
        bg.width = 100;
        bg.height = 100;
        bg.x = GameData.stageW - 110;
        bg.y = 50;
        this.addChild(bg);

        var bgtxt:egret.Bitmap = new egret.Bitmap();
        bgtxt.texture = RES.getRes("sursteptitle_png");
        bgtxt.x = bg.x + (bg.width - bgtxt.width)/2;
        bgtxt.y = bg.y + 10;
        this.addChild(bgtxt);
    }
}