const {ccclass, property} = cc._decorator;

@ccclass
export default class Explosion extends cc.Component {
	anim: cc.Animation = null;

	start () {
		this.anim = this.getComponent(cc.Animation);

		if (!this.anim) {
			cc.error("No cc.Animation component found");
			return;
		}

		let clip = this.anim.defaultClip;

		if (!clip) {
			cc.warn("No clip found");
			return;
		}

		this.scheduleOnce(() => {
			this.node.destroy();
		}, clip.duration);
	}
}
