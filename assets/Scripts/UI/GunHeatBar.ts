const {ccclass, property} = cc._decorator;

import ProjectileShooter from "Gameplay/ProjectileShooter"

@ccclass
export default class GunHeatBar extends cc.Component {
	@property(ProjectileShooter)
	shooter: ProjectileShooter = null;

	@property(cc.Color)
	overheatedColor: cc.Color = cc.Color.RED;
	@property(cc.Color)
	warningColor: cc.Color = cc.Color.YELLOW;
	@property(cc.Color)
	coolColor: cc.Color = cc.Color.GREEN;
	@property
	warningHeat: number = 0.0;

	bar: cc.ProgressBar = null;

	onLoad () {
		this.bar = this.getComponent(cc.ProgressBar);
	}

	update () {
		if (!this.shooter)
			return;

		let heat = this.shooter.heat;
		let overheated = this.shooter.overheated;
		let barNode = this.bar.barSprite.node;
		
		this.bar.progress = heat;

		if (overheated)
			barNode.color = this.overheatedColor;
		else if (heat > this.warningHeat)
			barNode.color = this.warningColor;
		else
			barNode.color = this.coolColor;
	}
}
