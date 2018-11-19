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
export default class PlaneOrientation extends cc.Component {

    @property
    torqueFactor: number = 0.0;
    @property
    maxTorque: number = 0.0;

    body: cc.RigidBody = null;

    onLoad () {
    	this.body = this.getComponent(cc.RigidBody);
    	console.assert(this.body != null, "No rigid body available");
    }

    start () {

    }

    update (dt) {
    	let angle = this.node.rotation;
        let vel = Math.abs(this.body.linearVelocity.x);
        let angVel = this.body.angularVelocity;

        angle += 0.25 * angVel;

    	let targetAngle = 0.0;

        let closestArc = MathHelper.closestArc(angle, targetAngle);
    	let targetTorque = closestArc * this.torqueFactor;

    	let torque = MathHelper.clampMagnitude(targetTorque * vel, this.maxTorque);

    	this.body.applyTorque(-torque, true);
    }
}
