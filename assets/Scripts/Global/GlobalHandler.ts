// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import * as Storage from "Utility/Storage";

export enum PlanePartTypes {
  none 		= 0,
  engine 	= 1,
  wing 		= 2
}

export type PlanePartData = {
	name: 			string;
	description: 	string;
	maxLvl: 		number;
	currentLvl: 	number;
	pricePerLvl: 	Array<number>;
	// stats per lvl?
};

export type PlaneData = {
	engine: PlanePartData;
	wing: 	PlanePartData;
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

    @property
    gameData: GameData = {
    	playerID : "Demo",
    	playerCash : 1400,
    	missionCheckPoints : [0, 0, 0],
    	planeData : {
    		engine : {
    			name: 			"engine",
				description: 	"engine -- engine -- engine -- engine -- engine -- engine",
				maxLvl: 		5,
				currentLvl: 	0,
				pricePerLvl: 	[0, 100, 200, 300, 400, 500]
    		},
    		wing : {
    			name: 			"wing",
				description: 	"wing -- wing -- wing -- wing -- wing -- wing -- wing -- wing",
				maxLvl: 		3,
				currentLvl: 	1,
				pricePerLvl: 	[0, 100, 200, 300, 400, 500]
    		}
    	},
    	optionsData : {
    		sound: true,
    		music: true
    	}
    };

    public static EVENT_NEED_SAVE: 		string = "Global.need_save";
    public static EVENT_NEED_LOAD: 		string = "Global.need_load";
    public static EVENT_UPDATE_DATA: 	string = "Global.update_data";
    public static SAVE_ID:		   		string = "GlobalHandler";

    private data: GameData;
    private static instance: GlobalHandler;

	onLoad(){
		GlobalHandler.instance = this;
		this.data = this.gameData;
		this.node.on(GlobalHandler.EVENT_NEED_SAVE, this.onNeedSave, this);
		this.node.on(GlobalHandler.EVENT_NEED_LOAD, this.onNeedLoad, this);
	}

	onDestroy(){
		this.node.off(GlobalHandler.EVENT_NEED_SAVE, this.onNeedSave, this);
		this.node.off(GlobalHandler.EVENT_NEED_LOAD, this.onNeedLoad, this);
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

	public getPlanePartData(partType: PlanePartTypes): PlanePartData{
		switch(partType){
			case PlanePartTypes.engine:
    			//cc.log("return - " + this.data.planeData.engine.name);
				return this.data.planeData.engine;
			case PlanePartTypes.wing:
    			//cc.log("return - " + this.data.planeData.wing.name);
				return this.data.planeData.wing;
		}
		return null;
	}
	
	public setPlanePartData(partType: PlanePartTypes, data: PlanePartData){
		switch(partType){
			case PlanePartTypes.engine:
    			//cc.log("set - " + data.name + " to - " + this.data.planeData.engine.name);
				this.data.planeData.engine = data;
				break;
			case PlanePartTypes.wing:
    			//cc.log("set - " + data.name + " to - " + this.data.planeData.wing.name);
				this.data.planeData.wing = data;
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

	onNeedSave(){
		Storage.Storage.gameSave();
	}

	onNeedLoad(){
		Storage.Storage.gameLoad();
	}

	// Storage callbacks

	getID(){
		return GlobalHandler.SAVE_ID;
	}

	save(){
		return JSON.stringify(this.data);
	}

	load(data: string){
		this.data = JSON.parse(data);
	}
}
