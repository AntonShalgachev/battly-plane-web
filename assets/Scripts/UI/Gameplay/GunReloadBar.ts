const {ccclass, property} = cc._decorator;

import ProjectileShooter from "ProjectileShooter"

@ccclass
export default class GunReloadBar extends cc.Component {
    @property(ProjectileShooter)
    shooter: ProjectileShooter = null;

    bar: cc.ProgressBar = null;

    onLoad () {
    	this.bar = this.getComponent(cc.ProgressBar);
    }

    update () {
    	if (!this.shooter)
    		return;
    	
    	this.bar.progress = this.shooter.getProgress();
    }
}
