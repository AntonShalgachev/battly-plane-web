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

type PlaneData = {
	Engine: number;
};

type OptionsData = {
	Sound: boolean;
	Music: boolean;
};

type GameData = {
	playerID: 			string;
	playerCash: 		string;
	missionCheckPoints: Array<number>;
	planeData:			PlaneData;
	optionsData:		OptionsData;
};

const {ccclass, property} = cc._decorator;

@ccclass
export class GlobalHandler extends cc.Component implements Storage.ISerializable {

    public static EVENT_NEED_SAVE: string = "Global.need_save";
    public static EVENT_NEED_LOAD: string = "Global.need_load";
    public static SAVE_ID:		   string = "GlobalHandler";

    private data: GameData;
    private static instance: GlobalHandler;

	onLoad(){
		GlobalHandler.instance = this;
		this.node.on(GlobalHandler.EVENT_NEED_SAVE, this.onNeedSave, this);
		this.node.on(GlobalHandler.EVENT_NEED_LOAD, this.onNeedLoad, this);
	}

	onDestroy(){
		this.node.off(GlobalHandler.EVENT_NEED_SAVE, this.onNeedSave, this);
		this.node.off(GlobalHandler.EVENT_NEED_LOAD, this.onNeedLoad, this);
	}

	// API

	public getData(){
		return this.data;
	}
	
	public setData(data: GameData){
		this.data = data;
	}

	public getPlaneData(){
		return this.data.planeData;
	}
	
	public setPlaneData(data: PlaneData){
		this.data.planeData = data;
	}

	public getOptionsData(){
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
