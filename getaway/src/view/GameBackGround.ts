class GameBackGround extends egret.Sprite{
	public constructor() {
		super();
	}

	private bgImage: egret.Bitmap;
	private girdBg: egret.Bitmap[];

	private createBackGroundImage(){
		if(!this.bgImage){
			this.bgImage = new egret.Bitmap();
		}
		//场景
		this.bgImage.texture = RES.getRes(GameData.levelBackgroundImageName);
		this.bgImage.width = GameData.stageW;
		this.bgImage.height = GameData.stageH;
		this.addChild(this.bgImage);

		//道具背景
		var propbg: egret.Bitmap = new egret.Bitmap();
		propbg.texture = RES.getRes("propbg_png");
		propbg.width =GameData.stageW;
		propbg.height = GameData.stageH / 5 + 20;
		this.addChild(propbg);
	}

	private createMapbg(){

	}

	private createLevae(){

	}
	private cteateStepbg(){

	}

}