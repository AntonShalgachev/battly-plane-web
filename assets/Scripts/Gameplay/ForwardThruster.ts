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

import FuelTank from "FuelTank";
import InputController from "InputController";
import ScoreController from "ScoreController";
import MathHelper = require("MathHelper");
import Checkpoint from "Checkpoint"

@ccclass
export default class ForwardThruster extends cc.Component {

    @property
    targetSpeed: number = 0;
    @property
    relativeForce: number = 0;
    @property
    maxForce: number = 0;
    @property
    fuelConsumptionPerNewton: number = 0;
    @property
    maxAngleDeviation: number = 0.0;
    @property
    checkpointRelativeForce: number = 0;

    body: cc.RigidBody;
    tank: FuelTank;
    tapped: boolean = false;

    onLoad () {
        cc.systemEvent.on(InputController.EVENT_KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(Checkpoint.EVENT_CHECKPOINT_REACHED, this.onCheckpointReached, this);

        cc.systemEvent.on(ScoreController.EVENT_GAME_OVER, () => {
            this.enabled = false;
        });

        this.body = this.getComponent(cc.RigidBody);
        this.tank = this.getComponent(FuelTank);
    }

    onDestroy () {
        cc.systemEvent.off(InputController.EVENT_KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(Checkpoint.EVENT_CHECKPOINT_REACHED, this.onCheckpointReached, this);
    }

    onKeyDown (e: cc.Event.EventKeyboard) {
        if (e.keyCode == cc.macro.KEY.space)
            this.tapped = true;
    }

    onThrustButtonDown () {
        this.tapped = true;
    }

    onCheckpointReached () {
        this.targetSpeed = 0.0;
        this.relativeForce = this.checkpointRelativeForce;
    }

    update (dt) {
        if (!this.tapped)
            return;

        let angle = this.body.getWorldRotation();

        let deviation = Math.abs(MathHelper.closestArc(0.0, angle));

        if (deviation > this.maxAngleDeviation)
            return;

    	let speed = this.body.linearVelocity.x;
    	let force = Math.min(this.relativeForce * (this.targetSpeed - speed), this.maxForce) * dt;

        if (!this.tank.isEmpty()) {
    	    this.body.applyForceToCenter(cc.v2(force, 0.0), true);
            this.tank.burn(this.fuelConsumptionPerNewton * force);
        }
    }
}
