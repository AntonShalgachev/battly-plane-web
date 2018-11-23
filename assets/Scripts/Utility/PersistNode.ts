// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import {Singleton} from "Utility/Singleton";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PersistNode extends Singleton{

    @property
    isPersist: boolean = true;

    onStart () {
		if(!cc.Game.isPersistRootNode(this.node) && this.isPersist){
			cc.Game.addPersistRootNode(this.node);
		}
    }
}
