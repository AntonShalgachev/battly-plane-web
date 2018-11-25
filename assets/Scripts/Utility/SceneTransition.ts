// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import {GlobalHandler} from "Global/GlobalHandler";

const {ccclass, property} = cc._decorator;

@ccclass
export class SceneTransition extends cc.Component {
	@property
	transitionTime: number = 0.5;

	public gotoScene(scene: string){
        let node = cc.director.getScene();
        node.runAction(cc.sequence( 
            cc.fadeOut(this.transitionTime),
            cc.callFunc(function () {
                cc.director.loadScene(scene, this.fadeIn)
            }, this)
        ));
	}

	fadeIn(){
		let globalHandler = GlobalHandler.getInstance();
		if(globalHandler != null){
			let sceneTransition = globalHandler.getComponent(SceneTransition);
			if(sceneTransition != null){
				let node = cc.director.getScene();
                node.opacity = 0; 
                node.runAction(cc.fadeIn(sceneTransition.transitionTime));
			}
		}
	}
}
