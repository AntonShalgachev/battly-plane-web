const {ccclass, property} = cc._decorator;

@ccclass
export default class Physics extends cc.Component {

	@property
	debugDraw: boolean = false;
	@property
	drawAABB: boolean = false;
	@property
	drawPair: boolean = false;
	@property
	drawCenterOfMass: boolean = false;
	@property
	drawJoint: boolean = false;
	@property
	drawShape: boolean = false;

	getDebugFlags () {
		if (!this.debugDraw)
			return 0;

		let flags = 0;

		if (this.drawAABB) {
			// @ts-ignore
			flags |= cc.PhysicsManager.DrawBits.e_aabbBit;
		}
		if (this.drawPair) {
			// @ts-ignore
			flags |= cc.PhysicsManager.DrawBits.e_pairBit;
		}
		if (this.drawCenterOfMass) {
			// @ts-ignore
			flags |= cc.PhysicsManager.DrawBits.e_centerOfMassBit;
		}
		if (this.drawJoint) {
			// @ts-ignore
			flags |= cc.PhysicsManager.DrawBits.e_jointBit;
		}
		if (this.drawShape) {
			// @ts-ignore
			flags |= cc.PhysicsManager.DrawBits.e_shapeBit;
		}

		return flags;
	}

	onLoad () {
		let physicsManager = cc.director.getPhysicsManager();
		physicsManager.enabled = true;
		physicsManager.debugDrawFlags = this.getDebugFlags();
		physicsManager.enabledAccumulator = true;

		cc.PhysicsManager.FIXED_TIME_STEP = 1/30;
		cc.PhysicsManager.PTM_RATIO = 100;

		let collisionManager = cc.director.getCollisionManager();
		collisionManager.enabled = true;
		collisionManager.enabledDebugDraw = true;
		collisionManager.enabledDrawBoundingBox = true;
	}
}
