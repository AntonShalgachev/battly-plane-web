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
export default class FuelTank extends cc.Component {

	@property
	capacity: number = 0.0;
	@property
	unlimited: boolean = false;

	level: number = 0.0;

	public static EVENT_FUEL_DEPLETED: string = "FuelTank.fuel_depleted";

	public burn (amount) {
		if (this.unlimited)
			return;
		
		this.level = MathHelper.clamp(this.level - amount, 0.0, this.capacity);
		if (this.isEmpty())
            this.node.emit(FuelTank.EVENT_FUEL_DEPLETED);
	}

	public isEmpty () {
		return !this.unlimited && this.level <= 0.0;
	}

	public getProgress() {
		return this.level / this.capacity;
	}

	start () {
		this.level = this.capacity;
	}
}
