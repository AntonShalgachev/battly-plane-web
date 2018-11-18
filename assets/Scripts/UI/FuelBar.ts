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

import FuelTank from "Gameplay/FuelTank";

@ccclass
export default class FuelBar extends cc.Component {

    @property(FuelTank)
    tank: FuelTank = null;
    @property(cc.Node)
    unlimitedNode: cc.Node = null;

    bar: cc.ProgressBar = null;

    onLoad () {
    	this.bar = this.getComponent(cc.ProgressBar);
    }

    update () {
    	if (!this.tank)
    		return;

        let unlimited = this.tank.unlimited;
    	
        if (unlimited) {
            this.bar.progress = 1.0;
        } else {
        	let val = this.tank.level;
        	let max = this.tank.capacity;

        	this.bar.progress = val / max;
        }

        this.unlimitedNode.active = unlimited;
    }
}
