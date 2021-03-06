const {ccclass, property} = cc._decorator;

import Health from "Health";
import GameplayEvents = require("GameplayEvents");

@ccclass
export default class Bomb extends cc.Component {

	@property
	instantDamage: number = 0.0;
	@property
	radius: number = 0.0;
	@property([cc.String])
	collidableGroups: string[] = [];
	@property({type: cc.Enum(GameplayEvents.ObjectExploaded.ExplosionType)})
	size: GameplayEvents.ObjectExploaded.ExplosionType = GameplayEvents.ObjectExploaded.ExplosionType.None;

	isCollidable (node: cc.Node) {
		return this.collidableGroups.indexOf(node.group) >= 0;
	}

	onBeginContact (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
		let pos = this.getComponent(cc.RigidBody).getWorldCenter();
		let halfSize =  cc.v2(1.0, 1.0).mul(this.radius);
		let topLeft = pos.sub(halfSize);
		let queryRect = cc.rect(topLeft.x, topLeft.y, 2.0 * halfSize.x, 2.0 * halfSize.y);
		let collideres = cc.director.getPhysicsManager().testAABB(queryRect);

		for (var i = collideres.length - 1; i >= 0; i--) {
			let collider = collideres[i];
			if (!this.isCollidable(collider.node))
				continue;

			let health = collider.getComponent(Health);
			if (health)
				health.takeDamage(this.instantDamage, this.node);
		}

		cc.systemEvent.emit(GameplayEvents.ObjectExploaded.eventName, new GameplayEvents.ObjectExploaded(this.node, this.size));
		this.node.destroy();
	}
}
