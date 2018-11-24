// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

export interface IPausable {
	onPause: boolean;
}

function IsIPausable(object: any): object is IPausable {
    return object.onPause !== undefined;
}

@ccclass
export class PauseSystem {
	private static paused:boolean = false;

	private constructor(){}

	public static isPaused(): boolean {
    	return this.paused;
	}
	public static gamePause(){
    	this.paused = true;
    	PauseSystem.loopIPausables(PauseSystem.tryPauseNode);
	}

	public static gameResume(){
    	this.paused = false;
    	PauseSystem.loopIPausables(PauseSystem.tryResumeNode);
	}

	private static loopIPausables(callback: (node: cc._BaseNode) => void){
		let root = cc.director.getScene();
		if(root != null){
			root.walk(callback, null);
		}
	}

	private static tryPauseNode(node: cc._BaseNode){
		let cmps = node.getComponents(cc.Component);
		let needPause = false;
		for(let cmp of cmps){
			if(IsIPausable(cmp)){
				needPause = true;
			}
		}
		if(needPause){
			node.active = false;
		}
	}

	private static tryResumeNode(node: cc._BaseNode){
		let cmps = node.getComponents(cc.Component);
		let needResume = false;
		for(let cmp of cmps){
			if(IsIPausable(cmp)){
				needResume = true;
			}
		}
		if(needResume){
			node.active = true;
		}
	}		
}
