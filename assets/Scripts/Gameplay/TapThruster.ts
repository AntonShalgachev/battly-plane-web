const {ccclass, property} = cc._decorator;

import FuelTank from "FuelTank";
import InputController from "InputController";
import ScoreController from "ScoreController";
import Checkpoint from "Checkpoint"

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
    @property
    checkpointUpwardForce: number = 0;

    body: cc.RigidBody;
    fuelTank: FuelTank;
    cooldown: number;

    keysDown: number = 0;
    buttonsDown: number = 0;
    checkpointReached: boolean = false;

    onLoad () {
    	cc.systemEvent.on(InputController.EVENT_KEY_DOWN, this.onKeyDown, this);
    	cc.systemEvent.on(InputController.EVENT_KEY_UP, this.onKeyUp, this);
        cc.systemEvent.on(Checkpoint.EVENT_CHECKPOINT_REACHED, this.onCheckpointReached, this);

        cc.systemEvent.on(ScoreController.EVENT_GAME_OVER, () => {
            this.enabled = false;
        });
    }

    onDestroy () {
    	cc.systemEvent.off(InputController.EVENT_KEY_DOWN, this.onKeyDown, this);
    	cc.systemEvent.off(InputController.EVENT_KEY_UP, this.onKeyUp, this);
        cc.systemEvent.off(Checkpoint.EVENT_CHECKPOINT_REACHED, this.onCheckpointReached, this);
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

    onButtonDown() {
        this.buttonsDown++;
    }

    onButtonUp() {
        this.buttonsDown--;
    }

    onCheckpointReached () {
        this.checkpointReached = true;
    }

    isKeyOrButtonDown() {
        return this.keysDown > 0 || this.buttonsDown > 0;
    }

    update (dt) {
        this.cooldown -= dt;

        if (this.cooldown > 0.0)
            return;

        if (this.checkpointReached) {
            let force = this.checkpointUpwardForce * dt;
            this.body.applyForceToCenter(cc.v2(0.0, force), true);
            return;
        }

        let speed = this.body.linearVelocity.y;

    	if (this.isKeyOrButtonDown() && speed < this.maxSpeed && !this.fuelTank.isEmpty()) {
            let force = this.upwardForce * dt;
    		this.body.applyForceToCenter(cc.v2(0.0, force), true);
            this.fuelTank.burn(this.fuelConsumptionPerNewton * force);
        }

    	let height = this.node.y;
    	if (height > this.shutdownHeight)
    		this.cooldown = this.shutdownDuration;
    }
}
