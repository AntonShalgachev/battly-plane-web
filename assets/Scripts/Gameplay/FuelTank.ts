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

import MathHelper = require("Utility/MathHelper");


@ccclass
export default class NewClass extends cc.Component {

    @property
    capacity: number = 0.0;
    @property
    unlimited: boolean = false;

    level: number = 0.0;

    burn (amount) {
        if (!this.unlimited)
    	    this.level = MathHelper.clamp(this.level - amount, 0.0, this.capacity);
    }

    isEmpty () {
    	return !this.unlimited && this.level <= 0.0;
    }

    start () {
    	this.level = this.capacity;
    }
}
