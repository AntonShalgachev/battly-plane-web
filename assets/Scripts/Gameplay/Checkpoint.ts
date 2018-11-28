const {ccclass, property} = cc._decorator;

import Events = require("Events/GameplayEvents");

@ccclass
export default class Checkpoint extends cc.Component {

	@property
	slowdownDuration: number = 0.0;
	@property
	plateDelay: number = 0.0;

	public static EVENT_CHECKPOINT_REACHED: string = "Checkpoint.checkpoint_reached";

	reached: boolean = false;

	onBeginContact (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
		if (this.reached)
			return;

		cc.systemEvent.emit(Checkpoint.EVENT_CHECKPOINT_REACHED, new Events.CheckpointReached(this.slowdownDuration, this.plateDelay));
		this.reached = true;
	}
}
