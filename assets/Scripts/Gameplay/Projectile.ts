const {ccclass, property} = cc._decorator;

import Health from "Health";
import GameplayEvents = require("GameplayEvents");

@ccclass
export default class OnCollisionDestroyer extends cc.Component {

	@property
	instantDamage: number = 0.0;
	@property({type: cc.Enum(GameplayEvents.ObjectExploaded.ExplosionType)})
	size: GameplayEvents.ObjectExploaded.ExplosionType = GameplayEvents.ObjectExploaded.ExplosionType.None;

	onBeginContact (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
		let health = otherCollider.getComponent(Health);

		if (health) {
			health.takeDamage(this.instantDamage, this.node);
		}

		cc.systemEvent.emit(GameplayEvents.ObjectExploaded.eventName, new GameplayEvents.ObjectExploaded(this.node, this.size));
		this.node.destroy();
	}
}
