// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import * as Storage from "Storage";

import GameplayEvents = require("GameplayEvents");
import ScoreController from "ScoreController"

export enum PlanePartTypes {
  none 		= 0,
  propeller = 1,
  tank 		= 2,
  gun 		= 3,
  engine 	= 4,
  bomb 		= 5
}

export type PlanePartData = {
	name: 			string;
	description: 	string;
	maxLvl: 		number;
	currentLvl: 	number;
	pricePerLvl: 	Array<number>;
	statPerLvl:		Array<number>;
};

export type PlaneData = {
	propeller: 	PlanePartData;
	tank: 		PlanePartData;
	gun: 		PlanePartData;
	engine: 	PlanePartData;
	bomb: 		PlanePartData;
};

export type OptionsData = {
	sound: boolean;
	music: boolean;
};

export type GameData = {
	playerID: 			string;
	playerCash: 		number;
	missionCheckPoints: Array<number>;
	planeData:			PlaneData;
	optionsData:		OptionsData;
};

const {ccclass, property} = cc._decorator;

@ccclass
export class GlobalHandler extends cc.Component implements Storage.ISerializable {

    gameData: GameData = {
    	playerID : "Demo",
    	playerCash : 1400,
    	missionCheckPoints : [0, 0, 0],
    	planeData : {
    		propeller : {
    			name: 			"Пропеллер",
				description: 	"Сверхпрочные мифриловые сплавы позволяют выдержать большие фронтальные повреждения",
				maxLvl: 		5,
				currentLvl: 	0,
				pricePerLvl: 	[0, 100, 200, 300, 400, 500],
				statPerLvl:		[100, 110, 130, 150, 200]
    		},
    		tank : {
    			name: 			"Топливный бак",
				description: 	"Больший бак позволяет пролететь большие расстояния",
				maxLvl: 		3,
				currentLvl: 	1,
				pricePerLvl: 	[0, 100, 200, 300, 400, 500],
				statPerLvl:		[15000, 16000, 18000, 20000, 25000]
    		},
    		gun : {
    			name: 			"Пулемет",
				description: 	"Уничтожай врагов на своем пути",
				maxLvl: 		3,
				currentLvl: 	1,
				pricePerLvl: 	[0, 100, 200, 300, 400, 500],
				statPerLvl:		[15000, 16000, 18000, 20000, 25000]
    		},
    		engine : {
    			name: 			"Двигатель",
				description: 	"Чем мощнее двигатель, тем быстрее ты летишь",
				maxLvl: 		3,
				currentLvl: 	1,
				pricePerLvl: 	[0, 100, 200, 300, 400, 500],
				statPerLvl:		[15000, 16000, 18000, 20000, 25000]
    		},
    		bomb : {
    			name: 			"Бомбы",
				description: 	"Мне кажется, или внизу кто-то был?",
				maxLvl: 		3,
				currentLvl: 	1,
				pricePerLvl: 	[0, 100, 200, 300, 400, 500],
				statPerLvl:		[15000, 16000, 18000, 20000, 25000]
    		}
    	},
    	optionsData : {
    		sound: true,
    		music: true
    	}
    };

    @property
    clearSavedData: boolean = false;
    @property([cc.SpriteFrame])
    PlanePartIcons: cc.SpriteFrame[] = [];

    public static EVENT_NEED_SAVE: 		string = "Global.need_save";
    public static EVENT_NEED_LOAD: 		string = "Global.need_load";
    public static EVENT_UPDATE_DATA: 	string = "Global.update_data";
    public static SAVE_ID:		   		string = "GlobalHandler";

    private data: GameData;
    private static instance: GlobalHandler;

	onLoad(){
		GlobalHandler.instance = this;
		this.data = this.gameData;
		cc.systemEvent.on(GlobalHandler.EVENT_NEED_SAVE, this.onNeedSave, this);
		cc.systemEvent.on(GlobalHandler.EVENT_NEED_LOAD, this.onNeedLoad, this);
		cc.systemEvent.on(ScoreController.EVENT_GAME_OVER, this.onGameOver);

		if (!this.clearSavedData){
			cc.systemEvent.emit(GlobalHandler.EVENT_NEED_LOAD);
		}
	}

	onDestroy(){
		cc.systemEvent.off(GlobalHandler.EVENT_NEED_SAVE, this.onNeedSave, this);
		cc.systemEvent.off(GlobalHandler.EVENT_NEED_LOAD, this.onNeedLoad, this);
		cc.systemEvent.off(ScoreController.EVENT_GAME_OVER, this.onGameOver);
	}

	// API

	public getCash(): number{
		return this.data.playerCash;
	}
	
	public setCash(data: number){
		this.data.playerCash = data;
	}

	public getData(): GameData{
		return this.data;
	}
	
	public setData(data: GameData){
		this.data = data;
	}

	public getPlaneData(): PlaneData{
		return this.data.planeData;
	}
	
	public setPlaneData(data: PlaneData){
		this.data.planeData = data;
	}

	public getPlanePartIcon(partType: PlanePartTypes): cc.SpriteFrame{
		
		let index = partType - 1;
		if(index >= 0 && index < this.PlanePartIcons.length){
			return this.PlanePartIcons[index];
		}
		cc.warn(`Failed to get icon for part type ${partType}`);
		return null;
	}

	public getPlanePartData(partType: PlanePartTypes): PlanePartData{
		switch(partType){
			case PlanePartTypes.propeller:
				return this.data.planeData.propeller;
			case PlanePartTypes.tank:
				return this.data.planeData.tank;
			case PlanePartTypes.gun:
				return this.data.planeData.gun;
			case PlanePartTypes.engine:
				return this.data.planeData.engine;
			case PlanePartTypes.bomb:
				return this.data.planeData.bomb;
		}

		cc.warn(`Failed to get data for part type ${partType}`);
		return null;
	}
	
	public setPlanePartData(partType: PlanePartTypes, data: PlanePartData){
		switch(partType){
			case PlanePartTypes.propeller:
				this.data.planeData.propeller = data;
				break;
			case PlanePartTypes.tank:
				this.data.planeData.tank = data;
				break;
			case PlanePartTypes.gun:
				this.data.planeData.gun = data;
				break;
			case PlanePartTypes.engine:
				this.data.planeData.engine = data;
				break;
			case PlanePartTypes.bomb:
				this.data.planeData.bomb = data;
				break;
		}
	}

	public getOptionsData(): OptionsData{
		return this.data.optionsData;
	}
	
	public setOptionsData(data: OptionsData){
		this.data.optionsData = data;
	}

	static getInstance(){
		// little singleton feel
		return GlobalHandler.instance;
	}
	
	// Events callbacks 

	onNeedSave(e: GameplayEvents.GameOver){
		Storage.Storage.gameSave();
	}

	onNeedLoad(e: GameplayEvents.GameOver){
		Storage.Storage.gameLoad();
	}

	onGameOver (e: GameplayEvents.GameOver) {
		let handler = GlobalHandler.getInstance();
		let cash = handler.getCash();
		handler.setCash(cash + e.totalScore);
		cc.systemEvent.emit(GlobalHandler.EVENT_UPDATE_DATA);
		cc.systemEvent.emit(GlobalHandler.EVENT_NEED_SAVE);
	}

	// Storage callbacks

	getID(){
		return GlobalHandler.SAVE_ID;
	}

	save(){
		return JSON.stringify(this.data);
		cc.log("Player data saved");
	}

	load(rawData: string){
		let data = JSON.parse(rawData);
		if(data != null)
		{
			this.data = data;
		}
		cc.log("Player data loaded");
		cc.log(this.data);
	}
}
