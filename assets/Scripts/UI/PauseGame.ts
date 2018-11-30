// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import * as PauseSystem from "PauseSystem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PauseGame extends cc.Component {

	public buttonCallback(event: cc.Event, scene: string){
		let ps = PauseSystem.PauseSystem;
		if(ps.isPaused()){
			ps.gameResume();
		}
		else{
			ps.gamePause();
		}
    }
}
