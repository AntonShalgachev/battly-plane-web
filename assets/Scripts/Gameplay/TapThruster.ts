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
import InputController from "Controller/InputController";

@ccclass
export default class TapThruster extends cc.Component {

    @property
    upwardForce: number = 0.0;
    @property
    maxSpeed: number = 0.0;
    @property
    shutdownHeight: number = 0.0;
    @property
    shutdownDuration: number = 0.0;
    @property
    fuelConsumptionPerNewton: number = 0.0;

    body: cc.RigidBody;
    fuelTank: FuelTank;
    cooldown: number;

    keysDown: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	cc.systemEvent.on(InputController.EVENT_KEY_DOWN, this.onKeyDown, this);
    	cc.systemEvent.on(InputController.EVENT_KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
    	cc.systemEvent.off(InputController.EVENT_KEY_DOWN, this.onKeyDown, this);
    	cc.systemEvent.off(InputController.EVENT_KEY_UP, this.onKeyUp, this);
    }

    start () {
    	this.body = this.getComponent(cc.RigidBody);
        this.fuelTank = this.getComponent(FuelTank);
    }

    isActionKey (code: number) {
    	switch (code) {
    		case cc.macro.KEY.space:
    			return true;
    	}

    	return false;
    }

    onKeyDown (e: cc.Event.EventKeyboard) {
    	if (this.isActionKey(e.keyCode)) {
    		this.keysDown++;
    	}
    }

    onKeyUp (e: cc.Event.EventKeyboard) {
    	if (this.isActionKey(e.keyCode)) {
    		this.keysDown--;
    	}
    }

    update (dt) {
        this.cooldown -= dt;

        if (this.cooldown > 0.0)
            return;

        let speed = this.body.linearVelocity.y;

    	if (this.keysDown > 0 && speed < this.maxSpeed && !this.fuelTank.isEmpty()) {
            let force = this.upwardForce * dt;
    		this.body.applyForceToCenter(cc.v2(0.0, force), true);
            this.fuelTank.burn(this.fuelConsumptionPerNewton * force);
        }

    	let height = this.node.y;
    	if (height > this.shutdownHeight)
    		this.cooldown = this.shutdownDuration;
    }
}
