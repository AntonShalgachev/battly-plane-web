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
import MathHelper = require("Utility/MathHelper");

@ccclass
export default class ProjectileShooter extends cc.Component {

	@property(cc.Prefab)
	projectilePrefab: cc.Prefab = null;
	@property
	reloadSpeed: number = 0.0;
	@property
	projectileSpeed: number = 0.0;
	@property(cc.RigidBody)
	parentBody: cc.RigidBody = null;
	@property
	nodeGroup: string = "";
	@property
	weaponActive: boolean = true;

	@property
	heatPerShot: number = 0.0;
	@property
	heatDissipationPerSecond: number = 0.0;
	@property
	heatThreshold: number = 0.0;

	cooldown: number = 0.0;

	heat: number = 0.0;
	overheated: boolean = false;

	start () {
		this.cooldown = this.reloadSpeed;
	}

	update (dt) {
		this.cooldown -= dt;

		if (this.cooldown < 0.0 && this.weaponActive && !this.overheated) {
			this.shoot();
			this.cooldown = this.reloadSpeed;
		}

		this.updateHeat(this.heat - this.heatDissipationPerSecond * dt);
	}

	private shoot () {
		// TODO antonsh use NodePool
		let bullet = cc.instantiate(this.projectilePrefab);
		bullet.parent = this.node;
		bullet.setPosition(0.0, 0.0);
		if (this.nodeGroup != "")
			bullet.group = this.nodeGroup;

		let body = bullet.getComponent(cc.RigidBody);
		let angle = body.getWorldRotation();
		let vel = cc.v2(this.projectileSpeed, 0.0).rotate(-cc.misc.degreesToRadians(angle));
		if (this.parentBody)
			vel.addSelf(this.parentBody.linearVelocity);
		body.linearVelocity = vel;

		this.updateHeat(this.heat + this.heatPerShot);
	}

	private updateHeat (newHeat: number) {
		if (newHeat >= 1.0)
			this.overheated = true;

		this.heat = MathHelper.clamp(newHeat, 0.0, 1.0);

		if (this.heat < this.heatThreshold)
			this.overheated = false;
	}

	public getProgress () {
		return 1.0 - this.cooldown / this.reloadSpeed;
	}
}
