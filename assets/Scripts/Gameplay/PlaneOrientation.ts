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

import MathHelper = require("Utility/MathFuckHelper.js");

@ccclass
export default class NewClass extends cc.Component {

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
    	let targetAngle = 0.0;

    	let targetTorque = (targetAngle - angle) * this.torqueFactor;

    	let vel = this.body.linearVelocity.mag();
    	let torque = Math.min(targetTorque * vel, this.maxTorque);

    	console.log(angle, torque);
    	this.body.applyTorque(torque, true);
    }
}
