const {ccclass, property} = cc._decorator;

import Health from "Gameplay/Health";

@ccclass
export default class OnCollisionDestroyer extends cc.Component {

	@property
	instantDamage: number = 0.0;

	onBeginContact (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
		let health = otherCollider.getComponent(Health);

		if (health) {
			health.takeDamage(this.instantDamage, this.node);
		}

		this.node.destroy();
	}
}
