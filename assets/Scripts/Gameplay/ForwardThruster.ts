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

    body: cc.RigidBody;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	this.body = this.getComponent(cc.RigidBody);
    }

    update (dt) {
    	let speed = this.body.linearVelocity.x;
    	let force = Math.min(this.relativeForce * (this.targetSpeed - speed), this.maxForce);

    	this.body.applyForceToCenter(cc.v2(force * dt, 0.0), true);
    }
}
