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

import DebugHelper = require("Utility/DebugHelper");

@ccclass
export default class ProjectileShooter extends cc.Component {

	@property(cc.Prefab)
	projectilePrefab: cc.Prefab = null;
	@property
	reloadSpeed: number = 0.0;
	@property
	projectileSpeed: number = 0.0;
	@property
	nodeGroup: string = "";
	@property
	weaponActive: boolean = true;

	cooldown: number = 0.0;

	start () {
		this.cooldown = this.reloadSpeed;
	}

	update (dt) {
		this.cooldown -= dt;

		if (this.cooldown < 0.0 && this.weaponActive) {
			this.shoot();
			this.cooldown = this.reloadSpeed;
		}
	}

	shoot () {
		// TODO antonsh use NodePool
		let bullet = cc.instantiate(this.projectilePrefab);
		bullet.parent = this.node;
		bullet.setPosition(0.0, 0.0);
		if (this.nodeGroup != "")
			bullet.group = this.nodeGroup;

		let body = bullet.getComponent(cc.RigidBody);
		let angle = body.getWorldRotation();
		let vel = cc.v2(this.projectileSpeed, 0.0).rotate(-cc.misc.degreesToRadians(angle));
		body.linearVelocity = vel;

		// DebugHelper.logHierarchy();
	}
}
