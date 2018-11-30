const {ccclass, property} = cc._decorator;

import Health from "Health";
import FrictionDamageable from "FrictionDamageable";
import ScoreController from "ScoreController";

class Data {
	constructor(node: cc.Node) {
		this.node = node;
		this.body = node.getComponent(cc.RigidBody);
		this.health = node.getComponent(Health);
		this.count = 1;
		this.speed = this.body.linearVelocity.mag();
	}

	getSpeed () {
		if (this.speed != null) {
			let speed = this.speed;
			this.speed = null;
			return speed;
		}

		return this.body.linearVelocity.mag();
	}

	public node: cc.Node = null;
	public body: cc.RigidBody = null;
	public health: Health = null;
	public count: number = 0;
	public speed: number = 0;
}

@ccclass
export default class FrictionDamage extends cc.Component {
	@property
	damageFactor: number = 0.0;

	objectsInContact: Array<Data> = [];

    onLoad () {
        cc.systemEvent.on(ScoreController.EVENT_GAME_OVER, this.onGameOver, this);
    }

    onDestroy () {
    	cc.systemEvent.off(ScoreController.EVENT_GAME_OVER, this.onGameOver, this);
    }

    onGameOver () {
    	this.enabled = false;
    	this.objectsInContact = [];
    }

	onBeginContact (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
		if (!otherCollider.getComponent(Health))
			return;

		if (!otherCollider.getComponent(FrictionDamageable))
			return;

		this.objectsInContact.push(new Data(otherCollider.node));
	}

	onEndContact (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
		let node = otherCollider.node;

		let objectToRemove = -1;
		for (let i = this.objectsInContact.length - 1; i >= 0; i--) {
			let object = this.objectsInContact[i];
			if (object.node == node) {
				object.count--;
				objectToRemove = i;
			}
		}

		if (objectToRemove >= 0)
			this.objectsInContact.splice(objectToRemove, 1);
	}

	update (dt: number) {
		for (let i = 0; i < this.objectsInContact.length; i++) {
			let data = this.objectsInContact[i];
			let speed = data.getSpeed();
			let damage = speed * this.damageFactor * dt;

			data.health.takeDamage(damage, this.node);
		}
	}
}
